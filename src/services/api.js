
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
});

export const getCharacterById = async (id) => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};

export const getEpisode = async (ep) => {
  const response = await api.get('/episode/1')
  return response.data;
};

export const getbuscarPersonagem = async (ep) => {
  const response = await api.get('/personagem/')
  return response.data;
};