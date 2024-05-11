import { useState } from "react";
import Marquee from "react-fast-marquee";
import Checkbox from "./Checkbox";
import {
  PythonIcon,
  PytorchIcon,
  GitIcon,
  DockerIcon,
  DVCIcon,
  CPPIcon,
  MatlabIcon,
  MySQLIcon,
  OpenCVIcon,
  MarkdownIcon,
  LinuxIcon,
  LaTeXIcon,
  MinIOIcon
} from "./icons";

const tech = [
  {
    text: "Python",
    icon: <PythonIcon />,
  },
  {
    text: "C++",
    icon: <CPPIcon />,
  },
  {
    text: "Markdown",
    icon: <MarkdownIcon />,
  },
  {
    text: "LaTeX",
    icon: <LaTeXIcon />,
  },
  {
    text: "Matlab",
    icon: <MatlabIcon />,
  },
  {
    text: "MySQL",
    icon: <MySQLIcon />,
  },
  {
    text: "Pytorch",
    icon: <PytorchIcon />,
  },
  {
    text: "OpenCV",
    icon: <OpenCVIcon />,
  },
  {
    text: "Linux",
    icon: <LinuxIcon />,
  },
  {
    text: "Git",
    icon: <GitIcon />,
  },
  {
    text: "Docker",
    icon: <DockerIcon />,
  },
  {
    text: "DVC",
    icon: <DVCIcon />,
  },
  {
    text: "MinIO",
    icon: <MinIOIcon />,
  },
];

const TechTagsMarquee = () => (
  <Marquee pauseOnHover speed={25}>
    <div className="flex flex-wrap">
      {tech.map((tech) => (
        <div className="text-xs mr-2 inline-flex items-center font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gray-800 border border-gray-700">
          <div className="mr-2">{tech.icon}</div>

          {tech.text}
        </div>
      ))}
    </div>
  </Marquee>
);

const TechTags = () => {
  const [isList, setIsList] = useState(false);

  return (
    <div className="mt-6">
      <Checkbox
        value={isList}
        text="Show as List"
        onChange={() => setIsList(!isList)}
      />

      {isList ? (
        <div className="flex flex-wrap">
          {tech.map((tech) => (
            <div className="text-xs mr-2 mb-2 inline-flex items-center font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-gray-800 border border-gray-700">
              <div className="mr-2">{tech.icon}</div>

              {tech.text}
            </div>
          ))}
        </div>
      ) : (
        <TechTagsMarquee />
      )}
    </div>
  );
};

export default TechTags;
