import { useState, useCallback } from 'react';

const baseCardsURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const baseUsersURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export const METHOD = {
  CARDS_GET_ALL: 'CARDS_GET_ALL',
  CARDS_GET_ONE: 'CARDS_GET_ONE',
  CARDS_CREATE: 'CARDS_CREATE',
  CARDS_UPDATE: 'CARDS_UPDATE',
  CARDS_GET_MY_CARDS: 'CARDS_GET_MY_CARDS',
  CARDS_DELETE: 'CARDS_DELETE',
  CARDS_LIKE_UNLIKE: 'CARDS_LIKE_UNLIKE',

  USERS_GET_ALL: 'USERS_GET_ALL',
  USERS_GET_ONE: 'USERS_GET_ONE',
  USERS_UPDATE: 'USERS_UPDATE',
  USER_REGISTER: 'USER_REGISTER',
  USER_LOGIN: 'USER_LOGIN',
  USER_UPDATE_STATUS: 'USER_UPDATE_STATUS',
  USER_DELETE: 'USER_DELETE'
};

const useAPI = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const apiCall = useCallback(async (method, payload = {}, retries = 3) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found in localStorage');
      }

      let url, options;

      switch (method) {
        case METHOD.USER_LOGIN:
          url = `${baseUsersURL}/login`;
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          };
          break;
        case METHOD.USER_REGISTER:
          url = `${baseUsersURL}/register`;
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          };
          break;
        case METHOD.USERS_GET_ONE:
          url = `${baseUsersURL}/${payload.id}`;
          options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.USERS_GET_ALL:
          url = `${baseUsersURL}`;
          options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.USERS_UPDATE:
          url = `${baseUsersURL}/${payload.id}`;
          options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload.data)
          };
          break;
        case METHOD.USER_DELETE:
          url = `${baseUsersURL}/${payload.id}`;
          options = {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.USER_UPDATE_STATUS:
          url = `${baseUsersURL}/${payload.id}/status`;
          options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: payload.status })
          };
          break;
        case METHOD.CARDS_GET_ALL:
          url = `${baseCardsURL}`;
          options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.CARDS_GET_ONE:
          url = `${baseCardsURL}/${payload.id}`;
          options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.CARDS_GET_MY_CARDS:
          url = `${baseCardsURL}/mycards`;
          options = {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.CARDS_CREATE:
          url = `${baseCardsURL}`;
          options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          };
          break;
        case METHOD.CARDS_UPDATE:
          url = `${baseCardsURL}/${payload.id}`;
          options = {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload.data)
          };
          break;
        case METHOD.CARDS_DELETE:
          url = `${baseCardsURL}/${payload.id}`;
          options = {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          };
          break;
        case METHOD.CARDS_LIKE_UNLIKE:
          url = `${baseCardsURL}/${payload.id}/like`;
          options = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ like: payload.like })
          };
          break;
        default: 
          throw new Error(`Unsupported API method: ${method}`);
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} - ${response.statusText}`);
      }

      const responseData = await response.json();
      setData(responseData);
      setError(null);
      setIsLoading(false);
      return responseData;
    } catch (error) {
      setError(error.message || 'API call failed');
      setIsLoading(false);
      if (retries > 0) {
        return apiCall(method, payload, retries - 1); // Retry mechanism
      }
      throw error;
    }
  }, []);

  return [apiCall, data, error, isLoading];
};

export default useAPI;
