# FitSync - Gym Performance Tracker

A modern web application for tracking gym progress, managing workout schedules, and discovering personalized exercises. Built with React and Firebase to help fitness enthusiasts achieve their goals.

## 🎯 Features

- **Authentication**: Secure login and signup with Google authentication using Firebase
- **Personal Records (PR) Tracking**: Monitor and visualize your progress with interactive trend graphs for each exercise
- **Muscle Explorer**: Interactive muscle map that displays relevant exercises when you click on specific muscle groups
- **Weekly Timetable**: Create and customize your workout schedule for the week with an intuitive interface
- **Exercise Database**: Comprehensive exercise suggestions based on selected muscle groups
- **PR Storage**: Store and manage personal records for individual exercises
- **Protected Routes**: Secure dashboard accessible only to authenticated users

## 🛠 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Backend/Auth**: Firebase
- **Routing**: React Router v7
- **Data Visualization**: Recharts
- **Icons**: Lucide React
- **Build Tool Linting**: ESLint 9

## 📁 Project Structure

```
FitSync/
├── src/
│   ├── components/
│   │   ├── MuscleExplorer.jsx      # Interactive muscle map component
│   │   ├── PRMonitor.jsx           # PR tracking and graph display
│   │   ├── ProtectedRoute.jsx      # Route protection component
│   │   └── WeeklyTimetable.jsx     # Workout schedule component
│   ├── pages/
│   │   ├── Landing.jsx             # Landing page with login options
│   │   └── Dashboard.jsx           # Main dashboard after login
│   ├── context/
│   │   ├── AuthContext.jsx         # Authentication context
│   │   └── exercisesData.js        # Exercise database
│   ├── firebase.js                 # Firebase configuration
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # Entry point
│   ├── App.css                     # App styles
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies and scripts
└── README.md                        # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/fardin654/FitSync.git
cd FitSync
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Firebase configuration values
   ```bash
   cp .env.example .env.local
   ```
   
   Your `.env.local` should contain:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🔐 Authentication

The app uses Firebase Authentication with Google Sign-In. Users can:
- Create new accounts using Google authentication
- Securely access their personal dashboard
- Protected routes ensure only authenticated users can view sensitive data

## 💪 Key Features Explained

### Muscle Explorer
Click on any muscle in the interactive diagram to view a list of exercises that target that specific muscle group.

### PR Monitor
Track your personal records with:
- Exercise-specific PR storage
- Visual trend graphs showing progress over time
- Historical data for performance analysis

### Weekly Timetable
Manage your workout routine by:
- Creating a custom workout plan for the week
- Assigning exercises to specific days
- Modifying your schedule as needed

### Dashboard
Your personalized hub featuring:
- PR trend visualization
- Weekly schedule management
- Quick access to all features

## 📦 Dependencies

Key dependencies included:
- `firebase` - Backend services and authentication
- `recharts` - Interactive charts for PR visualization
- `react-router-dom` - Client-side routing
- `tailwindcss` - Utility-first CSS framework
- `lucide-react` - Beautiful icon library

## 🌐 Deployment

The project can be deployed to any static hosting service:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **Firebase Hosting**

## 📝 Environment Variables

⚠️ **Important**: Never commit `.env.local` to version control. It's included in `.gitignore` to protect your Firebase credentials.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created by [Fardin](https://github.com/fardin654)

---

**Happy Training! 💪** Achieve your fitness goals with FitSync!
