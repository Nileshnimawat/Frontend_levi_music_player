import { useState, useEffect } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { SEARCH_QUERY } from "@/utils/constants";

const useSearch = (query, delay = 400) => {
  const [results, setResults] = useState({ musics: [], artists: [], playlists: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = debounce(async () => {
      if (!query.trim()) {
        setResults({ songs: [], artists: [], playlists: [] });
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`${SEARCH_QUERY}?q=${encodeURIComponent(query)}`,{
          withCredentials: true,
        });
        setResults(res.data.results);
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setLoading(false);
      }
    }, delay);

    fetchResults();

    return () => fetchResults.cancel(); 
  }, [query, delay]);

  return { results, loading };
};

export default useSearch;

