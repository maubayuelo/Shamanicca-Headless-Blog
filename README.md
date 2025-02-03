# Shamanicca Headless Blog - ReactJS Vite App

A ReactJS Vite-based frontend for a headless WordPress blog, integrating REST API endpoints to display blog posts, categories, search results, and other dynamic content.

## 🚀 Tech Stack
- **Frontend:** ReactJS, Vite, React Router
- **State Management:** React Hooks
- **Styling:** SCSS
- **Backend:** WordPress REST API
- **API Calls:** Axios
- **SEO:** React Helmet Async
- **Deployment:** GitHub Pages, Vercel (Optional)

## 📦 Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/YOUR_GITHUB_USERNAME/shamanicca-headless-blog.git
   cd shamanicca-headless-blog
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start development server:**
   ```sh
   npm run dev
   ```
   The development server will be available at `http://localhost:5173`.

4. **Build for production:**
   ```sh
   npm run build
   ```

5. **Preview production build (Optional):**
   ```sh
   npm run preview
   ```

## 💡 Features
- Fetches and displays WordPress blog posts via REST API.
- Supports pagination, categories, and search functionality.
- Includes SEO optimizations using React Helmet Async.
- Uses SCSS for modular styling.
- Responsive design for mobile and desktop.

## 🔧 Environment Variables
Create a `.env` file in the root directory and configure it as follows:
```env
VITE_API_BASE_URL=https://shamanicca.local/wp-json
```

## ⚖️ License
This project is licensed under the MIT License. See `LICENSE` for details.

## 👥 Contributors
- **Your Name** - [@yourgithub](https://github.com/YOUR_GITHUB_USERNAME)

## 📈 Future Enhancements
- Ecommerce integration.
- Implementing Redux for state management.
- Adding dark mode support.
- Enhancing performance with lazy loading and code splitting.

## 🔍 Want to Contribute?
Feel free to submit a pull request or open an issue in the repository!

