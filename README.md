# Adinkra Frontiers Ltd – Official Website

> **Slogan:** *Expanding the frontiers of poultry agribusiness*  
> **Location:** Sanfo/Aduam, Behind Manale Rest Stop, Ghana  
> **Telephone:** [+233 24 490 2287](tel:+233244902287)  
> **Official Email:** [info@adinkra.biz](mailto:info@adinkra.biz)  
> **WhatsApp:** [wa.me/233244902287](https://wa.me/233244902287)

---

## 1. Overview & Brand Identity

This repository contains the complete, modern, responsive, and production-ready web application for **Adinkra Frontiers Ltd**, built with **React 19**, **TypeScript**, and **Tailwind CSS**.

### Official Brand Palette
- **Royal Blue:** `#0738A6` (Primary action points, headlines, emblem)
- **Deep Navy:** `#082B66` (Structural surfaces, dark accents, footer background)
- **Golden Orange:** `#F5A300` (Agribusiness horizon accent, highlights)
- **Warm Cream:** `#FFF8ED` (Warm, natural eggshell background canvas)
- **White:** `#FFFFFF` (Card surfaces, clean containers)
- **Dark Text:** `#172033` (High-contrast, accessible typography)

---

## 2. Project Architecture & Source Files

```
├── public/
│   ├── logo.svg              # Official vector brand logo
│   ├── logo-white.svg        # White inverted vector logo for dark backgrounds
│   ├── robots.txt            # Search engine crawler permissions
│   └── sitemap.xml           # XML sitemap for SEO indexation
├── src/
│   ├── assets/
│   │   └── images/           # High-resolution agricultural imagery assets
│   ├── api/
│   │   └── contactHandler.ts # Secure backend contact validator, rate limiter & email dispatcher
│   ├── components/
│   │   ├── Logo.tsx          # Responsive brand emblem & typography lockup
│   │   ├── Navbar.tsx        # Sticky 3-zone navigation bar with mobile drawer & Order CTA
│   │   ├── Hero.tsx          # Hero banner with Ghanaian farm photo, CTAs, and service cards
│   │   ├── AboutUs.tsx       # Editable company overview, Mission, Vision, and 6 Values
│   │   ├── Products.tsx      # Fresh Table Eggs, Quality Poultry Products, Consistent Farm Supply
│   │   ├── WhyChooseUs.tsx   # 5 factual and reasonable commitment points
│   │   ├── Gallery.tsx       # 5-category production gallery with Lightbox modal
│   │   ├── ContactSection.tsx# Secure contact form with honeypot, validation, & direct buttons
│   │   ├── Footer.tsx        # Company info, quick links, placeholders, & dynamic copyright year
│   │   ├── FloatingWhatsApp.tsx # Floating WhatsApp quick-connect button
│   │   └── BackToTop.tsx     # Smooth scroll to top button
│   ├── types.ts              # TypeScript schemas for forms, gallery, and agribusiness data
│   ├── App.tsx               # Main application container
│   ├── index.css             # Tailwind v4 theme variables and font configurations
│   └── main.tsx              # React DOM entry point
├── api/
│   └── contact.ts            # Serverless function endpoint for Vercel / Firebase App Hosting
├── server.ts                 # Production Express Node.js server for containerized environments
├── .env.example              # Environment variables template
├── index.html                # SEO metadata, Open Graph, Twitter cards, and Schema.org JSON-LD
├── package.json              # Project dependencies and run scripts
└── vite.config.ts            # Vite build configuration with development contact API middleware
```

---

## 3. Installation & Local Testing

### Prerequisites
- Node.js version 18.x or higher
- npm or yarn

### Steps to Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```
   *(By default, development mode runs without an external email key and logs formatted emails to your terminal).*

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify Type-Checking and Build:**
   ```bash
   npm run lint
   npm run build
   ```

---

## 4. Secure Contact Form & Email Delivery

The contact form is engineered for security and reliability:

- **Destination:** Submissions are routed to `info@adinkra.biz`.
- **Reply-To:** The visitor's email address is automatically designated as the `Reply-To` address, allowing direct replies with one click.
- **Honeypot Spam Protection:** Hidden input fields silently trap automated bot submissions without disrupting human visitors.
- **Rate Limiting:** Enforces a maximum of 5 submissions per 10-minute window per IP to eliminate spam flooding.
- **Input Sanitization:** Strips HTML/script tags to prevent XSS and code injection.
- **Data Preservation:** If any validation error or network failure occurs, the visitor's entered data is preserved in the form fields.
- **Success Notice:** Displays:
  > *"Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible."*

### Email Provider Integration

To enable live email dispatch, add your credentials in `.env`:

#### Option A: Using Resend (Recommended)
1. Sign up at [resend.com](https://resend.com) and obtain an API key.
2. In `.env`:
   ```env
   EMAIL_API_KEY="re_your_api_key_here"
   OWNER_EMAIL="info@adinkra.biz"
   FROM_EMAIL="enquiries@yourdomain.com"
   ```

#### Option B: Using SendGrid
1. Generate an API Key at [sendgrid.com](https://sendgrid.com).
2. In `.env`:
   ```env
   EMAIL_API_KEY="SG.your_sendgrid_key"
   OWNER_EMAIL="info@adinkra.biz"
   FROM_EMAIL="enquiries@yourdomain.com"
   ```

---

## 5. How to Update Website Content

All copy and business information is stored in clean, editable data objects:

### Updating Overview, Mission, Vision, and Values
Open `src/components/AboutUs.tsx` and edit `companyOverviewData`:
```typescript
export const companyOverviewData = {
  title: 'About Adinkra Frontiers Ltd',
  overview: '...',
  mission: '...',
  vision: '...',
  values: [
    { title: 'Quality', description: '...' },
    // ...
  ]
};
```

### Updating Board of Directors & Management Team Profiles
In `src/components/AboutUs.tsx`, modify `companyOverviewData.teamMembers`:
- **Board of Directors:** Asare-Kyei Daniel (Founder), Richard (Co-founder)
- **Management Team:** Collins (CEO), Francis (Sales & Accounts), Frimpong (Farm Manager)
Each profile includes `name`, `role`, `category`, `focusArea`, `initials`, and a `summary` of their professional background. Visitors can filter profiles using the dropdown selector between **Board of Directors**, **Management Team**, or **All Team Members**.


### Updating Products & Services
Open `src/components/Products.tsx` to modify descriptions, features, or add official confirmed prices once established.

### Updating Contact Phone & Address
Company contact details are centralized in `src/components/ContactSection.tsx`, `src/components/Footer.tsx`, and `index.html` (Schema.org JSON-LD).

---

## 6. How to Replace Gallery Images

The gallery is categorized into 5 sections:
1. **Poultry Birds**
2. **Egg Production**
3. **Packaged Eggs**
4. **Farm Facilities**
5. **Staff & Operations**

### Steps:
1. Save your photograph in `src/assets/images/` or `public/images/`.
2. Open `src/components/Gallery.tsx`.
3. Update the `galleryItems` array with your new image import:
   ```typescript
   {
     id: 'gal-1',
     title: 'Daily Egg Production',
     category: 'Egg Production',
     image: myNewPhoto,
     alt: 'Descriptive alt text for SEO',
     description: 'Short caption explaining this photo.'
   }
   ```
4. The gallery and lightbox will automatically render the new photo with category filtering.

---

## 7. Deployment Instructions

### Deployment to Vercel
1. Push the code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel automatically detects the Vite frontend and the `/api/contact.ts` serverless function.
4. Add your environment variables in the Vercel Project Settings:
   - `EMAIL_API_KEY`
   - `OWNER_EMAIL` (`info@adinkra.biz`)
   - `FROM_EMAIL`
   - `SITE_URL`

### Deployment to Firebase App Hosting / Cloud Run
1. Run `npm run build` to generate the production client bundle in `dist/`.
2. Use `server.ts` as the production entrypoint:
   ```bash
   node --loader tsx server.ts
   ```
3. Set `PORT=8080` (or `3000`) and provide environment variables via the Cloud Run / Firebase secret manager.

---

## 8. Pre-Flight Production Readiness Checklist

| Requirement | Implementation Details | Status |
| :--- | :--- | :---: |
| **Brand Colors** | Royal Blue `#0738A6`, Golden Orange `#F5A300`, Deep Navy `#082B66`, Warm Cream `#FFF8ED`, White `#FFFFFF`, Dark Text `#172033` | Confirmed |
| **Official Logo** | Vector SVG emblem + typography lockup matching Adinkra motifs with no distortion | Confirmed |
| **Hero Section** | Brand lockup, slogan, Ghanaian farm photo, "Order Fresh Eggs", "Send an Enquiry", WhatsApp link, 3 service cards, intro paragraph | Confirmed |
| **About Us** | Factual company overview, Mission, Vision, and 6 editable Core Values | Confirmed |
| **Products** | Fresh Table Eggs, Quality Poultry Products, Consistent Farm Supply with respective CTAs | Confirmed |
| **Why Choose Us**| 5 reasonable and factual customer commitment points | Confirmed |
| **Gallery** | 5 categories, high-resolution photography, lightbox modal, and admin replacement guide | Confirmed |
| **Contact Page** | Direct links (Call Now, Send Email, WhatsApp Us, Google Maps Directions) | Confirmed |
| **Secure Form** | Full Name, Phone, Email, Subject, Enquiry Type, Message, Consent, Honeypot, Rate Limiting | Confirmed |
| **Direct Routing**| Enquiries delivered to `info@adinkra.biz` with visitor `Reply-To` | Confirmed |
| **Success / Error**| Standard success text displayed; inputs preserved on error | Confirmed |
| **SEO & Schema**| Page title, meta description, Open Graph, Twitter cards, robots.txt, sitemap.xml, Schema.org LocalBusiness | Confirmed |
| **Responsiveness** | Mobile hamburger menu, touch targets >= 44px, sticky cap <= 15%, fluid layouts | Confirmed |
