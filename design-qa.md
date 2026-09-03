# Onram production design QA

## Visual source

- Existing Onram production design and the captured pre-refinement desktop states:
  `onram-audit-01-home-desktop.jpg`, `onram-audit-02-home-footer.jpg`,
  `onram-audit-03b-contact-loaded.jpg`, `onram-audit-04-privacy-desktop.jpg`, and
  `onram-audit-05-terms-desktop.jpg`.
- Official Onram light logo asset at `public/brand/onram-logo-light.svg`.

## Implementation target evaluated

- Production deployment of `https://www.onram.ai`.
- Routes: `/`, `/contact`, `/privacy`, `/terms`, and the `/questionnaire` redirect.
- Desktop viewport: 1363 × 936 in Chrome, including a full-page home capture.
- Mobile viewport: 390 × 844 in Chromium, including full-page captures of every public route.

## Differences found and resolved

- Header logo was visually small relative to the navigation; increased its rendered size while
  preserving the official asset and proportions.
- Footer logo treatment duplicated and overlapped its tagline; removed the duplicate text,
  enlarged the official logo, and kept the “Formerly Kalgoorlie AI” transition label clear.
- The translucent header appeared grey over the light contact page; increased the dark header
  opacity so the brand treatment remains consistent across light and dark routes.
- Privacy and terms pages did not use the shared site shell; added the production header,
  footer, typography, spacing, and route-specific metadata.
- Contact form lacked a concise privacy cue and clear keyboard focus treatment; added both.

## Responsive and interaction QA

- No horizontal overflow or framework error overlay was detected on the four public routes.
- Header and footer logos load at their intended aspect ratio on all four routes.
- The contact form’s empty submit is blocked by native required-field validation and does not
  navigate or send a request.
- The retired questionnaire route permanently redirects to `/contact`.

## Remaining differences by severity

- P0: none.
- P1: none.
- P2: none.
- P3: none affecting the site. Chrome emitted extension-only metadata errors from the QA
  environment; no application-origin console errors or Next.js error overlays were present.

## Final verdict

PASS — the final production implementation is faithful to the selected Onram direction and is
visually sound on desktop and mobile.
