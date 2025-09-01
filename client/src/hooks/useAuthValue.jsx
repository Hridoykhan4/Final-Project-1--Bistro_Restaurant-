import { useContext } from "react";
import AuthContext from "../providers/Auth/AuthContext";

const useAuthValue = () => {
    return useContext(AuthContext)
};

export default useAuthValue;