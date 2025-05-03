# Encrypt App (React + Node.js)

A full-stack application built with React (Vite) on the front-end and Node.js/Express with MongoDB on the back-end. Encrypt app was created as a university project for cybersecurity course and its goal is to show how end-to-end encryption can be used in modern web apps. This service allows users to register/login, generate encrypted messages for another users and decrypt massages addressed to them.

## Features

- User registration & authentication (JWT)
- Find user by his username
- Encrypt message for selected user using his public key
- Decrypt message, that were encrypted for you, using private key that stores in sessionStorage

## Live Demo

- https://encryption-app-six.vercel.app/

## Tech Stack

- Frontend: React, Vite, React Router, Tailwind CSS, Context API, Axios, openpgp
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- Deployment: Vercel (frontend), Render (backend)

## Project Structure

```
weather-app-react/
├── client/         # React frontend
└── server/         # Express backend
```

## Getting Started

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```
