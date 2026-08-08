// UI strings only. Property content lives in the database in both languages.
export const en = {
  "nav.properties": "Properties",
  "nav.cities": "Cities",
  "nav.collections": "Collections",
  "nav.guides": "Guides",
  "nav.about": "About",
  "nav.contact": "Contact",
  "nav.buyingFromAbroad": "Buying from abroad",
  "nav.legal": "Legal",
  "nav.menu": "Menu",
  "nav.close": "Close",

  "btn.viewProperty": "View property",
  "btn.viewAll": "View all properties",
  "btn.enquire": "Enquire",
  "btn.sendEnquiry": "Send enquiry",
  "btn.bookViewing": "Book a viewing",
  "btn.loadMore": "Load more",
  "btn.back": "Back",
  "btn.dismiss": "Dismiss",

  "form.name": "Full name",
  "form.email": "Email address",
  "form.phone": "Phone",
  "form.message": "Message",
  "form.budget": "Budget",
  "form.country": "Country of residence",
  "form.preferredLanguage": "Preferred language",
  "form.required": "This field is required",
  "form.invalidEmail": "Please enter a valid email address",
  "form.success": "Thank you — we'll be in touch shortly.",
  "form.error": "Something went wrong. Please try again.",
  "form.sending": "Sending…",

  "footer.tagline": "Luxury Colombian real estate for international buyers.",
  "footer.navigation": "Navigation",
  "footer.company": "Company",
  "footer.contact": "Contact",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy policy",
  "footer.terms": "Terms of use",

  "locale.switchToSpanish": "Ver en español",
  "locale.switchToEnglish": "View in English",
  "locale.suggestion": "This site is also available in Spanish.",
} as const;

export type UIKey = keyof typeof en;
