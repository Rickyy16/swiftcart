import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }

};

export const getProductById = async (id: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching data:', error);
    }
};