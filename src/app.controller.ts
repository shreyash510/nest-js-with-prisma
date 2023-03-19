import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


@Controller()  //  it is required to define a basic controller
export class AppController {
  constructor(private readonly appService: AppService) {}  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
