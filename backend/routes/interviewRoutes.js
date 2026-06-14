import express from "express";
import { startInterview } from "../controllers/interviewController.js";

const router = express.Router();

router.post("/start", startInterview);

export default router;