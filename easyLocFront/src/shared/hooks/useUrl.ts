import { useLocation } from "react-router-dom";

export default function useUrl(): { pathname: string } {
  const location: { pathname: string } = useLocation();

  return location;
}
