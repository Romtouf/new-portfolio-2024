import { useEffect, useState } from "react";

/** Id of the section currently crossing the middle of the screen. */
const useActiveSection = (ids) => {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");

  useEffect(() => {
    const sections = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return undefined;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band in the middle of the screen
      { rootMargin: "-45% 0px -54% 0px" }
    );
    sections.forEach((section) => io.observe(section));
    return () => io.disconnect();
  }, [key]);

  return active;
};

export default useActiveSection;
