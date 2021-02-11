import { useRef } from "react";

export default function TextInput({ onChange, placeholder }) {
  const ref = useRef("");
  const className = () => {
    const baseClass =
      "p-1 focus:outline-none focus:ring-2 dark:bg-gray-800 dark:text-gray-200";
    if (!ref.current.value) {
      return " " + baseClass;
    }
    return baseClass;
  };

  return (
    <div class="inline-flex">
      <label className="flex flex-col gap-1">
        <span class="text-sm text-white ">{placeholder}</span>
        <input
          type="text"
          ref={ref}
          onChange={(e) => onChange(e)}
          className={className()}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
