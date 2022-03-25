import AdminService from '../../service';
import { ResponseSuccess } from '../../sharedType';
import { Product, ProductBase } from './type';

class ProductService extends AdminService {
  public async getProductList(id: string, limit: number, offset: number = 0) {
    const products = await this.doGet<ResponseSuccess<Product[]>>(
      `/api/v1/generic-calculator/${id}/data?offset=${offset}&limit=${limit}`
    );
    return products;
  }

  public async getProductById(id: string) {
    const product = await this.doGet<ResponseSuccess<Product>>(
      `/api/v1/generic-calculator/${id}`
    );
    return product;
  }

  public async createImage(fd: FormData) {
    const imageResponse = await this.doPost<ResponseSuccess<string>>(
      '/api/v1/calculator/image',
      fd
    );
    return imageResponse;
  }

  // Create
  public async createProduct(calculatorId: string, product: ProductBase) {
    const productResponse = await this.doPost<Product>(
      `/api/v1/generic-calculator/${calculatorId}`,
      product
    );
    return productResponse;
  }

  // Edit
  public async editProduct(id: string, product: ProductBase) {
    const productResponse = await this.doPut<Product>(
      `/api/v1/generic-calculator/${id}`,
      product
    );
    return productResponse;
  }

  // Delete
  public async deleteProduct(id: string) {
    const productResponse = await this.doDelete<ResponseSuccess<boolean>>(
      `/api/v1/generic-calculator/${id}`
    );
    return productResponse;
  }
}

const productService = new ProductService();

export default productService;
