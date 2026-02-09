const { PrismaClient } = require('@prisma/client');
try {
    const prisma = new PrismaClient({ log: ['error'] });
    console.log('Successfully created PrismaClient with log option');
} catch (e) {
    console.error('Error with log option:', e.message);
}

try {
    const prisma = new PrismaClient();
    console.log('Successfully created PrismaClient with no options');
} catch (e) {
    console.error('Error with no options:', e.message);
}
