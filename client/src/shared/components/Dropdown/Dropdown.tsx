import styles from "./Dropdown.module.scss";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  className: string;
  toggle: React.ReactElement;
  children: (closeMenu: () => void) => React.ReactNode;
}

export const Dropdown = ({ className, toggle, children }: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu((prev) => (prev ? false : true));
  const closeMenu = () => setOpenMenu(false);

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (!openMenu) return;

      const target = event.target as Node | null;
      if (menuRef.current && target && !menuRef.current.contains(target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, [openMenu]);

  return (
    <div className={`${styles.dropdownMenu} ${className}`} ref={menuRef}>
      <button data-dropdown="toggle" onClick={toggleMenu}>
        {toggle}
      </button>

      {openMenu && (
        <div data-dropdown="menu" className={styles.dropdownMenu__menu}>
          {children(closeMenu)}
        </div>
      )}
    </div>
  );
};
