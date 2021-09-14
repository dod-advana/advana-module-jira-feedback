
import axios from 'axios';

const withCredentials = (window?.__env__?.REACT_APP_USE_WITH_CREDENTIALS || process.env.REACT_APP_USE_WITH_CREDENTIALS) !== 'false';
const REACT_APP_SUBMIT_FEEDBACK_ENDPOINT = window?.__env__?.REACT_APP_SUBMIT_FEEDBACK_ENDPOINT || process.env.REACT_APP_SUBMIT_FEEDBACK_ENDPOINT;

let axiosClient = axios.create({ withCredentials });

export const submitFeedback = (data) => axiosClient.post(REACT_APP_SUBMIT_FEEDBACK_ENDPOINT, data);
