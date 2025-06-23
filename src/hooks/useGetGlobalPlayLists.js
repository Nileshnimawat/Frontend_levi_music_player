import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setGlobalPlaylists } from '../store/playlistSlice';
import { GET_GLOBAL_PLAYLIST } from '@/utils/constants';

export const useGetGlobalPlaylists = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get(GET_GLOBAL_PLAYLIST,{
          withCredentials : true
        });
        if (res?.data && res?.data?.playlists) {
          dispatch(setGlobalPlaylists(res.data?.playlists));
        }
      } catch (error) {
        console.error('Error fetching playlists:', error.message);
      }
    };
      fetchPlaylists();
    
  }, [ dispatch]);
};
