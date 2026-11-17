# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order.service.ts` — La pieza p2 (Creación de órdenes con validación de negocio, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p3 (Persistencia de órdenes en DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/domain/entities/order.entity.ts` — absorbida: fuga de la pieza p2
- `api/src/application/dto/update-order-state.dto.ts` — absorbida: fuga de la pieza p2
- `api/src/infrastructure/controllers/orders.controller.ts` — absorbida: fuga de la pieza p2
- `client/src/features/orders/components/OrderForm.tsx` — La pieza p4 (Manejo de estado local y envío de datos al backend, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/features/orders/components/OrderDetail.tsx` — La pieza p7 (Recuperación de datos del backend y manejo de estado, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/features/orders/components/OrderList.tsx` — La pieza p10 (Eliminación de órdenes desde el UI y manejo de estado, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders/:id`
  - `PATCH /orders/:id/state`
  - `DELETE /orders/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `api/src/acceptance/f1.test.ts`
- `api/src/acceptance/f2.test.ts`
- `api/src/acceptance/f3.test.ts`
- `api/src/acceptance/f4.test.ts`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración inicial y creación de orden — objetivo: Configurar el entorno de desarrollo y permitir la creación de una orden en DynamoDB. — entregable (NO resolver): Proyecto React configurado con Vite 5, funcionalidad para crear ordenes en DynamoDB y script de Terraform para versionar la infraestructura.
- Fase 2: Lectura y actualización de orden — objetivo: Implementar la funcionalidad para leer y actualizar ordenes en DynamoDB. — entregable (NO resolver): Funcionalidad para leer y actualizar ordenes en DynamoDB, con pruebas de aceptación que cubran estos casos.
- Fase 3: Eliminación de orden y versionado de infraestructura — objetivo: Implementar la funcionalidad para eliminar ordenes en DynamoDB y versionar la infraestructura con Terraform. — entregable (NO resolver): Funcionalidad para eliminar ordenes en DynamoDB y script de Terraform actualizado para versionar la infraestructura.
- Fase 4: Refactorización y optimización — objetivo: Refactorizar el código para mejorar la legibilidad y rendimiento, y optimizar las operaciones en DynamoDB. — entregable (NO resolver): Código refactorizado y optimizado para las operaciones CRUD en DynamoDB, con pruebas que aseguren el correcto funcionamiento.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1170.0",
    "@aws-sdk/lib-dynamodb": "3.1170.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/config": "4.0.4",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@nestjs/testing": "10.4.22",
    "@types/express": "4.17.25",
    "@types/jest": "29.5.14",
    "@types/node": "22.20.5",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "typescript": "5.7.3"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/application/ports/order-repository.port.ts ===
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStateDto } from '../dto/update-order-state.dto';

export interface OrderRepositoryPort {
  create(orderData: CreateOrderDto): Promise<Order>;
  findById(id: string): Promise<Order | null>;
  updateState(id: string, stateData: UpdateOrderStateDto): Promise<Order>;
  delete(id: string): Promise<void>;
}

export const ORDER_REPOSITORY_TOKEN = 'OrderRepositoryPort';

// === ARCHIVO: api/src/domain/entities/order.entity.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
export class Order {
  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly items: OrderItem[],
    public readonly totalAmount: number,
    public readonly state: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    if (!id || !customerId) {
      throw new Error('Order must have an id and customerId');
    }
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    if (totalAmount <= 0) {
      throw new Error('Total amount must be positive');
    }
  }

  toPlainObject(): Record<string, unknown> {
    throw new Error('TODO(reto): toPlainObject');
  }

  static fromPlainObject(data: Record<string, unknown>): Order {
    const items = Array.isArray(data.items) 
      ? data.items.map((item: Record<string, unknown>) => OrderItem.fromPlainObject(item))
      : [];
    
    return new Order(
      data.id as string,
      data.customerId as string,
      items,
      data.totalAmount as number,
      data.state as string,
      new Date(data.createdAt as string),
      new Date(data.updatedAt as string),
    );
  }
}

export class OrderItem {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
    public readonly price: number,
  ) {
    if (!productId) {
      throw new Error('OrderItem must have a productId');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be positive');
    }
    if (price <= 0) {
      throw new Error('Price must be positive');
    }
  }

  getSubtotal(): number {
    return this.quantity * this.price;
  }

  toPlainObject(): Record<string, unknown> {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }

  static fromPlainObject(data: Record<string, unknown>): OrderItem {
    return new OrderItem(
      data.productId as string,
      data.quantity as number,
      data.price as number,
    );
  }
}

// === ARCHIVO: api/src/application/dto/create-order.dto.ts ===
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsNumber()
  @IsPositive()
  totalAmount: number;

  constructor(customerId: string, items: OrderItemDto[], totalAmount: number) {
    this.customerId = customerId;
    this.items = items;
    this.totalAmount = totalAmount;
  }

  validate(): void {
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const calculatedTotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (Math.abs(calculatedTotal - this.totalAmount) > 0.01) {
      throw new Error('Total amount does not match the sum of item prices');
    }
  }
}

// === ARCHIVO: api/src/infrastructure/config/dynamodb.config.ts ===
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

// === ARCHIVO: api/src/application/services/order.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { OrderRepositoryPort } from '../ports/order-repository.port';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderStateDto } from '../dto/update-order-state.dto';
import { Order } from '../../domain/entities/order.entity';

export type OrderState = 'created' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const VALID_TRANSITIONS: Record<OrderState, OrderState[]> = {
  created: ['processing', 'cancelled'],
  processing: ['shipped', 'cancelled'],
  shipped: ['delivered', 'cancelled'],
  delivered: [],
  cancelled: [],
};

@Injectable()
export class OrderService {
  constructor(@Inject('OrderRepositoryPort') private readonly orderRepository: OrderRepositoryPort) {}

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): createOrder');
  }

  async getOrder(orderId: string): Promise<Order> {
    throw new Error('TODO(reto): getOrder');
  }

  async updateOrderState(orderId: string, stateData: UpdateOrderStateDto): Promise<Order> {
    if (!orderId || orderId.trim() === '') {
      throw new BadRequestException('Order ID is required');
    }
    
    const order = await this.orderRepository.findById(orderId);
    
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    
    return this.orderRepository.updateState(orderId, stateData);
  }

  async deleteOrder(orderId: string): Promise<void> {
    throw new Error('TODO(reto): deleteOrder');
  }

  async transitionOrderState(orderId: string, newState: OrderState): Promise<Order> {
    throw new Error('TODO(reto): transitionOrderState');
  }

  private generateOrderId(): string {
    return `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/dynamo-order.repository.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { DynamoDBClient, PutItemCommand, GetItemCommand, DeleteItemCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { OrderRepositoryPort } from '../../application/ports/order-repository.port';
import { Order, OrderItem } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderStateDto } from '../../application/dto/update-order-state.dto';
import { DynamoDBConfig } from '../config/dynamodb.config';

@Injectable()
export class DynamoOrderRepository implements OrderRepositoryPort {
  private readonly docClient: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor(private readonly dynamoConfig: DynamoDBConfig) {
    this.docClient = dynamoConfig.getDocClient();
    this.tableName = dynamoConfig.getTableName();
  }

  async create(orderData: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async save(order: Order): Promise<Order> {
    throw new Error('TODO(reto): save');
  }

  async findById(orderId: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async updateState(id: string, stateData: UpdateOrderStateDto): Promise<Order> {
    throw new Error('TODO(reto): updateState');
  }

  async delete(orderId: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private toDynamoItem(order: Order): Record<string, any> {
    throw new Error('TODO(reto): toDynamoItem');
  }

  private fromDynamoItem(item: Record<string, any>): Order {
    throw new Error('TODO(reto): fromDynamoItem');
  }
}

// === ARCHIVO: api/src/app.module.ts ===
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

// === ARCHIVO: api/src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();

// === ARCHIVO: api/src/application/dto/update-order-state.dto.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
export class UpdateOrderStateDto {
  state: string;

  constructor(state: string) {
    this.state = state;
  }

  static fromRequest(state: string): UpdateOrderStateDto {
    throw new Error('TODO(reto): fromRequest');
  }
}

// === ARCHIVO: api/src/infrastructure/controllers/orders.controller.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus, ParseUUIDPipe } from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderStateDto } from '../../application/dto/update-order-state.dto';
import { Order } from '../../domain/entities/order.entity';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    throw new Error('TODO(reto): Post');
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    throw new Error('TODO(reto): Get');
  }

  @Patch(':id/state')
  async updateOrderState(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderStateDto: UpdateOrderStateDto,
  ): Promise<Order> {
    throw new Error('TODO(reto): Patch');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    throw new Error('TODO(reto): Delete');
  }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html contains an element with id="root".');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build"
  },
  "dependencies": {
    "@tanstack/react-query": "5.108.0",
    "axios": "1.21.1",
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/features/orders/hooks/useOrderFormState.ts ===
import { CreateOrderDto, OrderItem } from '../types/order.types';

export const validateOrderData = (data: CreateOrderDto): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  if (!data.customerId || data.customerId.trim().length === 0) {
    errors.customerId = 'El ID del cliente es requerido';
  }
  
  if (!data.items || data.items.length === 0) {
    errors.items = 'Debe agregar al menos un ítem';
  }
  
  if (data.totalAmount <= 0) {
    errors.totalAmount = 'El monto total debe ser mayor a 0';
  }
  
  return errors;
};

export const formatOrderData = (data: CreateOrderDto): CreateOrderDto => {
  return {
    customerId: data.customerId.trim(),
    items: data.items.map(item => ({
      ...item,
      productId: item.productId.trim(),
    })),
    totalAmount: Math.round(data.totalAmount * 100) / 100,
  };
};

export const calculateTotalAmount = (items: OrderItem[]): number => {
  if (!items || items.length === 0) return 0;
  
  const subtotal = items.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    return sum + itemTotal;
  }, 0);
  
  return Math.round(subtotal * 100) / 100;
};

export const validateOrderItem = (item: OrderItem): string | null => {
  if (!item.productId || item.productId.trim().length === 0) {
    return 'El ID del producto es requerido';
  }
  
  if (!item.quantity || item.quantity <= 0) {
    return 'La cantidad debe ser mayor a 0';
  }
  
  if (!item.price || item.price < 0) {
    return 'El precio no puede ser negativo';
  }
  
  return null;
};

export const createEmptyOrder = (): CreateOrderDto => ({
  customerId: '',
  items: [],
  totalAmount: 0,
});

export const isOrderValid = (data: CreateOrderDto): boolean => {
  const errors = validateOrderData(data);
  return Object.keys(errors).length === 0;
};

export const normalizeOrderInput = (input: Partial<CreateOrderDto>): CreateOrderDto => {
  return {
    customerId: input.customerId || '',
    items: input.items || [],
    totalAmount: input.totalAmount || 0,
  };
};

export const getOrderSummary = (data: CreateOrderDto): string => {
  const itemCount = data.items?.length || 0;
  const total = data.totalAmount || 0;
  return `${itemCount} ítem(s) - Total: $${total.toFixed(2)}`;
};

// === ARCHIVO: client/src/features/orders/hooks/useOrderDetailState.ts ===
import { Order, OrderItem } from '../types/order.types';

export const formatOrderDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }
  
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const findOrderItem = (order: Order | undefined, productId: string): OrderItem | undefined => {
  if (!order || !order.items) return undefined;
  return order.items.find(item => item.productId === productId);
};

export const calculateOrderSubtotal = (order: Order | undefined): number => {
  if (!order || !order.items || order.items.length === 0) return 0;
  
  return order.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
};

export const getOrderStateLabel = (state: string): string => {
  const stateLabels: Record<string, string> = {
    PENDING: 'Pendiente',
    PROCESSING: 'Procesando',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
  };
  
  return stateLabels[state] || state;
};

export const getOrderStateColor = (state: string): string => {
  const stateColors: Record<string, string> = {
    PENDING: '#FFA500',
    PROCESSING: '#4169E1',
    COMPLETED: '#228B22',
    CANCELLED: '#DC143C',
  };
  
  return stateColors[state] || '#808080';
};

export const isOrderEditable = (order: Order | undefined): boolean => {
  if (!order) return false;
  return order.state === 'PENDING' || order.state === 'PROCESSING';
};

export const canCancelOrder = (order: Order | undefined): boolean => {
  if (!order) return false;
  return order.state === 'PENDING' || order.state === 'PROCESSING';
};

export const getOrderItemsCount = (order: Order | undefined): number => {
  if (!order || !order.items) return 0;
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
};

export const formatOrderForDisplay = (order: Order): Record<string, string> => {
  return {
    id: order.id,
    customerId: order.customerId,
    totalAmount: `$${order.totalAmount.toFixed(2)}`,
    state: getOrderStateLabel(order.state),
    createdAt: formatOrderDate(order.createdAt),
    updatedAt: formatOrderDate(order.updatedAt),
    itemsCount: `${order.items.length} ítem(s)`,
  };
};

// === ARCHIVO: client/src/features/orders/hooks/useOrderListState.ts ===
import { Order } from '../types/order.types';

export const filterOrdersByState = (orders: Order[], state: string): Order[] => {
  if (!state || state === 'ALL') return orders;
  return orders.filter(order => order.state === state);
};

export const filterOrdersByCustomer = (orders: Order[], customerId: string): Order[] => {
  if (!customerId || customerId.trim().length === 0) return orders;
  const normalizedCustomerId = customerId.toLowerCase().trim();
  return orders.filter(order => 
    order.customerId.toLowerCase().includes(normalizedCustomerId)
  );
};

export const sortOrdersByDate = (
  orders: Order[], 
  order: 'asc' | 'desc' = 'desc'
): Order[] => {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return order === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const sortOrdersByAmount = (
  orders: Order[], 
  order: 'asc' | 'desc' = 'desc'
): Order[] => {
  return [...orders].sort((a, b) => {
    return order === 'desc' 
      ? b.totalAmount - a.totalAmount 
      : a.totalAmount - b.totalAmount;
  });
};

export const getOrdersByState = (orders: Order[]): Record<string, number> => {
  return orders.reduce((acc, order) => {
    acc[order.state] = (acc[order.state] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

export const getTotalRevenue = (orders: Order[]): number => {
  return orders
    .filter(order => order.state === 'COMPLETED')
    .reduce((sum, order) => sum + order.totalAmount, 0);
};

export const searchOrders = (orders: Order[], query: string): Order[] => {
  if (!query || query.trim().length === 0) return orders;
  
  const normalizedQuery = query.toLowerCase().trim();
  
  return orders.filter(order => 
    order.id.toLowerCase().includes(normalizedQuery) ||
    order.customerId.toLowerCase().includes(normalizedQuery) ||
    order.state.toLowerCase().includes(normalizedQuery)
  );
};

export const paginateOrders = (
  orders: Order[], 
  page: number, 
  pageSize: number
): Order[] => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return orders.slice(startIndex, endIndex);
};

export const getOrderStats = (orders: Order[]): Record<string, number> => {
  const completed = orders.filter(o => o.state === 'COMPLETED').length;
  const pending = orders.filter(o => o.state === 'PENDING').length;
  const processing = orders.filter(o => o.state === 'PROCESSING').length;
  const cancelled = orders.filter(o => o.state === 'CANCELLED').length;
  
  return {
    total: orders.length,
    completed,
    pending,
    processing,
    cancelled,
  };
};

// === ARCHIVO: client/src/features/orders/services/order-api.client.ts ===
import axios, { AxiosInstance } from 'axios';
import { CreateOrderDto, Order, UpdateOrderStateDto } from '../types/order.types';

const API_BASE_URL = 'http://localhost:3000';

class OrderApiClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await this.client.post<Order>('/orders', orderData);
    return response.data;
  }

  async getOrder(orderId: string): Promise<Order> {
    const response = await this.client.get<Order>(`/orders/${orderId}`);
    return response.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.client.get<Order[]>('/orders');
    return response.data;
  }

  async updateOrderState(orderId: string, stateData: UpdateOrderStateDto): Promise<Order> {
    const response = await this.client.patch<Order>(`/orders/${orderId}/state`, stateData);
    return response.data;
  }
}

export const orderApiClient = new OrderApiClient();

export const createOrder = async (orderData: CreateOrderDto): Promise<Order> => {
  return orderApiClient.createOrder(orderData);
};

export const getOrder = async (orderId: string): Promise<Order> => {
  return orderApiClient.getOrder(orderId);
};

export const getOrders = async (): Promise<Order[]> => {
  return orderApiClient.getOrders();
};

export const updateOrderState = async (
  orderId: string, 
  stateData: UpdateOrderStateDto
): Promise<Order> => {
  return orderApiClient.updateOrderState(orderId, stateData);
};

export { OrderApiClient };

// === ARCHIVO: client/src/features/orders/types/order.types.ts ===
export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderDto {
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
}

export interface UpdateOrderStateDto {
  state: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderState {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

// === ARCHIVO: client/src/features/orders/components/OrderForm.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React from 'react';
import { useOrderFormState } from '../hooks/useOrderFormState';
import { CreateOrderDto, Order } from '../types/order.types';

interface OrderFormProps {
  onSuccess?: (order: Order) => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderForm;

// === ARCHIVO: client/src/features/orders/components/OrderDetail.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React, { useEffect } from 'react';
import { useOrderDetailState } from '../hooks/useOrderDetailState';
import { OrderApiClient } from '../services/order-api.client';
import { Order } from '../types/order.types';

interface OrderDetailProps {
  orderId: string;
}

export const OrderDetail: React.FC<OrderDetailProps> = ({ orderId }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderDetail;

// === ARCHIVO: client/src/features/orders/components/OrderList.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import React from 'react';
import { useOrderListState } from '../hooks/useOrderListState';
import { OrderApiClient } from '../services/order-api.client';
import { Order } from '../types/order.types';

interface OrderListProps {
  onSelectOrder?: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ onSelectOrder }) => {
  throw new Error('TODO(reto): anonymous');
};

export default OrderList;

// === ARCHIVO: client/src/App.tsx ===
import React from 'react';
import { OrderList } from './features/orders/components/OrderList';
import { OrderForm } from './features/orders/components/OrderForm';
import { OrderDetail } from './features/orders/components/OrderDetail';
import { Order } from './features/orders/types/order.types';

const App: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = React.useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  const handleSelectOrder = (order: Order) => {
    setSelectedOrderId(order.id);
    setShowCreateForm(false);
  };

  const handleCreateNew = () => {
    setSelectedOrderId(null);
    setShowCreateForm(true);
  };

  const handleOrderCreated = (order: Order) => {
    setSelectedOrderId(order.id);
    setShowCreateForm(false);
  };

  const handleBackToList = () => {
    setSelectedOrderId(null);
    setShowCreateForm(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <h1>Gestión de Órdenes</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleBackToList} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Lista de Órdenes
          </button>
          <button onClick={handleCreateNew} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            Crear Nueva Orden
          </button>
        </nav>
      </header>

      <main>
        {showCreateForm && !selectedOrderId && (
          <OrderForm onSuccess={handleOrderCreated} />
        )}

        {selectedOrderId && !showCreateForm && (
          <OrderDetail orderId={selectedOrderId} />
        )}

        {!selectedOrderId && !showCreateForm && (
          <OrderList onSelectOrder={handleSelectOrder} />
        )}
      </main>
    </div>
  );
};

export default App;

// === ARCHIVO: infra/outputs.tf ===
# =============================================================================
# Outputs de la infraestructura de Orders API
# =============================================================================
# Este archivo exporta los valores de los recursos creados para que puedan
# ser consumidos por otros módulos o configuraciones externas
# =============================================================================

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para el entorno de desarrollo"
  value       = "https://dynamodb.${data.aws_region.current.name}.amazonaws.com"
}

output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "region" {
  description = "Región de AWS"
  value       = data.aws_region.current.name
}

output "environment" {
  description = "Nombre del entorno"
  value       = terraform.workspace
}

output "caller_identity_arn" {
  description = "ARN de la identidad actual"
  value       = data.aws_caller_identity.current.arn
}

output "caller_identity_user_id" {
  description = "ID del usuario actual"
  value       = data.aws_caller_identity.current.user_id
}

# Declaración de los data sources requeridos
data "aws_region" "current" {}

data "aws_caller_identity" "current" {}

// === ARCHIVO: infra/variables.tf ===
variable "aws_region" {
  description = "AWS region where resources will be created"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., dev, prod)"
  type        = string
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  type        = string
}

variable "dynamodb_billing_mode" {
  description = "Billing mode for DynamoDB table (PROVISIONED or PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "dynamodb_read_capacity" {
  description = "Read capacity units for DynamoDB table (required if billing_mode is PROVISIONED)"
  type        = number
  default     = null
}

variable "dynamodb_write_capacity" {
  description = "Write capacity units for DynamoDB table (required if billing_mode is PROVISIONED)"
  type        = number
  default     = null
}

variable "dynamodb_hash_key" {
  description = "Hash key for DynamoDB table"
  type        = string
}

variable "dynamodb_attributes" {
  description = "List of attribute definitions for DynamoDB table"
  type = list(object({
    name = string
    type = string
  }))
}

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
# Módulo de DynamoDB para la tabla de órdenes
# Este módulo define la tabla DynamoDB que almacenará las órdenes del sistema.
# Incluye configuración de índices secundarios globales (GSI) para consultas eficientes
# y políticas de capacidad para escalado automático.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB"
  type        = string
  default     = "Orders"
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplicable si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla"
  type        = string
  default     = null
}

variable "gsi" {
  description = "Lista de índices secundarios globales (GSI) para la tabla"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    read_capacity   = number
    write_capacity  = number
    projection_type = string
  }))
  default = [
    {
      name            = "CustomerIndex"
      hash_key        = "customerId"
      range_key       = "orderDate"
      read_capacity   = 5
      write_capacity  = 5
      projection_type = "ALL"
    },
    {
      name            = "StatusIndex"
      hash_key        = "status"
      range_key       = "orderDate"
      read_capacity   = 5
      write_capacity  = 5
      projection_type = "ALL"
    }
  ]
}

variable "tags" {
  description = "Etiquetas para la tabla DynamoDB"
  type        = map(string)
  default = {
    Environment = "dev"
    Application = "order-management"
  }
}

resource "aws_dynamodb_table" "orders_table" {
  name           = var.table_name
  billing_mode   = var.billing_mode
  read_capacity  = var.billing_mode == "PROVISIONED" ? var.read_capacity : null
  write_capacity = var.billing_mode == "PROVISIONED" ? var.write_capacity : null
  hash_key       = var.hash_key
  range_key      = var.range_key

  attribute {
    name = var.hash_key
    type = "S"
  }

  dynamic "attribute" {
    for_each = var.range_key != null ? [1] : []
    content {
      name = var.range_key
      type = "S"
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.gsi
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key
      read_capacity   = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.read_capacity : null
      write_capacity  = var.billing_mode == "PROVISIONED" ? global_secondary_index.value.write_capacity : null
      projection_type = global_secondary_index.value.projection_type
    }
  }

  dynamic "attribute" {
    for_each = var.gsi
    content {
      name = attribute.value.hash_key
      type = "S"
    }
  }

  dynamic "attribute" {
    for_each = { for gsi in var.gsi : gsi.name => gsi.range_key if gsi.range_key != null }
    content {
      name = attribute.value
      type = "S"
    }
  }

  tags = var.tags

  # Configuración de TTL (opcional)
  ttl {
    attribute_name = "expirationTime"
    enabled        = false
  }

  # Configuración de streams para eventos
  stream_enabled   = true
  stream_view_type = "NEW_AND_OLD_IMAGES"
}

# Configuración de escalado automático para la tabla principal
resource "aws_appautoscaling_target" "dynamodb_read_target" {
  count              = var.billing_mode == "PROVISIONED" ? 1 : 0
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.orders_table.name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "dynamodb_read_policy" {
  count              = var.billing_mode == "PROVISIONED" ? 1 : 0
  name               = "DynamoDBReadCapacityUtilization:${aws_dynamodb_table.orders_table.name}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.dynamodb_read_target[0].resource_id
  scalable_dimension = aws_appautoscaling_target.dynamodb_read_target[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.dynamodb_read_target[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value       = 70
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_target" "dynamodb_write_target" {
  count              = var.billing_mode == "PROVISIONED" ? 1 : 0
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.orders_table.name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "dynamodb_write_policy" {
  count              = var.billing_mode == "PROVISIONED" ? 1 : 0
  name               = "DynamoDBWriteCapacityUtilization:${aws_dynamodb_table.orders_table.name}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.dynamodb_write_target[0].resource_id
  scalable_dimension = aws_appautoscaling_target.dynamodb_write_target[0].scalable_dimension
  service_namespace  = aws_appautoscaling_target.dynamodb_write_target[0].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value       = 70
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}

# Configuración de escalado automático para los GSI
resource "aws_appautoscaling_target" "gsi_read_target" {
  for_each          = { for gsi in var.gsi : gsi.name => gsi if var.billing_mode == "PROVISIONED" }
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.orders_table.name}/index/${each.value.name}"
  scalable_dimension = "dynamodb:index:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "gsi_read_policy" {
  for_each          = { for gsi in var.gsi : gsi.name => gsi if var.billing_mode == "PROVISIONED" }
  name               = "DynamoDBReadCapacityUtilization:${aws_dynamodb_table.orders_table.name}:${each.value.name}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.gsi_read_target[each.key].resource_id
  scalable_dimension = aws_appautoscaling_target.gsi_read_target[each.key].scalable_dimension
  service_namespace  = aws_appautoscaling_target.gsi_read_target[each.key].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }
    target_value       = 70
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}

resource "aws_appautoscaling_target" "gsi_write_target" {
  for_each          = { for gsi in var.gsi : gsi.name => gsi if var.billing_mode == "PROVISIONED" }
  max_capacity       = 100
  min_capacity       = 5
  resource_id        = "table/${aws_dynamodb_table.orders_table.name}/index/${each.value.name}"
  scalable_dimension = "dynamodb:index:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "gsi_write_policy" {
  for_each          = { for gsi in var.gsi : gsi.name => gsi if var.billing_mode == "PROVISIONED" }
  name               = "DynamoDBWriteCapacityUtilization:${aws_dynamodb_table.orders_table.name}:${each.value.name}"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.gsi_write_target[each.key].resource_id
  scalable_dimension = aws_appautoscaling_target.gsi_write_target[each.key].scalable_dimension
  service_namespace  = aws_appautoscaling_target.gsi_write_target[each.key].service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }
    target_value       = 70
    scale_in_cooldown  = 60
    scale_out_cooldown = 60
  }
}

# Outputs del módulo
output "table_arn" {
  description = "ARN de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_name" {
  description = "Nombre de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.name
}

output "stream_arn" {
  description = "ARN del stream de la tabla DynamoDB"
  value       = aws_dynamodb_table.orders_table.stream_arn
}

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
# =============================================================================
# Variables de entorno - Desarrollo
# =============================================================================
# Configuración específica para el entorno de desarrollo de Orders API
# Estas variables se cargan automáticamente al ejecutar terraform en este directorio
# =============================================================================

# -----------------------------------------------------------------------------
# Configuración de la tabla de DynamoDB
# -----------------------------------------------------------------------------
table_name         = "Orders-dev"
billing_mode       = "PAY_PER_REQUEST"
read_capacity      = 5
write_capacity     = 5

# -----------------------------------------------------------------------------
# Claves de la tabla
# -----------------------------------------------------------------------------
hash_key           = "orderId"
range_key          = "createdAt"

# -----------------------------------------------------------------------------
# Configuración de Global Secondary Index (GSI)
# -----------------------------------------------------------------------------
gsi = {
  status_index = {
    name            = "StatusIndex"
    hash_key        = "status"
    range_key       = "orderId"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "ALL"
  },
  customer_index = {
    name            = "CustomerIndex"
    hash_key        = "customerId"
    range_key       = "createdAt"
    read_capacity   = 5
    write_capacity  = 5
    projection_type = "ALL"
  }
}

# -----------------------------------------------------------------------------
# Etiquetas para recursos
# -----------------------------------------------------------------------------
tags = {
  Environment = "dev"
  Project     = "orders-api"
  ManagedBy   = "terraform"
  CostCenter  = "engineering"
  Team        = "platform"
}

# -----------------------------------------------------------------------------
# Configuración de Auto Scaling
# -----------------------------------------------------------------------------
enable_autoscaling = true

autoscaling_config = {
  read_min_capacity = 2
  read_max_capacity = 20
  write_min_capacity = 2
  write_max_capacity = 20
  target_value       = 70
}

# -----------------------------------------------------------------------------
# Configuración de red (VPC y subnets)
# -----------------------------------------------------------------------------
vpc_config = {
  vpc_id             = "vpc-0123456789abcdef0"
  private_subnets    = ["subnet-0123456789abcdef0", "subnet-0123456789abcdef1"]
  availability_zones = ["us-east-1a", "us-east-1b"]
}

# -----------------------------------------------------------------------------
# Configuración de seguridad
# -----------------------------------------------------------------------------
enable_server_side_encryption = true
sse_key_type                  = "KMS"
sse_key_alias                 = "alias/orders-dev-key"

enable_point_in_time_recovery = true

# -----------------------------------------------------------------------------
# Configuración de streams
# -----------------------------------------------------------------------------
stream_enabled = true
stream_view_type = "NEW_AND_OLD_IMAGES"

# -----------------------------------------------------------------------------
# Configuración de timeouts para operaciones
# -----------------------------------------------------------------------------
timeouts = {
  create = "10m"
  update = "10m"
  delete = "10m"
}

// === ARCHIVO: infra/environments/dev/main.tf ===
# =============================================================================
# Configuración del entorno de desarrollo - Orders API
# =============================================================================
# Este módulo configura la infraestructura para el entorno de desarrollo
# utilizando el módulo de DynamoDB reusable
# =============================================================================

terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# -----------------------------------------------------------------------------
# Obtención de datos del account y región
# -----------------------------------------------------------------------------
data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

# -----------------------------------------------------------------------------
# Módulo de DynamoDB para órdenes
# -----------------------------------------------------------------------------
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  # Configuración de la tabla
  table_name     = var.table_name
  billing_mode   = var.billing_mode
  read_capacity  = var.read_capacity
  write_capacity = var.write_capacity

  # Claves de la tabla
  hash_key  = var.hash_key
  range_key = var.range_key

  # Configuración de GSI
  gsi = var.gsi

  # Etiquetas
  tags = var.tags
}

# -----------------------------------------------------------------------------
# Variables del módulo
# -----------------------------------------------------------------------------
variable "table_name" {
  description = "Nombre de la tabla de DynamoDB"
  type        = string
  default     = "Orders-dev"
}

variable "billing_mode" {
  description = "Modo de facturación de la tabla"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Nombre del atributo de clave de partición"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Nombre del atributo de clave de ordenación"
  type        = string
  default     = "createdAt"
}

variable "gsi" {
  description = "Configuración de Global Secondary Indexes"
  type = object({
    status_index = object({
      name            = string
      hash_key        = string
      range_key       = string
      read_capacity   = number
      write_capacity  = number
      projection_type = string
    })
    customer_index = object({
      name            = string
      hash_key        = string
      range_key       = string
      read_capacity   = number
      write_capacity  = number
      projection_type = string
    })
  })
  default = null
}

variable "tags" {
  description = "Etiquetas para todos los recursos"
  type        = map(string)
  default = {
    Environment = "dev"
    Project     = "orders-api"
  }
}

variable "enable_autoscaling" {
  description = "Habilitar auto scaling para la tabla"
  type        = bool
  default     = true
}

variable "autoscaling_config" {
  description = "Configuración de auto scaling"
  type = object({
    read_min_capacity  = number
    read_max_capacity  = number
    write_min_capacity = number
    write_max_capacity = number
    target_value       = number
  })
  default = null
}

variable "vpc_config" {
  description = "Configuración de VPC"
  type = object({
    vpc_id             = string
    private_subnets    = list(string)
    availability_zones = list(string)
  })
  default = null
}

variable "enable_server_side_encryption" {
  description = "Habilitar cifrado del lado del servidor"
  type        = bool
  default     = true
}

variable "sse_key_type" {
  description = "Tipo de clave SSE (KMS o AES256)"
  type        = string
  default     = "KMS"
}

variable "sse_key_alias" {
  description = "Alias de la clave KMS"
  type        = string
  default     = "alias/orders-dev-key"
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar recuperación a un punto en el tiempo"
  type        = bool
  default     = false
}

variable "stream_enabled" {
  description = "Habilitar streams de DynamoDB"
  type        = bool
  default     = true
}

variable "stream_view_type" {
  description = "Tipo de vista del stream"
  type        = string
  default     = "NEW_AND_OLD_IMAGES"
}

variable "timeouts" {
  description = "Timeouts para operaciones de la tabla"
  type = object({
    create = string
    update = string
    delete = string
  })
  default = null
}

# -----------------------------------------------------------------------------
# Outputs del módulo
# -----------------------------------------------------------------------------
output "table_arn" {
  description = "ARN de la tabla de DynamoDB"
  value       = module.dynamodb_orders.table_arn
}

output "table_name" {
  description = "Nombre de la tabla de DynamoDB"
  value       = module.dynamodb_orders.table_name
}

output "stream_arn" {
  description = "ARN del stream de DynamoDB"
  value       = module.dynamodb_orders.stream_arn
}

output "dynamodb_endpoint" {
  description = "Endpoint de DynamoDB para el entorno"
  value       = "https://dynamodb.${data.aws_region.current.name}.amazonaws.com"
}

output "account_id" {
  description = "ID de la cuenta de AWS"
  value       = data.aws_caller_identity.current.account_id
}

output "region" {
  description = "Región de AWS"
  value       = data.aws_region.current.name
}

output "workspace_name" {
  description = "Nombre del workspace de Terraform actual"
  value       = terraform.workspace
}

// === ARCHIVO: infra/README.md ===
# Infraestructura - Orders API

Este directorio contiene la configuración de infraestructura como código para el sistema de gestión de órdenes.

## Estructura

```
infra/
├── environments/
│   └── dev/
│       ├── main.tf          # Configuración del entorno de desarrollo
│       └── terraform.tfvars # Variables específicas del entorno
├── modules/
│   └── dynamodb/            # Módulo reusable de DynamoDB
└── README.md                # Este archivo
```

## Entornos

### Desarrollo (`environments/dev/`)

El entorno de desarrollo utiliza:

- **Tabla DynamoDB**: `Orders-dev` con modo de facturación PAY_PER_REQUEST
- **Índices GSI**: 
  - `StatusIndex` - para consultas por estado de orden
  - `CustomerIndex` - para consultas por cliente
- **Auto Scaling**: Habilitado para ajustar capacidad automáticamente
- **Cifrado**: KMS con clave dedicada
- **Streams**: Habilitados para captura de cambios

## Recursos definidos

### Tabla DynamoDB

| Recurso | Descripción |
|---------|-------------|
| `aws_dynamodb_table.orders_table` | Tabla principal de órdenes |
| `aws_appautoscaling_target.*` | Targets de auto scaling |
| `aws_appautoscaling_policy.*` | Políticas de auto scaling |

### Outputs disponibles

- `table_arn` - ARN de la tabla
- `table_name` - Nombre de la tabla
- `stream_arn` - ARN del stream de DynamoDB

## Validación local

### Prerrequisitos

- Terraform >= 1.9.0
- AWS CLI configurado con credenciales
- Provider AWS configurado

### Comandos de validación

```bash
# Navegar al directorio del entorno
cd environments/dev

# Inicializar Terraform
terraform init

# Validar sintaxis y configuración
terraform validate

# Planificar cambios (ver qué se creará)
terraform plan

# Mostrar los recursos que se crearán
terraform show
```

### Verificar la tabla creada

```bash
# Después de aplicar los cambios
aws dynamodb describe-table \
  --table-name Orders-dev \
  --region us-east-1

# Listar los GSI
aws dynamodb describe-table \
  --table-name Orders-dev \
  --region us-east-1 \
  --query 'Table.GlobalSecondaryIndexes'
```

## Consumo del módulo

Para utilizar el módulo de DynamoDB en otros entornos:

```hcl
module "dynamodb_orders" {
  source = "../../modules/dynamodb"

  table_name     = "Orders-prod"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "orderId"
  range_key      = "createdAt"
  
  tags = {
    Environment = "prod"
    Project     = "orders-api"
  }
}
```

## Notas

- El módulo de DynamoDB es reusable y puede ser consumido por múltiples entornos
- Los índices GSI permiten consultas eficientes por status y customerId
- Auto scaling ajusta la capacidad basada en el consumo real
- Los streams permiten integrar con otros servicios (Lambda, Kinesis, etc.)

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.

Tablas de DynamoDB: `Orders` (pk `id`).


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "Orders" "id"

```
