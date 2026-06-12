import type { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface ResponseData<T> {
  data: T
  message: string
}

export interface ResponseDataAll<T> {
  data: T[]
}

export interface CrudClient<T> {
  getAll: (config?: AxiosRequestConfig) => Promise<ResponseDataAll<T>>
  getById: (id: string | number, config?: AxiosRequestConfig) => Promise<T>
  create: (payload: Partial<T>, config?: AxiosRequestConfig) => Promise<ResponseData<T>>
  update: (id: string | number, payload: Partial<T>, config?: AxiosRequestConfig) => Promise<ResponseData<T>>
  remove: (id: string | number, config?: AxiosRequestConfig) => Promise<ResponseData<void>>
}

// Factoría que genera los métodos HTTP mapeados
export function createCrudClient<T>(api: AxiosInstance, endpoint: string): CrudClient<T> {
  return {
    getAll: async config => (await api.get<ResponseDataAll<T>>(endpoint, config)).data,
    getById: async (id, config) => (await api.get<T>(`${endpoint}/${id}`, config)).data,
    create: async (payload, config) => (await api.post<ResponseData<T>>(endpoint, payload, config)).data,
    update: async (id, payload, config) => (await api.put<ResponseData<T>>(`${endpoint}/${id}`, payload, config)).data,
    remove: async (id, config) => (await api.delete<ResponseData<void>>(`${endpoint}/${id}`, config)).data
  }
}
