import Link from "next/link";

interface LinkCardProps {
  href: string;
  icon: string;
  label: string;
  external?: boolean;
}

const LinkCard = ({ href, icon, label, external }: LinkCardProps) => {
  const content = (
    <div className="no-drag flex flex-col items-center justify-center gap-2 w-full h-full transition-all hover:scale-105">
      <div className="text-4xl">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full h-full flex items-center justify-center"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="w-full h-full flex items-center justify-center">
      {content}
    </Link>
  );
};

export default LinkCard;
