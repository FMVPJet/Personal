import Link from "next/link";

interface LinkCardProps {
  href: string;
  icon: string;
  label: string;
  external?: boolean;
}

const LinkCard = ({ href, icon, label, external }: LinkCardProps) => {
  const content = (
    <div className="no-drag flex items-center gap-3 w-full transition-all hover:scale-105">
      <div className="text-2xl">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="flex items-center">
      {content}
    </Link>
  );
};

export default LinkCard;
