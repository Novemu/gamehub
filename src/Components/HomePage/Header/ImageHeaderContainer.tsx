import { HeaderImage } from "./HeaderImage";

type ImageHeaderContainerProps = {
  scrollToDeals: () => void;
};
export function ImageHeaderContainer({
  scrollToDeals,
}: ImageHeaderContainerProps) {
  return (
    // Creating the image header container
    <div className="relative">
      {/* Getting the image from the header image component */}
      <HeaderImage />
      {/* Creating the text on the image */}
      <span className="absolute left-44 top-1/4 font-dm text-7xl font-semibold text-white">
        Game Deals
      </span>
      <span className="absolute left-44 top-72 text-xl text-gray-400">
        Discover the best game deals from top providers in<br></br>the industry.
        Explore a vast collection of <br></br>discounted games and save big on
        your favourite titles
      </span>
      <button
        className="text-1xl absolute left-44 top-2/3 rounded-md bg-orange-500 pb-3 pl-7 pr-7 pt-3 hover:cursor-pointer"
        onClick={scrollToDeals}
      >
        Find your Deals
      </button>
    </div>
  );
}
