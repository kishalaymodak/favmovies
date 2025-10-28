import { useState, useEffect, useCallback } from "react";
import { mediaAPI } from "@/services/api";
import type { Media } from "@/types";

export const useInfiniteScroll = () => {
  const [media, setMedia] = useState<Media[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMedia = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await mediaAPI.getMedia(page);
      const { media: newMedia, pagination } = response.data;

      setMedia((prev) => [...prev, ...newMedia]);
      setHasMore(pagination.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        fetchMedia();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMedia]);

  const refreshMedia = () => {
    setMedia([]);
    setPage(1);
    setHasMore(true);
  };

  return { media, loading, hasMore, fetchMedia, refreshMedia, setMedia };
};
