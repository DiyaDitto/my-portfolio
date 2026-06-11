import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function useScramble(text, trigger = true, speed = 30) {
  const [output, setOutput] = useState(text);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    let iteration = 0;
    const maxIterations = text.length * 3;

    const animate = () => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration / 3) return text[i];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iteration++;
      if (iteration < maxIterations) {
        rafRef.current = setTimeout(animate, speed);
      } else {
        setOutput(text);
      }
    };

    animate();
    return () => clearTimeout(rafRef.current);
  }, [text, trigger, speed]);

  return output;
}