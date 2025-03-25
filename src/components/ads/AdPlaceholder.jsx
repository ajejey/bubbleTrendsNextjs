"use client";

export function AdPlaceholder({ adFormat = "auto", className = "" }) {
  const getPlaceholderStyle = (format) => {
    switch (format) {
      case "rectangle":
        return "w-[300px] h-[250px]";
      case "horizontal":
        return "w-[728px] h-[90px] max-w-full";
      case "vertical":
        return "w-[160px] h-[600px]";
      default:
        return "w-full h-[250px]";
    }
  };

  return (
    <div 
      className={`ad-placeholder ${className} ${getPlaceholderStyle(adFormat)} 
        border border-gray-400/20 bg-[#242424]/10 flex items-center justify-center`}
    >
      <p className="text-gray-400/50 text-xs">Advertisement ({adFormat})</p>
    </div>
  );
}
