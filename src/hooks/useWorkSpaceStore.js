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


    const startCreateWorkSpace = async (workSpace) => {
        dispatch(onLoading(true));
        try {
            // Crear FormData para enviar el archivo correctamente
            const formData = new FormData();
            formData.append('name', workSpace?.name);
            formData.append('cover_image', workSpace.cover_image);
            // Agrega otros campos si es necesario
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

    return {
        //Properties
        workSpaces,
        activeWorkSpace,
        selectedWorkSpace,
        //Methods
        startSetWorksSpaces,
        startCreateWorkSpace
    }
}