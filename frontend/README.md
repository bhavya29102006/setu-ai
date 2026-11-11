# Setu AI - Frontend Web Client 💻

The official client application for **Setu AI**, built with **React 19**, **Vite**, **Tailwind CSS v4**, and **Redux Toolkit**.

---

## ✨ Features

- **⚡ Modern React 19 & Vite 8**: Ultra-fast hot module replacement (HMR) and optimized build bundles.
- **🎨 Tailwind CSS v4**: Utility-first styling with modern CSS color space and variables.
- **🖥️ Monaco Editor Artifacts**: Split-screen interactive code viewing and editing for the coding agent.
- **📜 Rich Markdown & Code Syntax Highlighting**: KaTeX math rendering, GitHub Flavored Markdown tables, and syntax highlighting.
- **📎 Multimodal File Uploads**: Direct PDF and image uploads for RAG and vision analysis.
- **💳 Razorpay Payment Drawer**: Seamless plan upgrades and credit purchases.
- **🔐 Firebase Authentication**: Google OAuth one-click authentication.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8 (`@vitejs/plugin-react`, `@tailwindcss/vite`)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Editor**: `@monaco-editor/react`
- **Animations**: `motion` (Framer Motion)
- **Icons**: `lucide-react`, `react-icons`
- **Networking**: `axios` with credential cookies
- **Authentication**: `firebase/auth`

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_SERVER_URL` | API Gateway address | `http://localhost:8000` |
| `VITE_FIREBASE_API_KEY` | Firebase Web API key | Required for Google Auth |
| `VITE_RAZORPAY_KEY_ID` | Razorpay public key ID | Required for checkout |

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```
Production output is generated in the `dist/` directory.
