import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Companies, CompaniesRelations} from '../models';

export class CompaniesRepository extends DefaultCrudRepository<
  Companies,
  typeof Companies.prototype.id,
  CompaniesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Companies, dataSource);
  }
}
