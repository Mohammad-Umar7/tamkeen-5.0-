import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Queue from "./pages/Queue";
import Health from "./pages/Health";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <Routes>
      {/* Workspace has its own full-screen shell */}
      <Route path="/workspace" element={<Workspace />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/health" element={<Health />} />
        <Route path="/queue" element={<Queue />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
