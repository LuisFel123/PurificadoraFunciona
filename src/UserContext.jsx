
import { createContext, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const loginUser = async (email, password) => {
        //const token = '1|eITluB32KRbKuKMgY8yQu2lUyCmyUPfQIjzdhb2s1b42fc4e';
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/validar',
                { email, password },
                //{
                  //  headers: {
                        //Authorization: `Bearer ${token}`
                    //}
                //}
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

    const registerUser = async (name, email, password) => {
        //const token = '1|eITluB32KRbKuKMgY8yQu2lUyCmyUPfQIjzdhb2s1b42fc4e';
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/userregister',
                { name, email, password },
                //{
                    //headers: {
                        //Authorization: `Bearer ${token}`
                    //}
                //}
            );
            try {
                setUser(response.data.user);
                return response;
            } catch (error) {
                console.error("No se le mandaron datos para ingresar");
            }
        } catch (error) {
            console.log("");
        }
    };


    const logoutUser = () => {
        setUser(null);
    };

    UserProvider.propTypes = {
        children: PropTypes.node 
    };

    return (
        <UserContext.Provider value={{ user, loginUser, logoutUser, registerUser }}>
            {children}
        </UserContext.Provider>
    );


};
