
import * as React from "react";

interface MontoLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const MontoLogo = ({ className, style }: MontoLogoProps) => (
  // Use proper viewBox and sizing, match the SVG from /public/monto-logo.svg
  <svg
    className={className}
    style={style}
    width={94}
    height={28}
    viewBox="0 0 80 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    <text
      x="0"
      y="12"
      fill="#7B59FF"
      fontFamily="Arial, sans-serif"
      fontSize="14"
      fontWeight="600"
    >MONTO</text>
  </svg>
);

export { MontoLogo };
