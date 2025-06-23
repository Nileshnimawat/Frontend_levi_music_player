import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { GET_PLAYLIST_BY_ID } from '@/utils/constants';
import { setCurrentPlaylist } from '@/store/musicSlice';
import { setCurrentSource } from '@/store/musicSlice';

export const useGetPlaylistByID = (id) => {
  const dispatch = useDispatch();
 const [playlist, setPlaylists] = useState();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get(`${GET_PLAYLIST_BY_ID}/${id}`,{
          withCredentials : true
        });
        if (res?.data && res?.data?.playlist) {
          dispatch(setCurrentPlaylist(res.data.playlist));
           dispatch(setCurrentSource("playlist"));
        }
      } catch (error) {
        console.error('Error fetching playlists:', error.message);
      }
    };

   
      fetchPlaylists();
    
  }, [id, playlist]);

  return playlist;
};
