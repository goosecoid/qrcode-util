import { QRCodeParams } from '../types';

const BASE_URLS = {
  test: 'https://test.digiteal.eu',
  production: 'https://app.digiteal.eu',
};

// In development mode, use proxy to avoid CORS issues
const DEV_PROXY_URLS = {
  test: '/proxy/test',
  production: '/proxy/production',
};

function getBaseUrl(environment: 'test' | 'production'): string {
  // Use proxy in development mode
  if (import.meta.env.DEV) {
    return DEV_PROXY_URLS[environment];
  }
  // Use direct URLs in production
  return BASE_URLS[environment];
}

export class QRCodeApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'QRCodeApiError';
  }
}

/**
 * Builds the pay-button/execute URL with query parameters
 */
export function buildPayButtonUrl(
  params: QRCodeParams,
  environment: 'test' | 'production' = 'test'
): string {
  const baseUrl = BASE_URLS[environment];
  const url = new URL('/api/v1/payment-request/pay-button/execute', baseUrl);

  // Map our params to pay-button parameters according to OpenAPI spec
  // Required/main parameters
  if (params.iban) url.searchParams.append('iban', params.iban);
  if (params.billerVAT) url.searchParams.append('requesterVAT', params.billerVAT);
  if (params.billerIdentificationNumber) url.searchParams.append('requesterIdentificationNumber', params.billerIdentificationNumber);

  // Amount in cents (convert from euros)
  if (params.amount) {
    const amountInCents = Math.round(params.amount * 100);
    url.searchParams.append('amountInCents', String(amountInCents));
  }

  // Communication (creditorReference or remittanceInfo)
  if (params.creditorReference) {
    url.searchParams.append('creditorReference', params.creditorReference);
  } else if (params.remittanceInfo) {
    url.searchParams.append('remittanceInfo', params.remittanceInfo);
  }

  // Language (EN, NL, or FR)
  if (params.language) {
    url.searchParams.append('language', params.language.toUpperCase());
  }

  // Payment settings
  if (params.multiple !== undefined) {
    url.searchParams.append('multiple', String(params.multiple));
  }
  if (params.paymentInternalId) {
    url.searchParams.append('paymentInternalId', params.paymentInternalId);
  }
  if (params.paymentMethod) {
    url.searchParams.append('paymentMethod', params.paymentMethod);
  }
  if (params.allowedPaymentMethods) {
    url.searchParams.append('allowedPaymentMethods', params.allowedPaymentMethods);
  }

  return url.toString();
}

/**
 * Creates a short link using the shortLink API with Basic Auth
 */
export async function createShortLink(
  longUrl: string,
  environment: 'test' | 'production',
  username: string,
  password: string
): Promise<string> {
  const baseUrl = getBaseUrl(environment);
  const url = import.meta.env.DEV
    ? `${window.location.origin}${baseUrl}/api/v1/shortLink`
    : `${baseUrl}/api/v1/shortLink`;

  // Create Basic Auth header
  const authHeader = 'Basic ' + btoa(`${username}:${password}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({ longURL: longUrl }),
    });

    if (!response.ok) {
      let errorMessage = `Failed to create short link (${response.status})`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        const text = await response.text();
        if (text) errorMessage = text;
      }

      throw new QRCodeApiError(errorMessage, response.status);
    }

    const data = await response.json();
    return data.shortURL;
  } catch (error) {
    if (error instanceof QRCodeApiError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new QRCodeApiError('Network error: Please check your connection');
    }

    throw new QRCodeApiError(
      `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Main function to generate QR code payment link
 * Returns the short URL that can be used to generate a QR code client-side
 */
export async function generateQRCodeLink(
  params: QRCodeParams,
  environment: 'test' | 'production',
  username: string,
  password: string
): Promise<string> {
  // Step 1: Build the pay-button/execute URL
  const payButtonUrl = buildPayButtonUrl(params, environment);

  // Step 2: Create short link
  const shortUrl = await createShortLink(payButtonUrl, environment, username, password);

  return shortUrl;
}

// Keep for preview purposes
export function buildPreviewUrl(
  params: QRCodeParams,
  environment: 'test' | 'production' = 'test'
): string {
  return buildPayButtonUrl(params, environment);
}
