# SnapTask Frontend

# SnapTask

QR Code-Based Task Management for Businesses and Households
Snaptask is a versatile SaaS platform designed to streamline task management for businesses and households across various industries. By leveraging QR code technology, Snaptask simplifies the process of assigning, tracking, and completing tasks.

Key Features:

- Admin Dashboard: Manage areas, users, tasks, and generate reports from a comprehensive web-based interface.
-Staff Interface: Easily accessible via mobile devices, staff members can start and finish tasks by scanning unique QR codes.
-Versatile Use Cases: Ideal for businesses in industries such as cleaning, logistics, and hospitality, as well as for personal use in shared households.

With Snaptask, you can improve efficiency, ensure accountability, and gain valuable insights through detailed analytics—all powered by the simplicity and convenience of QR codes.

## Setup

- `npm i` to install dependencies
- create a `.env.development.local`:
  - `VITE_API_URL` set to `http://localhost:3333` assuming your backend API is running on port 3333
- The server defaults to port `5173`, although you can override this in the script sections in `package.json`

## Commands

- `npm run dev`: Starts development server, pulling environment variables from `.env.development.local` file

## Backend Repo

- https://github.com/hexzoner/final-project-be
