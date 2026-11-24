import { useLayoutEffect } from "react";

export default function useCss(css) {
  useLayoutEffect(() => {
    const el = document.createElement("style");
    el.textContent = css;
    document.head.appendChild(el);
    return () => el.remove();
  }, [css]);
}
