# College Placement Management System

## Table of Contents
- [College Placement Management System](#college-placement-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Project Structure](#project-structure)
  - [User Roles](#user-roles)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Clone the Repository](#clone-the-repository)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
    

## Features
- **Student Portal**: Register and login, update profile, upload resume, view available job opportunities, apply for jobs, and track application status.
- **TPO Admin Portal**: Post and manage job listings, approve/reject student applications, schedule interviews, upload offer letters.
- **Management Admin Portal**: Access analytics, monitor placement stats, and view comprehensive reports.
- **Super Admin Portal**: Full control of the system including onboarding TPOs and management users, managing system configurations.
- **Cloudinary Integration**: Handles secure storage of profile pictures, resumes, and offer letters.

## Tech Stack
- **Frontend**: Vite + React.js, Tailwind CSS, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Styling**: Tailwind CSS, Bootstrap

## Project Structure
```plaintext
├── ├── .github
│   └── workflows
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utlis
│   ├── .dockerignore
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── seed.js
│   └── vercel.json
├── docs
│   ├── adr
│   │   ├── 0001-stateless-jwt...
│   │   └── 0002-cloudinary...
│   ├── architecture
│   │   ├── data-flow.md
│   │   └── system-architecture...
│   └── database-schema.md
├── frontend
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── LandingPages
│   │   │   ├── Management
│   │   │   ├── Students
│   │   │   ├── SuperUser
│   │   │   └── TPO
│   │   ├── context
│   │   ├── hooks
│   │   ├── pages
│   │   │   ├── Management
│   │   │   ├── students
│   │   │   └── TPO
│   │   ├── style
│   │   ├── utility
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── Dockerfile
│   ├── eslint.config.js
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── kubernetes
├── docker-compose.yaml
├── LICENSE
├── vercel.json
└── README.md
```

## User Roles
- **Students**: View and apply for jobs, update profile, track status, and upload resumes.
- **TPO Admin**: Post jobs, manage applications, upload offer letters, and schedule interviews.
- **Management Admin**: Access dashboards and reports for data-driven decision making.
- **Super Admin**: Manage system settings, and create/manage TPO and Management users.

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Cloudinary account for file uploads

### Clone the Repository
```bash
git clone https://github.com/moinmn/college-placement-management-system.git
cd college-placement-management-system
```

### Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   PORT=4518
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   SMTP_USER="your_email_id"
   SMTP_PASS="your_app_password_to_be_generate_via_google_settings"
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the necessary packages:
   ```bash
   npm install
   ```
3. Create a `.env` file for environment variables:
   ```env
   VITE_BACKEND_URL=http://localhost:4518
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

##  System Design & Architecture

CPMS is engineered with a multi-tier decoupled architecture designed to handle peak application windows and rapid automated candidate shortlisting.

-  **Detailed Architecture**: [docs/architecture/system-architecture.md](docs/architecture/system-architecture.md)
-  **Data Flow & Sequence**: [docs/architecture/data-flow.md](docs/architecture/data-flow.md)
-  **Database Indexing & Schema**: [docs/database-schema.md](docs/database-schema.md)
-  **Architectural Decision Records (ADRs)**: [docs/adr/](docs/adr/)
