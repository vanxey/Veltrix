'use client';

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white border border-blue-600",
  secondary: "border border-blue-600 hover:bg-blue-600 text-blue-500 hover:text-white",
  tertiary: "border text-gray-100 border-gray-500 bg-gray-700 hover:bg-gray-700"
};

const sizes = {
  sm: "text-sm rounded-md px-2 py-2",
  md: "text-base rounded-lg px-4 py-4",
};

export default function Button({
  children,            
  variant = "primary",    
  size = "md",             
  className = "",
  ...props                  
}) {
  return (
    <button
      className={`
        font-medium cursor-pointer hover:scale-105 transition-all 
        duration-200 transform size-fit shadow-lg
        ${variants[variant]}
        ${sizes[size]}
        ${className} 
      `}
      {...props} 
    >
      {children}
    </button>
  );
}
