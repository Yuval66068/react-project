const baseCardsURL =
  "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards";
const baseUsersURL =
  "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

export const METHOD = {
  CARDS_GET_ALL: "CARDS_GET_ALL",
  CARDS_GET_ALL_MY_CARDS: "CARDS_GET_ALL_MY_CARDS",
  CARDS_GET_ONE: "CARDS_GET_ONE",
  CARDS_CREATE: "CARDS_CREATE",
  CARDS_UPDATE: "CARDS_UPDATE",
  CARDS_DELETE: "CARDS_DELETE",
  CARDS_LIKE: "CARDS_LIKE",
  USERS_GET_ALL: "USERS_GET_ALL",
  USERS_GET_ONE: "USERS_GET_ONE",
  USERS_UPDATE: "USERS_UPDATE",
  AUTH_REGISTER: "AUTH_REGISTER",
  AUTH_LOGIN: "AUTH_LOGIN",
};

export const schemaTable = {
  [METHOD.AUTH_REGISTER]: {
    url: `${baseUsersURL}`,
    httpMethod: "POST",
  },
  [METHOD.AUTH_LOGIN]: {
    url: `${baseUsersURL}/login`,
    httpMethod: "POST",
  },

  [METHOD.CARDS_GET_ALL]: {
    url: `${baseCardsURL}`,
    httpMethod: "GET",
  },
  [METHOD.CARDS_CREATE]: {
    url: `${baseCardsURL}`,
    httpMethod: "POST",
  },
  [METHOD.CARDS_GET_ONE]: {
    url: (cardId) => `${baseCardsURL}/${cardId}`,
    httpMethod: "GET",
  },
  [METHOD.CARDS_UPDATE]: {
    url: (cardId) => `${baseCardsURL}/${cardId}`,
    httpMethod: "PUT",
  },
  [METHOD.USERS_GET_ALL]: {
    url: `${baseUsersURL}`,
    httpMethod: "GET",
  },
  [METHOD.USERS_GET_ONE]: {
    url: (userId) => `${baseUsersURL}/${userId}`,
    httpMethod: "GET",
  },
  [METHOD.USERS_UPDATE]: {
    url: (userId) => `${baseUsersURL}/${userId}`,
    httpMethod: "PUT",
  },
  [METHOD.CARDS_LIKE]: {
    url: (cardId) => `${baseCardsURL}/${cardId}`,
    httpMethod: "PATCH",
  },
  [METHOD.CARDS_GET_ALL_MY_CARDS]: {
    url: `${baseCardsURL}/my-cards`,
    httpMethod: "GET",
    requestSchema: {
      type: "object",
      properties: {
        title: { type: "string", minLength: 1, maxLength: 256 },
        subtitle: { type: "string", minLength: 1, maxLength: 256 },
        description: { type: "string", minLength: 1, maxLength: 1024 },
        phone: { type: "string", minLength: 10, maxLength: 20 },
        email: { type: "string", pattern: "^[^\\s@]+@[^s@]+\\.[^s@]+$" },
        web: {
          type: "string",
          pattern: "^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$",
        },
        image: {
          type: "object",
          properties: {
            url: { type: "string", minLength: 14 },
            alt: { type: "string", minLength: 2, maxLength: 256 },
          },
          required: ["url", "alt"],
        },
        address: {
          type: "object",
          properties: {
            street: { type: "string", minLength: 2, maxLength: 256 },
            city: { type: "string", minLength: 2, maxLength: 256 },
            state: {
              type: "string",
              minLength: 2,
              maxLength: 256,
              optional: true,
            },
            zip: {
              type: "string",
              minLength: 2,
              maxLength: 256,
              optional: true,
            },
            country: { type: "string", minLength: 2, maxLength: 256 },
            houseNumber: { type: "number", minimum: 1 },
          },
          required: ["street", "city", "country", "houseNumber"],
        },
      },
      required: [],
    },
  },
  [METHOD.CARDS_DELETE]: {
    url: (cardId) => `${baseCardsURL}/${cardId}`,
    httpMethod: "DELETE",
  },
};
