"use client";

import { useState, useRef } from "react";
import { Camera } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/AuthContext";
import { useAddProfilePicute } from "@/features/profile/useAddProfilePicute";

export default function ProfilePictureDialog({
  open,
  onOpenChange,
  currentImage,
  onImageChange,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null) || currentImage;
  const fileInputRef = useRef(null);
  const { userData } = useAuth();
  const addProfilePicture = useAddProfilePicute();
  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleChange = async () => {
    if (selectedFile) {
      try {
        await addProfilePicture.mutateAsync({
          image: selectedFile,
        });

        onImageChange(selectedFile);

        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

        onOpenChange(false);
        window.location.reload();
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal">
            Profile picture
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            A picture helps people recognize you and lets you know when
            you&apos;re signed in to your account
          </p>
          <div className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-secondary/50">
            Visible to anyone.
          </div>
        </DialogHeader>
        <div className="relative mx-auto mt-4 w-fit">
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="h-[280px] w-[280px] overflow-hidden rounded-full">
              <img
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : currentImage
                }
                alt="Profile"
                className="object-cover w-full h-full"
              />
            </div>
            {isHovered && (
              <label
                htmlFor="profile-picture"
                className="absolute inset-0 flex items-center justify-center rounded-full cursor-pointer bg-black/50"
              >
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  id="profile-picture"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
              </label>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            variant="secondary"
            className="mr-4 bg-sky-50 hover:bg-sky-100"
            onClick={handleChange}
            disabled={!selectedFile}
          >
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
