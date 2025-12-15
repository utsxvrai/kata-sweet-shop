const CrudRepository = require("./crud-repository");
const prisma = require('../config/db-config')

class UserRepository extends CrudRepository {
    constructor() {
        super(prisma.user);
    }

    findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
}

module.exports = UserRepository;