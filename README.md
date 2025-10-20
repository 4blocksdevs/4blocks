# 4Blocks Lead Generation Website

A comprehensive Next.js lead generation website for downloading MVP roadmap PDFs with full tracking, CRM integration, and GDPR compliance.

## Features

### 🎯 Core Functionality
- **Landing Page**: Professional lead capture form with instant PDF download
- **Thank You Page**: Embedded Calendly integration for booking consultations
- **GDPR Compliance**: Cookie banner with granular consent management
- **CRM Integration**: Ready for HubSpot, ActiveCampaign, or Mailchimp
- **Email Automation**: Automatic PDF delivery and lead nurturing

### 📊 Analytics & Tracking
- **Google Analytics 4**: Comprehensive website analytics
- **Meta Pixel**: Facebook/Instagram advertising and retargeting
- **Google Tag Manager**: Advanced event tracking
- **Custom Events**: Download, Lead, and Schedule tracking

### 🛡️ Compliance & Legal
- **GDPR Cookie Banner**: Granular consent management
- **Privacy Policy**: Comprehensive data protection policy
- **Terms & Conditions**: Legal terms for service usage
- **Cookies Policy**: Detailed cookie usage explanation

### 🎨 Design & UX
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Accessibility**: WCAG compliant with proper ARIA labels and contrast
- **Modern UI**: Clean design with smooth animations and micro-interactions
- **Performance**: Optimized images and fast loading times

## Setup Instructions

### 1. Environment Variables
Create a `.env.local` file and add your API keys:

```bash
# CRM Integration (choose one)
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
ACTIVECAMPAIGN_URL=your_ac_url
ACTIVECAMPAIGN_API_KEY=your_ac_key
MAILCHIMP_API_KEY=your_mailchimp_key
MAILCHIMP_DC=your_mailchimp_dc
MAILCHIMP_LIST_ID=your_list_id

# Email Service (choose one)
SENDGRID_API_KEY=your_sendgrid_key
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_mailgun_domain

# Analytics
GA_MEASUREMENT_ID=your_ga4_id
GTM_ID=your_gtm_id
META_PIXEL_ID=your_pixel_id
```

### 2. Replace Placeholder IDs
Update the following files with your actual IDs:

- `app/layout.tsx`: Replace GTM-XXXXXX and GA_MEASUREMENT_ID
- `components/CookieBanner.tsx`: Replace YOUR_PIXEL_ID
- `app/api/submit-lead/route.ts`: Uncomment and configure your CRM integration

### 3. Add Your PDF
Replace `public/mvp-roadmap.pdf` with your actual MVP roadmap PDF.

### 4. Calendly Integration
In `app/thank-you/page.tsx`, replace the Calendly placeholder with your actual embed code:

```javascript
<div 
  className="calendly-inline-widget" 
  data-url="https://calendly.com/your-username/30min"
  style={{minWidth: '320px', height: '400px'}}
></div>
```

### 5. SEO Assets
Add the following files to the `public/` directory:
- `og-image.jpg` (1200x630px for social sharing)
- `favicon.ico`
- `logo.png`

## CRM Integration Examples

### HubSpot
```typescript
const hubspotResponse = await fetch('https://api.hubapi.com/contacts/v1/contact/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`
  },
  body: JSON.stringify({
    properties: [
      { property: 'email', value: email },
      { property: 'firstname', value: name.split(' ')[0] },
      { property: 'lead_source', value: source }
    ]
  })
});
```

### ActiveCampaign
```typescript
const acResponse = await fetch(`${process.env.ACTIVECAMPAIGN_URL}/api/3/contacts`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Api-Token': process.env.ACTIVECAMPAIGN_API_KEY
  },
  body: JSON.stringify({
    contact: {
      email: email,
      firstName: name.split(' ')[0]
    }
  })
});
```

## Email Integration

### SendGrid Example
```typescript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: email,
  from: 'info@4blocks.xyz',
  subject: 'Your MVP Roadmap is Here! 🚀',
  attachments: [{
    filename: 'MVP-Roadmap-4Blocks.pdf',
    type: 'application/pdf',
    disposition: 'attachment'
  }]
};

await sgMail.send(msg);
```

## Tracking Events

The website automatically tracks these events:
- **PageView**: When users visit any page
- **Lead**: When someone submits the lead form
- **Download**: When PDF download is triggered
- **Schedule**: When Calendly booking is initiated

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

This website is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

## Legal Compliance

### GDPR Compliance Features:
- Cookie consent banner with granular controls
- Privacy policy with data processing details
- Right to withdraw consent
- Data subject rights information

### CCPA Compliance Features:
- "Do Not Sell My Personal Information" opt-out
- California consumer rights disclosure
- Personal information categories disclosure

## Performance Optimization

- **Next.js Image**: Optimized image loading
- **Static Generation**: Pre-built pages for faster loading
- **Font Optimization**: Google Fonts with display swap
- **CSS Optimization**: Tailwind CSS with purging
- **Bundle Analysis**: Optimized JavaScript bundles

## Accessibility Features

- **Semantic HTML**: Proper heading structure and landmarks
- **ARIA Labels**: Screen reader friendly
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: WCAG AA compliant contrast ratios
- **Alt Text**: Descriptive image alt attributes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Support

For support or questions, contact info@4blocks.xyz