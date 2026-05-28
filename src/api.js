import axios from 'axios';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL =  'https://auth-microservice-f7ux.onrender.com'  // 'http://localhost:8000'; // Replace with your API URL

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/api/login`, { email, password }); // Replace '/endpoint' with your API endpoint
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed! Try again.", {
            position: "top-right",
            autoClose: 3000,
            style: { color: "white" }
        });

    }
};

export const signupUser  = async (name,email,role,password) => {
    try {
        const response = await axios.post(`${API_URL}/api/signup`,{name,email,role,password}); // Replace '/endpoint' with your API endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        if(error.response?.data?.message){
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
        }
    }
}