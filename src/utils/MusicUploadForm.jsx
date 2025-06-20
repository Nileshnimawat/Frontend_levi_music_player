import {
  useState,
  useRef,
  useDispatch,
  useSelector,
  useNavigate,
} from "./lib";

import { UPLOAD_MUSIC } from "./constants";
import toast from "react-hot-toast";
import axios from "axios";

const MusicUploadForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [musicFile, setMusicFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  const audioRef = useRef(null); 

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleMusicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusicFile(file);

      const audio = audioRef.current;
      audio.src = URL.createObjectURL(file);
      audio.load();

      audio.onloadedmetadata = () => {
        const seconds = Math.floor(audio.duration);
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const formatted = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
        setDuration(formatted);
      };
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  const handleUpload = async () => {
    if (!title || !musicFile || !coverImage || !duration) {
      toast.error("Please fill  all fields.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("url", musicFile);
      formData.append("coverImage", coverImage);
      formData.append("duration", duration); 

      const res = await axios.post(UPLOAD_MUSIC, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message || "Music uploaded successfully!");
      navigate("/");
      
    } catch (err) {
      toast.error("Upload failed");
      console.error(err);
    }finally{
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
          <h2 className="text-lg font-semibold">Upload Music</h2>
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

        {/* Cover Image Preview */}
        <div className="h-50 w-50 bg-gray-900 m-auto  flex items-center justify-center relative rounded-md overflow-hidden mb-4">
          <img
            src={coverPreview}
            alt="cover preview"
            className="absolute top-0  left-0 w-full h-full object-cover"
            onError={(e) => (e.target.src = "")}
            
          />
          <label className="cursor-pointer z-10">
            <input type="file" required
            accept="image/*" onChange={handleCoverChange} className="hidden" />
            <div className="text-gray-300 bg-black bg-opacity-50 rounded-full p-2">
              📷
            </div>
          </label>
        </div>

        {/* Music File Input */}
        <div className="mb-4">
          <label className="text-sm block mb-1">Music File</label>
          <input
            type="file"
            required
            accept="audio/*"
            onChange={handleMusicChange}
            className="w-full p-2 bg-black border border-gray-600 rounded"
          />
          {duration && (
            <p className="text-sm text-gray-400 mt-1">Duration: {duration}</p>
          )}
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
            <label className="text-sm block">Artist</label>
            <input
              type="text"
              required
              className="w-full p-2 bg-black border border-gray-600 rounded"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
        </div>
      </div>


      <audio ref={audioRef} className="hidden" />
    </>
  );
};

export default MusicUploadForm;