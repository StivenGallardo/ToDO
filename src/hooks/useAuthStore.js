import { useDispatch, useSelector } from "react-redux"
import { login, logout, onLoading} from "../store";
import managerProjectApi from "../api/managerProjectApi";
import { useNavigate } from "react-router-dom";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, user} = useSelector(state => state.auth);

    const startLogin = async(user) => {
        dispatch(onLoading(true));
        try {
            const {data} = await managerProjectApi.post('/login', user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.user));
            dispatch(onLoading(false));
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            let errors = error?.response?.data;
            if(errors.length == 1){
                errors = {
                    "message": error?.response?.data?.message?? 'Error inesperado'
                };
            }
            dispatch(logout());
            dispatch(onLoading(false));
            return errors;
        }
    }

    const startRegister = async(user) => {
        dispatch(onLoading(true));
        try {
            const {data} = await managerProjectApi.post('/register', user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.user));
            dispatch(onLoading(false));
            navigate('/dashboard');
        } catch (error) {
            let errors = error?.response?.data;
            if(errors.length == 1){
                errors = {
                    "message": error?.response?.data?.message?? 'Error inesperado'
                };
            }
            dispatch(logout());
            dispatch(onLoading(false));
            return errors;
        }
    }

    const setLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }


    const checkAuthToken = async() => {
        dispatch(onLoading(true));
        const token = localStorage.getItem('token');
        if(token){
            const tokenInitDate = parseInt(localStorage.getItem('token-init-date'));
            const now = new Date().getTime();
            if(now - tokenInitDate > 1800000){
                dispatch(logout());
                dispatch(onLoading(false));
            } else {
                try {
                    const {data} = await managerProjectApi.get('/user');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('token-init-date', new Date().getTime());
                    dispatch(login(data.user));
                    navigate('/dashboard');
                    dispatch(onLoading(false));
                } catch (error) {
                    dispatch(logout());
                    dispatch(onLoading(false));
                }
            }
        } else {
            dispatch(logout());
            dispatch(onLoading(false));
        }
    }

    const checkoutAuth = () => {
        if(status === 'authenticated'){
            navigate('/dashboard');
        }
    }

    return {
        //Properties
        status,
        user,
        //Methods
        startLogin,
        startRegister,
        setLogout,
        checkoutAuth,
        checkAuthToken
    }
}