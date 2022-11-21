import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Companies, Products} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCompaniesController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) {}

  @get('/products/{id}/companies', {
    responses: {
      '200': {
        description: 'Companies belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Companies)},
          },
        },
      },
    },
  })
  async getCompanies(
    @param.path.number('id') id: typeof Products.prototype.id,
  ): Promise<Companies> {
    const data = await this.productsRepository.companies(id);
    return data;
  }
}
