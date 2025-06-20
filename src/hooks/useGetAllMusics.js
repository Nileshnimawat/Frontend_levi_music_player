export const useGetAllMusics = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleApi = async () => {
      try {
        const res = await axios.get(GET_MUSICS, {
          withCredentials: true
        });

        if (res.data && res.data.musics) {
          const allMusics = res.data.musics;
          dispatch(setAllMusics(allMusics));
        }
      } catch (error) {
        console.error("Error fetching music:", error);
      }
    };

    handleApi();
  }, []); 
};
