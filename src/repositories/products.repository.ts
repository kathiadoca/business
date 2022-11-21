import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Products, ProductsRelations, Categories, Companies} from '../models';
import {CategoriesRepository} from './categories.repository';
import {CompaniesRepository} from './companies.repository';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id,
  ProductsRelations
> {

  public readonly categories: BelongsToAccessor<Categories, typeof Products.prototype.id>;

  public readonly companies: BelongsToAccessor<Companies, typeof Products.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CategoriesRepository') protected categoriesRepositoryGetter: Getter<CategoriesRepository>, @repository.getter('CompaniesRepository') protected companiesRepositoryGetter: Getter<CompaniesRepository>,
  ) {
    super(Products, dataSource);
    this.companies = this.createBelongsToAccessorFor('companies', companiesRepositoryGetter,);
    this.registerInclusionResolver('companies', this.companies.inclusionResolver);
    this.categories = this.createBelongsToAccessorFor('categories', categoriesRepositoryGetter,);
    this.registerInclusionResolver('categories', this.categories.inclusionResolver);
  }
}
