import { useState, useEffect } from "react";
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
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    navigate(-1); // Or any logic to hide modal
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleUpload = async () => {
    if (!title) {
      toast.error("Please provide a title.");
      return;
    }

    setLoading(true);
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
      console.log(res);
      

      if (res?.data) {
        dispatch(addPlaylist(res.data.playlist));
        toast.success(res.data.message || "Playlist created successfully!");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
      console.error(err);
    } finally {
      setLoading(false);
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
            disabled={loading}
            className={`bg-gray-800 px-4 py-1 rounded-full ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
            }`}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

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
              onChange={handleCoverChange}
            />
          </div>

          {preview && (
            <div className="mt-4">
              <p className="text-sm mb-2">Preview:</p>
              <img
                src={preview}
                alt="Cover Preview"
                className="w-full h-48 object-cover rounded border border-gray-600"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePlaylist;
