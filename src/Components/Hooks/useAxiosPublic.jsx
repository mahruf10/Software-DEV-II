import axios from 'axios';
import { API_URL } from '../../config';
import React from 'react';
const axiosPublic=axios.create({
  baseURL:API_URL
})
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;