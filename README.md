# Kalgoorlie AI Website

A modern, responsive website for Kalgoorlie AI built with Next.js, Tailwind CSS, and Supabase.

## Features

- Modern UI with responsive design
- Newsletter subscription
- Contact form
- AI Readiness Assessment questionnaire
- Animations and interactive elements
- Dark/Light theme support

## Tech Stack

- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Supabase
- SendGrid

## Prerequisites

- Node.js 16.8 or later
- npm or yarn
- Supabase account
- SendGrid account (for email functionality)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_from_email
TO_EMAIL=your_to_email
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kalgoorlie-ai.git
cd kalgoorlie-ai
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website.

## Database Setup

The project uses Supabase as the database. The migration files are located in the `supabase/migrations` directory.

## Building for Production

```bash
npm run build
# or
yarn build
```

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request