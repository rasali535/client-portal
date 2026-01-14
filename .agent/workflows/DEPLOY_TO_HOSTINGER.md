---
description: Build and Deploy to Hostinger
---
# Deploy to Hostinger

This workflow guides you through building the React application and deploying it to Hostinger.

## Prerequisites
- Node.js installed
- Hostinger account access (File Manager or FTP)
- Supabase project set up (if using database)

## Steps

1.  **Install Dependencies**
    If you haven't already, install the project dependencies.
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Create a `.env` file in the root directory based on `.env.example`.
    Fill in your Supabase URL and Key.
    ```bash
    cp .env.example .env
    # Edit .env with your real credentials
    ```

3.  **Build the Application**
    Run the build script to generate the production files.
    ```bash
    npm run build
    ```
    This will create a `dist` folder containing your website.

4.  **Verify .htaccess**
    Ensure `dist/.htaccess` exists. This file is crucial for Hostinger to handle React routing (SPA).

5.  **Upload to Hostinger**
    - Log in to your Hostinger Control Panel (hPanel).
    - Go to **File Manager**.
    - Navigate to `public_html`.
    - Delete default files (if any, like default.php).
    - Upload the **CONTENTS** of the `dist` folder (not the folder itself) to `public_html`.
      - You should see `index.html`, `assets/`, and `.htaccess` in `public_html`.

6.  **Test Deployment**
    Visit your domain. The application should load.
    - Try navigating to `/dashboard` to test routing.
    - If you get a 404 on refresh, check that `.htaccess` was uploaded correctly.

## Common Issues
- **White screen**: Check browser console for errors. Often caused by missing `.env` variables during build.
- **404 on refresh**: Missing `.htaccess`.
