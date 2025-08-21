import { useDispatch, useSelector } from "react-redux"
import managerProjectApi from "../api/managerProjectApi";
import { onLoading, onSetWorkSpace, onSelectedWorkSpace} from "../store";
import { useNavigate } from "react-router-dom";

export const useWorkSpaceStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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


    const startCreateWorkSpace = async (workSpace) => {
        dispatch(onLoading(true));
        try {
            // Crear FormData para enviar el archivo correctamente
            const formData = new FormData();
            formData.append('name', workSpace?.name);
            formData.append('cover_image', workSpace.cover_image);

            const {data} = await managerProjectApi.post('workspaces', formData);
            dispatch(onSetWorkSpace([...workSpaces, data.data]));
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

    const setSelectedWorkSpace = async (workSpace) => {
        dispatch(onLoading(true));
        dispatch(onSelectedWorkSpace({...workSpace}));
        navigate(`/dashboard/workspace/${workSpace.id}`);
        dispatch(onLoading(false));
        /*try {
            const {data} = await managerProjectApi.post(`project/${project.id}/information`);
            dispatch(onSelectedWorkSpace({workSpace}));
            dispatch(onLoading(false));
            navigate('/workspace/'+workSpace.id);
        } catch (error) {
            let errors = error?.response?.data?.errors;
            if(!errors){
                errors = {
                    "message": error?.response?.data?.message ?? 'Error inesperado'
                };
            }
            dispatch(onLoading(false));
            return errors;
        }*/
    }

    return {
        //Properties
        workSpaces,
        activeWorkSpace,
        selectedWorkSpace,
        //Methods
        startSetWorksSpaces,
        startCreateWorkSpace,
        setSelectedWorkSpace,
    }
}