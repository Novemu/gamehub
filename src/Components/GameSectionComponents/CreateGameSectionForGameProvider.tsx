import { DealsModel } from "./GameDealsSections";
import { useNavigate } from "react-router-dom";

export type DealSectionProps = {
  renderDeals: any;
  deals: DealsModel[];
  children: React.ReactNode;
  storeID: string;
};

export function CreateGameSectionForGameProvider({
  renderDeals, //Function to render the deals as card components
  deals, //Array of deals
  children,
  storeID,
}: DealSectionProps) {
  const navigate = useNavigate();

  function goToGameBrowsePage() {
    // navigate("/browse", { state: { gameId: 123, name: "Example Game" } });
    navigate(`/browse/${children}/${storeID}`, {
      state: { children: children, storeID: storeID },
    });
  }

  return (
    <>
      {/* Create the game section for the game provider */}
      {/* Call the render deals function with the current list of deals. This will return a list of card components for the deals */}
      <div className="flex">{renderDeals(deals)}</div>
      {/* Create a button to see more deals */}
      <div className="flex justify-center">
        <button
          onClick={goToGameBrowsePage}
          className="mt-8 block border-2 border-solid p-3 pl-6 pr-6 text-xl text-white hover:bg-white hover:text-black"
        >
          See More Deals
        </button>
      </div>
    </>
  );
}
