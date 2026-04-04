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

// Create a POST function to access the REST API.
export const postManufacturer = async (newManufacturer: Manufacturer) => {
  const { data } = await restApi.post('/manufacturers', newManufacturer)

  return data
}

// Create a DELETE function to access the REST API.
export const deleteManufacturer = async (id: number) => {
  await restApi.delete(`/manufacturers/${id}`)

  return id
}

// Create a PUT function to access the REST API.
export const putManufacturer = async (newManufacturer: Manufacturer) => {
  const { data } = await restApi.put(
    `/manufacturers/${newManufacturer.manufacturerId}`,
    newManufacturer,
  )

  return data
}
