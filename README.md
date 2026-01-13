# QR Code Generator

A web utility to generate payment QR codes using the DigiTeal API.

## Features

- 5-step wizard interface for easy QR code generation
- Required fields validation (Biller Name, IBAN, Biller VAT, Format, Communication)
- Optional payment details (Amount, Currency, Dates, etc.)
- Optional debtor/customer information
- Configurable display settings (Size, Language, Environment)
- Real-time form validation
- Download generated QR codes as PNG images
- Responsive design for mobile and desktop

## Technology Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Vanilla JavaScript** - No frameworks (React, Vue, etc.)
- **CSS** - Custom styling without frameworks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173/`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

### Step 1: Required Information
Fill in the mandatory fields:
- **Biller Name**: Your company/organization name
- **IBAN**: Bank account number (validated)
- **Biller VAT**: VAT number with country code (validated)
- **Format**: Choose the QR code format (QR, QR_BE, QR_NL, etc.)
- **Communication**: Either structured reference or unstructured message (required)

### Step 2: Payment Details (Optional)
Add optional payment information:
- Amount and currency
- Bill date and due date
- Bill ID, BIC, Purpose

### Step 3: Debtor Information (Optional)
Add customer/debtor details:
- Name, email, phone, VAT
- Full address information

### Step 4: Display Settings (Optional)
Configure the output:
- Environment (Test or Production)
- QR code size (250-4000px)
- Language (English, French, Dutch)
- Multiple payments option

### Step 5: Generate & Download
- Review your information
- Click "Generate QR Code"
- Download the generated image
- Start over to generate another code

## API Integration

The application uses the DigiTeal API:
- **Test Environment**: `https://test.digiteal.eu`
- **Production Environment**: `https://app.digiteal.eu`
- **Endpoint**: `/api/v1/image-request/slip-image-anonymous`

See `qrcodes-openapi.json` for full API documentation.

## Project Structure

```
qrcode-util/
├── src/
│   ├── api/
│   │   └── qrCodeApi.ts          # API client
│   ├── utils/
│   │   └── validation.ts         # Form validation
│   ├── wizard/
│   │   ├── Wizard.ts             # Main wizard controller
│   │   ├── StepInterface.ts      # Step interface definition
│   │   └── steps/
│   │       ├── Step1Required.ts   # Required fields
│   │       ├── Step2Payment.ts    # Payment details
│   │       ├── Step3Debtor.ts     # Debtor info
│   │       ├── Step4Settings.ts   # Settings
│   │       └── Step5Result.ts     # Result & download
│   ├── types.ts                  # TypeScript type definitions
│   ├── main.ts                   # Entry point
│   └── vite-env.d.ts            # Vite type declarations
├── styles/
│   ├── main.css                  # Base styles
│   └── wizard.css                # Wizard-specific styles
├── index.html                    # HTML entry point
├── package.json
├── tsconfig.json
└── README.md
```

## Validation

The application includes validation for:
- IBAN (with mod-97 check)
- BIC/SWIFT codes
- VAT numbers
- Email addresses
- Phone numbers (international format)
- Structured references (Belgian BBA and ISO)
- Amounts and dates

## Browser Support

Modern browsers with ES2020 support:
- Chrome 80+
- Firefox 72+
- Safari 13.1+
- Edge 80+

## License

Private project for DigiTeal integration.
