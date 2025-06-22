import express from "express";
import {
  deleteNote,
  deleteNotes,
  getNote,
  getNotes,
  postNotes,
  putNotes,
} from "../controllers/notesController";

const router = express.Router();

router.get("", getNotes);

router.get("/:id", getNote);

router.post("", postNotes);

router.put("/:id", putNotes);

router.delete("/:id", deleteNote);

router.delete("", deleteNotes);

export default router;
