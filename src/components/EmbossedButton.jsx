export default function EmbossedButton({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-linear-to-b from-red-500 to-red-700 text-black font-bold py-4 px-20 rounded-lg shadow-embossed hover:brightness-110 transition duration-200 ease-in-out ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
