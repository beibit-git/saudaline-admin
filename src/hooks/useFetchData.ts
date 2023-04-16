import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { errorNotification } from '../helpers/errorNotification';

interface FetchData<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

function useFetchData<T>(fetchingMethod: Promise<AxiosResponse<T>>): FetchData<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetchingMethod
        .then(({ data }) => {
          setData(data);
          setError(null);
        })
        .catch((err) => {
          errorNotification('Не удалось получить данные', err.response?.status);
          setError(error);
          setData(null);
        })
        .finally(() => setIsLoading(false));
    };
    fetchData();
  }, []);

  return { data, isLoading, error };
}

export default useFetchData;
