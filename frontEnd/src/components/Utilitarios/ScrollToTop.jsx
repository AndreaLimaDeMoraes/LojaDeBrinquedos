import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname, search]); // Reseta o scroll se mudar a página ou o filtro (?categoria=...)

  return null;
};

export default ScrollToTop;