import { useState, useEffect, useCallback } from 'react';

const baseCardsURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const baseUsersURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export const METHOD = {
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_GET_ONE: 'CARDS_GET_ONE',
  CARDS_CREATE: 'CARDS_CREATE',
  CARDS_UPDATE: 'CARDS_UPDATE',
  CARDS_DELETE: 'CARDS_DELETE',
  USERS_GET_ALL: 'USERS_GET_ALL',
  USERS_GET_ONE: 'USERS_GET_ONE',
  USERS_UPDATE: 'USERS_UPDATE',
  AUTH_REGISTER: 'AUTH_REGISTER',
  AUTH_LOGIN: 'AUTH_LOGIN',
};

const useAPI = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [payload, setPayload] = useState(null);
  const [isCallAPI, setIsCallAPI] = useState(false);

  const schemaTable = {
    [METHOD.AUTH_REGISTER]: {
      url: `${baseUsersURL}`,
      requestSchema: {
        type: 'object',
        properties: {
          name: {
            type: 'object',
            properties: {
              first: { type: 'string', minLength: 2, maxLength: 256 },
              middle: { type: 'string', minLength: 2, maxLength: 256 },
              last: { type: 'string', minLength: 2, maxLength: 256 },
            },
            required: ['first', 'last']
          },
          phone: { type: 'string', minLength: 10, maxLength: 10 },
          email: { type: 'string', pattern: '^[^\\s@]+@[^\s@]+\\.[^\s@]+$' },
          password: { type: 'string', minLength: 8 },
          image: {
            type: 'object',
            properties: {
              url: { type: 'string', minLength: 14 },
              alt: { type: 'string', minLength: 2, maxLength: 256 }
            }
          },
          address: {
            type: 'object',
            properties: {
              state: { type: 'string', minLength: 2, maxLength: 256 },
              country: { type: 'string', minLength: 2, maxLength: 256 },
              city: { type: 'string', minLength: 2, maxLength: 256 },
              street: { type: 'string', minLength: 2, maxLength: 256 },
              houseNumber: { type: 'string', minLength: 2, maxLength: 256 },
              zip: { type: 'string', minLength: 2, maxLength: 256 }
            },
            required: ['country', 'city', 'street', 'houseNumber']
          },
          isBusiness: { type: 'boolean' }
        },
        required: ['name', 'phone', 'email', 'password', 'address']
      }
    },
    [METHOD.AUTH_LOGIN]: {
      url: `${baseUsersURL}/login`,
      requestSchema: {
        type: 'object',
        properties: {
          email: { type: 'string', minLength: 5 },
          password: { type: 'string', minLength: 7, maxLength: 20 }
        },
        required: ['email', 'password']
      }
    },
    // Add other methods as needed
  };

  const apiCall = useCallback(async (method, payload = null) => {
    try {
      setIsLoading(true);
      const headers = {
        'Content-Type': 'application/json',
      };

      const { url, requestSchema } = schemaTable[method];

      if (!url) {
        throw new Error(`URL not specified for method: ${method}`);
      }

      if (requestSchema) {
        // Validate request payload against schema
        validateRequestSchema(requestSchema, payload);
      }

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Request failed');
      }

      setData(responseData);
    } catch (err) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const validateRequestSchema = (schema, data) => {
    // Implement request schema validation if needed
    // You can use libraries like ajv for JSON schema validation
  };

  useEffect(() => {
    if (isCallAPI && payload) {
      apiCall(payload.method, payload.data);
      setIsCallAPI(false);
    }
  }, [apiCall, isCallAPI, payload]);

  const callAPI = useCallback((method, data = null) => {
    setPayload({ method, data });
    setIsCallAPI(true);
  }, []);

  return [data, error, isLoading, callAPI];
};

export default useAPI;
