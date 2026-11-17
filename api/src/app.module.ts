import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { OrderService } from './application/services/order.service';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { DynamoDBConfig } from './infrastructure/config/dynamodb.config';
import { OrdersController } from './infrastructure/controllers/orders.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  controllers: [OrdersController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
    {
      provide: DynamoDBConfig,
      useFactory: (configService: ConfigService) => {
        return new DynamoDBConfig(configService);
      },
      inject: [ConfigService],
    },
    {
      provide: 'OrderRepositoryPort',
      useClass: DynamoOrderRepository,
    },
    OrderService,
  ],
})
export class AppModule {}