import { WizardStep } from '../StepInterface';
import { WizardData, Language, PaymentMethod } from '../../types';
import { validateIBAN, validateVAT } from '../../utils/validation';

export class Step1Required implements WizardStep {
  getTitle(): string {
    return 'Payment Information';
  }

  render(data: WizardData): HTMLElement {
    const container = document.createElement('div');
    container.className = 'step-container';

    container.innerHTML = `
      <h2>${this.getTitle()}</h2>
      <p class="step-description">Fill in the payment details</p>

      <h3>Requester Information</h3>

      <div class="form-group">
        <label for="iban">
          IBAN <span class="required">*</span>
        </label>
        <input
          type="text"
          id="iban"
          name="iban"
          value="${data.iban || ''}"
          placeholder="e.g., BE40251230861709"
          required
        />
        <small>International Bank Account Number</small>
        <div class="error-message" id="iban-error"></div>
      </div>

      <div class="form-group">
        <label for="billerVAT">
          Biller VAT <span class="required">*</span>
        </label>
        <input
          type="text"
          id="billerVAT"
          name="billerVAT"
          value="${data.billerVAT || ''}"
          placeholder="e.g., BE0000000196"
        />
        <small>VAT number with country code (at least one of VAT or ID Number required)</small>
        <div class="error-message" id="billerVAT-error"></div>
      </div>

      <div class="form-group">
        <label for="billerIdentificationNumber">
          Biller Identification Number <span class="required">*</span>
        </label>
        <input
          type="text"
          id="billerIdentificationNumber"
          name="billerIdentificationNumber"
          value="${data.billerIdentificationNumber || ''}"
          placeholder="e.g., BE:VAT:BE0000000097"
        />
        <small>Company identification number (at least one of VAT or ID Number required)</small>
      </div>

      <h3>Payment Details</h3>

      <div class="form-group">
        <label for="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value="${data.amount || ''}"
          placeholder="e.g., 1234.50"
          step="0.01"
          min="0"
        />
        <small>Amount to be paid in EUR</small>
      </div>

      <div class="form-group">
        <label>
          Communication <span class="required">*</span>
        </label>
        <p class="field-note">At least one communication method is required</p>

        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              name="communicationType"
              value="structured"
              ${!data.communicationType || data.communicationType === 'structured' ? 'checked' : ''}
            />
            Structured Reference
          </label>
          <label class="radio-label">
            <input
              type="radio"
              name="communicationType"
              value="unstructured"
              ${data.communicationType === 'unstructured' ? 'checked' : ''}
            />
            Unstructured Message
          </label>
        </div>

        <div id="structured-field" class="conditional-field">
          <label for="creditorReference">Structured Reference</label>
          <input
            type="text"
            id="creditorReference"
            name="creditorReference"
            value="${data.creditorReference || ''}"
            placeholder="e.g., +++000/6002/32562+++"
          />
          <small>Structured reference (Belgian BBA format or ISO)</small>
          <div class="error-message" id="creditorReference-error"></div>
        </div>

        <div id="unstructured-field" class="conditional-field" style="display: none;">
          <label for="remittanceInfo">Unstructured Message</label>
          <input
            type="text"
            id="remittanceInfo"
            name="remittanceInfo"
            value="${data.remittanceInfo || ''}"
            placeholder="e.g., Invoice 1234"
          />
          <small>Free text communication</small>
        </div>
      </div>

      <h3>Additional Settings</h3>

      <div class="form-group">
        <label for="language">Language</label>
        <select id="language" name="language">
          <option value="">Default</option>
          <option value="en" ${data.language === 'en' ? 'selected' : ''}>English</option>
          <option value="fr" ${data.language === 'fr' ? 'selected' : ''}>French</option>
          <option value="nl" ${data.language === 'nl' ? 'selected' : ''}>Dutch</option>
        </select>
        <small>Language for the payment page (EN, NL, or FR)</small>
      </div>

      <div class="form-group">
        <label class="checkbox-label">
          <input
            type="checkbox"
            id="multiple"
            name="multiple"
            ${data.multiple !== false ? 'checked' : ''}
          />
          Accept Multiple Payments
        </label>
        <small>Allow this QR code to be used for multiple payments</small>
      </div>

      <div class="form-group">
        <label for="paymentInternalId">Payment Internal ID</label>
        <input
          type="text"
          id="paymentInternalId"
          name="paymentInternalId"
          value="${data.paymentInternalId || ''}"
          placeholder="e.g., PAY123456"
        />
        <small>Your internal identifier for this payment</small>
      </div>

      <div class="form-group">
        <label for="paymentMethod">Payment Method</label>
        <select id="paymentMethod" name="paymentMethod">
          <option value="">All available methods</option>
          <option value="DIGITEAL_STANDARD" ${data.paymentMethod === 'DIGITEAL_STANDARD' ? 'selected' : ''}>DigiTeal Standard</option>
          <option value="PIS_STANDARD" ${data.paymentMethod === 'PIS_STANDARD' ? 'selected' : ''}>Payment Initiation Service (PIS)</option>
          <option value="BANCONTACT" ${data.paymentMethod === 'BANCONTACT' ? 'selected' : ''}>Bancontact</option>
          <option value="IDEAL" ${data.paymentMethod === 'IDEAL' ? 'selected' : ''}>iDEAL</option>
          <option value="VISA" ${data.paymentMethod === 'VISA' ? 'selected' : ''}>Visa</option>
          <option value="MASTERCARD" ${data.paymentMethod === 'MASTERCARD' ? 'selected' : ''}>Mastercard</option>
          <option value="CARTE_BLEUE" ${data.paymentMethod === 'CARTE_BLEUE' ? 'selected' : ''}>Carte Bleue</option>
          <option value="MAESTRO" ${data.paymentMethod === 'MAESTRO' ? 'selected' : ''}>Maestro</option>
          <option value="PAYCONIQ" ${data.paymentMethod === 'PAYCONIQ' ? 'selected' : ''}>Payconiq</option>
        </select>
        <small>Force a specific payment method (leave empty to allow all)</small>
      </div>

      <div class="form-group">
        <label for="allowedPaymentMethods">Allowed Payment Methods</label>
        <input
          type="text"
          id="allowedPaymentMethods"
          name="allowedPaymentMethods"
          value="${data.allowedPaymentMethods || ''}"
          placeholder="e.g., VISA,MASTERCARD,BANCONTACT"
        />
        <small>Comma-separated list of allowed payment methods (leave empty to allow all)</small>
      </div>

      <div class="form-group">
        <label for="size">QR Code Size: <span id="size-value">${data.size || 400}</span>px</label>
        <input
          type="range"
          id="size"
          name="size"
          min="250"
          max="4000"
          value="${data.size || 400}"
          step="50"
        />
        <small>Width of the generated QR code (250-4000px)</small>
      </div>
    `;

    // Add event listeners for communication type toggle
    const structuredRadio = container.querySelector('input[value="structured"]') as HTMLInputElement;
    const unstructuredRadio = container.querySelector('input[value="unstructured"]') as HTMLInputElement;
    const structuredField = container.querySelector('#structured-field') as HTMLElement;
    const unstructuredField = container.querySelector('#unstructured-field') as HTMLElement;

    const toggleCommunicationFields = () => {
      if (structuredRadio.checked) {
        structuredField.style.display = 'block';
        unstructuredField.style.display = 'none';
      } else {
        structuredField.style.display = 'none';
        unstructuredField.style.display = 'block';
      }
    };

    structuredRadio.addEventListener('change', toggleCommunicationFields);
    unstructuredRadio.addEventListener('change', toggleCommunicationFields);

    // Add real-time validation for IBAN
    const ibanInput = container.querySelector('#iban') as HTMLInputElement;
    const ibanError = container.querySelector('#iban-error') as HTMLElement;
    ibanInput.addEventListener('blur', () => {
      if (ibanInput.value && !validateIBAN(ibanInput.value)) {
        ibanError.textContent = 'Invalid IBAN format';
        ibanInput.classList.add('invalid');
      } else {
        ibanError.textContent = '';
        ibanInput.classList.remove('invalid');
      }
    });

    // Add real-time validation for VAT
    const vatInput = container.querySelector('#billerVAT') as HTMLInputElement;
    const vatError = container.querySelector('#billerVAT-error') as HTMLElement;
    vatInput.addEventListener('blur', () => {
      if (vatInput.value && !validateVAT(vatInput.value)) {
        vatError.textContent = 'Invalid VAT format (should include country code)';
        vatInput.classList.add('invalid');
      } else {
        vatError.textContent = '';
        vatInput.classList.remove('invalid');
      }
    });

    // Add event listener to update size display
    const sizeInput = container.querySelector('#size') as HTMLInputElement;
    const sizeValue = container.querySelector('#size-value') as HTMLElement;
    sizeInput.addEventListener('input', () => {
      sizeValue.textContent = sizeInput.value;
    });

    return container;
  }

  validate(data: WizardData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.iban?.trim()) {
      errors.push('IBAN is required');
    } else if (!validateIBAN(data.iban)) {
      errors.push('Invalid IBAN format');
    }

    // At least one of billerVAT or billerIdentificationNumber is required
    if (!data.billerVAT?.trim() && !data.billerIdentificationNumber?.trim()) {
      errors.push('Either Biller VAT or Biller Identification Number is required');
    }

    // billerVAT is optional, but validate format if provided
    if (data.billerVAT?.trim() && !validateVAT(data.billerVAT)) {
      errors.push('Invalid VAT format');
    }

    // Check that at least one communication method is provided
    if (!data.creditorReference?.trim() && !data.remittanceInfo?.trim()) {
      errors.push('Either structured reference or unstructured message is required');
    }

    // Check that API credentials are provided
    if (!data.credentials?.username?.trim() || !data.credentials?.password?.trim()) {
      errors.push('API credentials (username and password) are required. Please fill them in the header.');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  collectData(container: HTMLElement): Partial<WizardData> {
    const iban = (container.querySelector('#iban') as HTMLInputElement).value.trim();
    const billerVAT = (container.querySelector('#billerVAT') as HTMLInputElement).value.trim();
    const billerIdentificationNumber = (container.querySelector('#billerIdentificationNumber') as HTMLInputElement).value.trim();
    const amountValue = (container.querySelector('#amount') as HTMLInputElement).value;
    const amount = amountValue ? parseFloat(amountValue) : undefined;
    const communicationType = (container.querySelector('input[name="communicationType"]:checked') as HTMLInputElement)?.value as 'structured' | 'unstructured';
    const creditorReference = (container.querySelector('#creditorReference') as HTMLInputElement)?.value.trim();
    const remittanceInfo = (container.querySelector('#remittanceInfo') as HTMLInputElement)?.value.trim();
    const language = (container.querySelector('#language') as HTMLSelectElement).value as Language || undefined;
    const multiple = (container.querySelector('#multiple') as HTMLInputElement).checked;
    const paymentInternalId = (container.querySelector('#paymentInternalId') as HTMLInputElement).value.trim() || undefined;
    const paymentMethod = (container.querySelector('#paymentMethod') as HTMLSelectElement).value as PaymentMethod || undefined;
    const allowedPaymentMethods = (container.querySelector('#allowedPaymentMethods') as HTMLInputElement).value.trim() || undefined;
    const size = parseInt((container.querySelector('#size') as HTMLInputElement).value, 10);

    return {
      iban,
      billerVAT,
      billerIdentificationNumber,
      amount,
      communicationType,
      creditorReference: communicationType === 'structured' ? creditorReference : undefined,
      remittanceInfo: communicationType === 'unstructured' ? remittanceInfo : undefined,
      language,
      multiple,
      paymentInternalId,
      paymentMethod,
      allowedPaymentMethods,
      size,
    };
  }
}
