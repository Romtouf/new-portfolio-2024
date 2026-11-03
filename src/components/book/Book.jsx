import React, { useCallback, useEffect, useRef, useState } from "react";
import "../paper/paper.css";
import "./book.css";

// Must match --flip in book.css
const FLIP_MS = 900;
const STAGGER_MS = 90;

const move = (prev, target, maxPos) => {
  const to = Math.max(0, Math.min(maxPos, target));
  if (to === prev.pos) return prev;
  const count = Math.abs(to - prev.pos);
  const step = Math.min(STAGGER_MS, 480 / count);
  const delays = {};
  if (to > prev.pos) {
    for (let j = prev.pos; j < to; j++) delays[j] = Math.round((j - prev.pos) * step);
  } else {
    for (let j = to; j < prev.pos; j++) delays[j] = Math.round((prev.pos - 1 - j) * step);
  }
  return { pos: to, delays };
};

/** Current page position + per-leaf delays so multi-page jumps cascade. */
export const useBook = (maxPos) => {
  const [state, setState] = useState({ pos: 0, delays: {} });

  const goTo = useCallback(
    (target) => setState((prev) => move(prev, target, maxPos)),
    [maxPos]
  );
  const next = useCallback(
    () => setState((prev) => move(prev, prev.pos + 1, maxPos)),
    [maxPos]
  );
  const prev = useCallback(
    () => setState((p) => move(p, p.pos - 1, maxPos)),
    [maxPos]
  );

  return { ...state, goTo, next, prev };
};

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
};

// Hidden faces must not be reachable with Tab or a screen reader.
const hidden = (isHidden) =>
  isHidden ? { "aria-hidden": true, inert: "" } : {};

const Leaf = ({ index, total, flipped, delay, front, back, isRight, isLeft, onNext, onPrev }) => {
  const [turning, setTurning] = useState(false);
  const lastFlipped = useRef(flipped);

  useEffect(() => {
    if (lastFlipped.current === flipped) return undefined;
    lastFlipped.current = flipped;
    setTurning(true);
    const timer = setTimeout(() => setTurning(false), delay + FLIP_MS);
    return () => clearTimeout(timer);
  }, [flipped]); // eslint-disable-line react-hooks/exhaustive-deps

  const classes = [
    "book__leaf",
    index === 0 && "book__leaf--cover",
    flipped && "is-flipped",
    turning && "is-turning",
    isRight && "is-right",
    isLeft && "is-left",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={{ zIndex: flipped ? index + 1 : total - index, "--delay": `${delay}ms` }}
    >
      <div className="book__leaf-inner">
        <div
          className="book__face book__face--front"
          onClick={isRight ? onNext : undefined}
          {...hidden(!isRight)}
        >
          {front}
          <span className="book__gutter" />
          <span className="book__shade" />
        </div>
        <div
          className="book__face book__face--back"
          onClick={isLeft ? onPrev : undefined}
          {...hidden(!isLeft)}
        >
          {back}
          <span className="book__gutter" />
          <span className="book__shade" />
        </div>
      </div>
    </div>
  );
};

/**
 * A book made of leaves. Each leaf has a front (right page) and a back
 * (left page once turned). In "single" mode, only the front is shown.
 */
const Book = ({ leaves, base, pos, delays, single, onNext, onPrev, label }) => {
  const bookRef = useRef(null);
  const drag = useRef(null);
  const ignoreClickUntil = useRef(0);
  const [teasing, setTeasing] = useState(false);
  const total = leaves.length;

  // Lift the cover slightly the first time the book shows up, as a hint.
  useEffect(() => {
    const el = bookRef.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    let timer;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setTeasing(true);
        timer = setTimeout(() => setTeasing(false), 2600);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = (e) => {
    const start = drag.current;
    drag.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      ignoreClickUntil.current = Date.now() + 400;
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  const onClickCapture = (e) => {
    if (Date.now() < ignoreClickUntil.current) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Page edges: thicker on the side that holds more pages.
  const turned = Math.max(0, pos - 1);
  const remaining = Math.max(0, total - Math.max(pos, 1));
  const sheets = Math.max(1, total - 1);

  const classes = [
    "book",
    single ? "book--single" : "book--spread",
    pos === 0 && "is-closed",
    teasing && pos === 0 && "is-teasing",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={bookRef}
      className={classes}
      role="group"
      aria-roledescription="livre"
      aria-label={label}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (drag.current = null)}
      onClickCapture={onClickCapture}
    >
      <div
        className="book__body"
        style={{
          "--ld": `calc(${(turned / sheets).toFixed(3)} * 0.7cqw)`,
          "--rd": `calc(${(remaining / sheets).toFixed(3)} * 0.7cqw)`,
        }}
      >
        <span className="book__ribbon" aria-hidden="true" />
        <div className="book__board">{base}</div>
        <span className="book__stack book__stack--left" aria-hidden="true" />
        <span className="book__stack book__stack--right" aria-hidden="true" />
        {leaves.map((leaf, i) => (
          <Leaf
            key={leaf.key}
            index={i}
            total={total}
            flipped={i < pos}
            delay={delays[i] || 0}
            front={leaf.front}
            back={leaf.back}
            isRight={i === pos}
            isLeft={!single && i === pos - 1}
            onNext={onNext}
            onPrev={onPrev}
          />
        ))}
      </div>
    </div>
  );
};

export default Book;
