import { useEffect } from "react";

export const useUmami = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      const script = document.createElement("script");
      script.src = "https://umami.lezo.dev/script.js";
      script.setAttribute(
        "data-website-id",
        "9d542a7d-9f5b-49b4-b9fa-1f3947c16ec9"
      );
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);
};
