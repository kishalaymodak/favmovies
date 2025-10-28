import React, { useState, useEffect } from "react";
import { mediaAPI } from "@/services/api";
import type { Media } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MediaFormProps {
  media: Media | null;
  onClose: () => void;
  onSuccess: () => void;
}

const MediaForm: React.FC<MediaFormProps> = ({ media, onClose, onSuccess }) => {
  type FormState = {
    title: string;
    type: "MOVIE" | "TV_SHOW";
    director: string;
    budget: string;
    location: string;
    duration: string;
    yearTime: string;
    poster: string;
  };

  const [formData, setFormData] = useState<FormState>({
    title: "",
    type: "MOVIE",
    director: "",
    budget: "",
    location: "",
    duration: "",
    yearTime: "",
    poster: "",
  });

  useEffect(() => {
    if (media) {
      setFormData({
        title: media.title,
        type: media.type,
        director: media.director,
        budget: media.budget,
        location: media.location,
        duration: media.duration,
        yearTime: media.yearTime,
        poster: media.poster ?? "",
      });
    }
  }, [media]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (media) {
        await mediaAPI.updateMedia(media.id, formData);
      } else {
        await mediaAPI.createMedia(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving media:", error);
      alert("Failed to save media");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{media ? "Edit Media" : "Add New Media"}</DialogTitle>
          <DialogDescription>
            {media
              ? "Update the details of your media entry."
              : "Add a new movie or TV show to your collection."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Inception"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: "MOVIE" | "TV_SHOW") =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MOVIE">Movie</SelectItem>
                <SelectItem value="TV_SHOW">TV Show</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="director">Director *</Label>
            <Input
              id="director"
              required
              value={formData.director}
              onChange={(e) =>
                setFormData({ ...formData, director: e.target.value })
              }
              placeholder="e.g., Christopher Nolan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget *</Label>
              <Input
                id="budget"
                required
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                placeholder="e.g., $160M"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                required
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                placeholder="e.g., 148 min"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <Input
              id="location"
              required
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="e.g., LA, Paris"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="yearTime">Year/Time *</Label>
            <Input
              id="yearTime"
              required
              value={formData.yearTime}
              onChange={(e) =>
                setFormData({ ...formData, yearTime: e.target.value })
              }
              placeholder="e.g., 2010 or 2008-2013"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="poster">Poster URL (Optional)</Label>
            <Input
              id="poster"
              type="url"
              value={formData.poster}
              onChange={(e) =>
                setFormData({ ...formData, poster: e.target.value })
              }
              placeholder="https://example.com/poster.jpg"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{media ? "Update" : "Create"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MediaForm;
