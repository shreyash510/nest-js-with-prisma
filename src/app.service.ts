import { Injectable } from '@nestjs/common';

// it can be injected into other classes using dependency injection.
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
