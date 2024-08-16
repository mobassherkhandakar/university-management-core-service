/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

class QueryBuilder {
  private prisma: PrismaClient;
  private model: any;
  private query: Record<string, unknown>;

  constructor(
    prisma: PrismaClient,
    model: any,
    query: Record<string, unknown>
  ) {
    this.prisma = prisma;
    this.model = model;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this.query?.searchTerm as string;
    if (searchTerm) {
      const searchConditions = searchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      }));
      this.query['OR'] = searchConditions;
    }
    return this;
  }

  filter() {
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    const queryObj = { ...this.query };
    excludeFields.forEach(el => delete queryObj[el]);
    this.query = queryObj;
    return this;
  }

  sort() {
    const sort = (this.query?.sort as string)?.split(',').map(field => {
      if (field.startsWith('-')) {
        return { [field.substring(1)]: 'desc' };
      } else {
        return { [field]: 'asc' };
      }
    });

    this.query['orderBy'] = sort.length > 0 ? sort : [{ createdAt: 'desc' }];
    return this;
  }

  paginate() {
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.query['skip'] = skip;
    this.query['take'] = limit;

    return this;
  }

  fields() {
    const fields = this.query?.fields as string;
    if (fields) {
      const selectedFields = fields
        .split(',')
        .reduce((acc: Record<string, true>, field: string) => {
          acc[field] = true;
          return acc;
        }, {});
      this.query['select'] = selectedFields;
    }
    return this;
  }

  async execute() {
    return this.model.findMany({
      where: this.query as any,
      ...this.query,
    });
  }

  async countTotal() {
    const total = await this.model.count({
      where: this.query as any,
    });
    const page = Number(this.query?.page) || 1;
    const limit = Number(this.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
