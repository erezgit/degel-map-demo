import { HashRouter, Routes, Route, Navigate } from "react-router-dom"
import { HomePage } from "@/pages/HomePage"
import { LoginPage } from "@/pages/LoginPage"
import { WelcomePage } from "@/pages/WelcomePage"
import { SignupPage } from "@/pages/SignupPage"
import { SharePage } from "@/pages/SharePage"
import { StatusPage } from "@/pages/StatusPage"

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/status" element={<StatusPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
