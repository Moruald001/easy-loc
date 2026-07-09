import { useMemo, useEffect } from "react";
import { useAuth } from "@clerk/react";
import { api } from "@/api/axios";

export function useApi() {
  const { getToken } = useAuth();

  // useMemo garantit que la référence de 'api' reste STRICTEMENT la même
  // d'un rendu à l'autre, ce qui brise la boucle infinie.
  return useMemo(() => {
    // Évite d'empiler des dizaines d'intercepteurs identiques
    // On nettoie les anciens intercepteurs de requêtes s'il y en a
    api.interceptors.request.clear();

    api.interceptors.request.use(async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du token Clerk:", error);
      }
      return config;
    });

    return api;
  }, [getToken]);
}
