import { Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTasksHandler,
  toggleTaskHandler,
  updateTaskHandler,
} from "./task.controller";

const router = Router();

router.get("/", getTasksHandler); // pagination, filter, search
router.post("/", createTaskHandler);

router.get("/:id", getTaskByIdHandler);
router.patch("/:id", updateTaskHandler);
router.delete("/:id", deleteTaskHandler);

router.patch("/:id/toggle", toggleTaskHandler);

export default router;
