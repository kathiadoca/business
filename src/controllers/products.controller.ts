import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {ProductsDto} from '../dto/products.dto';
import {Products} from '../models';
import {ProductsRepository} from '../repositories';
import {ProductsService} from '../services';

@authenticate('jwt')
export class ProductsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
    @service() public productsService: ProductsService,
  ) {}

  @post('/products')
  @response(200, {
    description: 'Products model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductsDto)}},
  })
  async create(@requestBody() products: Products): Promise<Products> {
    return this.productsService.createProduct(products);
  }

  @get('/products')
  @response(200, {
    description: 'Array of Products model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Products, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Products) filter?: Filter<Products>,
  ): Promise<Products[]> {
    return this.productsRepository.find(filter);
  }

  @patch('/products')
  @response(200, {
    description: 'Products PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
    @param.where(Products) where?: Where<Products>,
  ): Promise<Count> {
    return this.productsRepository.updateAll(products, where);
  }

  @patch('/products/{id}')
  @response(204, {
    description: 'Products PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Products,
  ): Promise<object> {
    return this.productsService.updateProducts(id, products);
  }

  @del('/products/{id}')
  @response(204, {
    description: 'Products DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productsRepository.deleteById(id);
  }

  @get('/products/company/{id}')
  @response(204, {
    description: 'Obtain all the products of a specific business',
  })
  async getProduct(@param.path.number('id') id: number): Promise<object> {
    return this.productsService.getProducts(id);
  }

  @get('/products/companies/{id}')
  @response(204, {
    description: 'Obtain all the products of a specific business for company',
  })
  async getProductsCompany(
    @param.path.number('id') id: number,
  ): Promise<object> {
    return this.productsService.getProductsCompany(id);
  }
}
