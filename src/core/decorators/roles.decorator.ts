import { Reflector } from "@nestjs/core";

export type Role = 'ADMIN' | 'USER';

export const Roles = Reflector.createDecorator<Role[]>();