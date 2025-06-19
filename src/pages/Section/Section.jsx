import React from 'react';
import Album from './components/Album';


const Section = () => {
  return (
    <section className="flex-1 bg-color text-white sm:p-5 overflow-y-auto hide-scrollbar rounded-xl  mt-2 h-[90%] max-h-screen w-full relative">
      <h1 className="text-lg pl-1 pt-1 sm:text-xl md:text-3xl transition hover:underline">
        Popular artists
      </h1>

      <div className="mt-2 overflow-y-auto custom-scrollbar max-h-[80vh]  w-full">
        <Album />
      </div>
    </section>
  );
};

export default Section;
