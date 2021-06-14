import { useLoader } from "../contexts/loader-context";
import axios from 'axios';
import { getUrl } from '../api.config';

const baseURL = "https://football-for-all.herokuapp.com";

export function useAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (method, successCb, failureCb, urlObj, ...rest) => {
        const url = getUrl(urlObj);
        try {
            setLoading(true);
            const res = await axios[method](url, ...rest);
            successCb(res);
        }
        catch(error) {
            if (error.response) {
                if(typeof error.response.data.error === 'string')
                    failureCb(error.response.data.error);
                else
                    failureCb(error.response.statusText);
            } else if (error.request) {
                failureCb(error.request);
            } else {
                failureCb(error.message);
            }
        }
        finally {
            setLoading(false);
        }
    }

    return apiCall;

}