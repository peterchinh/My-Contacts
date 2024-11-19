import React, { useState } from "react";
import {
  FaBars,
  FaAddressBook,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { MdPerson, MdGroups, MdLogout } from "react-icons/md";
import styles from "./navbar.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Placeholder for API data
const groups = [
  { name: "Favorites" },
  { name: "Emergency Contacts" },
  { name: "+ Add Group" },
];

export default function NavBar({ setAccessToken }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGroupOpen, setIsGroupOpen] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsOpen(!isOpen); // Toggle main nav open state
  };

  const toggleGroup = () => {
    setIsGroupOpen(!isGroupOpen);
  };

  const openGroup = () => {
    setIsOpen(true);
    setIsGroupOpen(true);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/logout",
        {},
        { withCredentials: true },
      );

      if (response.status === 200) {
        console.log("Logged out successfully");
        setAccessToken(null);
        navigate("/");
      } else {
        // Handle error
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className={`${styles.navbar} ${isOpen ? styles.expanded : ""}`}>
      <button className={styles.button} onClick={toggleNav}>
        <FaBars />
      </button>
      <div className={`${styles.navMenu}`}>
        <div className={styles.navItem}>
          <button className={styles.button}>
            <MdPerson />
          </button>
          <span
            className={`${styles.navText} ${
              isOpen ? styles.slideIn : styles.slideOut
            }`}
          >
            Profile
          </span>
        </div>
        <div className={styles.navItem}>
          <button className={styles.button}>
            <FaAddressBook />
          </button>
          <span
            className={`${styles.navText} ${
              isOpen ? styles.slideIn : styles.slideOut
            }`}
          >
            All Contacts
          </span>
        </div>
        <div className={styles.navItem}>
          <button
            className={styles.button}
            onClick={isOpen ? toggleGroup : openGroup}
          >
            <MdGroups />
          </button>
          <span
            className={`${styles.navText} ${
              isOpen ? styles.slideIn : styles.slideOut
            }`}
            onClick={toggleGroup}
          >
            Groups
          </span>
          <span
            className={`${styles.navText} ${
              isOpen ? styles.slideIn : styles.slideOut
            }`}
            onClick={toggleGroup}
          >
            {isGroupOpen ? <FaChevronDown /> : <FaChevronUp />}
          </span>
        </div>
        {/* Submenu for Groups */}
        {isOpen && isGroupOpen && (
          <div
            className={`${styles.subMenu} ${
              isGroupOpen ? styles.subMenuOpen : styles.subMenuClosed
            }`}
          >
            {groups.map((group, index) => (
              <div
                key={index}
                className={styles.subMenuItem}
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                onClick={(e) => e.stopPropagation()} // Prevent click from bubbling
              >
                {group.name}
              </div>
            ))}
          </div>
        )}
        <div className={styles.navItem} onClick={handleLogout}>
          <button className={styles.button}>
            <MdLogout />
          </button>
          <span
            className={`${styles.navText} ${
              isOpen ? styles.slideIn : styles.slideOut
            }`}
          >
            Logout
          </span>
        </div>
      </div>
    </nav>
  );
}
