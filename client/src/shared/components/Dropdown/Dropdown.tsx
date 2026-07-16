import styles from "./Dropdown.module.scss";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  className: string;
  toggle: React.ReactElement;
  children: (false | React.ReactElement)[] | React.ReactElement;
}

export const Dropdown = (props: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => setOpenMenu((prev) => (prev ? false : true));

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
    <div className={`${styles.dropdownMenu} ${props.className}`} ref={menuRef}>
      <button data-dropdown="toggle" onClick={toggleMenu}>
        {props.toggle}
      </button>

      {openMenu && (
        <div data-dropdown="menu" className={styles.dropdownMenu__menu}>
          {props.children}
        </div>
      )}
    </div>
  );
};
