import React from "react";
import Footer from "@/Layouts/components/Footer";
import ArtistCarousel from "./components/ArtistCorousel";
import AlbumCarousel from "./components/AlbumCarousel";
import SongList from "./components/SongList";
import { useSelector } from "react-redux";
import edSheeran from "@/assets/ed-sheeran-background.jpg"
import taylorSwift from "@/assets/taylor-swift.jpg"

const artistsData = [
  {
    name: "Ed Sheeran",
    banner: edSheeran,
    listeners: 82736050,
  },
  {
    name: "Taylor Swift",
    banner: taylorSwift,
    listeners: 101234567,
  },
  
];

const Section = () => {
  const allMusics = useSelector((state) => state?.music?.allMusics);
  const filteredMusics = useSelector((state) => state?.music?.filteredMusics);
  const data = filteredMusics?.length > 0 ? filteredMusics : allMusics;

  const myPlaylists = useSelector((state)=>state.playlist.playlists);

  return (
    <section className="flex-1 bg-[#121212] text-white sm:p-2  rounded-xl h-[90%] max-h-screen w-full relative overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth">
      {/* Artist Header Section Carousel */}
      <ArtistCarousel artists={artistsData} />

     
      <AlbumCarousel data={data} title={"Popular Releases" }/>

      <AlbumCarousel data={myPlaylists} title={"My PlayLists" }/>


      <h1 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 pl-2">Popular Songs</h1>
      <SongList data={data} />

      <Footer />
    </section>
  );
};

export default Section;
