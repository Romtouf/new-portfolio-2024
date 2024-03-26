import React from "react";
import { Fragment } from "react";
import ReactDom from "react-dom";
import Card from "../card/Card";
import { useModalContext } from "../../context/modal-context";
import "./modal.css";

const Modal = ({ className, children }) => {
  const { showModal, closeModalHandler } = useModalContext();
  return (
    <Fragment>
      {showModal &&
        ReactDom.createPortal(
          <>
            <section id="backdrop" onClick={closeModalHandler}></section>
            <Card className={className}>{children}</Card>
          </>,
          document.getElementById("overlays")
        )}
    </Fragment>
  );
};

export default Modal;
