const MarkdownIcon = ({
  size = 17, // or any default size of your choice
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    viewBox="0 0 32 32"
  >
    <path fill="none" stroke="#755838" d="M2.5 7.955h27v16.091h-27z"></path><path fill="#755838" d="M5.909 20.636v-9.272h2.727l2.728 3.409l2.727-3.409h2.727v9.272h-2.727v-5.318l-2.727 3.409l-2.728-3.409v5.318zm17.046 0l-4.091-4.5h2.727v-4.772h2.727v4.772h2.727z"></path>
  </svg>
);


export default MarkdownIcon;
