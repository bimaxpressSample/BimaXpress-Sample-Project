import axios from 'axios';

// const API = "ec2-3-110-207-150.ap-south-1.compute.amazonaws.com";
const instance = axios.create({
  // baseURL: 'https://api.main.bimaxpress.com',
  // baseURL: 'https://www.api.bimaxpress.com',
  baseURL: 'http://127.0.0.1:8000',
  // headers: { "content-type": "multipart/form-data" },
});

export default instance;
// http://ec2-13-232-194-216.ap-south-1.compute.amazonaws.com/
