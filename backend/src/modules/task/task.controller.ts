import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { apiResponse } from "../../utils/apiResponse";
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  toggleTaskStatus,
  updateTask,
} from "./task.service";
import {
  createTaskSchema,
  updateTaskSchema,
} from "./task.validation";
import { ApiError } from "../../utils/ApiError";

export const createTaskHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const { title, description } = createTaskSchema.parse(req.body);
    const task = await createTask(req.user.id, title, description);

    return res.status(201).json(apiResponse(task, "Task created"));
  }
);

export const getTasksHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");

    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const status = (req.query.status as string) || "ALL";
    const search = (req.query.search as string) || "";

    const result = await getTasks({
      userId: req.user.id,
      page,
      limit,
      status: status as any,
      search,
    });

    return res.json(apiResponse(result, "Tasks fetched"));
  }
);

export const getTaskByIdHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const id = parseInt(req.params.id, 10);
    const task = await getTaskById(req.user.id, id);
    return res.json(apiResponse(task, "Task fetched"));
  }
);

export const updateTaskHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const id = parseInt(req.params.id, 10);
    const data = updateTaskSchema.parse(req.body);

    const updated = await updateTask(req.user.id, id, data as any);
    return res.json(apiResponse(updated, "Task updated"));
  }
);

export const deleteTaskHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const id = parseInt(req.params.id, 10);

    await deleteTask(req.user.id, id);
    return res.status(204).send();
  }
);

export const toggleTaskHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    if (!req.user) throw new ApiError(401, "Unauthorized");
    const id = parseInt(req.params.id, 10);

    const updated = await toggleTaskStatus(req.user.id, id);
    return res.json(apiResponse(updated, "Task status toggled"));
  }
);
