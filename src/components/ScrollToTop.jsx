import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
    const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, params]);

  return null;
}
