import axios from "axios";
import { API } from "../api/endpoints";

export async function getDashboard() {

    try {

        const response = await axios.get(

            API.BASE_URL + API.DASHBOARD

        );

        return response.data;

    }

    catch (error) {

        throw error.response?.data || error;

    }

}