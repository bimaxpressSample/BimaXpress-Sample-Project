import axios from 'axios';

// const API = "ec2-3-110-207-150.ap-south-1.compute.amazonaws.com";
const instance = axios.create({
  baseURL: 'https://www.api.bimaxpress.com',
  // headers: { "content-type": "multipart/form-data" },
});

export default instance;
// http://ec2-13-232-194-216.ap-south-1.compute.amazonaws.com/
