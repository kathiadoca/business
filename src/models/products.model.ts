import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Categories} from './categories.model';
import {Companies} from './companies.model';

@model()
export class Products extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      maxLength: 10,
      minLength: 4,
      errorMessage: 'Code name must be between 4 and 10 characters',
      //pattern: '[-!$%^&*()_+|~=`{}\\[\\]:\\/;<>?,.@#+]/g',TODO: Por revisar
    },
  })
  code: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 4,
      errorMessage: 'Name must be min 4 characters',
    },
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
    jsonSchema: {
      exclusiveMinimum: 0,
      errorMessage: 'Price must be positive',
    },
  })
  price: number;

  @belongsTo(() => Categories)
  categoriesId: number;

  @belongsTo(() => Companies)
  companiesId: number;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
