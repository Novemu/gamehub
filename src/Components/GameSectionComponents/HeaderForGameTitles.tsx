import { ReactElement } from "react";

export type HeaderForGameTitlesProps = {
  children: React.ReactNode;
  icon: ReactElement;
};

// Creating the header for the game titles
export function HeaderForGameTitles({
  children, //Name of the game company
  icon, //Icon of the game company
}: HeaderForGameTitlesProps) {
  // Returning the header for the game titles
  return (
    <h1 className="mt-12 text-center font-dm text-5xl font-semibold text-white">
      {icon}
      {children}
    </h1>
  );
}
