const ExperienceCard = () => {
  return (
    <div className="w-full">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
          iF
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">iFLYTEK</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Computer Vision Engineer
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            MLOps · Deep Learning · Production AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
