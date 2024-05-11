const CPPIcon = ({
  size = 17, // or any default size of your choice
  className = "",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    viewBox="0 0 256 256"
  >
      <g fill="none">
        <rect width={256} height={256} fill="#00599c" rx={60}>
          </rect>
          <path fill="#fff" d="M110.759 210.517C65.125 210.517 28 173.392 28 127.759C28 82.125 65.125 45 110.759 45c29.445 0 56.908 15.846 71.668 41.353l-35.816 20.726c-7.387-12.768-21.126-20.7-35.852-20.7c-22.817 0-41.38 18.563-41.38 41.38c0 22.816 18.563 41.379 41.38 41.379c14.727 0 28.466-7.932 35.854-20.702l35.816 20.725c-14.76 25.51-42.223 41.356-71.67 41.356"></path><path fill="#fff" d="M193.517 123.161h-9.196v-9.196h-9.194v9.196h-9.196v9.195h9.196v9.196h9.194v-9.196h9.196zm34.483 0h-9.196v-9.196h-9.194v9.196h-9.196v9.195h9.196v9.196h9.194v-9.196H228z"></path>
      </g>
    </svg>
);

export default CPPIcon;
