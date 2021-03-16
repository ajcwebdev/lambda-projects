import axios from 'axios';

export const axiosWithAuth = () => {
  return axios.create({headers: {Authorization: JSON.parse(localStorage.getItem('token'))}})
}