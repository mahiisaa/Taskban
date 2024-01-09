import { useEffect } from "react";
import { AXIOS } from "../../config/axios.config";
import { projects, workspaces } from "../../constants/url";
import { useDispatch } from "react-redux";
import { addProjects, all } from "../../features/workspace/workspaceSlice";

const useWorkspace = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        AXIOS.get(workspaces.gets()).then((response) => {
            if (response.status === 200) {
                dispatch(all(response.data));
                response.data.forEach((w) => {
                    AXIOS.get(projects.gets({ wid: w.id })).then((res) => {
                        dispatch(addProjects({ id: w.id, response: res.data }));
                    });
                });
            }
        })
    }, []);
};

export default useWorkspace;
