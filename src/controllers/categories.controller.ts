import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  FilterExcludingWhere,
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
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Categories} from '../models';
import {CategoriesRepository} from '../repositories';
import {CategoriesService} from '../services';

export class CategoriesController {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
    @service() public categoriesService: CategoriesService,
  ) {}

  @post('/categories')
  @response(200, {
    description: 'Categories model instance',
    content: {'application/json': {schema: getModelSchemaRef(Categories)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {
            title: 'NewCategories',
            exclude: ['id'],
          }),
        },
      },
    })
    categories: Omit<Categories, 'id'>,
  ): Promise<object> {
    return this.categoriesService.createCategory(categories);
  }

  @get('/categories/count')
  @response(200, {
    description: 'Categories model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.count(where);
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Categories model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Categories, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<object> {
    return this.categoriesService.getCategory();
  }

  @patch('/categories')
  @response(200, {
    description: 'Categories PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
    @param.where(Categories) where?: Where<Categories>,
  ): Promise<Count> {
    return this.categoriesRepository.updateAll(categories, where);
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Categories model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Categories, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Categories, {exclude: 'where'})
    filter?: FilterExcludingWhere<Categories>,
  ): Promise<Categories> {
    return this.categoriesRepository.findById(id, filter);
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Categories PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categories, {partial: true}),
        },
      },
    })
    categories: Categories,
  ): Promise<object> {
    return this.categoriesService.updateCategory(id, categories);
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Categories PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() categories: Categories,
  ): Promise<void> {
    await this.categoriesRepository.replaceById(id, categories);
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Categories DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    return this.categoriesRepository.deleteById(id);
  }
}
