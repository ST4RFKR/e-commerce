import axios from "axios";
import { RegisterFormData } from "../types/auth";


export const authApi = {
    registerUser: async (data: RegisterFormData) => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/register`;
        console.log('Request URL:', url);

        const response = await axios.post(url, data);
        return response.data;
    },
};
