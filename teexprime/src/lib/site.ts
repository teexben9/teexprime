// Business details shown across the site. Fill these in before launch.
// Anything left empty is hidden automatically, so nothing fake is ever shown.
export const site = {
  name: 'Teexprime',
  // Full international number without "+" or spaces, e.g. "255712345678". Empty hides WhatsApp buttons.
  whatsapp: '255694495815',
  email: 'teexprime@gmail.com',
  location: 'Tanzania',
  // Path to the real logo in /public (e.g. "/logo.svg"). Empty shows the placeholder logo.
  logo: '',
  social: {
    instagram: '',
    linkedin: '',
    github: '',
  },
  minPriceUsd: 200,
};

export const whatsappLink = (text = '') =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}` : '';
