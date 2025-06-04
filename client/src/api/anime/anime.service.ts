import { toast } from "sonner";
import { api } from "../axios.config";

export const searchAnimeByName = async (query: string) => {
    try {
        const response = await api.post("/search/anime", { query });
        return response.data;
    } catch (error) {
        toast.error("Error searching for anime");
        console.error(error);
    }
};
