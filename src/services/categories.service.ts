import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Categories} from '../models';
import {CategoriesRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class CategoriesService {
  constructor(
    @repository(CategoriesRepository)
    public categoriesRepository: CategoriesRepository,
  ) {}

  async createCategory(category: Categories): Promise<object> {
    try {
      const name = await this.categoriesRepository.execute(
        `SELECT * FROM categories where name = '${category.name}';`,
      );
      const code = await this.categoriesRepository.execute(
        `SELECT * FROM categories WHERE code = '${category.code}';`,
      );
      if (name.length <= 0 && code.length <= 0) {
        return await this.categoriesRepository.create(category);
      } else {
        return {message: 'The parameters already exist'};
      }
    } catch (error) {
      return error.message;
    }
  }

  async getCategory(): Promise<object> {
    try {
      return await this.categoriesRepository.execute(
        `SELECT * FROM categories;`,
      );
    } catch (error) {
      return error.message;
    }
  }

  async updateCategory(id: number, category: Categories): Promise<object> {
    try {
      await this.categoriesRepository.updateById(id, category);
      return {message: 'updated category', statusCode: 204};
    } catch (error) {
      return error.message;
    }
  }
}
