'use client';

export default function Button({onOpen, text}) {

  return (
    <button 
        onClick={onOpen}
        className="bg-blue-700 text-white px-4 py-2 rounded-xl cursor-default hover:opacity-80 hover:cursor-pointer size-fit">
        {text}   
    </button>
  );
}
