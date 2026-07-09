import Logo from "@/shared/components/ui/logo";
import { motion } from "framer-motion";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useApi } from "@/shared/hooks/useApi";
import { useClerk } from "@clerk/react";
import toast from "react-hot-toast";

export default function Loading() {
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const api = useApi();
  console.log("render ");

  useEffect(() => {
    let isMounted = true;
    async function sync() {
      try {
        await api.get("/login");
        toast.success("Connexion réussie");
        void navigate("/Dashboard");
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la connexion");
        await signOut();
        void navigate("/login", { replace: true });
      }
    }

    void sync();
    return () => {
      isMounted = false;
    };
  }, [api, navigate]);

  return (
    <motion.div
      className="flex justify-center h-screen w-screen items-center"
      initial={{ opacity: 0.3 }}
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <Logo />
    </motion.div>
  );
}
