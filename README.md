# Impulse Control - Modern Chat Application

A modern, real-time chat application built with Next.js, Supabase, and a beautiful UI. Impulse Control provides a seamless messaging experience with authentication, theme switching, and responsive design.

## 🎯 Features

- **Real-time Messaging**: Instant message delivery powered by Supabase
- **User Authentication**: Secure authentication with Supabase Auth
- **Theme Support**: Light and dark mode with persistent preferences
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **User Profiles**: Manage user information and settings
- **Chat Management**: Create, organize, and manage multiple conversations
- **Connection Management**: Track and manage user connections
- **Project Management**: Organize chats and projects efficiently
- **Beautiful UI**: Modern interface with smooth animations using Framer Motion

## 🚀 Tech Stack

### Frontend
- [Next.js](https://nextjs.org/) 14.2 - React framework with SSR support
- [React](https://react.dev/) 18 - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Headless component library

### Backend & Database
- [Supabase](https://supabase.com/) - Open-source Firebase alternative
- PostgreSQL - Database (via Supabase)

### State Management & Libraries
- [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- [Framer Motion](https://www.framer.com/motion/) - React animation library
- [GSAP](https://gsap.com/) - Advanced animations
- [Three.js](https://threejs.org/) - 3D graphics effects
- [Next Themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Lucide React](https://lucide.dev/) - Icon library

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Git

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Impulse-Control.git
   cd Impulse-Control
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   
   Get these from your [Supabase project settings](https://app.supabase.com).

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Create a new project and select your Impulse Control repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

[Learn more about Vercel deployment](https://vercel.com/docs)

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── auth/              # Auth routes & callbacks
│   └── login/             # Login page
├── components/            # React components
│   ├── chat/              # Chat components
│   ├── layout/            # Layout components
│   ├── panels/            # Sidebar panels
│   ├── shared/            # Shared components
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & services
│   ├── chatService.ts    # Chat API
│   └── supabase/         # Supabase clients
├── store/                 # State management (Zustand)
└── middleware.ts          # Auth middleware

public/                    # Static assets
supabase/                  # Database migrations
```

## 📝 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Run production server
npm run lint     # Check code quality
```

## 🔐 Authentication

Impulse Control uses Supabase Authentication supporting:
- Email/Password
- GitHub OAuth
- Google OAuth
- Magic Links

Users must authenticate before accessing the chat interface.

## 🎨 Theming

The app supports light and dark themes with:
- Theme toggle in the UI
- Automatic localStorage persistence
- CSS variables for dynamic theming
- Smooth transitions between themes

## 📱 Responsive Design

- **Desktop**: Full multi-panel layout with icon rail
- **Tablet**: Adaptive layout with collapsible panels
- **Mobile**: Touch-friendly drawer navigation

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Troubleshooting

**Environment Variables Not Loading**
- Ensure `.env.local` exists in the root directory
- Restart dev server after adding variables
- Variables must start with `NEXT_PUBLIC_` for client access

**Supabase Connection Issues**
- Verify Supabase URL and anon key
- Ensure your project is active (not paused)
- Check database setup and required tables

**Build Errors**
- Clear `.next`: `rm -rf .next`
- Reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (need 18+)

## 📞 Support

- Open an issue on GitHub
- Check [Supabase docs](https://supabase.com/docs)
- Review [Next.js docs](https://nextjs.org/docs)

## 🎯 Roadmap

- [ ] Voice messages
- [ ] File sharing
- [ ] Group chats
- [ ] Message search
- [ ] User presence
- [ ] Message reactions
- [ ] End-to-end encryption

---

**Made with ❤️ by the Impulse Control team**
