/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { verifyPassword } from './utils/helpers';
import { AuthRepository } from './auth.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private authRepository: AuthRepository,
  ) {}

  async createUser(data: Prisma.UserCreateInput) {
    const { email, password, name, phone, address } = data;

    // Check if email or phone already exists
    const existingUserByEmail = await this.authRepository.findUserByEmail(email);
    if (existingUserByEmail) {
      throw new ConflictException('Email already in use');
    }

    const existingUserByPhone = await this.authRepository.findUserByPhone(phone);
    if (existingUserByPhone) {
      throw new ConflictException('Phone number already in use');
    }

    // Proceed with creating the new user
    return await this.authRepository.createUser({
      email,
      password,
      name,
      phone,
      address,
    });
  }
  

  async validateUser({ email, password }: AuthPayloadDto) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  generateJwt(user: {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    phone:string;
    address: string;
  }) {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      phone: user.phone,
      address: user.address,
    };
    return this.jwtService.sign(payload);
  }
}
