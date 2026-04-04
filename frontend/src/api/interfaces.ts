// Manufacturers
export interface Manufacturer {
  manufacturerId?: number
  manufacturerName: string
  manufacturerUrl?: string
  aliases?: string
  description?: string
}

export type Manufacturers = Manufacturer[]

export const defaultManufacturer: Manufacturer = {
  manufacturerId: undefined,
  manufacturerName: '',
  manufacturerUrl: '',
  aliases: '',
  description: '',
}

// Orders
export interface Order {
  orderId?: number
  userId: number
  supplierId: number
  orderDate: string
  orderNumber: string
  currencyCode: string
  status: string
}

export type Orders = Order[]

export const defaultOrder: Order = {
  orderId: undefined,
  userId: 1,
  supplierId: 1,
  orderDate: '2026-03-03',
  orderNumber: '',
  currencyCode: '',
  status: '',
}

// Order parts
export interface OrderPart {
  orderPartId?: number
  orderId: number
  partId: number
  quantity: number
  unitPrice: number
  supplierPartNumber: string
  manufacturerPartNumber: string
  manufacturerName: string
  description?: string
}

export type OrderParts = OrderPart[]

export const defaultOrderParts: OrderPart = {
  orderPartId: undefined,
  orderId: 1,
  partId: 1,
  quantity: 1,
  unitPrice: 10.0,
  supplierPartNumber: '',
  manufacturerPartNumber: '',
  manufacturerName: '',
  description: '',
}

// Parts
export interface Part {
  partId?: number
  partNumber: string
  manufacturerId: number
  partTypeId: number
  series: string
  description: string
  productUrl: string
  imageUrl: string
  datasheetUrl: string
}

export type Parts = Part[]

export const defaultPart: Part = {
  partId: undefined,
  partNumber: '',
  manufacturerId: 1,
  partTypeId: 1,
  series: '',
  description: '',
  productUrl: '',
  imageUrl: '',
  datasheetUrl: '',
}

// Part Types
export interface PartType {
  partTypeId?: number
  parentId?: number
  shortName: string
  longName: string
  mouserUrl: string
}

export type PartTypes = PartType[]

export const defaultPartType: PartType = {
  partTypeId: undefined,
  parentId: undefined,
  shortName: '',
  longName: '',
  mouserUrl: '',
}

// Projects
export interface Project {
  projectId?: number
  userId: number
  projectName: string
  description?: string
  notes?: string
}

export type Projects = Project[]

export const defaultProject: Project = {
  projectId: undefined,
  userId: 1,
  projectName: '',
  description: undefined,
  notes: undefined,
}

// Project Parts
export interface ProjectPart {
  projectPartId?: number
  projectId: number
  partId: number
  quantity: number
}

export type ProjectParts = ProjectPart[]

export const defaultProjectPart: ProjectPart = {
  projectPartId: undefined,
  projectId: 1,
  partId: 1,
  quantity: 1,
}

// Storage bins
export interface StorageBin {
  storageBinId?: number
  userId: number
  shortName: string
  longName: string
  description: string
  location: string
  maxColumn: number
  maxRow: number
}

export type StorageBins = StorageBin[]

export const defaultStorageBin = {
  storageBinId: undefined,
  userId: 1,
  shortName: '',
  longName: '',
  description: '',
  location: '',
  maxColumn: 1,
  maxRow: 1,
}

// Suppliers
export interface Supplier {
  supplierId?: number
  supplierName: string
  baseUrl: string
}

export type Suppliers = Supplier[]

export const defaultSupplier: Supplier = {
  supplierId: undefined,
  supplierName: '',
  baseUrl: '',
}

// Users
export interface User {
  userId?: number
  userName: string
  email: string
  mouserApiKeyOrders?: string
  mouserApiKeySearch?: string
}

export type Users = User[]

export const defaultUser: User = {
  userId: undefined,
  userName: '',
  email: '',
  mouserApiKeyOrders: '',
  mouserApiKeySearch: '',
}

// User parts
export interface UserPart {
  userPartId?: number
  userId: number
  partId: number
  storageBinsId: number
  columnNumber: number
  rowNumber: number
  quantity: number
}

export type UserParts = UserPart[]

export const defaultUserPart: UserPart = {
  userPartId: undefined,
  userId: 1,
  partId: 1,
  storageBinsId: 1,
  columnNumber: 1,
  rowNumber: 1,
  quantity: 1,
}
