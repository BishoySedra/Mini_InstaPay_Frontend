/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


async function testConnection() {
    try {
      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          email: 'testuser@example.com',
          password: 'password123',
          name: 'Test User',
          phone: '1234567890',
          address: '123 Test St, Test City',
        },
      });
  
      console.log('Created User:', newUser);
  
      // Fetch all users
      const users = await prisma.user.findMany();
      console.log('Users:', users);
    } catch (error) {
      console.error('Error connecting to the database:', error);
    } finally {
      await prisma.$disconnect();
    }
  }
  
  testConnection();
  