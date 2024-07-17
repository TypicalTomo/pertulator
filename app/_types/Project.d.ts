import { type Task } from "./Task";

export type Project = {
  name: string;
  description?: string;
  manager: string;
  tasks: Task[];
  unitPrice?: number;
  currency?: string;
};