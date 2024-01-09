import { IProjects } from "./projects";

export interface IWorkspace {
  id: number;
  name: string;
  color: string;
  projects: IProjects[]
}

export interface IData {
  workspaces: IWorkspace[];
}
