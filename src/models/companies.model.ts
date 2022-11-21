import {Entity, model, property} from '@loopback/repository';

@model()
export class Companies extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;


  constructor(data?: Partial<Companies>) {
    super(data);
  }
}

export interface CompaniesRelations {
  // describe navigational properties here
}

export type CompaniesWithRelations = Companies & CompaniesRelations;
