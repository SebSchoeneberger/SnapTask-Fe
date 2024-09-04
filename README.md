# SnapTask Frontend

## React / Vite / Tailwind CSS
![React](https://img.shields.io/badge/React-v18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-v4.0.0-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.2.0-teal)

## Backend Repo
[https://github.com/hexzoner/final-project-be](https://github.com/hexzoner/final-project-be)

## Overview

SnapTask is a versatile SaaS platform that uses QR code technology to streamline task management for businesses and households. This repository contains the frontend code for SnapTask, built using React, Vite, and Tailwind CSS. The platform provides a comprehensive admin dashboard for managing tasks, users, and areas, while also offering a mobile-friendly interface for staff to easily interact with tasks.

## Features

- **Admin Dashboard**: Manage areas, users, tasks, and generate reports through a web-based interface.
- **Staff Interface**: Staff can easily start and finish tasks by scanning unique QR codes using their mobile devices.
- **Versatile Use Cases**: Ideal for industries such as cleaning, logistics, and hospitality, as well as for shared households.
- **Detailed Analytics**: Gain insights into task completion rates and other performance metrics.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Technologies](#technologies)
- [Deployment ](#deployment )

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.17.0 or higher)
- [Git](https://git-scm.com/)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/snap-task-frontend.git
    cd snap-task-frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    - Create a `.env.development.local` file in the root directory.
    - Add the following environment variables:
      ```env
      VITE_API_URL=http://localhost:3333
      ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

   The development server will start on `http://localhost:5173`.

## Usage

### Running the Frontend

- **Development**: 
    ```bash
    npm run dev
    ```
  The frontend will be accessible at `http://localhost:5173`.

## Environment Variables

Ensure the following environment variable is set in your `.env.development.local` file:

```env
VITE_API_URL=http://localhost:3333
```

## Technologies

The frontend is built with the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a faster and leaner development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.

## Deployment

The frontend is deployed at [https://app-snaptask.onrender.com/](https://app-snaptask.onrender.com/).
