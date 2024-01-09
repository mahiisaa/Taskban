import API_URL from "./api.url";

export const accounts = {
  gets: () => {
    return `${API_URL.Accounts}`;
  },
  get: ({ uid }) => {
    return `${API_URL.Accounts}${uid}/`;
  },
};

export const register = {
  post: () => {
    return `${API_URL.Accounts}`;
  },
};

export const user_update = {
  patch: ({ uid }) => {
    return `${API_URL.Accounts}${uid}/`;
  },
};

export const user_remove = {
  delete: ({ uid }) => {
    return `${API_URL.Accounts}${uid}`;
  },
};

export const change_password = {
  post: () => {
    return `${API_URL.ChangePassword}`;
  },
};

export const login = {
  post: () => {
    return `${API_URL.Login}`;
  },
};

export const refresh = {
  post: () => {
    return `${API_URL.Refresh}`;
  },
};

export const forget = {
  post: () => {
    return `${API_URL.Reset}`;
  },
  patch: () => {
    return `${API_URL.SetPassword}`;
  },
};

export const setting = {
  get: () => {
    return `${API_URL.Settings}`;
  },
  post: () => {
    return `${API_URL.Settings}`;
  },
};

export const workspaces = {
  gets: () => {
    return `${API_URL.WorkSpaces}`;
  },
  post: () => {
    return `${API_URL.WorkSpaces}`;
  },
  get: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/`;
  },
  delete: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/`;
  },
  patch: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/`;
  },
};

export const workspace_members = {
  gets: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Members}`;
  },
  post: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Members}`;
  },
  get: ({ wid, mid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Members}${mid}/`;
  },
  delete: ({ wid, mid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Members}${mid}/`;
  },
  patch: ({ wid, mid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Members}${mid}/`;
  },
};

export const projects = {
  gets: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}`;
  },
  post: ({ wid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}`;
  },
  get: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/`;
  },
  delete: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/`;
  },
  patch: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/`;
  },
};

export const boards = {
  gets: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}`;
  },
  post: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}`;
  },
  get: ({ wid, pid, bid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/`;
  },
  delete: ({ wid, pid, bid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/`;
  },
  patch: ({ wid, pid, bid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/`;
  },
};

export const tasks = {
  gets: ({ wid, pid, bid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}`;
  },
  post: ({ wid, pid, bid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}`;
  },
  get: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/`;
  },
  delete: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/`;
  },
  patch: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/`;
  },
};

export const task_members = {
  gets: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Assignee}`;
  },
  post: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Assignee}`;
  },
  get: ({ wid, pid, bid, tid, aid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Assignee}${aid}/`;
  },
  delete: ({ wid, pid, bid, tid, aid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Assignee}${aid}/`;
  },
};

export const task_comments = {
  gets: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Comments}`;
  },
  post: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Comments}`;
  },
  get: ({ wid, pid, bid, tid, cid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Comments}${cid}/`;
  },
  delete: ({ wid, pid, bid, tid, cid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Comments}${cid}/`;
  },
};

export const task_logs = {
  gets: ({ wid, pid, bid, tid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Logs}`;
  },
  get: ({ wid, pid, bid, tid, lid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Boards}${bid}/${API_URL.Tasks}${tid}/${API_URL.Logs}${lid}/`;
  },
};

export const project_members = {
  gets: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Members}`;
  },
  post: ({ wid, pid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Members}`;
  },
  get: ({ wid, pid, mid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Members}${mid}/`;
  },
  delete: ({ wid, pid, mid }) => {
    return `${API_URL.WorkSpaces}${wid}/${API_URL.Projects}${pid}/${API_URL.Members}${mid}/`;
  },
};

export const subscription = {
  post: () => {
    return `${API_URL.Subscription}`;
  },
};
