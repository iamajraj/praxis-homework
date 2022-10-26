import axios from "axios";

export const BASE_URL = "https://praxis.learnedu.in";
const API_URL = "https://praxis.learnedu.in/api";

const api = axios.create({
    baseURL: API_URL,
});

const speakingApi = async () => {
    const data = await api
        .get("/speaking")
        .then((value) => value.data)
        .catch(() => {});
    return data;
};
const listeningApi = async () => {
    const data = api
        .get("/listening")
        .then((value) => value.data)
        .catch(() => {});
    return data;
};
const writingApi = async () => {
    const data = api
        .get("/writting")
        .then((value) => value.data)
        .catch(() => {});
    return data;
};
const readingApi = async () => {
    const data = api
        .get("/reading")
        .then((value) => value.data)
        .catch(() => {});
    return data;
};

export { speakingApi, listeningApi, writingApi, readingApi };
export default api;
