import axiosInstance from "./api";

export default async function getEvents(){

 const response  =  await axiosInstance.get('/events')

 return response.data;
}

