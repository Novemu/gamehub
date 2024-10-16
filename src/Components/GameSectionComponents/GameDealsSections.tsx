import { HeaderForGameTitles } from "./HeaderForGameTitles";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { SteamSVG } from "../SVGimages/SteamSVG";
import { CreateGameSectionForGameProvider } from "./CreateGameSectionForGameProvider";
import { EpicGamesSVG } from "../SVGimages/EpicGamesSVG";
import { EASVG } from "../SVGimages/EASVG";
import { BattleNetSVG } from "../SVGimages/BattleNetSVG";

// Define the DealsModel interface. This is the data received from the cheap shark api
export interface DealsModel {
  internalName: string;
  title: string;
  metacriticLink: string;
  dealID: string;
  storeID: string;
  gameID: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  savings: string;
  metacriticScore: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  steamAppID: string;
  releaseDate: number;
  lastChange: number;
  dealRating: string;
  thumb: string;
}

export function CompleteGameDealsSections() {
  // Define the state variables for the different stores. These states will hold the deals for each store
  const [steamDeals, setSteamDeals] = useState<DealsModel[]>([]);
  const [epicGamesDeals, setEpicGamesDeals] = useState<DealsModel[]>([]);
  const [originDeals, setOriginDeals] = useState<DealsModel[]>([]);
  const [battleNetDeals, setBattleNetDeals] = useState<DealsModel[]>([]);

  // Define the async function to get the deals for the main page
  // This function takes in the storeID as a parameter to determine which store to fetch data from
  function MainPageDeals(storeID: string): Promise<DealsModel[]> {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&pageSize=5`,
      );
      const data = (await response.json()) as DealsModel[];
      if (response.ok) {
        resolve(data);
      } else {
        resolve([]); // Return empty array if there's an error
      }
    });
  }

  // Use the useEffect hook to fetch the deals when the component mounts. This will fetch the first 5 deals for each store
  useEffect(() => {
    const fetchDeals = async () => {
      //Call the MainPageDeals function for each store based on its storeID
      const steamDeals = await MainPageDeals("1");
      const epicDeals = await MainPageDeals("25");
      const originDeals = await MainPageDeals("8");
      const battleNetDeals = await MainPageDeals("31");
      // Set the state variables with the data received
      setSteamDeals(steamDeals);
      setEpicGamesDeals(epicDeals);
      setOriginDeals(originDeals);
      setBattleNetDeals(battleNetDeals);
    };

    fetchDeals(); // Call the async function
  }, []);

  // Render deals function which takes a list of deals and returns a list of Card components for each deal
  function renderDeals(deals: DealsModel[]) {
    return deals.map((deal) => (
      <Card
        // Pass the deal properties as props to the Card component
        key={deal.dealID}
        id={deal.dealID}
        title={deal.title}
        salePrice={deal.salePrice}
        normalPrice={deal.normalPrice}
        savings={deal.savings}
        releaseDate={deal.releaseDate}
        thumb={deal.thumb}
      />
    ));
  }

  return (
    <>
      {/* Create the header for the game store provider */}
      <HeaderForGameTitles icon={<SteamSVG />}>Steam</HeaderForGameTitles>

      {/* Create the game section for the game provider
      Pass the renderDeals function and deals array as a prop*/}
      <CreateGameSectionForGameProvider
        renderDeals={renderDeals}
        deals={steamDeals}
        storeID="1"
      >
        Steam
      </CreateGameSectionForGameProvider>

      {/* Create a space between the sections */}
      <div className="h-10"></div>

      {/* Repeat process for all the other stores */}
      <HeaderForGameTitles icon={<EpicGamesSVG />}>
        Epic Games
      </HeaderForGameTitles>
      <CreateGameSectionForGameProvider
        renderDeals={renderDeals}
        deals={epicGamesDeals}
        storeID="25"
      >
        Epic Games
      </CreateGameSectionForGameProvider>

      <div className="h-10"></div>
      <h2 className="pt-8 text-center font-dm text-6xl font-semibold text-white">
        Other Stores
      </h2>
      <HeaderForGameTitles icon={<EASVG />}>
        Electronic Arts
      </HeaderForGameTitles>
      <CreateGameSectionForGameProvider
        renderDeals={renderDeals}
        deals={originDeals}
        storeID="8"
      >
        Electronic Arts
      </CreateGameSectionForGameProvider>

      <div className="h-10"></div>
      <HeaderForGameTitles icon={<BattleNetSVG />}>
        Battle.net
      </HeaderForGameTitles>
      <CreateGameSectionForGameProvider
        renderDeals={renderDeals}
        deals={battleNetDeals}
        storeID="31"
      >
        Battle.net
      </CreateGameSectionForGameProvider>
    </>
  );
}
