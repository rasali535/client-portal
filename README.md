# Client Portal Manager

A comprehensive client portal application built with React, TypeScript, and Supabase. This application allows clients to log in, view their project status, manage support tickets, and view invoices.

## 🚀 Tech Stack

- **Frontend Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Backend/Auth**: Supabase
- **State Management**: TanStack Query
- **Routing**: React Router DOM

## 🛠️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd client-portal
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    - Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    - Update `.env` with your Supabase credentials:
        ```env
        VITE_SUPABASE_URL=https://your-project.supabase.co
        VITE_SUPABASE_ANON_KEY=your-anon-key
        ```

4.  **Database Setup**:
    - Go to your Supabase SQL Editor.
    - Run the contents of `supabase/schema.sql` to create the necessary tables and security policies.
    - Go to **Authentication > Providers** and enable **Email/Password**.

5.  **Run Locally**:
    ```bash
    npm run dev
    ```

## 🌍 Deployment to Hostinger

This project is configured for deployment on Hostinger (or any Apache-based shared hosting).

1.  **Build successfully**:
    ```bash
    npm run build
    ```
    This creates a `dist` directory.

2.  **Upload**:
    - Upload the **CONTENTS** of the `dist` folder to your website's `public_html` directory via File Manager or FTP.

3.  **Routing**:
    - The project includes a public `.htaccess` file that handles SPA routing (preventing 404s on refresh). Ensure this file is uploaded.

## 📝 Features

- **Secure Authentication**: Email/Password login via Supabase Auth.
- **Dashboard**: Overview of tickets, projects, and invoices.
- **Ticket System**: View and filter support tickets (Supabase connected).
- **Responsive Design**: Fully mobile-responsive UI.
