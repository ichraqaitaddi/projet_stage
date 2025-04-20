import axios from 'axios'

export  const axiosUtilisateurs = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials : true
});
