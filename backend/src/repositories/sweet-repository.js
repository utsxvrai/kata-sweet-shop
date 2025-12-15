const CrudRepository = require("./crud-repository");
const prisma = require('../config/db-config')


class SweetRepository extends CrudRepository {
  constructor() {
    super(prisma.sweet);
  }

  search(filters) {
    return prisma.sweet.findMany({
      where: {
        name: filters.name
          ? { contains: filters.name, mode: 'insensitive' }
          : undefined,
        category: filters.category,
        price: {
          gte: filters.minPrice,
          lte: filters.maxPrice,
        },
      },
    });
  }
}

module.exports = SweetRepository;