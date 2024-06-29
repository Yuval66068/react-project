import { useState, useEffect, useCallback } from 'react';
import { schemaTable } from '../models/apiSchemas'; 

const useAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [payload, setPayload] = useState(null);
  const [isCallAPI, setIsCallAPI] = useState(false);
  const [customHeaders, setCustomHeaders] = useState({});

  const apiCall = useCallback(async (method, payload = null, urlParams = {}) => {
    try {
      setIsLoading(true);
      const headers = {
        'Content-Type': 'application/json',
        ...customHeaders,
      };
  
      const { url, requestSchema, httpMethod } = schemaTable[method];
  
      if (!url) {
        throw new Error(`URL not specified for method: ${method}`);
      }

      // Handle URL parameters
      const finalUrl = typeof url === 'function' ? url(urlParams.id) : url;
  
      const options = {
        method: httpMethod || 'POST', // Use 'POST' as default if not specified
        headers,
      };

      if (payload) {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(finalUrl, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Check if response is JSON or plain text
      const contentType = response.headers.get('content-type');
      let responseData;
  
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
  
      setData(responseData);
    } catch (err) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [customHeaders]);

  useEffect(() => {
    if (isCallAPI && payload) {
      apiCall(payload.method, payload.data, payload.urlParams);
      setIsCallAPI(false);
    }
  }, [apiCall, isCallAPI, payload]);

  const callAPI = useCallback((method, data = null, urlParams = {}, customHeaders = {}) => {
    setPayload({ method, data, urlParams });
    setCustomHeaders({
      ...customHeaders, // Merge new customHeaders with existing ones
    });
    setIsCallAPI(true);
  }, []);

  return [data, error, isLoading, callAPI];
};

export default useAPI;
