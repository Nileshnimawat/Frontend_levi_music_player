import React from 'react'
import { useSelector } from '@/utils/lib';




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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios"

import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

import { UPLOAD_MUSIC } from '@/utils/constants';

const AddMusicDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Separate state variables
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [duration, setDuration] = useState("0");
  const [albumId, setAlbumId] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const audioInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const albums = useSelector((state)=>state?.playlist?.playlists)

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setDuration("0");
    setAlbumId("");
    setAudioFile(null);
    setImageFile(null);
    if (audioInputRef.current) audioInputRef.current.value = "";
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleMusicChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setAudioFile(file);

    const audio = new Audio(URL.createObjectURL(file));

    audio.onloadedmetadata = () => {
      const seconds = Math.floor(audio.duration);
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      const formatted = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
      setDuration(formatted);
    };
  }
};


  const handleSubmit = async () => {
    if (!audioFile) {
      toast.error("Please upload an audio file");
      return;
    }
    if (!imageFile) {
      toast.error("Please upload a cover image");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a song title");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artist", artist);
      formData.append("duration", duration);
      formData.append("url", audioFile);
      formData.append("coverImage", imageFile);

      const res = await axios.post(UPLOAD_MUSIC, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      resetForm();
      setIsOpen(false);
      toast.success("Song added successfully");
    } catch (error) {
      toast.error("Failed to add song: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="mr-2 h-4 w-4" />
          Add Song
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-zinc-900 border-zinc-700 max-h-[80vh] overflow-auto hide-scrollbar">
        <DialogHeader>
          <DialogTitle className={"text-white"}>Add New Song</DialogTitle>
          <DialogDescription className={"text-white"}>Add a new song to your music library</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">Cover Image</label>
            <input
              type="file"
              ref={imageInputRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <div
              className="flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer"
              onClick={() => imageInputRef.current?.click()}
            >
              <div className="text-center">
                {imageFile ? (
                  <div className="text-sm text-emerald-500">
                    {imageFile.name.slice(0, 20)}...
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                      <Upload className="h-6 w-6 text-zinc-400" />
                    </div>
                    <div className="text-sm text-zinc-400">Upload cover image</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Audio File Upload */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <input
              type="file"
              accept="audio/*"
              required
              ref={audioInputRef}
              className="hidden"
              onChange={handleMusicChange}
            />
            <Button
              variant="outline"
              onClick={() => audioInputRef.current?.click()}
              className="w-full"
            >
              {audioFile ? audioFile.name.slice(0, 20) + "..." : "Select audio file"}
            </Button>
          </div>

          {/* Song Details */}
          <div className="space-y-2 text-white">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Song title"
            />
          </div>

          <div className="space-y-2 text-white">
            <label className="text-sm font-medium">Artist</label>
            <Input
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="bg-zinc-800 border-zinc-700"
              placeholder="Artist name"
            />
          </div>

          <div className="space-y-2 text-white">
            <label className="text-sm font-medium">Duration : {duration}</label>
          </div>

        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              setIsOpen(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-emerald-500 hover:bg-emerald-600 text-black"
            disabled={isLoading || !audioFile || !imageFile || !title.trim()}
          >
            {isLoading ? "Adding..." : "Add Song"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMusicDialog;