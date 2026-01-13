import { WizardStep } from '../StepInterface';
import { WizardData, QRCodeParams } from '../../types';
import { generateQRCodeLink, buildPreviewUrl, QRCodeApiError } from '../../api/qrCodeApi';
import QRCode from 'qrcode';

export class Step5Result implements WizardStep {
  private onRestart: (() => void) | null = null;

  constructor(onRestart?: () => void) {
    this.onRestart = onRestart || null;
  }

  getTitle(): string {
    return 'Generate QR Code';
  }

  render(data: WizardData): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container result-step';

    // Build params object for preview
    const params: QRCodeParams = {
      iban: data.iban!.replace(/\s/g, ''), // Remove all spaces from IBAN
    };

    // Add billerVAT if provided
    if (data.billerVAT?.trim()) {
      params.billerVAT = data.billerVAT.replace(/\s/g, ''); // Remove all spaces from VAT
    }

    // Add billerIdentificationNumber if provided
    if (data.billerIdentificationNumber?.trim()) {
      params.billerIdentificationNumber = data.billerIdentificationNumber.trim();
    }

    // Add communication
    if (data.creditorReference) {
      params.creditorReference = data.creditorReference.replace(/\s/g, ''); // Remove all spaces from reference
    } else if (data.remittanceInfo) {
      params.remittanceInfo = data.remittanceInfo;
    }

    // Add optional fields
    if (data.amount) params.amount = data.amount;
    if (data.language) params.language = data.language;
    if (data.size) params.size = data.size;
    if (data.paymentInternalId) params.paymentInternalId = data.paymentInternalId;
    if (data.multiple !== undefined) params.multiple = data.multiple;
    if (data.paymentMethod) params.paymentMethod = data.paymentMethod;
    if (data.allowedPaymentMethods) params.allowedPaymentMethods = data.allowedPaymentMethods;

    // Generate preview URL (pay-button/execute URL)
    const previewUrl = buildPreviewUrl(params, data.environment || 'test');

    // Check if credentials are provided
    const hasCredentials = data.credentials?.username && data.credentials?.password;

    container.innerHTML = `
      <h2>${this.getTitle()}</h2>
      <p class="step-description">Review and generate your QR code</p>

      <div id="summary" class="summary-box">
        <h3>Summary</h3>
        <dl>
          <dt>IBAN:</dt>
          <dd>${data.iban}</dd>
          ${data.billerVAT ? `<dt>Biller VAT:</dt><dd>${data.billerVAT}</dd>` : ''}
          ${data.billerIdentificationNumber ? `<dt>Biller ID:</dt><dd>${data.billerIdentificationNumber}</dd>` : ''}
          ${data.amount ? `<dt>Amount:</dt><dd>${data.amount} EUR</dd>` : ''}
          ${data.creditorReference ? `<dt>Reference:</dt><dd>${data.creditorReference}</dd>` : ''}
          ${data.remittanceInfo ? `<dt>Message:</dt><dd>${data.remittanceInfo}</dd>` : ''}
          ${data.language ? `<dt>Language:</dt><dd>${data.language.toUpperCase()}</dd>` : ''}
          ${data.multiple ? `<dt>Multiple Payments:</dt><dd>Yes</dd>` : ''}
          ${data.paymentInternalId ? `<dt>Payment ID:</dt><dd>${data.paymentInternalId}</dd>` : ''}
          ${data.paymentMethod ? `<dt>Payment Method:</dt><dd>${data.paymentMethod}</dd>` : ''}
          ${data.allowedPaymentMethods ? `<dt>Allowed Methods:</dt><dd>${data.allowedPaymentMethods}</dd>` : ''}
        </dl>
      </div>

      <div class="url-preview-box">
        <h3>Payment URL (pay-button/execute)</h3>
        <div class="url-display">
          <code id="api-url">${previewUrl}</code>
          <button id="copy-url-btn" class="btn btn-secondary" title="Copy URL">Copy</button>
        </div>
        <small>This URL will be shortened and encoded into a QR code</small>
      </div>

      ${!hasCredentials ? `
        <div class="error-box">
          <h4>API Credentials Required</h4>
          <p>Please enter your API username and password in the header above to generate the QR code.</p>
        </div>
      ` : ''}

      <div class="action-buttons">
        <button id="generate-btn" class="btn btn-primary" ${!hasCredentials ? 'disabled' : ''}>
          Generate QR Code
        </button>
      </div>

      <div id="loading" class="loading" style="display: none;">
        <div class="spinner"></div>
        <p>Creating short link and generating QR code...</p>
      </div>

      <div id="result" class="result-container" style="display: none;">
        <h3>Your QR Code</h3>
        <div id="short-url-display" class="url-preview-box" style="margin-bottom: 1rem;">
          <h4>Short URL:</h4>
          <div class="url-display">
            <code id="short-url"></code>
            <button id="copy-short-url-btn" class="btn btn-secondary">Copy</button>
          </div>
        </div>
        <div id="qr-preview" class="qr-preview"></div>
        <div class="result-actions">
          <button id="download-btn" class="btn btn-success">Download QR Code</button>
          <button id="restart-btn" class="btn btn-secondary">Generate Another</button>
        </div>
      </div>

      <div id="error" class="error-box" style="display: none;"></div>
    `;

    // Add copy URL button event listener
    const copyUrlBtn = container.querySelector('#copy-url-btn') as HTMLButtonElement;
    copyUrlBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(previewUrl).then(() => {
        const originalText = copyUrlBtn.textContent;
        copyUrlBtn.textContent = 'Copied!';
        copyUrlBtn.classList.add('btn-success');
        copyUrlBtn.classList.remove('btn-secondary');
        setTimeout(() => {
          copyUrlBtn.textContent = originalText;
          copyUrlBtn.classList.remove('btn-success');
          copyUrlBtn.classList.add('btn-secondary');
        }, 2000);
      }).catch((err) => {
        console.error('Failed to copy URL:', err);
        alert('Failed to copy URL to clipboard');
      });
    });

    // Add event listener for generate button
    const generateBtn = container.querySelector('#generate-btn') as HTMLButtonElement;
    const loading = container.querySelector('#loading') as HTMLElement;
    const result = container.querySelector('#result') as HTMLElement;
    const errorBox = container.querySelector('#error') as HTMLElement;
    const qrPreview = container.querySelector('#qr-preview') as HTMLElement;

    if (hasCredentials) {
      generateBtn.addEventListener('click', async () => {
        generateBtn.disabled = true;
        loading.style.display = 'block';
        result.style.display = 'none';
        errorBox.style.display = 'none';

        try {
          // Build params object
          const params: QRCodeParams = {
            iban: data.iban!.replace(/\s/g, ''),
          };

          // Add billerVAT if provided
          if (data.billerVAT?.trim()) {
            params.billerVAT = data.billerVAT.replace(/\s/g, '');
          }

          // Add billerIdentificationNumber if provided
          if (data.billerIdentificationNumber?.trim()) {
            params.billerIdentificationNumber = data.billerIdentificationNumber.trim();
          }

          // Add communication
          if (data.creditorReference) {
            params.creditorReference = data.creditorReference.replace(/\s/g, '');
          } else if (data.remittanceInfo) {
            params.remittanceInfo = data.remittanceInfo;
          }

          // Add optional fields
          if (data.amount) params.amount = data.amount;
          if (data.language) params.language = data.language;
          if (data.size) params.size = data.size;
          if (data.paymentInternalId) params.paymentInternalId = data.paymentInternalId;
          if (data.multiple !== undefined) params.multiple = data.multiple;
          if (data.paymentMethod) params.paymentMethod = data.paymentMethod;
          if (data.allowedPaymentMethods) params.allowedPaymentMethods = data.allowedPaymentMethods;

          // Generate short link
          const shortUrl = await generateQRCodeLink(
            params,
            data.environment || 'test',
            data.credentials!.username,
            data.credentials!.password
          );

          // Display short URL
          const shortUrlElement = container.querySelector('#short-url') as HTMLElement;
          shortUrlElement.textContent = shortUrl;

          // Add copy short URL button
          const copyShortUrlBtn = container.querySelector('#copy-short-url-btn') as HTMLButtonElement;
          copyShortUrlBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shortUrl).then(() => {
              const originalText = copyShortUrlBtn.textContent;
              copyShortUrlBtn.textContent = 'Copied!';
              copyShortUrlBtn.classList.add('btn-success');
              copyShortUrlBtn.classList.remove('btn-secondary');
              setTimeout(() => {
                copyShortUrlBtn.textContent = originalText;
                copyShortUrlBtn.classList.remove('btn-success');
                copyShortUrlBtn.classList.add('btn-secondary');
              }, 2000);
            });
          });

          // Generate QR code from short URL using qrcode library
          const qrCanvas = document.createElement('canvas');
          await QRCode.toCanvas(qrCanvas, shortUrl, {
            width: data.size || 400,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#FFFFFF',
            },
          });

          // Display the QR code
          qrPreview.innerHTML = '';
          qrPreview.appendChild(qrCanvas);

          loading.style.display = 'none';
          result.style.display = 'block';
          generateBtn.style.display = 'none';

          // Setup download button
          const downloadBtn = container.querySelector('#download-btn') as HTMLButtonElement;
          downloadBtn.addEventListener('click', () => {
            // Convert canvas to blob and download
            qrCanvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `qr-code-${new Date().toISOString().split('T')[0]}.png`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }
            });
          });

          // Setup restart button
          const restartBtn = container.querySelector('#restart-btn') as HTMLButtonElement;
          restartBtn.addEventListener('click', () => {
            if (this.onRestart) {
              this.onRestart();
            }
          });
        } catch (error) {
          loading.style.display = 'none';
          generateBtn.disabled = false;
          errorBox.style.display = 'block';

          if (error instanceof QRCodeApiError) {
            errorBox.innerHTML = `
              <h4>Error Generating QR Code</h4>
              <p>${error.message}</p>
              ${error.statusCode ? `<p class="error-code">Status Code: ${error.statusCode}</p>` : ''}
              ${error.statusCode === 401 ? '<p><strong>Check your API credentials in the header above.</strong></p>' : ''}
            `;
          } else {
            errorBox.innerHTML = `
              <h4>Unexpected Error</h4>
              <p>${error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            `;
          }
        }
      });
    }

    return container;
  }

  validate(_data: WizardData): { valid: boolean; errors: string[] } {
    // No validation needed for result step
    return {
      valid: true,
      errors: [],
    };
  }

  collectData(_container: HTMLElement): Partial<WizardData> {
    // No data to collect from result step
    return {};
  }
}
