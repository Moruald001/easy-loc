import Logo from "@/shared/components/ui/logo";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoadingStart() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(async () => {
      await navigate("/login");
    }, 3000); // 3 secondes

    return () => clearTimeout(timer);
  }, [navigate]);

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
