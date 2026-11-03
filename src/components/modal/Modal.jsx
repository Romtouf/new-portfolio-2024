import React, { useEffect, useRef } from "react";
import ReactDom from "react-dom";
import { FiX } from "react-icons/fi";
import { useModalContext } from "../../context/modal-context";
import "../paper/paper.css";
import "./modal.css";

const Modal = ({ className = "", title, style, children }) => {
  const { showModal, closeModalHandler } = useModalContext();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!showModal) return undefined;
    const previous = document.activeElement;
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") closeModalHandler();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previous?.focus?.();
    };
  }, [showModal]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!showModal) return null;

  return ReactDom.createPortal(
    <>
      <div id="backdrop" onClick={closeModalHandler} />
      <div
        ref={dialogRef}
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={style}
      >
        <button type="button" className="modal__close" onClick={closeModalHandler} aria-label="Fermer">
          <FiX aria-hidden="true" />
        </button>
        {children}
      </div>
    </>,
    document.getElementById("overlays")
  );
};

export default Modal;
