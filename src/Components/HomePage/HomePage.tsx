import { ImageHeaderContainer } from "./Header/ImageHeaderContainer";
import { NavBar } from "../NavBar/NavBar";
import { PopularStoresHeading } from "./PopularStores/PopularStoresHeading";
import { CompleteGameDealsSections } from "../GameSectionComponents/GameDealsSections";
import { useRef } from "react";

export function HomePage() {
  const topRef = useRef<HTMLDivElement>(null);
  const dealRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToDeals = () => {
    if (dealRef.current) {
      dealRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Creating layout of my home page */}
      <div ref={topRef}></div>
      <NavBar scrollToTop={scrollToTop} scrollToDeals={scrollToDeals} />
      <ImageHeaderContainer scrollToDeals={scrollToDeals} />
      <div ref={dealRef}></div>
      <PopularStoresHeading />
      <CompleteGameDealsSections />
    </>
  );
}
