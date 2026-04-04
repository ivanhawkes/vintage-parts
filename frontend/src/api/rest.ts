import axios from 'axios'
import { type Manufacturer } from '#/api/interfaces'

export const restApi = axios.create({
  // TODO: Needs to be an .env variable.
  baseURL: 'http://localhost:8080',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// GET
export const getManufacturer = async (id: number) => {
  const { data } = await restApi.get(`/manufacturers/${id}`)

  return data
}

// POST
export const postManufacturer = async (newManufacturer: Manufacturer) => {
  const { data } = await restApi.post('/manufacturers', newManufacturer)

  return data
}

// PUT
export const putManufacturer = async (newManufacturer: Manufacturer) => {
  const { data } = await restApi.put(
    `/manufacturers/${newManufacturer.manufacturerId}`,
    newManufacturer,
  )

  return data
}

// DELETE
export const deleteManufacturer = async (id: number) => {
  await restApi.delete(`/manufacturers/${id}`)

  return id
}

// GET (all)
export const getAllManufacturer = async () => {
  const { data } = await restApi.get('/manufacturers')

  return data
}
