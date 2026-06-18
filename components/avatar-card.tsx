import Image from "next/image";

const AvatarCard = () => {
  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-knight">
          <Image
            src="/assets/images/profile/me.jpg"
            alt="Jet Kwok"
            width={64}
            height={64}
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold font-oleo">Jet Kwok</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Computer Vision Engineer
          </p>
        </div>
      </div>
      <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
        Building intelligent systems with computer vision and MLOps at iFLYTEK.
        Passionate about deep learning, model deployment, and creating
        production-grade AI solutions.
      </p>
    </>
  );
};

export default AvatarCard;
