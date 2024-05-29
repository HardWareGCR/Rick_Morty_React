
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};
