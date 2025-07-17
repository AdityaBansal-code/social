---

## Overview

Threadly is a feature-rich social platform enabling users to sign in with GitHub, create and join communities, share posts with images, and interact through comments and likes. Built with a modern tech stack, Threadly offers a seamless, real-time, and responsive user experience.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Core Concepts](#core-concepts)
- [Component Overview](#component-overview)
- [Styling](#styling)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- 🔒 **GitHub Authentication** via Supabase
- 🏘️ **Community Creation & Discovery**
- 📝 **Rich Post Creation** with image uploads
- 💬 **Commenting & Liking** on posts
- ⚡ **Real-time Updates** with React Query & Supabase
- 📱 **Responsive UI** powered by TailwindCSS

---

## Tech Stack

- **Frontend:** [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Data Fetching:** [@tanstack/react-query](https://tanstack.com/query/latest)
- **Backend/DB:** [Supabase](https://supabase.com/) (Postgres, Auth, Storage)
- **Styling:** [TailwindCSS](https://tailwindcss.com/)
- **Routing:** [React Router](https://reactrouter.com/)
- **Analytics:** [Vercel Analytics](https://vercel.com/analytics)

---

## Project Structure

```text
src/
  App.tsx                # Main app, routing, layout
  main.tsx               # Entry point
  index.css              # TailwindCSS and global styles
  vite-env.d.ts
  utils/
    supabase.ts          # Supabase client setup
  Store/
    AuthStore.tsx        # Zustand store for auth state
  Components/
    Navbar.tsx           # Top navigation bar
    Create.tsx           # Create post form
    PostList.tsx         # List of posts
    PostItem.tsx         # Single post display
    PostDetail.tsx       # Post detail view
    CommentSection.tsx   # Comments for a post
    CommentItem.tsx      # Single comment
    LikeButton.tsx       # Like button for posts
    CommunityList.tsx    # List of communities
    CommunityDisplay.tsx # Posts in a community
    CreateCommunity.tsx  # Create a new community
  Pages/
    Home.tsx                 # Home feed
    CreatePostPage.tsx       # Page for creating a post
    PostPage.tsx             # Single post page
    CommunitiesPage.tsx      # All communities
    CommunityPage.tsx        # Single community page
    CreateCommunityPage.tsx  # Page for creating a community
```

---

## Getting Started

### 1. Clone the Repository
```sh
git clone <repo-url>
cd social
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Start the Development Server
```sh
npm run dev
```

---

## Environment Variables

| Variable                | Description                    |
|------------------------ |--------------------------------|
| `VITE_SUPABASE_URL`     | Your Supabase project URL      |
| `VITE_SUPABASE_ANON_KEY`| Your Supabase anon/public key  |

---

## Available Scripts

| Script           | Description                      |
|------------------|----------------------------------|
| `npm run dev`    | Start the development server      |
| `npm run build`  | Build for production             |
| `npm run preview`| Preview the production build      |
| `npm run lint`   | Run ESLint                       |

---

## Core Concepts

### Authentication
- Secure GitHub OAuth via Supabase.
- Global auth state managed with Zustand.
- User info and actions in the Navbar.

### Communities
- Create, browse, and join communities.
- `/communities` page lists all communities.
- Each community has a dedicated page with its posts.

### Posts
- Create posts with images and assign to communities.
- Posts are visible on the home feed and within communities.
- Each post supports comments and likes.

---

## Component Overview

- **Navbar:** Responsive navigation, user info, and authentication actions.
- **Create:** Form for new posts (title, content, image, community).
- **CommunityList:** Fetches and displays all communities.
- **CommunityDisplay:** Shows posts for a specific community.
- **CreateCommunity:** Form to create a new community.
- **PostList/PostItem:** Lists and displays individual posts.
- **CommentSection/CommentItem:** Handles post comments.
- **LikeButton:** Like/unlike posts.

---

## Styling
- Built with TailwindCSS for rapid, consistent, and responsive design.
- Custom gradients and dark theme by default.

---

## Screenshots

> _Add screenshots or GIFs of your app here to showcase the UI and features._

---

## Contributing

We welcome contributions! To get started:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to your branch (`git push origin feature/YourFeature`)
5. Open a pull request

Please ensure your code adheres to the project's linting and formatting standards.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions, feedback, or support, please contact the maintainers:
- [ADITYA BANSAL](bansaladitya2k5@gmail.com)
- 

---

