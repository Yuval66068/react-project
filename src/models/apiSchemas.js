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

export const schemaTable = {
    [METHOD.AUTH_REGISTER]: {
        url: `${baseUsersURL}`,
        httpMethod: 'POST',
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
        httpMethod: 'POST',
        requestSchema: {
            type: 'object',
            properties: {
                email: { type: 'string', minLength: 5 },
                password: { type: 'string', minLength: 7, maxLength: 20 }
            },
            required: ['email', 'password']
        }
    },

    [METHOD.CARDS_GET_ALL]: {
        url: `${baseCardsURL}`,
        httpMethod: 'GET',
        requestSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 256 },
                subtitle: { type: 'string', minLength: 1, maxLength: 256 },
                description: { type: 'string', minLength: 1, maxLength: 1024 },
                phone: { type: 'string', minLength: 10, maxLength: 10 },
                email: { type: 'string', pattern: '^[^\\s@]+@[^\s@]+\\.[^\s@]+$' },
                web: { type: 'string', pattern: '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$' },
                image: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', minLength: 14 },
                        alt: { type: 'string', minLength: 2, maxLength: 256 }
                    },
                    required: ['url', 'alt']
                },
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string', minLength: 2, maxLength: 256 },
                        city: { type: 'string', minLength: 2, maxLength: 256 },
                        state: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        zip: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        country: { type: 'string', minLength: 2, maxLength: 256 },
                        houseNumber: { type: 'number', minimum: 1 }
                    },
                    required: ['street', 'city', 'country', 'houseNumber']
                },
            },
            required: []
        }
    },
    [METHOD.CARDS_CREATE]: {
        url: `${baseCardsURL}`,
        httpMethod: 'POST',
        requestSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 256 },
                subtitle: { type: 'string', minLength: 1, maxLength: 256 },
                description: { type: 'string', minLength: 1, maxLength: 1024 },
                phone: { type: 'string', minLength: 10, maxLength: 10 },
                email: { type: 'string', pattern: '^[^\\s@]+@[^\s@]+\\.[^\s@]+$' },
                web: { type: 'string', pattern: '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$' },
                image: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', minLength: 14 },
                        alt: { type: 'string', minLength: 2, maxLength: 256 }
                    },
                    required: ['url', 'alt']
                },
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string', minLength: 2, maxLength: 256 },
                        city: { type: 'string', minLength: 2, maxLength: 256 },
                        state: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        zip: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        country: { type: 'string', minLength: 2, maxLength: 256 },
                        houseNumber: { type: 'number', minimum: 1 }
                    },
                    required: ['street', 'city', 'country', 'houseNumber']
                },
            },
            required: ['title', 'subtitle', 'description', 'phone', 'email', 'web', 'image', 'address']
        }
    },
    [METHOD.CARDS_GET_ONE]: {
        url: (cardId) => `${baseCardsURL}/${cardId}`,
        httpMethod: 'GET',
        requestSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 256 },
                subtitle: { type: 'string', minLength: 1, maxLength: 256 },
                description: { type: 'string', minLength: 1, maxLength: 1024 },
                phone: { type: 'string', minLength: 10, maxLength: 10 },
                email: { type: 'string', pattern: '^[^\\s@]+@[^\s@]+\\.[^\s@]+$' },
                web: { type: 'string', pattern: '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$' },
                image: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', minLength: 14 },
                        alt: { type: 'string', minLength: 2, maxLength: 256 }
                    },
                    required: ['url', 'alt']
                },
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string', minLength: 2, maxLength: 256 },
                        city: { type: 'string', minLength: 2, maxLength: 256 },
                        state: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        zip: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        country: { type: 'string', minLength: 2, maxLength: 256 },
                        houseNumber: { type: 'number', minimum: 1 }
                    },
                    required: ['street', 'city', 'country', 'houseNumber']
                },
            },
            required: []
        }
    },
    [METHOD.CARDS_UPDATE]: {
        url: (cardId) => `${baseCardsURL}/${cardId}`,
        httpMethod: 'PUT',
        requestSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', minLength: 1, maxLength: 256 },
                subtitle: { type: 'string', minLength: 1, maxLength: 256 },
                description: { type: 'string', minLength: 1, maxLength: 1024 },
                phone: { type: 'string', minLength: 10, maxLength: 10 },
                email: { type: 'string', pattern: '^[^\\s@]+@[^\s@]+\\.[^\s@]+$' },
                web: { type: 'string', pattern: '^(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})([/\\w .-]*)*/?$' },
                image: {
                    type: 'object',
                    properties: {
                        url: { type: 'string', minLength: 14 },
                        alt: { type: 'string', minLength: 2, maxLength: 256 }
                    },
                    required: ['url', 'alt']
                },
                address: {
                    type: 'object',
                    properties: {
                        street: { type: 'string', minLength: 2, maxLength: 256 },
                        city: { type: 'string', minLength: 2, maxLength: 256 },
                        state: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        zip: { type: 'string', minLength: 2, maxLength: 256, optional: true },
                        country: { type: 'string', minLength: 2, maxLength: 256 },
                        houseNumber: { type: 'number', minimum: 1 }
                    },
                    required: ['street', 'city', 'country', 'houseNumber']
                },
            },
            required: ['title', 'subtitle', 'description', 'phone', 'email', 'web', 'image', 'address']
        }
    },
    [METHOD.USERS_GET_ALL]: {
        url: `${baseUsersURL}`,
        httpMethod: 'GET',
        requestSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    [METHOD.USERS_GET_ONE]: {
        url: (userId) => `${baseUsersURL}/${userId}`,
        httpMethod: 'GET',
        requestSchema: {
            type: 'object',
            properties: {},
            required: []
        }
    },
    [METHOD.USERS_UPDATE]: {
        url: (userId) => `${baseUsersURL}/${userId}`,
        httpMethod: 'PUT',
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
                isBusiness: { type: 'boolean' },
                isAdmin: { type: 'boolean' },
                iat: { type: 'number' }
            },
            required: ['name', 'phone', 'email', 'password', 'address']
        }
    },
};
