import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'The NodeJS 2024 Q1 service API running';
  }
}
