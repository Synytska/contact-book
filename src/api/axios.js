import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'production'
        ? 'https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1'
        : '/api/v1';

const api = axios.create({
    baseURL,
    headers: {
        Authorization: 'Bearer VlP9cwH6cc7Kg2LsNPXpAvF6QNmgZn',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
});

export const getContacts = async () => {
    try {
        const response = await api.get('/contacts', {
            params: {
                sort: 'created:desc'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

export const deleteContacts = async (contactId) => {
    try {
        await api.delete(`/contact/${contactId}`);
    } catch (error) {
        console.error('Error deleting contacts:', error);
        throw error;
    }
};

export const createContact = async (firstName, lastName, email) => {
    try {
        const response = await api.post('/contact', {
            fields: {
                'first name': [{ value: firstName, modifier: '', label: 'first name' }],
                'last name': [{ value: lastName, modifier: '', label: 'last name' }],
                email: [{ value: email, modifier: '', label: 'email' }]
            },
            record_type: 'person',
            privacy: { edit: null, read: null },
            owner_id: null
        });
        return response.data;
    } catch (error) {
        console.error('Error creating contacts:', error);
        throw error;
    }
};

