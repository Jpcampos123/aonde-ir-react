import axiosInstance from "./api";

export default async function getDetailsEvent(id:string){

 const response  =  await axiosInstance.get(`/events/${id}`)

 return response.data;
}

