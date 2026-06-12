import axios from 'axios'
import { createCrudClient } from '~/utils/crudFactory'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.apiBase || 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Aquí puedes añadir interceptores para tokens JWT si es necesario
  api.interceptors.request.use((config) => {
    // const token = useCookie('token').value
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  const crudProvider = <T>(endpoint: string) => {
    return createCrudClient<T>(api, endpoint)
  }

  return {
    provide: {
      axios: api,
      apiCrud: crudProvider
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $apiCrud: <T>(endpoint: string) => CrudClient<T>
  }
}
