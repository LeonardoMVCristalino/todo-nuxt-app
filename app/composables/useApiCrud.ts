import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export function useApiCrud<T>(endpoint: string) {
  // Obtenemos la instancia global de axios (inyectada mediante un plugin)
  const { $axios } = useNuxtApp()
  const api = $axios as AxiosInstance

  const getAll = async (config?: AxiosRequestConfig): Promise<T[]> => {
    const { data } = await api.get<T[]>(endpoint, config)
    return data
  }

  const getById = async (id: string | number, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await api.get<T>(`${endpoint}/${id}`, config)
    return data
  }

  const create = async (payload: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await api.post<T>(endpoint, payload, config)
    return data
  }

  const update = async (id: string | number, payload: Partial<T>, config?: AxiosRequestConfig): Promise<T> => {
    const { data } = await api.patch<T>(`${endpoint}/${id}`, payload, config)
    return data
  }

  const remove = async (id: string | number, config?: AxiosRequestConfig): Promise<void> => {
    await api.delete(`${endpoint}/${id}`, config)
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove
  }
}
