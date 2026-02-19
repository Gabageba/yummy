import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

interface RequestWithUser extends Request {
  user?: { userId: string };
}

export const UserId = createParamDecorator(
  (_, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const userId = request.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authorized');
    }
    return userId;
  },
);
