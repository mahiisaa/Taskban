import { baseAppURL } from "../config/axios.config";
import {
  boards,
  project_members,
  projects,
  task_members,
  tasks,
  workspace_members,
} from "../constants/url";

export const shareModal = (dataID) => {
  // create share modal type and link
  const shareType: string = dataID?.tid
    ? "task"
    : dataID?.pid
    ? "project"
    : "workspace";

  const url: string = `${baseAppURL}${
    dataID?.tid
      ? tasks.get({
          wid: dataID?.wid,
          pid: dataID?.pid,
          bid: 1,
          tid: dataID?.tid,
        })
      : dataID?.pid
      ? boards.gets({ wid: dataID?.wid, pid: dataID?.pid })
      : projects.gets({ wid: dataID?.wid })
  }`;

  const setMemberUrl: string = `${baseAppURL}${
    dataID?.tid
      ? task_members.post({
          wid: dataID?.wid,
          pid: dataID?.pid,
          bid: dataID.bid,
          tid: dataID?.tid,
        })
      : dataID?.pid
      ? project_members.post({ wid: dataID?.wid, pid: dataID?.pid })
      : workspace_members.post({ wid: dataID?.wid })
  }`;

  const getMembersUrl: string = `${baseAppURL}${
    dataID?.tid
      ? task_members.gets({
          wid: dataID?.wid,
          pid: dataID?.pid,
          bid: dataID.bid,
          tid: dataID?.tid,
        })
      : dataID?.pid
      ? project_members.gets({ wid: dataID?.wid, pid: dataID?.pid })
      : workspace_members.gets({ wid: dataID?.wid })
  }`;

  return { url, shareType, setMemberUrl, getMembersUrl };
};
