import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, TranslateConfig } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBConfig {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor(private readonly configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    const endpoint = this.configService.get<string>('DYNAMODB_ENDPOINT');

    const translateConfig: TranslateConfig = {
      marshallOptions: {
        convertEmptyValues: false,
        removeUndefinedValues: true,
        convertClassInstanceToMap: false,
      },
      unmarshallOptions: {
        wrapNumbers: false,
      },
    };

    this.client = new DynamoDBClient({
      region,
      endpoint,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', 'local'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY', 'local'),
      },
    });

    this.docClient = DynamoDBDocumentClient.from(this.client, translateConfig);
  }

  getClient(): DynamoDBClient {
    return this.client;
  }

  getDocClient(): DynamoDBDocumentClient {
    return this.docClient;
  }

  getTableName(): string {
    return this.configService.get<string>('DYNAMODB_TABLE_NAME', 'Orders');
  }
}