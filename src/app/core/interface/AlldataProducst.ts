import { Product } from "./product"

export interface AlldataProducst {
    results: number
    metadata: Metadata
    data:Product
}
export interface Metadata {
    currentPage: number
    numberOfPages: number
    limit: number
    nextPage: number
  }