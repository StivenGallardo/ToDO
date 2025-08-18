import { useDispatch, useSelector } from "react-redux"
import managerProjectApi from "../api/managerProjectApi";
import { onLoading, onSetWorkSpace} from "../store";

export const useWorkSpaceStore = () => {
    const dispatch = useDispatch();
    const {workSpaces, activeWorkSpace, selectedWorkSpace} = useSelector(state => state.workSpace);

    const startSetWorksSpaces = async () => {
        dispatch(onLoading(true));
        try {
            const {data} = await managerProjectApi.get('workspaces');
            dispatch(onSetWorkSpace(data.data));
            dispatch(onLoading(false));
        } catch (error) {
            let errors = error?.response?.data?.errors;
            if(!errors){
                errors = {
                    "message": error?.response?.data?.message ?? 'Error inesperado'
                };
            }
            dispatch(onLoading(false));
            return errors;
        }
    }

    return {
        //Properties
        workSpaces,
        activeWorkSpace,
        selectedWorkSpace,
        //Methods
        startSetWorksSpaces
    }
}