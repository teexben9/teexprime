# Teexprime website: research notes

**Draft 4 · 8 Oct 2026 · For:** TEEX, as the person building and running Teexprime (assumed, since no other reader was named).

## Bottom line

**Scope decision (TEEX, 8 Oct):** this package is a frontend-only website. There is no admin dashboard, client portal, database or login. Clients describe their situation through the Start a Project questions, and the answers are emailed to you through Web3Forms. Spec sections 22 to 29 (admin, lead management, portal) are out of scope for now and stay as a possible future package.

That keeps the build small enough for one person and still delivers the most important part of the spec: a visitor understands Teexprime, sees real proof, and completes the diagnostic.

## 1. Public site

- **Lead with outcomes, not tech.** This matches common advice for agency sites and case studies: the homepage should say who you help and what changes for them, then show proof. Your hero and problem cards already do this.
- **Proof: you have three finished client projects**, which is enough for a credible Work page. Write all three as full case studies, and only add clearly labelled concept studies later if you want to show an industry none of the three covers. Name a client only where they have agreed to it.
- **Case study shape.** Your Problem, Approach, Solution, Features, Outcome, Visuals order is the standard pattern. Two additions that tend to help: a one-line outcome headline at the top, and a short client quote where one is genuinely available. Where there are no numbers, describe what the client can now do (for example "visitors can see every tour and message the team from any page").
- **Mobile and WhatsApp first.** Tanzania's internet use is mostly mobile and growing fast (TCRA figures reported in 2025 and 2026), and WhatsApp is the default way clients and their customers talk. A WhatsApp button on every page, and WhatsApp as a contact option in the diagnostic, fits the target market.

## 2. Start a Project diagnostic

- **Multi-step beats one long form.** Splitting a form into short steps with a progress bar is widely reported to raise completion. The often-quoted uplift figures come from form vendors, so treat them as direction, not fact.
- **Ask about the problem first, contact details last** (agreed). The diagnostic opens with the discovery questions and ends with name, business, phone or WhatsApp, and email.
- **Keep it to about 8 to 10 screens**, one question per screen on mobile, and save answers in the browser so a dropped connection does not lose them (your section 32 asks for this).
- **Diagnosis can be a simple points table.** Each answer adds points to Visibility, Trust, Information, Conversion, Operations or Website quality. The top two become primary and secondary problem, and each category maps to a recommended package. This is easy to tune later and matches your "not scientifically perfect" rule.
- **Lead score** can be the same idea: points for budget given, timeline under two months, target industry, and a clear problem.
- **The scoring runs in the visitor's browser** and is added to the email you receive, so each submission arrives with all answers plus a summary such as "Primary problem: Visibility. Secondary: Conversion. Suggested: Website + SEO Foundation. Lead score: 7/10". The visitor only sees the thank-you message and a reference number, not the score.
- **Budget ranges (replaces section 18).** Your prices include tax and internet costs, with a realistic minimum of $200. Suggested options: Under $200 (treated as below minimum), $200 to $400, $400 to $800, $800 to $1,500, $1,500 or more, and "I'm not sure yet". I've used US dollars as you did; the TSh equivalent can be shown next to each range if most clients think in shillings. Stating "projects start from $200, all taxes included" on the Services page also helps filter enquiries.

## 3. How you track leads without a dashboard

- Every submission lands in your email with a clear subject, for example "New project: Orkiu Adventure · Tourism · Visibility · Score 7".
- An email label or folder per status (New, Contacted, Proposal sent, Won, Lost) covers the lead statuses in spec section 20.
- If you want a list, a simple spreadsheet with one row per lead is enough for now.
- Follow-up with clients happens on WhatsApp and email, as it does today.

## 4. Simplest stack (frontend only)

| Need | Suggested choice | Why |
|---|---|---|
| Site | Next.js as a static site (or Astro) | Fast pages, good for search, and built-in support for the five language URLs |
| Styling and components | Tailwind CSS with a small shared component set | Keeps buttons, cards and forms consistent |
| Animation | Framer Motion (or CSS only) | Smooth, purposeful motion that can switch off for reduced-motion visitors |
| Forms | Web3Forms (your key) | Contact form and diagnostic answers go to your email; no server needed |
| Hosting | Vercel, Netlify or Cloudflare Pages | Free tier is enough; deploys automatically from GitHub |
| Case study content | Files in the repository | No CMS to maintain; easy to add a project |

### Web3Forms notes

- The free plan has a monthly submission cap; check the current limit on their pricing page.
- Web3Forms keys are designed to sit in the page code, so they are not truly secret, but the key will still go in the site's settings file rather than in chat.
- A spam check (their built-in honeypot or captcha option) should be turned on, since the form is public.

## 5. Design requirements (from TEEX)

| Area | Requirement | Build notes |
|---|---|---|
| Colour | Black primary, light purple accent, grey and off-white neutrals | Defined once as design tokens so every page shares them. Light purple text on white is hard to read, so in light mode the accent is used for fills and highlights, with a deeper purple shade for text and links. |
| Themes | Light and dark, with a proper switcher | Follows the visitor's device setting by default, remembers their choice, and never flashes the wrong theme on load. |
| Languages | English, Chinese, Spanish, French, German | Every word lives in a per-language file and pages get language URLs (for example `/fr/services`), which also helps search. English is written first. The other four need real translation: machine translation is fine as a draft but should be checked by a fluent speaker before launch, especially the diagnostic and pricing. Chinese needs a font that supports Chinese characters. Case studies are the most text, so translating them can come after launch if needed. |
| Animation | Polished and purposeful, no excess | Short fades and slides on scroll and hover, used to guide the eye. Animation turns off for visitors whose device asks for reduced motion. |
| Logo | Placeholder for now | One logo component used everywhere, so the real logo is a single file swap. |
| Responsive | Mobile first, then tablet and desktop | Matches section 31 and the mostly-mobile Tanzanian audience. |
| Look | Premium, minimal, modern, strong type, generous spacing | Matches spec section 30. One strong heading font plus a clean text font. |
| UI kit | Consistent buttons, cards, forms, navigation, status indicators | Built as a small shared component set first, so every page and the diagnostic reuse it. Dashboard parts are dropped with the dashboard. |

**Effect on scope:** five languages is the biggest addition. It is cheap to set up at the start and expensive to add later, so the language setup goes into Phase 1 even if only English is filled in on day one.

## 6. Suggested build order

1. Design system: colours, light and dark themes, shared components, logo slot, and language setup.
2. Public pages: Home, Work, Services, Process, About, with the three finished projects as case studies.
3. Start a Project diagnostic with scoring, sent through Web3Forms.
4. Translations, final checks on phones, and launch.

## Your answers so far

- Three finished client projects can be shown.
- Contact details move to the end of the diagnostic.
- Budgets start from $200, including tax and internet costs.
- No existing site or code: start from scratch.
- Frontend only: no dashboard, portal or database in this package.






