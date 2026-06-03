import apiClient, {ApiError} from './apiClient';
import {
  Product,
  ProductDetailResponse,
  ProductListResponse,
} from '../types/product';

const ENDPOINT = '/task_api.php';

export async function fetchAllProducts(): Promise<Product[]> {
  const response = await apiClient.get<ProductListResponse>(ENDPOINT);
  const products = response.data?.data?.products;
  if (!Array.isArray(products)) {
    throw new ApiError('Unexpected response from server.', response.status);
  }
  return products;
}

export async function fetchProductById(productId: number): Promise<Product> {
  const formBody = new URLSearchParams();
  formBody.append('product_id', String(productId));

  const response = await apiClient.post<ProductDetailResponse>(
    ENDPOINT,
    formBody.toString(),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
  const data = response.data?.data;
  const product = Array.isArray(data) ? data[0] : (data as Product | undefined);
  if (!product) {
    throw new ApiError('Product not found.', 404);
  }
  return product;
}
