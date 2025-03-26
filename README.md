GitHub Analytics Dashboard
Frontend Coding Challenge – GitHub Analytics Dashboard
25/03/2025

Overview
The GitHub Analytics Dashboard is a frontend-only web application built using Next.js (App Router) and TypeScript that consumes the GitHub REST API to display a user’s GitHub analytics. The goal of this challenge is to evaluate frontend skills, including state management, theming, and building a scalable, modern React/Next.js application.

This project includes essential GitHub data such as user information, repositories, activity logs, and more, all fetched from the public GitHub API.

Table of Contents
Objective

Features

Required Features

Bonus Features

Deployment

Technologies Used

Setup Instructions

Architecture

Screenshots

Contributing

Objective
Build a GitHub Analytics Dashboard with the following features:

Authentication (Mocked): A login screen with static credentials (e.g., admin / admin123).

Dashboard Layout: A responsive dashboard with a sidebar, topbar, and a theme toggle.

Tabs/Pages:

Overview: User data, top repositories, followers/following.

Repositories: List all public repositories with pagination or infinite scroll.

Activity: Display recent GitHub activity.

Settings: Theme toggle, layout preferences, and data reset.

Additional Features: Error handling, loading states, and user protection.

Features
Required Features
Authentication (Mocked):

Static login with username and password (admin / admin123).

Redirect to the dashboard on successful login.

Protect all /dashboard routes from unauthenticated access.

Dashboard Layout:

Sidebar for navigation.

Topbar displaying username and logout button.

Light/Dark mode toggle with state persistence in localStorage.

Tabs/Pages:

Overview Tab: Displays GitHub user information including avatar, name, bio, public repository count, followers, and top repositories.

API: https://api.github.com/users/{username}

Repositories Tab: Lists all repositories, with pagination or infinite scroll support.

API: https://api.github.com/users/{username}/repos

Activity Tab: Shows recent public GitHub events (last 10 events).

API: https://api.github.com/users/{username}/events/public

Settings Tab: Allows the user to toggle light/dark mode and change layout preferences.

Bonus Features (Optional)
Allow users to search for any GitHub username.

Display a graph showing language usage per repository.

Skeleton loaders during data loading.

Implement SSR/ISR for the Overview tab for better performance.

Deployment
The final solution is deployed on Vercel, providing seamless serverless deployment for Next.js projects.

Deployed URL: GitHub Analytics Dashboard

Technologies Used
Next.js (App Router) – Framework for building the application.

TypeScript – For type safety and better development experience.

Redux Toolkit or Zustand – State management.

Tailwind CSS – For modern, responsive styling.

GitHub REST API – To fetch user data and repositories.

localStorage/Cookies – For persistent theme management.

Setup Instructions
Clone the repository:

bash
Copy
Edit
git clone https://github.com/Mek3588/GitHub-Analytics-Dashboard-next-js.git
cd GitHub-Analytics-Dashboard-next-js
Install dependencies: Ensure you have Node.js installed, then run:

bash
Copy
Edit
npm install
Run the development server: To start the development server, run:

bash
Copy
Edit
npm run dev
Navigate to http://localhost:3000 in your browser to view the dashboard.

Production build: For a production build, run:

bash
Copy
Edit
npm run build
npm run start
Architecture
Folder Structure:
The project follows a modular structure for scalability and maintainability:

bash
Copy
Edit
/components    # Reusable UI components (e.g., Sidebar, Navbar, ThemeSwitcher)
/pages         # Pages for each route (e.g., /dashboard, /settings)
/store         # State management using Redux Toolkit or Zustand
/styles        # Tailwind CSS configuration and custom styles
/utils         # Utility functions (e.g., API calls, theme toggling)
Decisions:
State Management: Chose Redux Toolkit for its simplicity and flexibility.

Styling: Used Tailwind CSS for a utility-first, responsive layout.

API Integration: Leveraged the GitHub REST API for data fetching.
