import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  Users,
  HandCoins,
  type LucideIcon,
} from "lucide-react";
import useUrl from "@/shared/hooks/useUrl";

const tabs: { name: string; path: string; icon: LucideIcon }[] = [
  {
    name: "Dashboard",
    path: "/Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Biens",
    path: "/Biens",
    icon: Building2,
  },
  {
    name: "Locataires",
    path: "/Locataires",
    icon: Users,
  },
  {
    name: "Paiement",
    path: "/Paiement",
    icon: HandCoins,
  },
];

export default function NavBar() {
  const location = useUrl();

  return (
    <div className="fixed bottom-0 left-0 right-0 px-6 pt-6 flex items-center justify-between bg-white/90 shadow-md backdrop-blur-md">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;

        return (
          <Link
            key={tab.path}
            to={tab.path}
            className="flex flex-col items-center"
          >
            <div className="flex flex-col items-center gap-1">
              <Icon
                className={`
                  transition-all duration-300
                  ${isActive ? "text-primary-600 scale-110" : "text-gray-500"}
                `}
              />

              <h1
                className={`
                  text-sm font-thin transition-colors duration-300
                  ${isActive ? "text-primary-600" : "text-text-secondary"}
                `}
              >
                {tab.name}
              </h1>
            </div>

            {/* Barre animée */}
            <div
              className={`
                h-1 mt-2 rounded-full bg-primary-500
                transition-all duration-300 ease-in-out
                ${isActive ? "w-8 opacity-100" : "w-0 opacity-0"}
              `}
            />
          </Link>
        );
      })}
    </div>
  );
}
