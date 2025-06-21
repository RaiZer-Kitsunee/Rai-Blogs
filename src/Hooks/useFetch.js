import { useEffect, useState } from "react";


const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abtController = new AbortController();

        const fetchData = async () => {
          try {
            const response = await fetch(url, { signal: abtController.signal });
            if (!response.ok) {
              throw new Error("Could not fetch the data");
            }
            const data = await response.json();
            setData(data);
            setIsLoading(false);
            setError(null);
          } catch (error) {
            if (error.name === 'AbortError') {
              console.log('Fetch aborted');
            } else {
              console.error("Error fetching blogs:", error);
              setIsLoading(false);
              setError(error.message);
            }
          }
        };
        fetchData();

        return () => {
            abtController.abort();
        };
      }, [url]);

      return { data, isLoading , error};
}

export default useFetch;