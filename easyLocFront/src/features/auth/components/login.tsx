import Logo from "@/shared/components/ui/logo";
import { SignIn } from "@clerk/react";

export default function Login() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <Logo />
      <SignIn forceRedirectUrl="/loading" />
    </div>
  );
}
