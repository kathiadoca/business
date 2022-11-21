import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param} from '@loopback/rest';
import {Categories, Products} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsCategoriesController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository: ProductsRepository,
  ) {}

  @get('/products/{id}/categories', {
    responses: {
      '200': {
        description: 'Categories belonging to Products',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Categories)},
          },
        },
      },
    },
  })
  async getCategories(
    @param.path.number('id') id: typeof Products.prototype.id,
  ): Promise<Categories> {
    const data = await this.productsRepository.categories(id);
    return data;
  }
}
