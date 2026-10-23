# ToyTopia

ToyTopia is a playful local kids' toy marketplace concept that helps families discover thoughtful toys from neighborhood sellers. Visitors can explore toy listings and details, while signed-in users can manage a profile and share ratings and reviews with the play community.

# Live link(netlify):
[Visit My Website](https://toy-kid-74c1e.web.app/)

## Features

- Responsive storefront with a three-slide Swiper hero, popular toy cards, local-maker feature, and community promises.
- Six sample toy listings with seller details, prices, ratings, stock, descriptions, and protected detail pages.
- Firebase email/password and Google authentication, persistent auth state, logout, and protected routes.
- Profile editing with Firebase `updateProfile`, password visibility toggle, and password reset email flow.
- Private toy community route for sharing ratings and feedback.
- React Toastify success and error notifications, dynamic page titles, custom not-found page, and shared navigation/footer.
- Firebase configuration loaded from environment variables.

## Run locally

1. Install dependencies:

   ```sh
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in the Firebase web app values from **Firebase Console → Project settings → Your apps**. `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, and `VITE_FIREBASE_APP_ID` are required for authentication; storage bucket and messaging sender ID are optional for this app.
3. In **Firebase Console → Authentication → Sign-in method**, enable Email/Password and Google if you want Google sign-in. Add your local and deployed site domains under **Authentication → Settings → Authorized domains**.

4. Start (or restart) the development server after saving `.env`:

   ```sh
   npm run dev
   ```

5. Create a production build:

   ```sh
   npm run build
   ```

Firebase Hosting is configured to rewrite direct route requests to the SPA entry point in `firebase.json`. The `public/_redirects` file provides the equivalent fallback for Netlify so refreshing a protected route keeps the app available.

## Packages

- **React** and **React DOM** — UI.
- **React Router** — client-side routing and protected routes.
- **Firebase** — authentication and profile management.
- **Swiper** — responsive homepage carousel.
- **React Toastify** — success and error notifications.
- **Tailwind CSS**, **DaisyUI**, and the **Vite Tailwind plugin** — styling setup and UI utilities.
- **Vite** — development server and production bundler.

## Toy images

Toy listing image URLs are remote image links in `src/data/toys.js`. Replace them with uploaded image URLs from ImgBB or Postimages when project-owned images are available.
