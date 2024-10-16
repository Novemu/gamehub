import { useEffect, useRef, useState } from "react";
import { DropDownSVG } from "../SVGimages/DropDownSVG";

export type DropdownProps = {
  handleDealsLowToHighPrice: () => void;
  handleDealsLowToHighSavings: () => void;
  handleDealsDealsRating: () => void;
};
export function Dropdown({
  handleDealsLowToHighPrice,
  handleDealsLowToHighSavings,
  handleDealsDealsRating,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort");
  const dropdownRef = useRef(null); // Ref to detect clicks outside

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  function handlePriceLowtoHighOptionClick(option: string) {
    setSelectedOption(option);
    setIsOpen(false);
    handleDealsLowToHighPrice();
  }

  function handleSavingsLowToHighOptionClick(option: string) {
    setSelectedOption(option);
    setIsOpen(false);
    handleDealsLowToHighSavings();
  }

  function handleDealsRatingClick(option: string) {
    setSelectedOption(option);
    setIsOpen(false);
    handleDealsDealsRating();
  }

  // Detect clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      className="relative ml-6 inline-block items-center self-center"
      ref={dropdownRef}
    >
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border-2 border-white px-4 py-2 text-sm font-medium text-white hover:bg-white hover:text-black focus:outline-none"
          onClick={toggleDropdown}
        >
          {selectedOption}
          <DropDownSVG />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md border border-gray-200 bg-white shadow-lg">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() =>
                handlePriceLowtoHighOptionClick("Price Low → High")
              }
            >
              Price Low &#x2192; High
            </button>

            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() =>
                handleSavingsLowToHighOptionClick("Savings Low → High")
              }
            >
              Savings Low &#x2192; High
            </button>

            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleDealsRatingClick("Deals Rating")}
            >
              Deals Rating
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
