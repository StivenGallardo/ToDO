import {  useSelector } from "react-redux"

export const useUiStore = () => {

    const {
        loading
    } = useSelector(state => state.ui);


    return {
        //Properties

        loading,
        //Methods

    }
}