const prisma = require('./config/db-config');

async function main() {
    console.log("Checking prisma...");
    console.log("prisma keys:", Object.keys(prisma));
    
    if (prisma.user) {
        console.log("prisma.user is defined");
    } else {
        console.error("prisma.user is UNDEFINED");
    }

    try {
        console.log("Attempting to connect...");
        await prisma.$connect();
        console.log("Connected successfully");
        const count = await prisma.user.count();
        console.log("User count:", count);
    } catch (e) {
        console.error("Connection failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
