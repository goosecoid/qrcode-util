export type QRFormat =
  | 'PAYMENT_SLIP'
  | 'PAYMENT_SLIP_WITH_QR'
  | 'QR'
  | 'QR_BE'
  | 'QR_NL'
  | 'QR_EXPLAINED'
  | 'PAYMENT_SLIP_WITH_BANNER'
  | 'BANNER'
  | 'BANNER2'
  | 'BANNER3'
  | 'BANNER4'
  | 'BANNER5'
  | 'BANNER6'
  | 'QR_TEXT'
  | 'QR_URL'
  | 'NONE';

export type Language = 'en' | 'fr' | 'nl';

export type Currency = 'EUR' | 'USD' | 'GBP';

export type CommunicationType = 'structured' | 'unstructured';

export type PaymentMethod =
  | 'DIGITEAL_STANDARD'
  | 'PIS_STANDARD'
  | 'BANCONTACT'
  | 'IDEAL'
  | 'VISA'
  | 'MASTERCARD'
  | 'CARTE_BLEUE'
  | 'MAESTRO'
  | 'PAYCONIQ';

export interface QRCodeParams {
  // Required fields
  iban: string;

  // Optional requester information
  billerVAT?: string;
  billerIdentificationNumber?: string;

  // Communication (at least one required)
  creditorReference?: string;
  remittanceInfo?: string;

  // Optional payment details
  amount?: number;

  // Optional settings
  language?: Language;
  size?: number;
  paymentInternalId?: string;
  multiple?: boolean;
  paymentMethod?: PaymentMethod;
  allowedPaymentMethods?: string;
}

export interface WizardData extends Partial<QRCodeParams> {
  communicationType?: CommunicationType;
  environment?: 'test' | 'production';
  credentials?: {
    username: string;
    password: string;
  };
}
