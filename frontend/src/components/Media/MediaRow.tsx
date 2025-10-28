import React from "react";
import { mediaAPI } from "@/services/api";
import type { Media } from "@/types";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2 } from "lucide-react";

interface MediaRowProps {
  media: Media;
  onEdit: (media: Media) => void;
  onDelete: (id: number) => void;
}

const MediaRow: React.FC<MediaRowProps> = ({ media, onEdit, onDelete }) => {
  const handleDelete = async () => {
    try {
      await mediaAPI.deleteMedia(media.id);
      onDelete(media.id);
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Failed to delete media");
    }
  };

  return (
    <TableRow className="hover:bg-gray-50">
      <TableCell className="font-medium">{media.title}</TableCell>
      <TableCell>
        <Badge variant={media.type === "MOVIE" ? "default" : "secondary"}>
          {media.type.replace("_", " ")}
        </Badge>
      </TableCell>
      <TableCell>{media.director}</TableCell>
      <TableCell>{media.budget}</TableCell>
      <TableCell>{media.location}</TableCell>
      <TableCell>{media.duration}</TableCell>
      <TableCell>{media.yearTime}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => onEdit(media)}>
            <Edit className="h-4 w-4" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm">
                <Trash2 className="h-4 w-4 text-red-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete "{media.title}" from your
                  collection. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default MediaRow;
