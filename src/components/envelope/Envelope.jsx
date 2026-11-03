import React, { useEffect, useRef, useState } from "react";
import { FiCheck, FiCopy, FiMail } from "react-icons/fi";
import { Ornament } from "../book/pages";
import "../paper/paper.css";
import "./envelope.css";

// Must match the letter animation in envelope.css
const OPEN_MS = 1700;

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
};

const Envelope = ({ email, subject }) => {
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false);
  const [copied, setCopied] = useState(false);
  const sealRef = useRef(null);
  const writeRef = useRef(null);
  const copiedTimer = useRef(null);

  useEffect(() => () => clearTimeout(copiedTimer.current), []);

  // Once the letter is out, keyboard users land on it.
  useEffect(() => {
    if (!open) return undefined;
    const timer = setTimeout(() => writeRef.current?.focus({ preventScroll: true }), OPEN_MS);
    return () => clearTimeout(timer);
  }, [open]);

  const openEnvelope = () => {
    setTouched(true);
    setOpen(true);
  };

  const closeEnvelope = () => {
    setOpen(false);
    setCopied(false);
    sealRef.current?.focus({ preventScroll: true });
  };

  const onCopy = async () => {
    if (!(await copyText(email))) return;
    setCopied(true);
    clearTimeout(copiedTimer.current);
    copiedTimer.current = setTimeout(() => setCopied(false), 2200);
  };

  const mailto = `mailto:${email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

  const classes = ["envelope", open && "is-open", touched && !open && "is-closing"]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="envelope__scene">
        <div className="envelope__body" onClick={open ? undefined : openEnvelope}>
          <div className="envelope__back">
            <span className="envelope__lining" />
          </div>

          <div
            id="contact-letter"
            className="envelope__letter"
            {...(open ? {} : { "aria-hidden": true, inert: "" })}
          >
            <span className="letter__eyebrow">Correspondance</span>
            <p className="letter__title">
              Une idée, un projet ?<em>Parlons-en.</em>
            </p>
            <Ornament className="letter__ornament" />
            <a className="letter__email" href={mailto}>
              {email}
            </a>
            <div className="letter__actions">
              <a ref={writeRef} className="letter__btn" href={mailto}>
                <FiMail aria-hidden="true" /> Écrire un message
              </a>
              <button type="button" className="letter__btn letter__btn--ghost" onClick={onCopy}>
                {copied ? (
                  <>
                    <FiCheck aria-hidden="true" /> Adresse copiée
                  </>
                ) : (
                  <>
                    <FiCopy aria-hidden="true" /> Copier l'adresse
                  </>
                )}
              </button>
            </div>
            <span className="letter__sign">— Romain Girard</span>
            <span className="sr-only" aria-live="polite">
              {copied ? "Adresse email copiée" : ""}
            </span>
          </div>

          <div className="envelope__pocket" aria-hidden="true">
            <span className="envelope__side envelope__side--left" />
            <span className="envelope__side envelope__side--right" />
            <span className="envelope__bottom-wrap">
              <span className="envelope__bottom" />
            </span>
          </div>

          <div className="envelope__flap-shadow" aria-hidden="true">
            <span />
          </div>
          <div className="envelope__flap" aria-hidden="true">
            <span className="envelope__flap-face envelope__flap-face--front" />
            <span className="envelope__flap-face envelope__flap-face--back" />
          </div>

          <button
            ref={sealRef}
            type="button"
            className="envelope__seal"
            onClick={openEnvelope}
            aria-label="Ouvrir l'enveloppe"
            aria-expanded={open}
            aria-controls="contact-letter"
            tabIndex={open ? -1 : 0}
          >
            <span className="envelope__seal-mark" aria-hidden="true">
              RG
            </span>
          </button>
        </div>
      </div>

      <div className="envelope__footer">
        {open ? (
          <button type="button" className="envelope__close" onClick={closeEnvelope}>
            Refermer l'enveloppe
          </button>
        ) : (
          <p className="envelope__hint">Cliquez sur le cachet pour ouvrir l'enveloppe</p>
        )}
      </div>
    </div>
  );
};

export default Envelope;
