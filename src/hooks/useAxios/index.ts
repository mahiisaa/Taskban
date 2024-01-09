import { useState, useEffect } from "react";
import { AXIOS } from "../../config/axios.config";

type Body = {
  [key: string]: string
}

const useAxios = () => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetcher = async (method: 'get' | 'post' | 'put' | 'patch' | 'delete', url: string, body: Body = {}) => {
    setLoading(true)
    try {
      const res = await AXIOS[method.toLowerCase()](url, body);
      setResponse(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  }, [response, error, loading]);

  return [response, error, loading, fetcher];
};

export default useAxios;
