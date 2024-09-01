import React from "react";
import styles from "./modal..module.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className="modal-box">
        <form method="dialog">
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {children}
      </div>
    </div>
  );
};

export default Modal;
