import { useState, useLayoutEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  function updateWindowSize() {
    setSize([window.innerWidth, window.innerHeight]);
  }

  useLayoutEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);
  return size;
}

export default useWindowSize;
