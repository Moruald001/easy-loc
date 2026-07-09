import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/react";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const publishKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster />
    <ClerkProvider publishableKey={publishKey}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
