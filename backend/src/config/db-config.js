const dotenv = require("dotenv");
dotenv.config(); 

const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../generated/prisma/client");
const { Pool } = require("pg")


const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // ✅ MUST be an object
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


module.exports = prisma;

