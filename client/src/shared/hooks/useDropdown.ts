import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const toggle = () => setOpenDropdown((prev) => !prev);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!openDropdown) return;

      const target = e.target as Node | null;
      // Check if clicked outside of the dropdown
      if (
        dropdownRef.current &&
        target &&
        !dropdownRef.current.contains(target)
      )
        setOpenDropdown(false);
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, [openDropdown]);

  return { dropdownRef, openDropdown, toggle };
};
