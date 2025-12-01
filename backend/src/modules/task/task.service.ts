import prisma from "../../prisma/client";
import { ApiError } from "../../utils/ApiError";
import { TaskStatus } from "@prisma/client";

interface TaskQueryParams {
  userId: number;
  page?: number;
  limit?: number;
  status?: TaskStatus | "ALL";
  search?: string;
}

export const createTask = async (
  userId: number,
  title: string,
  description: string
) => {
  const task = await prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });

  return task;
};

export const getTasks = async ({
  userId,
  page = 1,
  limit = 10,
  status = "ALL",
  search = "",
}: TaskQueryParams) => {
  const skip = (page - 1) * limit;

  const where: any = {
    userId,
  };

  if (status !== "ALL") {
    where.status = status;
  }

  if (search) {
    where.title = { contains: search, mode: "insensitive" };
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getTaskById = async (userId: number, id: number) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) throw new ApiError(404, "Task not found");
  return task;
};

export const updateTask = async (
  userId: number,
  id: number,
  data: { title?: string; description?: string; status?: TaskStatus }
) => {
  await getTaskById(userId, id);

  const updated = await prisma.task.update({
    where: { id },
    data,
  });

  return updated;
};

export const deleteTask = async (userId: number, id: number) => {
  await getTaskById(userId, id);

  await prisma.task.delete({
    where: { id },
  });
};

export const toggleTaskStatus = async (userId: number, id: number) => {
  const task = await getTaskById(userId, id);

  const newStatus =
    task.status === "PENDING" ? "COMPLETED" : "PENDING";

  const updated = await prisma.task.update({
    where: { id },
    data: {
      status: newStatus,
    },
  });

  return updated;
};
