import { useRef } from "react";

export default function TextInput({ onChange, placeholder }) {
  const ref = useRef("");
  const className = () => {
    const defaultClass = "p-1 focus:outline-none focus:ring-2";
    if (!ref.current.value) {
      return "bg-red-100 border-red-500 " + defaultClass;
    }
    return defaultClass;
  };

  return (
    <div class="inline-flex">
      <label className="flex flex-col gap-1">
        <span class="text-sm text-white">{placeholder}</span>
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
