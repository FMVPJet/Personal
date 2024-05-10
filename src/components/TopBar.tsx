import { LinkedinLogo } from "phosphor-react";
import { useEffect } from "react";
import Me from "../assets/img/me.webp";

const TopBar = () => {
  useEffect(() => (window.onscroll = () => setStickyNavbar()), []);

  // Add the 'fixed' tailwind class when the user scrolls past the LinkedIn button
  const setStickyNavbar = () => {
    const navbar = document.getElementById("topNavbar");
    const emailButton = document.getElementById("emailButton");

    const sticky = emailButton?.offsetTop;

    if (!sticky) return;

    if (window.pageYOffset >= sticky) {
      navbar?.classList.add("fixed");
      navbar?.classList.remove("hidden");
    } else {
      navbar?.classList.add("hidden");
      navbar?.classList.remove("fixed");
    }
  };

  return (
    <div
      id="topNavbar"
      className="hidden z-[3] top-0 bg-slate-900/50 text-white backdrop-blur-lg p-5 w-full"
    >
      <div className="max-w-4xl mx-auto z-[2]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img className="rounded-full w-10 h-10" src={Me} />
            <div className="leading-none">
              <p className="font-semibold text-md lg:text-xl">Jet Kwok</p>
              <p className="text-xs text-gray-400">
              Computer Vision Algorithm Engineer | MLOps
              </p>
            </div>
          </div>
          <a
            href="https://www.linkedin.com/in/guojiangtao/"
            target="_blank"
            className="bg-[#005E93] hover:bg-[#0077B5] select-none transition cursor-pointer px-4 py-2 rounded inline-flex items-center space-x-2"
          >
            <LinkedinLogo weight="bold" size={20} />
            <span className="text-sm">Connect</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
