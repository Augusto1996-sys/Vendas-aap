import Axios, {AxiosInstance} from 'Axios'


export const httpClient: AxiosInstance = Axios.create({
    baseURL: "http://localhost:3333"
})