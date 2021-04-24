import { useLoader } from "../contexts/loader-context";
import axios from 'axios';

// const baseURL = "https://stream-itt.herokuapp.com";

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (method, successCb, failureCb, url, ...rest) => {
        // url = baseURL + url;
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