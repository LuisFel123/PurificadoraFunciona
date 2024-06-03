
import { createContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const loginUser = async (email, password) => {
        //const token = '1|eITluB32KRbKuKMgY8yQu2lUyCmyUPfQIjzdhb2s1b42fc4e';
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/validar',
                { email, password },
                //{
                //Authorization: `Bearer ${token}`
                //}
                //} //  headers: {

            );
            try {
                setUser(response.data.user);
                return response;
            } catch (error) {
                console.error("No se le mandaron datos al usuario");
            }
        } catch (error) {
            console.log("");
        }
    };

    const registerUser = async (name, email, password,clave) => {
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/userregister',
                { name, email, password,clave }
            );
            setUser(response.data.user);
            return response;
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
                console.log(error.response.data.message)
            } else {
                setErrorMessage("Error desconocido al registrar usuario.");
            }
            throw error;
        }
    };


    const logoutUser = () => {
        setUser(null);
    };

    UserProvider.propTypes = {
        children: PropTypes.node
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, registerUser, errorMessage }}>
            {children}
        </UserContext.Provider>
    );


};
