# onram AI website

The production website for [onram AI](https://www.onram.ai), built with the Next.js App Router, React, TypeScript and Tailwind CSS.

## Primary routes

- `/` — AI consulting and AI training/workshops
- `/contact` — enquiry form
- `/privacy` — privacy policy
- `/terms` — terms of service
- `/questionnaire` — permanent redirect to `/contact`

## Local development

Use Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and configure:

```env
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_verified_sender
TO_EMAIL=your_destination_address
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-J8RDEH64B5
```

The production Analytics measurement ID defaults to `G-J8RDEH64B5`; the environment variable allows an explicit deployment override. Analytics is disabled during `next dev` to avoid polluting production reports.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

The site deploys through Vercel from the connected GitHub repository. Production uses `https://www.onram.ai` as the canonical domain.

## License

MIT License — see `LICENSE`.
