'use client';

export default function Button({onOpen, text, border}) {

  return (
    <button 
      onClick={onOpen}
      className={`${ border ? "border border-blue-700 hover:bg-blue-500 text-blue-500 hover:text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}  
      px-4 py-2 rounded-xl font-medium cursor-default hover:scale-105 transition-all duration-200 transform hover:cursor-pointer size-fit shadow-lg text-base`}
    >
        {text}   
    </button>
  );
}
