import {AxiosInstance} from 'axios';

export const getAllTodos = (httpService: AxiosInstance) => httpService.get('/todo/list');

export const getTodo = (httpService: AxiosInstance, id: string) => httpService.get(`/todo/${id}`);

export const createNewTodo = (httpService: AxiosInstance, title: string, description?: string) =>
  httpService.post('/todo', {title, description});

export const updateTodo = (
  httpService: AxiosInstance,
  id: string,
  title: string,
  description?: string
) => httpService.put(`/todo/${id}`, {title, description});

export const deleteTodo = (httpService: AxiosInstance, id: string) =>
  httpService.delete(`/todo/${id}`);

export const complete = (httpService: AxiosInstance, id: string) =>
  httpService.post(`/todo/${id}/complete`);

export const incomplete = (httpService: AxiosInstance, id: string) =>
  httpService.post(`/todo/${id}/incomplete`);
