import { Request, Response } from "express";
import prisma from "../config/db";

export const getMedia = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where: { userId: user.id },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.media.count({ where: { userId: user.id } }),
    ]);

    res.json({
      media,
      pagination: {
        page,
        limit,
        total,
        hasMore: skip + media.length < total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const createMedia = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const {
      title,
      type,
      director,
      budget,
      location,
      duration,
      yearTime,
      poster,
    } = req.body;

    const media = await prisma.media.create({
      data: {
        title,
        type,
        director,
        budget,
        location,
        duration,
        yearTime,
        poster,
        userId: user.id,
      },
    });

    res.status(201).json({ message: "Media created successfully", media });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateMedia = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { id } = req.params;
    const {
      title,
      type,
      director,
      budget,
      location,
      duration,
      yearTime,
      poster,
    } = req.body;

    const existingMedia = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMedia || existingMedia.userId !== user.id) {
      return res.status(404).json({ message: "Media not found" });
    }

    const media = await prisma.media.update({
      where: { id: parseInt(id) },
      data: {
        title,
        type,
        director,
        budget,
        location,
        duration,
        yearTime,
        poster,
      },
    });

    res.json({ message: "Media updated successfully", media });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteMedia = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;
    const { id } = req.params;

    const existingMedia = await prisma.media.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingMedia || existingMedia.userId !== user.id) {
      return res.status(404).json({ message: "Media not found" });
    }

    await prisma.media.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: "Media deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
