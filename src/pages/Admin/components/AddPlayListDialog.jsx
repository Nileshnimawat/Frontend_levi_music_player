import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { CREATE_PLAYLIST } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { addPlaylist } from "@/store/playlistSlice";

const AddPlayListDialog = ({ name, isGlobal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const location = useLocation();
  const isAdmin = location.pathname === "/admin";

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      toast.error("Please upload an image");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("coverImage", imageFile);
      formData.append("isGlobal", isGlobal ? "true" : "false");
      if(isAdmin){
         formData.append("region", region);
      formData.append("category", category);
      }

      const res = await axios.post(CREATE_PLAYLIST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      if (res) {
        if (!isAdmin) dispatch(addPlaylist(res.data.playlist));
        toast.success(res.data.message || "Playlist created successfully!");
      }
    } catch (error) {
      toast.error(
        "Failed to create playlist: " +
          (error.response?.data?.message || error.message)
      );
    }

    resetForm();
    setDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-500 hover:bg-violet-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle className={"text-white"}>Add New PlayList</DialogTitle>
          <DialogDescription>
            Create a new playlist for your collection
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* File Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
            required
          />
          <div
            className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="text-center">
              <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                <Upload className="h-6 w-6 text-zinc-400" />
              </div>
              <div className="text-sm text-zinc-400 mb-2">
                {imageFile ? imageFile.name : "Upload playlist cover"}
              </div>
              <Button variant="outline" size="sm" className="text-xs ">
                Choose File
              </Button>
            </div>
          </div>

          {/* Title Input */}
          <div className="space-y-2 text-white">
            <label className="text-sm font-medium">Playlist Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter playlist title"
              required
            />
          </div>

          {/* Description Input */}
          <div className="space-y-2 text-white">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter artist (optional)"
            />
          </div>

          { isAdmin && 
            <div className="space-y-2 text-white">
              <label className="text-sm font-medium">Region</label>
              <Input
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter region (optional)"
              />
            </div>
          }

          { isAdmin && 
            <div className="space-y-2 text-white">
              <label className="text-sm font-medium">Category</label>
              <Input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-zinc-800 border-zinc-700"
                placeholder="Enter category (optional)"
              />
            </div>
          }
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setDialogOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-violet-500 hover:bg-violet-600"
            disabled={isLoading || !imageFile || !title.trim()}
          >
            {isLoading ? "Creating..." : "Add PlayList"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlayListDialog;
