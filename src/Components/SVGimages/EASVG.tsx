import type { SVGProps } from "react";

export function EASVG(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
      className="mr-3 inline-block h-14 w-14 rounded-md border-2 border-white"
    >
      <path
        fill="currentColor"
        d="m16.635 6.162l-5.928 9.377H4.24l1.508-2.3h4.024l1.474-2.335H2.264L.79 13.239h2.156L0 17.84h12.072l4.563-7.259l1.652 2.66h-1.401l-1.473 2.299h4.347l1.473 2.3H24zm-11.461.107L3.7 8.604l9.52-.035l1.474-2.3z"
      ></path>
    </svg>
  );
}
