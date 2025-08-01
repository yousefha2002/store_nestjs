import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RoleStatus } from '../enums/role_status';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('Owner must be logged in');
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: 'token',
      });

      if (decoded.role !== RoleStatus.OWNER) {
        throw new UnauthorizedException('Unauthorized role');
      }

      request.currentUser = decoded;
      return !!decoded.id;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
