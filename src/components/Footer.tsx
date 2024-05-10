const Footer = () => {
  return (
    <div className="mt-32 pb-12">
      <p className="text-center text-sm text-gray-300">
        Copyright &copy; {new Date().getFullYear()} Jet Kwok <br />{" "}
        <span className="text-xs text-gray-400">
        Thanks for <a href="https://github.com/ingusjan/" target="_blank">Mr.Jansons</a>
        </span>
      </p>
    </div>
  );
};

export default Footer;
