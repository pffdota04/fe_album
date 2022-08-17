import axios from "axios";

const config = {
  withCredentials: true,
};

const API_PATH = "http://localhost:5000";
const post = async (path, data = {}) => {
  return await axios.post(API_PATH + path, data, config);
};

const get = async (path) => {
  return await axios.get(API_PATH + path, config);
};

const remove = async (path) => {
  return await axios.delete(API_PATH + path, config);
};
const put = async (path, data = {}) => {
  return await axios.put(API_PATH + path, data, config);
};

export { post, get, remove, put };
