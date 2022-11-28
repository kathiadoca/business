import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
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
import {Companies} from '../models';
import {CompaniesRepository} from '../repositories';

@authenticate('jwt')
export class CompaniesController {
  constructor(
    @repository(CompaniesRepository)
    public companiesRepository: CompaniesRepository,
  ) {}

  @post('/companies')
  @response(200, {
    description: 'Companies model instance',
    content: {'application/json': {schema: getModelSchemaRef(Companies)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {
            title: 'NewCompanies',
            exclude: ['id'],
          }),
        },
      },
    })
    companies: Omit<Companies, 'id'>,
  ): Promise<Companies> {
    return this.companiesRepository.create(companies);
  }

  @get('/companies/count')
  @response(200, {
    description: 'Companies model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Companies) where?: Where<Companies>,
  ): Promise<Count> {
    return this.companiesRepository.count(where);
  }

  @get('/companies')
  @response(200, {
    description: 'Array of Companies model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Companies, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Companies) filter?: Filter<Companies>,
  ): Promise<Companies[]> {
    return this.companiesRepository.find(filter);
  }

  @patch('/companies')
  @response(200, {
    description: 'Companies PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {partial: true}),
        },
      },
    })
    companies: Companies,
    @param.where(Companies) where?: Where<Companies>,
  ): Promise<Count> {
    return this.companiesRepository.updateAll(companies, where);
  }

  @get('/companies/{id}')
  @response(200, {
    description: 'Companies model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Companies, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Companies, {exclude: 'where'})
    filter?: FilterExcludingWhere<Companies>,
  ): Promise<Companies> {
    return this.companiesRepository.findById(id, filter);
  }

  @patch('/companies/{id}')
  @response(204, {
    description: 'Companies PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Companies, {partial: true}),
        },
      },
    })
    companies: Companies,
  ): Promise<void> {
    await this.companiesRepository.updateById(id, companies);
  }

  @put('/companies/{id}')
  @response(204, {
    description: 'Companies PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() companies: Companies,
  ): Promise<void> {
    await this.companiesRepository.replaceById(id, companies);
  }

  @del('/companies/{id}')
  @response(204, {
    description: 'Companies DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.companiesRepository.deleteById(id);
  }
}
