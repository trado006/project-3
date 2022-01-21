import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

axios.setToken = ( token ) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export default axios;