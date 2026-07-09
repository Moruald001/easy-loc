// import Logo from "@/shared/components/ui/logo";
import useUrl from "@/shared/hooks/useUrl";
import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

export function Header() {
  const location = useUrl();
  let tabNameDisplay: string = "";

  switch (location.pathname) {
    case "/Dashboard":
      tabNameDisplay = "Tableau de bord";
      break;
    case "/Biens":
      tabNameDisplay = "Biens";
      break;
    case "/Locataires":
      tabNameDisplay = "Locataires";
      break;
    case "/Paiement":
      tabNameDisplay = "Paiement";
      break;
    default:
      break;
  }
  return (
    <header className="flex p-6 items-center justify-between  bg-primary-500 ">
      {/* <div className="scale-30">
        <Logo />
      </div> */}
      <Link to="/Dashboard">
        <h1 className="text-xl  font-semibold text-white">Easy-Loc</h1>
      </Link>
      <h1 className="text-lg text-amber-50/40">{tabNameDisplay}</h1>
      <UserButton
        signInUrl="/login"
        appearance={{
          elements: {
            avatarBox: "scale-150 border-2 border-white/40 shadow-md",
          },
        }}
      />
    </header>
  );
}
