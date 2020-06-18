import { EntityRepository, Repository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  //
}

export default CategoryRepository;
