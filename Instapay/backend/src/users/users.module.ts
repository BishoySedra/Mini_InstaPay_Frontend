/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PrismaService } from 'prisma/prisma.service';
import { UsersRepository } from './users.repository';
import { UserFactory } from './users.factory';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [
    UsersService,
    JwtStrategy,
    PrismaService,
    UsersRepository,
    UserFactory,
    JwtService,
  ],
  imports: [
    
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
})
export class UsersModule {}