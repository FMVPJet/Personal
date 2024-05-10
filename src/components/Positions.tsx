import { BriefcaseMetal, Calendar } from "phosphor-react";
import LogoVodafone from "../assets/img/vf.webp";
import LogoAlmighty from "../assets/img/almighty.webp";
import LogoCreatorSites from "../assets/img/creatorsites.webp";
import LogoIllumiMedia from "../assets/img/illumi.webp";
import LogoRetroPlan from "../assets/img/retroplan.webp";
import LogoDoxyMe from "../assets/img/doxyme.webp";

const Positions = () => {
  const positions = [
    {
      logo: LogoDoxyMe,
      title: "iFLYTEK - Zhengzhou, CHN",
      // link: "https://doxy.me",
      description:
        "R&D Department, Computer Vision Algorithm Engineer",
      tech: ["Nest.js", "Next.js", "Agile", "TypeScript", "React"],
      role: "R&D Department, Computer Vision Algorithm Engineer",
      date: "November 2023 - Present",
    },

    {
      logo: LogoRetroPlan,
      title: "Zhengzhou Xinda Institute of Advanded Technology - Zhengzhou, CHN",
      // link: "https://retroplan.io",
      description:
        "Real-time Planning Poker and Retrospective tools for Agile teams.",
      tech: [
        "Firebase",
        "Realtime Firestore",
        "Next.js",
        "Google Cloud Functions",
      ],
      role: "Technology R&D Department, Algorithm Engineer",
      date: "March 2023 - November 2023",
    },
    {
      logo: LogoCreatorSites,
      title: "CASIVISION TECH LUOYANG CO LTD - Luoyang, CHN",
      // link: "https://creatorsites.net",
      description:
        "Enabling content creators to display their content in the best way possible.",
      tech: [
        "Vite",
        "React",
        "Node",
        "Express",
        "MongoDB",
        "CloudFlare Pages",
        "Digital Ocean & AWS",
      ],
      role: "Algorithm Research Institute, Algorithm Engineer",
      date: "July 2022 - March 2023",
    },
  ];

  return (
    <div className="relative px-4 lg:px-2 overflow-x-hidden lg:overflow-x-visible">
      <ol className="relative border-l dark:border-gray-800">
        {positions.map((p, i) => (
          <li key={i} className="mb-10 ml-6">
            <div className="bg-gray-800 px-4 py-3 rounded-lg">
              <span className="flex absolute -left-3.5 justify-center items-center w-7 h-7 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <img
                  src={p.logo}
                  alt={p.title}
                  className="w-full h-full rounded-full"
                />
              </span>
              <h3 className="flex items-center text-lg font-semibold text-gray-900 dark:text-white">
                {p.title}
              </h3>
              <p className="block mb-3 text-sm font-normal leading-none text-gray-400">
                {p.role}
              </p>
              <pre className="mb-4 text-base font-sans whitespace-pre-wrap font-normal text-gray-300">
                {p.description}
              </pre>

              {/* <a
                href={p.link}
                className="text-blue-300 underline break-all"
                target="_blank"
              >
                {p.link}
              </a> */}

              <div className="mt-4 flex flex-wrap">
                {p.tech.map((tech) => (
                  <div
                    key={tech}
                    className="mb-2 py-1 px-2 text-xs rounded-md mr-2 bg-gray-600 text-gray-2"
                  >
                    {tech}
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-400">
                <Calendar size={16} />
                <time>{p.date}</time>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Positions;
