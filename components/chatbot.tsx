import { Link } from "@heroui/react";
import { GoArrowUpRight } from "react-icons/go";
import Image from "next/image";

interface ChatbotProps {
  chatbotUrl: string;
}

const Chatbot = ({ chatbotUrl }: ChatbotProps) => {
  return (
    <div className="relative bg-cardYellow w-full h-full group dark:bg-darkBg">
      <div className="absolute -top-40 left-40 bg-cardPink w-[135%] h-full rounded-full dark:hidden" />
      <div className="absolute top-1/2 -translate-y-1/2 left-12 md:left-20 transform -rotate-[30deg] rounded-2xl w-[80%]">
        <Image
          alt="Chatbot Interface"
          className="w-full h-full object-contain rounded-2xl"
          height={800}
          quality={60}
          sizes="(max-width: 768px) 300px, 500px"
          src={chatbotUrl}
          width={1000}
        />
      </div>
      <Link
        isExternal
        color="foreground"
        href="https://github.com/FMVPJet"
        className="no-drag absolute bg-white dark:bg-darkBg bottom-2 left-2 transition-all w-10 h-10 md:w-[2.75rem] md:h-[2.75rem] duration-500 ease-in-out group-hover:w-40 p-2 rounded-full hover:bg-default-100 border-2 border-transparent dark:border-knight flex justify-center items-center"
      >
        <span className="text-sm md:text-medium text-nowrap hidden group-hover:block invisible group-hover:visible mr-1 animate-fade">
          Chat Bot
        </span>
        <GoArrowUpRight />
      </Link>
    </div>
  );
};

export default Chatbot;
