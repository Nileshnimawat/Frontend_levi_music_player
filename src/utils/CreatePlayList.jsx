import {
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { CREATE_PLAYLIST } from "./constants";
import { addPlaylist } from "../store/playlistSlice";

const CreatePlaylist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null); // cover image state

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpload = async () => {
    if (!title) {
      toast.error("Please provide a title.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const res = await axios.post(CREATE_PLAYLIST, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res?.data) dispatch(addPlaylist(res.data.playlist));

      toast.success(res.data.message || "Playlist created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={handleClose}
      ></div>

      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-1/2 bg-black text-white p-6 rounded-lg border border-gray-700 z-50">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handleClose} className="text-xl">✖</button>
          <h2 className="text-lg font-semibold">Create Playlist</h2>
          <button
            onClick={handleUpload}
            className="bg-gray-800 px-4 py-1 rounded-full hover:bg-gray-700"
          >
            Create
          </button>
        </div>

        {/* Metadata Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-sm block">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 bg-black border border-gray-600 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm block">Description</label>
            <input
              type="text"
              className="w-full p-2 bg-black border border-gray-600 rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm block">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full p-2 bg-black border border-gray-600 rounded"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;

