import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ProductsDto} from '../dto/products.dto';
import {Companies} from '../models';
import {Products} from '../models/products.model';
import {
  CategoriesRepository,
  CompaniesRepository,
  ProductsRepository,
} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ProductsService {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
    @repository(CompaniesRepository)
    public companiesRepository: CompaniesRepository,
  ) {}

  async createProduct(products: Products): Promise<Products> {
    try {
      return await this.productsRepository.create(products);
    } catch (error) {
      return error.message;
    }
  }

  async getProducts(id: number): Promise<object> {
    try {
      const resjoin = await this.categoriesRepository.execute(
        `SELECT * FROM categories c INNER JOIN products p ON c.id= p.categoriesId where companiesId = ${id};`,
      );
      const products: ProductsDto[] = resjoin.map(
        (iterator: {
          code: string;
          name: string;
          description: string;
          brand: string;
          quantity: number;
          price: number;
          active: number;
        }) =>
          new ProductsDto(
            iterator.code,
            iterator.name,
            iterator.description,
            iterator.brand,
            iterator.quantity,
            iterator.price,
            iterator.active,
          ),
      );
      const activos = products.filter(index => index.active !== 0);
      return activos;
    } catch (error) {
      return error;
    }
  }

  async getProductsCompany(id: number): Promise<object> {
    try {
      const resjoin = await this.categoriesRepository.execute(
        `SELECT * FROM categories c INNER JOIN products p ON c.id= p.categoriesId where companiesId = ${id};`,
      );
      const company = await this.getCompany(id);
      const products: ProductsDto[] = resjoin.map(
        (iterator: {
          code: string;
          name: string;
          description: string;
          brand: string;
          quantity: number;
          price: number;
          active: number;
        }) =>
          new ProductsDto(
            iterator.code,
            iterator.name,
            iterator.description,
            iterator.brand,
            iterator.quantity,
            iterator.price,
            iterator.active,
          ),
      );
      return {products, company};
    } catch (error) {
      return error.message;
    }
  }

  async getCompany(id: number): Promise<Companies> {
    try {
      return await this.companiesRepository.findById(id);
    } catch (error) {
      return error.message;
    }
  }

  async updateProducts(id: number, products: Products): Promise<object> {
    try {
      await this.productsRepository.updateById(id, products);
      return {message: 'Producto actualizado correctamente', statusCode: 200};
    } catch (error) {
      return error.message;
    }
  }
}
