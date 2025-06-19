import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylists } from '../store/playlistSlice';
import { GET_PLAYLIST } from '@/utils/constants';

export const useGetAllPlaylists = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await axios.get(GET_PLAYLIST,{
          withCredentials : true
        });
        if (res.data && res.data.playlists) {
          dispatch(setPlaylists(res.data.playlists));
        }
      } catch (error) {
        console.error('Error fetching playlists:', error.message);
      }
    };

    if (loggedInUser) {
      fetchPlaylists();
    }
  }, [loggedInUser, dispatch]);
};

