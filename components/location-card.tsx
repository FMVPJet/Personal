import { FiMapPin } from "react-icons/fi";

const LocationCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 text-center">
      <div className="text-4xl">
        <FiMapPin className="text-red-500" />
      </div>
      <div>
        <p className="font-semibold text-lg">Zhengzhou</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">China</p>
      </div>
    </div>
  );
};

export default LocationCard;
