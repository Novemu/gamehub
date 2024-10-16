import type { SVGProps } from "react";

export function HomeSVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
      className="mr-3 inline-block h-14 w-14"
    >
      <path
        fill="white"
        d="M416 174.74V48h-80v58.45L256 32L0 272h64v208h144V320h96v160h144V272h64z"
      ></path>
    </svg>
  );
}
