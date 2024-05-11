import Container from "./components/Container";
import Positions from "./components/Positions";
import Me from "./assets/img/me.webp";
import Education from "./components/Education";
import { EnvelopeSimple, FilePdf, GithubLogo } from "phosphor-react";
import TechTags from "./components/TechTags";
import DevParadigmBox from "./components/DevParadigmBox";
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
  LaTeXIcon
} from "./components/icons";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";

const App = () => (
  <Container>
    <div className="flex items-start justify-between">
      <img
        className="rounded-full mb-2 border-4 border-gray-800"
        width="150px"
        height="150px"
        alt="Jet Kwok"
        src={Me}
      />
    </div>


    <div className="my-6 space-y-1">
      <a id="emailButton"></a>
    </div>

    <div className="flex items-center align-middle space-x-2">
      <h1 className="text-4xl font-bold">Jet Kwok</h1>

    </div>
    <h2 className="mt-1 text-gray-400">Computer Vision Algorithm Engineer | MLOps</h2>

    <p className="prose prose-invert min-w-full my-5">
      Hi!👋 I'm Jet Kwok from China.
    </p>
    <p className="prose prose-invert min-w-full my-5">
      I am an engineer with a strong background in AI and ML.
      I am a passionate and highly skilled engineer with a deep understanding and a robust
      foundation in Deep Learning.
    </p>
    <p className="prose prose-invert min-w-full my-5">
      My journey in the world of technology has been marked by a relentless pursuit of knowledge
      and a commitment to delivering innovative solutions. I am well-equipped to
      tackle complex projects and create seamless, user-centric experiences.
      Whether it&apos;s algorithm optimization and design, model deployment,
      project operation and maintenance, I thrive on turning challenges into opportunities for
      growth and innovation.
    </p>

    <p className="prose prose-invert min-w-full my-5">
      I am dedicated to staying at the forefront of the ever-evolving tech landscape,
      with a keen eye for detail and a knack for problem-solving, and leveraging my skills
      to make a meaningful impact in the AI development and operations field.
    </p>

    <div className="my-6 space-y-1">
      <a
        id="emailButton"
        href="mailto:JetKwok827@gmail.com"
        className="hover:underline inline-block"
      >
        <div className="flex items-center text-gray-200 hover:text-white transition-all ease-in-out">
          <EnvelopeSimple weight="fill" size="20px" className="mr-2" />
          JetKwok827@gmail.com
        </div>
      </a>

      <div className="flex items-center text-gray-400 transition-all ease-in-out">
        <FilePdf weight="fill" size="20px" className="mr-2" />
        Email me for a copy of my CV
      </div>
    </div>

    <div className="flex space-x-2">
      <a
        id="GithubButton"
        href="https://github.com/FMVPJet/"
        target="_blank"
        className="bg-[#005E93] hover:bg-[#0077B5] select-none transition cursor-pointer px-4 py-2 rounded inline-flex items-center space-x-2"
      >
        <GithubLogo weight="bold" size={20} />
        <span>Visit my Github</span>
      </a>
    </div>

    <hr className="border-gray-800 my-6" />

    <h3 className="mb-4 text-xl font-semibold">Development</h3>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16">
      <DevParadigmBox
        title="DL & ML"
        desc="1. Process raw data into usable data and manage storage.\n\n
              2. Train models, adjust parameters, evaluate, and select the best ones in the experimental environment.\n\n
              3. Have a strong interest in the field of Artificial Intelligence and am able to track the latest development trends in this field."
        techTags={[
          {
            text: "Python",
            icon: <PythonIcon />,
          },
          {
            text: "PyTorch",
            icon: <PytorchIcon />,
          },
          {
            text: "Matlab",
            icon: <MatlabIcon />,
          },
          {
            text: "OpenCV",
            icon: <OpenCVIcon />,
          },
          {
            text: "MySQL",
            icon: <MySQLIcon />,
          },
        ]}
      />
      <DevParadigmBox
        title="Ops"
        desc="1. Conduct feasibility analysis based on business objectives and requirements, and prepare technical requirements and plans. \n\n
              2. Encapsulate models and configurations, code and scripts, generate deliverables, and deploy them to the target environment. \n\n
              3. Provide monitoring and operation and maintenance capabilities for online model services in the production environment to ensure their stability and reliability."
        techTags={[
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
        ]}
      />
    </div>

    <TechTags />

    <hr className="border-gray-800 my-6" />

    <h3 className="mb-8 text-xl font-semibold">Work Experience</h3>
    <Positions />

    <h3 className="mb-8 text-xl font-semibold">Education</h3>
    <Education />
    </Container>

);

export default App;
