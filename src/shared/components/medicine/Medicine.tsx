import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottieProps {
  animationData: any;
  width?: number;
  height?: number;
  className?: string;
}

export const Lottie: React.FC<LottieProps> = ({
  animationData,
  width = 200,
  height = 200,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let anim: AnimationItem | undefined;

  useEffect(() => {
    if (containerRef.current) {
      anim = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => {
        anim?.destroy();
      };
    }
  }, [animationData]);

  return (
    <div
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className={className}
    />
  );
};
