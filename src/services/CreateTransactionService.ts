// import AppError from '../errors/AppError';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CategoryRepository from '../repositories/CategoryRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const categoryRepository = getCustomRepository(CategoryRepository);

    const findCategory = await categoryRepository.findOne({
      where: { title: category },
    });

    if (!findCategory) {
      const categoryValue = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(categoryValue);
    }

    const { id } = await categoryRepository.findOne({
      where: { title: category },
    });

    const category_id = id;

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
