import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "@/features/auth/components/login";
import LoadingStart from "@/features/loading/loading-start";
import Loading from "@/features/loading/loading";
import Dashboard from "@/features/dashboard/Dashboard";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingStart />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
