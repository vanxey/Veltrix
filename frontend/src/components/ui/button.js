'use client';

export default function Button({onOpen, text, border, size}) {

  return (
    <button 
      size={size}
      onClick={onOpen}
      className={`${ border ? "border border-blue-700 hover:bg-blue-500 text-blue-500 hover:text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}  
      ${ size == "md" ? "text-base rounded-lg " : "text-sm rounded-md px-2 py-1"}
      px-4 py-2 rounded-xl font-medium cursor-default hover:scale-105 transition-all duration-200 transform hover:cursor-pointer size-fit shadow-lg text-base`}
    >
        {text}   
    </button>
  );
}
