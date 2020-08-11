import { EntityRepository, Repository } from 'typeorm';
import AppError from '../errors/AppError';

import Category from '../models/Category';

interface Request {
  id: string;
  title: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findId(title: string): Promise<Request> {
    const findCategory = await this.findOne({
      where: { title },
    });

    if (!findCategory) {
      const categoryValue = this.create({
        title,
      });

      await this.save(categoryValue);
    }

    const category = await this.findOne({
      where: { title },
    });

    if (category) {
      return {
        id: category.id,
        title,
      };
    }

    throw new AppError('Not possible create category');
  }
}
export default CategoryRepository;
