Project Setup & Dependencies

This file lists **all required tools, software, and packages** needed to run this project on another PC.

Prerequisites (Must be installed first)

* *Node.js** (v18+ recommended)
* **npm** (comes with Node.js)
* **Git**

Check versions:

```bash
node -v
npm -v
git --version
```
Frontend Dependencies (React)

Installed inside the `frontend/` directory:

```bash
npm install react react-dom
npm install react-router-dom
npm install axios
npm install react-hook-form
npm install react-icons
npm install jwt-decode
npm install dotenv
```

Styling (choose one)

**Tailwind CSS (recommended)**

```bash
npm install -D tailwindcss postcss autoprefixer
```

OR

**Material UI**

```bash
npm install @mui/material @emotion/react @emotion/styled
```

---

Backend Dependencies (Node.js + Express)

Installed inside the `backend/` directory:

```bash
npm install express
npm install cors
npm install dotenv
npm install body-parser
npm install morgan
```

---

Database (SQLite)

```bash
npm install sqlite3
```

ORM (recommended)

```bash
npm install sequelize
```

---

Authentication (Email + OTP + JWT)

```bash
npm install nodemailer
npm install bcryptjs
npm install jsonwebtoken
npm install express-rate-limit
```

---

Image Upload

```bash
npm install multer
```

Optional (image optimization):

```bash
npm install sharp
```

---

Development Tools

```bash
npm install -D nodemon
npm install -D eslint
```

---

Running the Project

Backend

```bash
cd backend
npm install
npm run dev
```

Frontend

```bash
cd frontend
npm install
npm run dev
```

---

Notes

* All dependencies are managed via `package.json`
* `.env` file is required for environment variables (email credentials, JWT secret, etc.)
* SQLite database file will be auto-created on first run

---

## 🏁 You're all set!

If the above steps work, the project should run successfully on any PC 🎉
