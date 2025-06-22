import { Request, Response } from "express";
import Note from "../models/Note";

export const getNotes = async (_: Request, res: Response) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getNote = async (req: Request, res: Response) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postNotes = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    await newNote.save();
    res.status(201).json({ message: "Note created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const putNotes = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true }
    );
    if (!updatedNote) res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) res.status(404).json({ message: "Note not found" });
    res.status(200).json("Note deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNotes = async (_: Request, res: Response) => {
  try {
    await Note.deleteMany();
    res.status(200).json("Notes deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
