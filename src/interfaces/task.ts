import { members_thumb } from "./members_thumb";

export interface ITask {
  id: number;
  name: string;
  description: string;
  created_at: string;
  deadline: string;
  priority: number;
  attachment: string | null;
  thumbnail: string;
  order?: number;
  color?: string;
  members?: members_thumb[];
}

export interface ITaskData {
  tasks: ITask[];
}
