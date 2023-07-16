import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import PrismaService from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, SigninDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: SignupDto) {
    const hash = dto.password ? await this.hash(dto.password) : '';

    if (dto.role === 'ADMIN' && !hash)
      throw new BadRequestException('Admin accound should have password');

    const user = await this.prisma.user.create({
      data: {
        username: dto.username,
        password: hash,
        role: dto.role,
      },
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return { ...tokens, user };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
      select: {
        id: true,
        username: true,
        role: true,
        password: true,
      },
    });

    if (!user) throw new ForbiddenException('Acces Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) throw new ForbiddenException('Acces Denied');
 
    delete user.password;

    const tokens = await this.getTokens(user.id, user.username, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return { ...tokens, user };
  }

  async logout(userId: string) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Acces Denied');
    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Acces Denied');

    const tokens = await this.getTokens(user.id, user.username, user.role);
    return tokens;
  }

  private async updateRtHash(userId: string, rt: string) {
    const hash = await this.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  private hash(data: string) {
    return bcrypt.hash(data, 10);
  }

  private async getTokens(userId: string, username: string, role: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(
        {
          userId,
          username,
          role,
        },
        {
          secret: process.env.ACCESS_TOKEN_SECRET,
          expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          userId,
          username,
          role,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 12,
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}
