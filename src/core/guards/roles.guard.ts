import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get(Roles, context.getHandler());

    // Se não há roles definidos, permite acesso (endpoint público ou sem restrição de role)
    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    // Se não há usuário autenticado, nega acesso
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Verifica se o usuário tem uma das roles necessárias
    const hasRole = roles.includes(user.role);
    
    if (!hasRole) {
      throw new ForbiddenException(`Access denied. Required roles: ${roles.join(', ')}`);
    }

    return true;
  }
}
