import { toast } from "sonner";
import { api } from "../axios.config";

export const getSteamDataByURL = async (url: string) => {
    try {
        const response = await api.post("/steam_data", { steam_profile_url: url });
        return response.data;
    } catch (error) {
        toast.error("Error in fetching data from steam");
        console.error(error);
    }
};
