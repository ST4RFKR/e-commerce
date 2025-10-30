import axios from "axios";
import { Profile } from "../model/profile-schema";


export const profileApi = {

    updateProfile: async ({ id, data }: { id: number; data: Omit<Profile, 'confirmPassword'> }) => {
        const response = await axios.patch(`/api/user/${id}`, data)
        return response.data
    },

};
