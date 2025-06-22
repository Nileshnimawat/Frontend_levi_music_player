import axios from "axios";
import { LOGOUT } from "@/utils/constants";
import { persistor } from "@/store/store";
import { setUser } from "@/store/userSlice";
import toast from "react-hot-toast";
import { setCurrentMusic } from "@/store/musicSlice";




export const handleLogout = async(dispatch)=>{
 
    try {
      const res = await axios.post(LOGOUT,{},{
        withCredentials: true
      })
      console.log(res)
      if(res && res.data){
        toast.success(res.data.message);
      dispatch(setUser(null));
       dispatch(setCurrentMusic(null));
      persistor.purge(); 
      } 
      
      //loggedInUser = null;
    } catch (error) {
      console.log(error);
    }
  }