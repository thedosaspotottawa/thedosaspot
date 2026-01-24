# The Dosa Spot

A modern, responsive Progressive Web App (PWA) for a South‑Indian restaurant, showcasing an elegant design, dynamic menu, online ordering, reservations, and more.

## ✨ Features
- **Beautiful UI** with custom fonts (Twinkle Star) and vibrant color palette.
- **Responsive layout** – works on desktop, tablet, and mobile.
- **Menu browsing** with categories and item details.
- **Online ordering** integration (Uber Eats, SkipTheDishes, phone).
- **Reservations** form with API integration.
- **Story & Services** sections with animated components.
- **Embedded map** on the home page footer.
- **PWA install prompt** for Android & iOS.
- **Admin dashboard** for managing menu items.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TailwindCSS, Framer Motion, Lucide‑React icons.
- **Backend**: FastAPI (Python) with SQLite, CORS, and Pydantic models.
- **Deployment**: Static assets served via Vite dev server; FastAPI for API endpoints.

## 🚀 Getting Started
### Prerequisites
- Node.js (>=18) and npm
- Python 3.11+ and `pip`

### Frontend
```bash
# Clone the repo (if not already)
git clone https://github.com/thedosaspotottawa/thedosaspot.git
cd dosa-point/frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
The app will be available at `http://localhost:5173`.

### Backend
```bash
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API runs at `http://localhost:8000`.

## 📦 Build for Production
```bash
# In the frontend folder
npm run build
# Deploy the `dist` folder to any static hosting (Netlify, Vercel, etc.)
```

## 🤝 Contributing
Feel free to open issues or submit pull requests. Follow the existing code style and run `npm run lint` before committing.

## 📄 License
This project is licensed under the MIT License.
