"use client";

interface TDLogoProps {
  className?: string;
  color?: string;
}

export function TDLogo({ className = "w-10 h-10", color = "white" }: TDLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" rx="6" fill={color === "white" ? "#008A00" : "#008A00"} />
      <text
        x="50%"
        y="55%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={color}
        fontSize="18"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
      >
        TD
      </text>
    </svg>
  );
}
