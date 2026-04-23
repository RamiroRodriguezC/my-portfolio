import api from '../api/api'

export const login = async (mail, password) => {
  const res = await api.post('/usuarios/login', { mail, password })
  return res.data
}

export const register = async (userData) => {
  const res = await api.post('/usuarios/create', userData)
  return res.data
}