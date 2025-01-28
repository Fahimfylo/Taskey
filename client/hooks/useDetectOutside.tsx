import { useEffect } from "react";

interface DetectOutsideProps {
  ref: React.RefObject<HTMLElement>; // Generalize to HTMLElement
  callBack: () => void;
}

function useDetectOutside({ ref, callBack }: DetectOutsideProps) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callBack();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callBack]);
}

export default useDetectOutside;
