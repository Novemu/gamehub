export type CardProps = {
  title: string;
  salePrice: string;
  normalPrice: string;
  savings: string;
  releaseDate: number;
  thumb: string;
  id: string;
};

export function Card({
  title,
  salePrice,
  normalPrice,
  releaseDate,
  thumb,
  id,
}: CardProps) {
  return (
    <div className="ml-10 mt-10">
      <a
        href={`https://www.cheapshark.com/redirect?dealID=${id}`}
        className="block h-full w-full" // Ensures the anchor tag takes up the full card area
        target="_blank"
      >
        <div className="group h-96 w-60 overflow-hidden rounded-lg border-2 bg-gray-800 p-3 hover:cursor-pointer hover:border-orange-400">
          <img
            src={thumb}
            alt={title}
            className="h-24 w-full rounded-t-lg object-cover" // Ensures the image stays within bounds
          />
          <div className="p-4">
            <h3 className="h-20 overflow-hidden text-xl font-semibold text-white group-hover:underline">
              {title}
            </h3>

            <div className="mt-20 flex">
              <p className="self-center pr-2 text-sm font-semibold text-gray-300 line-through">
                ${normalPrice}
              </p>
              <p className="rounded-md bg-gray-700 p-1 pl-3 pr-3 text-lg font-bold text-white">
                {salePrice === "0.00" ? "FREE" : `$${salePrice}`}
              </p>
            </div>
            <p className="pt-2 text-sm font-semibold text-white">
              Made: {new Date(releaseDate * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
