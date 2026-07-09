import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "@/features/auth/components/login";
import LoadingStart from "@/features/loading/loading-start";
import Loading from "@/features/loading/loading";
import Dashboard from "@/features/dashboard/Dashboard";
import { MainLayout } from "@/shared/layouts/MainLayout";
import Locataires from "./features/locataires/components/Locataires";
import Proprietes from "./features/proprietes/components/proprietes";
import Paiements from "./features/paiements/components/paiements";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingStart />} />
      <Route path="/loading" element={<Loading />} />
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Biens" element={<Proprietes />} />
        <Route path="/Locataires" element={<Locataires />} />
        <Route path="/Paiement" element={<Paiements />} />
      </Route>
    </Routes>
  );
}

export default App;
