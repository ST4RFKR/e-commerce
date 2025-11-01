import axios from "axios";


export const orderApi = {
    getOrders: async () => {

        const url = `${process.env.NEXT_PUBLIC_API_URL}/order`;
        const response = await axios.get(url);
        return response.data;
    },


};
