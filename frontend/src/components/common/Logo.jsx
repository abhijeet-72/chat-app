import React from "react";

/**
 * Renders the FLUX "Flow" logo SVG.
 * Accepts an optional 'size' prop (default is 32px).
 */
const Logo = ({ size = 32 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="logo-gradient"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4A90E2" />
          <stop offset="1" stopColor="#50E3C2" />
        </linearGradient>
      </defs>
      <path
        d="M23.1111 8.88892C23.1111 7.23079 21.7692 5.88892 20.1111 5.88892H11.8889C8.94822 5.88892 6.51855 8.31858 6.51855 11.2593V11.8889H14.7408C16.3989 11.8889 17.7408 13.2308 17.7408 14.8889V17.1111H20.1111C21.7692 17.1111 23.1111 15.7693 23.1111 14.1111V8.88892ZM8.88892 23.1111C8.88892 24.7692 10.2308 26.1111 11.8889 26.1111H20.1111C23.0518 26.1111 25.4815 23.6814 25.4815 20.7408V20.1111H17.2593C15.6011 20.1111 14.2593 18.7693 14.2593 17.1111V14.8889H11.8889C10.2308 14.8889 8.88892 16.2308 8.88892 17.8889V23.1111Z"
        fill="url(#logo-gradient)"
      />
    </svg>
  );
};

export default Logo;
