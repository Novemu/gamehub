import { useNavigate, useParams } from "react-router-dom";
import { HeaderForGameTitles } from "../GameSectionComponents/HeaderForGameTitles";
import { SteamSVG } from "../SVGimages/SteamSVG";
import { EpicGamesSVG } from "../SVGimages/EpicGamesSVG";
import { BattleNetSVG } from "../SVGimages/BattleNetSVG";
import { EASVG } from "../SVGimages/EASVG";
import { useEffect, useState } from "react";
import { Card } from "../GameSectionComponents/Card";
import { Dropdown } from "./Dropdown";

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

export function GamePageBrowser() {
  const { storeName } = useParams();
  const { storeID } = useParams();
  const [deals, setDeals] = useState<DealsModel[]>([]);
  const [page, setPage] = useState(0);
  const [searchItem, setSearchItem] = useState("");
  const [sortOption, setSortOption] = useState("Deal Rating");
  const navigate = useNavigate();

  function getIcon() {
    switch (storeName) {
      case "Steam":
        return <SteamSVG />;
      case "Epic Games":
        return <EpicGamesSVG />;
      case "Electronic Arts":
        return <EASVG />;
      case "Battle.net":
        return <BattleNetSVG />;
      default:
        return <SteamSVG />; // Return Steam svg if no valid icon type
    }
  }

  function goToHomePage() {
    navigate("/");
  }

  function GameBrowserPageDeals(
    currentPage: number = 0,
    sortOptionChoice: string = "Deal Rating",
  ): Promise<DealsModel[]> {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&pageNumber=${currentPage}&sortBy=${sortOptionChoice}`,
      );
      const data = (await response.json()) as DealsModel[];
      if (response.ok) {
        resolve(data);
      } else {
        resolve([]); // Return empty array if there's an error
      }
    });
  }

  useEffect(() => {
    const fetchDeals = async () => {
      //Call the MainPageDeals function for each store based on its storeID
      const gameDeals = await GameBrowserPageDeals(0);
      // Set the state variables with the data received
      setDeals(gameDeals);
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

  function handleSorting(sortOptionChoice: string) {
    const fetchDeals = async () => {
      //Call the MainPageDeals function for each store based on its storeID
      const gameDeals = await GameBrowserPageDeals(0, sortOptionChoice);
      // Set the state variables with the data received
      setDeals(gameDeals);
      setPage(0);
      setSortOption(sortOptionChoice);
    };

    fetchDeals(); // Call the async function
  }

  function searchPageDeals(search: string): Promise<DealsModel[]> {
    return new Promise(async (resolve) => {
      const response = await fetch(
        `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&title=${search}`,
      );
      const data = (await response.json()) as DealsModel[];
      if (response.ok) {
        resolve(data);
      } else {
        resolve([]); // Return empty array if there's an error
      }
    });
  }

  function onSearchEnter(e: any) {
    if (e.key === "Enter") {
      const fetchDeals = async () => {
        //Call the MainPageDeals function for each store based on its storeID
        const gameDeals = await searchPageDeals(searchItem);
        // Set the state variables with the data received
        setSearchItem("");
        setDeals(gameDeals);
      };

      fetchDeals(); // Call the async function
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(event.target.value);
  };

  function handlePageChange(currentPage: number) {
    const fetchDeals = async () => {
      //Call the MainPageDeals function for each store based on its storeID
      const gameDeals = await GameBrowserPageDeals(currentPage, sortOption);
      // Set the state variables with the data received
      setDeals(gameDeals);
      setPage(currentPage);
    };

    fetchDeals(); // Call the async function
  }

  console.log(page);

  return (
    <div>
      <button className="m-5" onClick={goToHomePage}>
        <span className="self-center text-white">&#x2190;</span>
        <HomeSVG />
      </button>
      <HeaderForGameTitles icon={getIcon()}>
        {storeName} Deals
      </HeaderForGameTitles>

      <div className="mt-14 flex justify-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page - 1 < 0} // Disable when there are no more previous items
          className={`block border-2 border-solid p-3 pl-6 pr-6 text-xl text-white hover:bg-white hover:text-black ${page - 1 < 0 ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Prev
        </button>
        <input
          type="text"
          placeholder="Search for games"
          className="m-2 w-1/2 rounded-md border-2 border-gray-400 p-2 text-center"
          value={searchItem}
          onChange={handleInputChange}
          onKeyDown={(e) => onSearchEnter(e)}
        />

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={deals.length < 60} // Disable when there are no more items
          className={`block border-2 border-solid p-3 pl-6 pr-6 text-xl text-white hover:bg-white hover:text-black ${deals.length < 60 ? "opacity-50" : ""}`}
        >
          Next
        </button>

        <Dropdown
          handleDealsLowToHighPrice={() => handleSorting("Price")}
          handleDealsDealsRating={() => handleSorting("Deal Rating")}
          handleDealsLowToHighSavings={() => handleSorting("Savings")}
        />
      </div>

      <div className="grid grid-cols-5 grid-rows-12">{renderDeals(deals)}</div>

      <div className="ml-10 mt-14 flex justify-between">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page - 1 < 0} // Disable when there are no more previous items
          className={`block border-2 border-solid p-3 pl-6 pr-6 text-xl text-white hover:bg-white hover:text-black ${page - 1 < 0 ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Prev
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={deals.length < 60} // Disable when there are no more items
          className={`block border-2 border-solid p-3 pl-6 pr-6 text-xl text-white hover:bg-white hover:text-black ${deals.length < 60 ? "opacity-50" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

import { HomeSVG } from "../SVGimages/HomeSVG";
