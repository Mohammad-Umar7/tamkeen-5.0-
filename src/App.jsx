import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Queue from "./pages/Queue";
import Health from "./pages/Health";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import { useApp } from "./state/AppState";

export default function App() {
  const { state } = useApp();
  const isProfessor = state.role === "professor";

  return (
    <Routes>
      {/* Workspace has its own full-screen shell */}
      <Route path="/workspace" element={<Workspace />} />

      {/* Landing page is a standalone page */}
      <Route path="/" element={<Landing />} />

      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/health" element={<Health />} />
        <Route 
          path="/queue" 
          element={isProfessor ? <Queue /> : <Navigate to="/dashboard" replace />} 
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
