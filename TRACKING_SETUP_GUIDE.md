# MVP Landing Page Tracking Setup - Complete Implementation Guide

## 🚀 Implementation Summary

Your MVP landing page now has comprehensive tracking implemented with:

- ✅ **HubSpot Forms Integration** (Form 1 & Form 2)
- ✅ **Meta Pixel Event Tracking**
- ✅ **UTM Parameter Capture & Attribution**
- ✅ **Google Analytics Enhanced Events**
- ✅ **Automated Lead Pipeline Assignment**

## 📋 Setup Checklist

### 1. HubSpot Configuration

**Status:** ⚠️ REQUIRED SETUP

**Action Items:**

1. **Get HubSpot Portal ID:**

   - Login to HubSpot
   - Go to Settings → Account & Billing → Account Information
   - Copy your Hub ID (Portal ID)

2. **Create Form 1 (Primary Lead Form):**

   - Go to Marketing → Lead Capture → Forms
   - Create new form with fields: `First Name`, `Email`, `Phone`, `Company`
   - Copy the Form ID from the embed code
   - Set up notifications and pipeline assignment

3. **Create Form 2 (Secondary CTA Form):**

   - Create another form with fields: `First Name`, `Email`
   - Copy the Form ID
   - Configure for same or separate pipeline

4. **Update Configuration:**
   ```typescript
   // In lib/tracking-config.ts, replace:
   hubspot: {
     portalId: 'YOUR_ACTUAL_PORTAL_ID',
     form1Id: 'YOUR_FORM_1_ID',
     form2Id: 'YOUR_FORM_2_ID',
   }
   ```

### 2. Meta Pixel Configuration

**Status:** ✅ IMPLEMENTED (using existing ID: 4277236155853060)

**Verification:**

- Meta Pixel is already configured in layout.tsx
- Events will fire for: PageView, Lead (Form 1), Lead (Form 2), Purchase (PDF Download)
- Test with Meta Pixel Helper browser extension

### 3. UTM Parameter Strategy

**Status:** ✅ IMPLEMENTED

**Usage Examples:**

```
# Facebook/Instagram Campaigns
https://4blocks.xyz/?utm_source=meta&utm_medium=cpc&utm_campaign=mvp_launch&utm_content=ad_variant_1

# Google Ads Campaigns
https://4blocks.xyz/?utm_source=google&utm_medium=cpc&utm_campaign=mvp_launch&utm_content=landing_page_cta

# Email Campaigns
https://4blocks.xyz/?utm_source=email&utm_medium=newsletter&utm_campaign=mvp_launch&utm_content=cta_button
```

**Attribution Features:**

- ✅ 30-day attribution window
- ✅ Cross-session persistence
- ✅ Automatic HubSpot field mapping
- ✅ First-touch and last-touch attribution

## 🔧 Implementation Details

### New Components Created:

1. **`components/Form1.tsx`** - Primary lead capture form

   - Fields: Name, Email, Phone (optional), Company (optional)
   - HubSpot integration with fallback
   - Enhanced tracking and attribution

2. **`components/Form2.tsx`** - Secondary CTA form

   - Fields: Name, Email
   - Triggers PDF download
   - Minimal friction design

3. **`lib/hubspot.ts`** - HubSpot integration utility

   - Form creation and submission
   - Event tracking coordination
   - Error handling and fallbacks

4. **`lib/utm-tracker.ts`** - UTM parameter handler

   - Capture and persistence
   - Attribution formatting
   - Campaign performance tracking

5. **`lib/tracking-config.ts`** - Centralized configuration
   - All tracking IDs and settings
   - Event definitions
   - Environment management

## 🧪 Testing Instructions

### Pre-Testing Setup:

1. **Update HubSpot IDs** in `lib/tracking-config.ts`
2. **Install browser extensions:**
   - Meta Pixel Helper
   - Google Tag Assistant
   - HubSpot Developer Tools

### Test Cases:

#### Test 1: UTM Parameter Capture

```bash
# Visit with UTM parameters
https://localhost:3000/?utm_source=test&utm_medium=cpc&utm_campaign=test_campaign

# Verify in browser console:
UTMTracker.debug()
```

#### Test 2: Form 1 Submission (Primary)

1. Fill out Form 1 with all fields
2. Submit form
3. **Expected Results:**
   - HubSpot contact created with UTM data
   - Meta Pixel 'Lead' event fired
   - GA4 'generate_lead' event
   - Redirect to `/thank-you`

#### Test 3: Form 2 Submission (Secondary)

1. Fill out Form 2 (minimal fields)
2. Submit form
3. **Expected Results:**
   - HubSpot contact created
   - Meta Pixel 'Lead' event fired
   - PDF download triggered
   - Meta Pixel 'Purchase' event (value: 0)

#### Test 4: Cross-Session Attribution

1. Visit page with UTM parameters
2. Close browser
3. Return directly (without UTMs)
4. Submit form
5. **Expected:** Original UTMs should be preserved

### Verification Commands:

```javascript
// In browser console:

// Check UTM tracking
UTMTracker.debug();

// Check current attribution
UTMTracker.getAttribution();

// Test Meta Pixel
fbq("track", "CustomEvent", { test: true });

// Test Google Analytics
gtag("event", "test_event", { test: true });
```

## 🎯 Campaign Setup Examples

### Facebook/Instagram Campaigns:

```
Campaign: MVP Launch
Ad Set: Lookalike Entrepreneurs
UTMs: ?utm_source=meta&utm_medium=cpc&utm_campaign=mvp_launch&utm_content=lookalike_1
```

### Google Ads Campaigns:

```
Campaign: MVP Roadmap Download
Ad Group: Startup Keywords
UTMs: ?utm_source=google&utm_medium=cpc&utm_campaign=mvp_roadmap&utm_content=search_ad
```

### Email Marketing:

```
Newsletter: Weekly Startup Tips
UTMs: ?utm_source=email&utm_medium=newsletter&utm_campaign=weekly_tips&utm_content=mvp_cta
```

## 📊 Tracking Events Summary

| Event         | Trigger        | Meta Pixel       | Google Analytics | HubSpot           |
| ------------- | -------------- | ---------------- | ---------------- | ----------------- |
| Page View     | Page load      | ✅ PageView      | ✅ page_view     | ✅ Tracking       |
| Form 1 Submit | Primary form   | ✅ Lead          | ✅ generate_lead | ✅ Contact + UTMs |
| Form 2 Submit | Secondary form | ✅ Lead          | ✅ generate_lead | ✅ Contact + UTMs |
| PDF Download  | After Form 2   | ✅ Purchase ($0) | ✅ file_download | ✅ Activity       |

## 🚨 Important Notes

1. **HubSpot IDs Required:** The forms will use fallback custom submission until real HubSpot IDs are configured

2. **PDF File:** Ensure `/mvp-roadmap.pdf` exists in the `public` folder

3. **GDPR Compliance:** Cookie banner is implemented for consent management

4. **Error Handling:** Forms will gracefully fallback and still redirect users on errors

5. **Development vs Production:** Use environment variables for different tracking IDs

## 🔄 Next Steps

1. **Configure HubSpot:** Update tracking-config.ts with real Portal and Form IDs
2. **Test Campaigns:** Run test campaigns with UTM parameters
3. **Monitor Attribution:** Check HubSpot contact records for UTM data
4. **Optimize Forms:** A/B test form fields and placement
5. **Scale Tracking:** Add additional conversion events as needed

## 🎉 Success Metrics to Monitor

- **Form 1 Conversion Rate:** Primary lead capture performance
- **Form 2 Conversion Rate:** Secondary CTA effectiveness
- **UTM Attribution:** Campaign source performance
- **HubSpot Pipeline:** Lead quality and progression
- **Meta Pixel Events:** Campaign optimization data
- **Cross-Session Attribution:** Multi-touch customer journeys

Your MVP landing page is now ready for comprehensive tracking and attribution! 🚀
