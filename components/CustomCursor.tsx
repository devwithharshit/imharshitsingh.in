"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const activate = () => setActive(true);
    const deactivate = () => setActive(false);

    const targets = document.querySelectorAll("a, button");
    targets.forEach((target) => {
      target.addEventListener("mouseenter", activate);
      target.addEventListener("mouseleave", deactivate);
    });

    window.addEventListener("mousemove", onMove);

    return () => {
      window.removeEventListener("mousemove", onMove);
      targets.forEach((target) => {
        target.removeEventListener("mouseenter", activate);
        target.removeEventListener("mouseleave", deactivate);
      });
    };
  }, []);

  return (
    <div
      className={"cursor-ring" + (active ? " active" : "")}
      style={{ transform: `translate(${position.x - 9}px, ${position.y - 9}px)` }}
    ></div>
  );
}
