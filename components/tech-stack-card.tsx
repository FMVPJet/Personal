import {
  SiPython,
  SiPytorch,
  SiTensorflow,
  SiOpencv,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";

const TechStackCard = () => {
  const techs = [
    { Icon: SiPython, name: "Python", color: "#3776AB" },
    { Icon: SiPytorch, name: "PyTorch", color: "#EE4C2C" },
    { Icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
    { Icon: SiOpencv, name: "OpenCV", color: "#5C3EE8" },
    { Icon: SiDocker, name: "Docker", color: "#2496ED" },
    { Icon: SiKubernetes, name: "K8s", color: "#326CE5" },
  ];

  return (
    <div className="w-full h-full flex flex-wrap items-center justify-center gap-4 p-2">
      {techs.map(({ Icon, name, color }) => (
        <div
          key={name}
          className="flex flex-col items-center gap-1 transition-all hover:scale-110"
          title={name}
        >
          <Icon size={32} style={{ color }} />
        </div>
      ))}
    </div>
  );
};

export default TechStackCard;
