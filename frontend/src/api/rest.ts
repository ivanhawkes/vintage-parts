import axios from 'axios'
import type { Manufacturer, Manufacturers } from '#/api/interfaces'

// Effective React Query Keys
// https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories
// https://tkdodo.eu/blog/leveraging-the-query-function-context#query-key-factories

export const manufacturerQK = {
  all: ['manufacturer'],
  lists: () => [...manufacturerQK.all, 'list'] as const,
  list: (filters: string) =>
    [...manufacturerQK.lists(), { filters }] as const,
  details: () => [...manufacturerQK.all, 'detail'],
  detail: (id: number) => [...manufacturerQK.details(), id],
  pagination: (page: number) => [
    ...manufacturerQK.all,
    'pagination',
    page,
  ],
  infinite: () => [...manufacturerQK.all, 'infinite'],
}

export const restApi = axios.create({
  // TODO: Needs to be an .env variable.
  baseURL: 'http://localhost:8080',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// GET
export const getManufacturer = async (id: number): Promise<Manufacturer> => {
  const { data } = await restApi.get(`/manufacturers/${id}`)

  return data
}

// POST
export const postManufacturer = async (
  newManufacturer: Manufacturer,
): Promise<Manufacturer> => {
  const { data } = await restApi.post('/manufacturers', newManufacturer)

  return data
}

// PUT
export const putManufacturer = async (
  newManufacturer: Manufacturer,
): Promise<Manufacturer> => {
  const { data } = await restApi.put(
    `/manufacturers/${newManufacturer.manufacturerId}`,
    newManufacturer,
  )

  return data
}

// DELETE
export const deleteManufacturer = async (id: number): Promise<Manufacturer> => {
  const { data } = await restApi.delete(`/manufacturers/${id}`)

  return data
}

// GET (all)
export const getAllManufacturer = async (): Promise<Manufacturers> => {
  const { data } = await restApi.get('/manufacturers')

  return data
}
