import axios from "axios";
import store from "../store";

const instance = axios.create({
  baseURL: "https://sports-api.sportsbookengine.com/api",
  timeout: 45000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

instance.interceptors.request.use(config => {
  const access_token = store.state.auth.access_token;
  if (access_token) config.headers["Authorization"] = `Bearer ${access_token}`;

  return config;
});

// // instance.defaults.withCredentials = true
// instance.defaults.headers.post['Content-Type'] = 'application/json';
// // instance.defaults.method = "post";
export default instance;
