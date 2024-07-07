import axios from "axios";
import { Products } from "./models";

const URL = "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
});

export const fetchProducts = async (): Promise<Products[]> => {
  try {
    const response = await axiosInstance.get("/shop");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProduct = async (
  productId: string | undefined
): Promise<Products> => {
  try {
    const response = await axiosInstance.get(`/shop/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
