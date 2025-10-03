# 🎬 MovieMate

A modern, feature-rich movie discovery application built with React, Firebase, and The Movie Database (TMDB) API. Browse trending movies, search for your favorites, explore by genre, and save movies to your personal collection.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://movie-mate-psi.vercel.app/)
[![React](https://img.shields.io/badge/React-18.2.0-blue)](https://reactjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-9.23.0-orange)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-4.1.0-purple)](https://vitejs.dev/)

## 🌟 Features

- **🔍 Smart Search**: Search through thousands of movies with real-time results
- **🎭 Genre Filtering**: Browse movies by genre with dynamic filtering
- **📈 Trending & Upcoming**: Discover what's hot and what's coming soon
- **⚡ Infinite Scroll**: Seamless pagination with load-more functionality
- **🔐 Google Authentication**: Secure login with Firebase Authentication
- **❤️ Favorites**: Save your favorite movies to a personal collection
- **🎨 Modern UI**: Beautiful glass-morphism design with Tailwind CSS
- **📱 Responsive**: Fully responsive design for all devices
- **🎬 Movie Details**: In-depth information about cast, crew, and ratings
- **🎞️ Anime Section**: Dedicated section for anime movies
- **⚡ Fast Loading**: Code-splitting and lazy loading for optimal performance

## 🚀 Live Demo

Check out the live application: [https://movie-mate-psi.vercel.app/](https://movie-mate-eta-livid.vercel.app/)

## 🛠️ Technologies Used

### Frontend

- **React 18.2** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library

### Backend & Services

- **Firebase Authentication** - User authentication with Google
- **Firebase Analytics** - User analytics tracking
- **TMDB API** - Movie database and information

### State Management & Hooks

- **React Context API** - Global state management
- **React Firebase Hooks** - Firebase integration hooks

### Additional Libraries

- **React Helmet Async** - SEO optimization
- **React Toastify** - Toast notifications
- **React Lazy Load Image** - Optimized image loading
- **React Slugify** - URL-friendly movie titles

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager
- A TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))
- A Firebase project ([Create one here](https://console.firebase.google.com/))

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/bhashitm2/Movie_Mate.git
   cd Movie_Mate
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory and add your API keys:

   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECTID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

   # TMDB API
   VITE_API_KEY=your_tmdb_api_key

   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173/`

5. **Build for production**

   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔑 Getting API Keys

### TMDB API Key

1. Go to [TMDB Website](https://www.themoviedb.org/)
2. Create an account and log in
3. Navigate to Settings → API
4. Request an API key (it's free!)

### Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the configuration values to your `.env` file
5. Enable Google Authentication in Authentication → Sign-in method

## 📁 Project Structure

```
MovieMate/
├── public/
│   ├── vite.png
│   └── _redirects
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── Btn.jsx
│   ├── auth/
│   │   └── Login.jsx
│   ├── components/
│   │   ├── Anime.jsx
│   │   ├── Detail.jsx
│   │   ├── Genre.jsx
│   │   ├── Header.jsx
│   │   ├── Moviecard.jsx
│   │   ├── Movies.jsx
│   │   ├── Navbar.jsx
│   │   ├── Pagebtn.jsx
│   │   ├── Searchbar.jsx
│   │   └── TopHeader.jsx
│   ├── pages/
│   │   ├── AnimeContainer.jsx
│   │   ├── Container.jsx
│   │   ├── Favoritepage.jsx
│   │   ├── Player.jsx
│   │   ├── Search.jsx
│   │   ├── Trending.jsx
│   │   └── Upcoming.jsx
│   ├── App.jsx
│   ├── Contextpage.jsx
│   ├── index.css
│   ├── main.jsx
│   └── movies.js
├── .env
├── .env.example
├── firebase.js
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.cjs
└── vite.config.js
```

## 🎯 Key Features Explained

### Context-Based State Management

The app uses React Context API for efficient state management across components, handling:

- Movie data and filtering
- User authentication state
- Genre selections
- Pagination state
- Loading states

### Lazy Loading & Code Splitting

All route components are lazy-loaded for optimal performance:

- Reduces initial bundle size
- Faster page load times
- Better user experience

### Firebase Authentication

Secure Google OAuth integration with:

- Popup authentication (primary)
- Redirect authentication (fallback)
- Automatic session persistence
- Error handling and user feedback

### Smart Pagination

Dual pagination approach:

- "Load More" button for infinite scroll
- Traditional page navigation
- Smart caching to prevent redundant API calls

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Bhashit M**

- GitHub: [@bhashitm2](https://github.com/bhashitm2)
- Repository: [Movie_Mate](https://github.com/bhashitm2/Movie_Mate)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API
- [Firebase](https://firebase.google.com/) for authentication and hosting services
- [Vercel](https://vercel.com/) for hosting the live demo
- All contributors and users of this project

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Bhashit M
