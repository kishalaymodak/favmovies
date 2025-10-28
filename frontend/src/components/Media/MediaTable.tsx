import React, { useEffect, useState } from "react";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MediaRow from "./MediaRow";
import MediaForm from "./MediaForm";
import type { Media } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";

const MediaTable: React.FC = () => {
  const { media, loading, fetchMedia, refreshMedia, setMedia } =
    useInfiniteScroll();
  const [showForm, setShowForm] = useState(false);
  const [editingMedia, setEditingMedia] = useState<Media | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleEdit = (mediaItem: Media) => {
    setEditingMedia(mediaItem);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setMedia((prev) => prev.filter((item) => item.id !== id));
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMedia(null);
  };

  const handleFormSuccess = () => {
    refreshMedia();
    handleFormClose();
    setTimeout(() => fetchMedia(), 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            My Media Collection
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your favorite movies and TV shows
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {showForm && (
        <MediaForm
          media={editingMedia}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Year/Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {media.length === 0 && !loading ? (
              <TableRow>
                <td colSpan={8} className="text-center py-12 text-gray-500">
                  No media found. Add your first entry!
                </td>
              </TableRow>
            ) : (
              media.map((item) => (
                <MediaRow
                  key={item.id}
                  media={item}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="ml-2 text-gray-600">Loading more...</p>
        </div>
      )}
    </div>
  );
};

export default MediaTable;
