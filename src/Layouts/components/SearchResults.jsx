import React from "react";
import AlbumCarousel from "@/pages/Section/components/AlbumCarousel";
import SongList from "@/pages/Section/components/SongList";
import { useLocation } from "react-router-dom";
import useSearch from "@/hooks/useSearch";

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
  const query = useQuery().get("q") || "";
  const { results, loading } = useSearch(query);

  return (
    <section className="flex-1 bg-[#121212] text-white sm:p-2 rounded-xl h-[90%] max-h-screen w-full relative overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth">
      <h1 className="text-2xl font-semibold mb-4 pl-2 pt-2">
        Search Results for "<span className="text-[#1db954]">{query}</span>"
      </h1>

      {loading && <p className="pl-2">Loading...</p>}

      {!loading && results?.musics?.length === 0 &&
        results?.artists?.length === 0 &&
        results?.playlists?.length === 0 && (
          <p className="pl-2">No results found.</p>
      )}

      {/* Artists */}
      {results?.artists?.length > 0 && (
        <>
          <AlbumCarousel data={results?.artists} title="Artists" />
        </>
      )}

      {/* Playlists */}
      {results?.playlists?.length > 0 && (
        <>

          <AlbumCarousel data={results?.playlists} title="Playlists" />
        </>
      )}

      {/* Songs */}
      {results?.musics?.length > 0 && (
        <>
          <h2 className="text-xl font-semibold mt-6 pl-2">Songs</h2>
          <SongList data={results?.musics} />
        </>
      )}

    </section>
  );
};

export default SearchResults;

