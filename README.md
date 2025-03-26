# GitHub Analytics Dashboard

## Overview
Welcome to the **GitHub Analytics Dashboard**, a web application built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. This dashboard allows users to view detailed analytics from a GitHub account, including public repositories, activity feeds, and general user statistics. The app pulls data directly from the **GitHub REST API** and provides a modern, responsive, and user-friendly interface.

### Technologies Used:
- **Next.js (App Router)** – For the main framework, handling routing and server-side rendering (SSR).
- **TypeScript** – To ensure type safety and enhanced developer experience.
- **Tailwind CSS** – For styling the application in a modern and flexible way.
- **Redux Toolkit** (or Zustand) – For state management across the app.
- **GitHub REST API** – To fetch user data, repositories, and activity information.
- **Vercel** (for deployment) – Deployed and hosted on Vercel for seamless performance.

## Features

### 1. **Authentication (Mocked)**
- A simple **login screen** with static credentials (e.g., `admin` / `admin123`).
- Upon successful login, users are redirected to the **dashboard**.
- Protection is in place for `/dashboard` routes to prevent unauthorized access.

### 2. **Dashboard Layout (/dashboard)**
- **Responsive Layout** that adjusts to different screen sizes.
- **Sidebar** for easy navigation between tabs.
- **Topbar** displaying the logged-in user's username and providing a **logout** button.
- A toggle for **Light/Dark Mode**, with the selected theme saved in `localStorage` or `cookies`.

### 3. **Tabs/Pages:**
#### 3.1 **Overview Tab**
- Displays key information about a GitHub user, such as:
  - Avatar
  - Name and Bio
  - Public repository count
  - Followers and following count
  - Top 3 repositories (sorted by star count)
- Data fetched from: `https://api.github.com/users/{username}`.

#### 3.2 **Repositories Tab**
- Lists all public repositories of the user, showing:
  - Repository name
  - Description
  - Primary language
  - Star count
  - Last updated time
- Supports **pagination** or **infinite scroll** for easy navigation.
- Data fetched from: `https://api.github.com/users/{username}/repos`.

#### 3.3 **Activity Tab**
- Displays the user’s **recent public GitHub activity**:
  - Lists the last 10 events with their type and date.
- Data fetched from: `https://api.github.com/users/{username}/events/public`.

#### 3.4 **Settings Tab**
- Includes preferences for users:
  - **Theme toggle**: Switch between light and dark mode.
  - **Layout preference**: Choose between a compact or comfortable layout.
  - **Clear cached data**: Reset user state and clear any stored data.
  - 
## Setup Installations
  Clone the repository:
  git clone https://github.com/your-username/github-analytics-dashboard.git
  
  Navigate to project:
  cd github-analytics-dashboard
  
  Install dependencies:
  npm install
  
  Start development server:
  npm run dev

### Prerequisites:
Before getting started, ensure you have **Node.js** and **npm** installed.

### 1. **Clone the Repository:**
```bash
git clone https://github.com/Mek3588/GitHub-Analytics-Dashboard-next-js.git
cd GitHub-Analytics-Dashboard-next-js
