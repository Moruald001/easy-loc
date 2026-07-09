import { Outlet } from "react-router-dom";
import { Header } from "@/shared/components/ui/header";
import NavBar from "@/shared/components/ui/navBar";

export function MainLayout() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="p-6">
        <Outlet />
      </main>

      <NavBar />
    </div>
  );
}
