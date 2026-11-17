# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz**.

| | |
|---|---|
| Tema | Persistir ordenes en DynamoDB desde la interfaz |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Node |
| Stack | TypeScript / NestJS 10 |
| Patron arquitectonico | hexagonal/clean |
| Tiempo estimado | 10 horas |

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

## Receta del stack

Esqueleto obligatorio:

- `package.json y tsconfig.json en la raiz`
- `src/main.ts como bootstrap`
- `modulo raiz de Nest`
- `src/domain con entidades y puertos`
- `src/application con casos de uso`
- `src/infrastructure con repositorios y controller`

Trampas conocidas:

- No inventes versiones de npm. Usa rango con caret (`^5.7.2`) sobre una version que exista, o deja que el paquete la resuelva. Una version inexistente (ej. `@types/react-router-dom@6.19.0`) hace fallar `npm install` con ETARGET y el proyecto no instala.
- Los paquetes `@types/*` solo hacen falta para librerias que no traen sus propios tipos. React Router, NestJS y Prisma ya los traen: agregar `@types/` de esos rompe o sobra.
- El `tsconfig.json` es obligatorio: sin el, `tsc` no sabe que compilar.

Dependencias:

- @aws-sdk/client-dynamodb 3.1170.0
- @aws-sdk/lib-dynamodb 3.1170.0
- @nestjs/common 10.4.22
- @nestjs/config 4.0.4
- @nestjs/core 10.4.22
- @nestjs/platform-express 10.4.22
- class-transformer 0.5.1
- class-validator 0.15.1
- reflect-metadata 0.2.2
- rxjs 7.8.2
- @nestjs/testing 10.4.22
- @types/express 4.17.25
- @types/jest 29.5.14
- @types/node 22.20.5
- jest 29.7.0
- ts-jest 29.2.5
- typescript 5.7.3

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Segui el orden de arranque del mapa de componentes (infraestructura local primero) y corre `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` desde la raiz: mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Configuración inicial y creación de orden**: Proyecto React configurado con Vite 5, funcionalidad para crear ordenes en DynamoDB y script de Terraform para versionar la infraestructura.
- **Fase 2 — Lectura y actualización de orden**: Funcionalidad para leer y actualizar ordenes en DynamoDB, con pruebas de aceptación que cubran estos casos.
- **Fase 3 — Eliminación de orden y versionado de infraestructura**: Funcionalidad para eliminar ordenes en DynamoDB y script de Terraform actualizado para versionar la infraestructura.
- **Fase 4 — Refactorización y optimización**: Código refactorizado y optimizado para las operaciones CRUD en DynamoDB, con pruebas que aseguren el correcto funcionamiento.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Superficie de practica (NO completes)

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs. No toques la logica que el reto pide completar.

- [ ] `api/src/application/services/order.service.ts` — La pieza p2 (Creación de órdenes con validación de negocio, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p3 (Persistencia de órdenes en DynamoDB, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `api/src/domain/entities/order.entity.ts` — absorbida: fuga de la pieza p2
- [ ] `api/src/application/dto/update-order-state.dto.ts` — absorbida: fuga de la pieza p2
- [ ] `api/src/infrastructure/controllers/orders.controller.ts` — absorbida: fuga de la pieza p2
- [ ] `client/src/features/orders/components/OrderForm.tsx` — La pieza p4 (Manejo de estado local y envío de datos al backend, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `client/src/features/orders/components/OrderDetail.tsx` — La pieza p7 (Recuperación de datos del backend y manejo de estado, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- [ ] `client/src/features/orders/components/OrderList.tsx` — La pieza p10 (Eliminación de órdenes desde el UI y manejo de estado, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración inicial y creación de orden | Declaración de recursos de infraestructura con Terraform | — | El proyecto React está configurado con Vite 5 y puede crear órdenes en DynamoDB; La infraestructura de DynamoDB está declarada con Terraform y puede ser provisionada | — | — |
| f1 — Configuración inicial y creación de orden | Creación de órdenes con validación de negocio | `api/src/application/services/order.service.ts:OrderService.createOrder` | El proyecto React está configurado con Vite 5 y puede crear órdenes en DynamoDB; La infraestructura de DynamoDB está declarada con Terraform y puede ser provisionada | — | — |
| f1 — Configuración inicial y creación de orden | Persistencia de órdenes en DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository.save` | El proyecto React está configurado con Vite 5 y puede crear órdenes en DynamoDB; La infraestructura de DynamoDB está declarada con Terraform y puede ser provisionada | — | — |
| f1 — Configuración inicial y creación de orden | Manejo de estado local y envío de datos al backend | `client/src/features/orders/components/OrderForm.tsx:OrderForm.submit` | El proyecto React está configurado con Vite 5 y puede crear órdenes en DynamoDB; La infraestructura de DynamoDB está declarada con Terraform y puede ser provisionada | — | — |
| f2 — Lectura y actualización de orden | Recuperación de órdenes con validación | `api/src/application/services/order.service.ts:OrderService.getOrder` | Se puede leer una orden existente de DynamoDB; Se puede actualizar el estado de una orden en DynamoDB | — | — |
| f2 — Lectura y actualización de orden | Consulta de órdenes en DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository.findById` | Se puede leer una orden existente de DynamoDB; Se puede actualizar el estado de una orden en DynamoDB | — | — |
| f2 — Lectura y actualización de orden | Recuperación de datos del backend y manejo de estado | `client/src/features/orders/components/OrderDetail.tsx:OrderDetail.fetchOrder` | Se puede leer una orden existente de DynamoDB; Se puede actualizar el estado de una orden en DynamoDB | — | — |
| f3 — Eliminación de orden y versionado de infraestructura | Eliminación de órdenes con validación | `api/src/application/services/order.service.ts:OrderService.deleteOrder` | Se puede eliminar una orden de DynamoDB; La infraestructura está versionada con Terraform y puede ser destruida | — | — |
| f3 — Eliminación de orden y versionado de infraestructura | Eliminación de órdenes en DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository.delete` | Se puede eliminar una orden de DynamoDB; La infraestructura está versionada con Terraform y puede ser destruida | — | — |
| f3 — Eliminación de orden y versionado de infraestructura | Eliminación de órdenes desde el UI y manejo de estado | `client/src/features/orders/components/OrderList.tsx:OrderList.deleteOrder` | Se puede eliminar una orden de DynamoDB; La infraestructura está versionada con Terraform y puede ser destruida | — | — |
| f4 — Refactorización y optimización | Refactorización de lógica de transición de estado | `api/src/application/services/order.service.ts:OrderService.transitionOrderState` | El código refactorizado mantiene la misma funcionalidad CRUD con mejor legibilidad; Las operaciones en DynamoDB están optimizadas para reducir costos y latencia | — | — |
| f4 — Refactorización y optimización | Optimización de actualizaciones en DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository.updateOrderState` | El código refactorizado mantiene la misma funcionalidad CRUD con mejor legibilidad; Las operaciones en DynamoDB están optimizadas para reducir costos y latencia | — | — |

## Pruebas de aceptacion y ubicacion de la logica

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

La logica de cada pieza va en su archivo; no la muevas a otro.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite@5` | Restriccion no verificada en chequeo estatico (manifest): exige `vite@5` |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (code): prohibe `@reduxjs/toolkit`, `redux` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

## Lo que falta y tenes que completar

### 1. Archivos que la arquitectura declara (4 de 27)

La propuesta arquitectonica del reto los lista y no llegaron al repo. Crealos con implementacion real, respetando la capa en la que viven:

- [ ] `api/src/acceptance/f1.test.ts`
- [ ] `api/src/acceptance/f2.test.ts`
- [ ] `api/src/acceptance/f3.test.ts`
- [ ] `api/src/acceptance/f4.test.ts`

### Presentes (38)

- `api/package.json`
- `api/tsconfig.json`
- `api/src/application/ports/order-repository.port.ts`
- `api/src/domain/entities/order.entity.ts`
- `api/src/application/dto/create-order.dto.ts`
- `api/src/infrastructure/config/dynamodb.config.ts`
- `api/src/application/services/order.service.ts`
- `api/src/infrastructure/repositories/dynamo-order.repository.ts`
- `api/src/app.module.ts`
- `api/src/main.ts`
- `api/src/application/dto/update-order-state.dto.ts`
- `api/src/infrastructure/controllers/orders.controller.ts`
- `client/src/main.tsx`
- `client/package.json`
- `client/tsconfig.json`
- `client/vite.config.ts`
- `client/index.html`
- `client/src/vite-env.d.ts`
- `client/src/features/orders/hooks/useOrderFormState.ts`
- `client/src/features/orders/hooks/useOrderDetailState.ts`
- `client/src/features/orders/hooks/useOrderListState.ts`
- `client/src/features/orders/services/order-api.client.ts`
- `client/src/features/orders/types/order.types.ts`
- `client/src/features/orders/components/OrderForm.tsx`
- `client/src/features/orders/components/OrderDetail.tsx`
- `client/src/features/orders/components/OrderList.tsx`
- `client/src/App.tsx`
- `infra/outputs.tf`
- `infra/variables.tf`
- `infra/versions.tf`
- `infra/providers.tf`
- `infra/modules/dynamodb/main.tf`
- `infra/environments/dev/terraform.tfvars`
- `infra/environments/dev/main.tf`
- `infra/README.md`
- `docker-compose.yml`
- `infra-local/README.md`
- `infra-local/dynamodb/create-tables.sh`

### Capas del patron declarado

Son las capas que la propuesta arquitectonica plantea, marcadas segun existan hoy en el repo. Orientan donde poner el codigo nuevo; no son una condicion para compilar.

- `api` (presente)
- `api/src/application/services` (presente)
- `api/src/application/ports` (presente)
- `api/src/application/dto` (presente)
- `api/src/infrastructure/repositories` (presente)
- `api/src/infrastructure/controllers` (presente)
- `api/src/domain/entities` (presente)
- `api/src/infrastructure/config` (presente)
- `client` (presente)
- `client/src/features/orders/components` (presente)
- `client/src/features/orders/hooks` (presente)
- `client/src/features/orders/services` (presente)
- `client/src/features/orders/types` (presente)
- `infra` (presente)
- `infra/modules/dynamodb` (presente)
- `infra/environments/dev` (presente)

## Verificacion

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

El comando tiene que pasar SIN implementar los archivos de la superficie de practica: solo andamiaje.

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- Cada componente vive en su carpeta: instala y compila dentro de ella, y no muevas archivos entre componentes.
- Respeta los contratos entre componentes (endpoints, topics) tal como estan declarados en el mapa de componentes.
- El patron es **hexagonal/clean**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2
- Brecha que el reto ataca: CRUD de ordenes en DynamoDB desde la interfaz
- Mision: Gestionar ordenes

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
