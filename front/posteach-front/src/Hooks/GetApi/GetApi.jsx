import { useState, useEffect } from 'react';

export const GetApi = (url, token) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          setError('Token não encontrado, faça login novamente');
          setLoading(false);
          return;
        }
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorBody = await response.text();
          throw new Error(`Erro na requisição: ${response.status} - ${errorBody || response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [token, url]);

  return { data, loading, error };
};

export default GetApi;