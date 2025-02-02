# Projeto Servidor

A basic application using a API to receive and send data.

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)

---

## Description

This is a basic application that demonstrates the core features of APIs, such as routes, functionalities, middlewares, etc.

Feel free to fork or clone this repository to start your own API project.

---

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager) – usually comes with Node.js
- [MongoDB](https://www.mongodb.com)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JvDev2003/projetoServidor
   cd projetoServidor
   ```

2. Install packeges in backend, fill the .env and run:

   ```bash
    cd backend
    npm install
   ```

   Fill in these variables in the backend's .env file.

   ```bash
   ENV=dev
   PORT={the port you want your aplication run}
   SALT={Salt of your hash}
   DBURL={URL of your mongodb database}
   JWT_SECRET={Secret of your JWT}
   ```

3. Install packeges in frontend, fill the .env and run:

   ```bash
    cd frontend
    npm install
   ```

   Fill in these variables in the frontend's .env file.

   ```bash
    VITE_URL={the url of your api}{Example: http://localhost:3000}
   ```
