import { Data } from "../pages/CreateEvent/page";
import axiosInstance from "./api";

export default async function CreateNewEvent(data:Data ){

 const response  =  await axiosInstance.post(`/events`, data)

 return response.data;
}
