import { useDispatch, useSelector } from "react-redux"
import { login, logout} from "../store";
import managerProjectApi from "../api/managerProjectApi";
import { useNavigate } from "react-router-dom";

export const useAuthStore = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, user} = useSelector(state => state.auth);

    const startLogin = async(user) => {
        try {
            const {data} = await managerProjectApi.post('/login', user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.user));
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            let errors = error?.response?.data?.errors;
            if(!errors){
                errors = {
                    "message": error?.response?.data?.message ?? 'Error inesperado'
                };
            }
            dispatch(logout());
            return errors;
        }
    }

    const startRegister = async(user) => {
        try {
            const {data} = await managerProjectApi.post('/register', user);
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login(data.user));
            navigate('/dashboard');
        } catch (error) {
            let errors = error?.response?.data;
            if(errors.length == 1){
                errors = {
                    "message": error?.response?.data?.message?? 'Error inesperado'
                };
            }
            dispatch(logout());
            return errors;
        }
    }

    const setLogout = () => {
        localStorage.clear();
        dispatch(logout());
    }


    const checkAuthToken = async() => {

        const token = localStorage.getItem('token');
        if(token){
            const tokenInitDate = parseInt(localStorage.getItem('token-init-date'));
            const now = new Date().getTime();
            if(now - tokenInitDate > 1800000){
                dispatch(logout());
            } else {
                try {
                    const {data} = await managerProjectApi.get('/user');
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('token-init-date', new Date().getTime());
                    dispatch(login(data.user));
                    navigate('/dashboard');
                } catch (error) {
                    dispatch(logout());
                }
            }
        } else {
            dispatch(logout());
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