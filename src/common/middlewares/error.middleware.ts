import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    // Catch any unhandled errors
    process.on('unhandledRejection', (reason) => {
      throw reason; // Throw the unhandled error
    });

    next();
  }
}
