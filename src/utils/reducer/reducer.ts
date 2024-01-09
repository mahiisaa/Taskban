import { toast } from "react-toastify";

const detailsReducer = (state, action) => {
  switch (action.type) {
    case "projectModal":
      return { ...state, projectModal: !state.projectModal };
    case "workspaceNameEdit":
      return { ...state, workspaceNameEdit: !state.workspaceNameEdit };
    case "projectNameEdit":
      return { ...state, projectNameEdit: !state.projectNameEdit };
    case "colorEdit":
      return { ...state, colorEdit: !state.colorEdit };
    case "projectAlert":
      return { ...state, projectAlert: !state.projectAlert };
    case "workspaceAlert":
      return { ...state, workspaceAlert: !state.workspaceAlert };
    case "shareProject":
      return { ...state, shareProject: !state.shareProject };
      case "shareWorkspace":
        return { ...state, shareWorkspace: !state.shareWorkspace };
    case "newTask":
      return { ...state, newTask: !state.newTask };
    case "copyLink": {
      navigator.clipboard.writeText(window.location.href);
      toast.success("لینک با موفقیت در کلیپ بورد کپی شد.");
      return state;
    }
    default:
      return state;
  }
};

export { detailsReducer };
