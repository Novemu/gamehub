import { BoxSVG } from "./BoxSVG";

type NavBarProps = {
  scrollToTop: () => void;
  scrollToDeals: () => void;
};

export function NavBar({ scrollToTop, scrollToDeals }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 flex justify-between bg-slate-950 pb-5 pt-5">
      <ul className="flex items-center">
        <li className="pl-20 pr-1">
          <BoxSVG />
        </li>
        <li>
          <span
            className="inline-flex text-right font-sans text-3xl font-bold text-white subpixel-antialiased hover:cursor-pointer"
            onClick={scrollToTop}
          >
            Game Hub
          </span>
        </li>
      </ul>

      <ul className="flex items-center space-x-4 pr-20">
        <li>
          <span
            className="cursor-pointer text-gray-400 hover:font-bold hover:text-white"
            onClick={scrollToTop} // Attach the scroll function to the Home link
          >
            Home
          </span>
        </li>
        <li>
          <span
            className="cursor-pointer text-gray-400 hover:font-bold hover:text-white"
            onClick={scrollToDeals}
          >
            Deals
          </span>
        </li>
        <li>
          <span className="cursor-pointer text-gray-400 hover:font-bold hover:text-white">
            About
          </span>
        </li>
      </ul>
    </nav>
  );
}
