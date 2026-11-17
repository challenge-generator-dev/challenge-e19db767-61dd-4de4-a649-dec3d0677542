# Implementación de operaciones CRUD de ordenes en DynamoDB desde la interfaz

El sistema debe permitir a los usuarios gestionar ordenes mediante operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en DynamoDB. La interfaz de usuario, construida con React, interactúa con un servidor que maneja la lógica de negocio y la persistencia en DynamoDB. El estado local se maneja con hooks, sin usar Redux Toolkit. Las pruebas de aceptación deben cubrir la creación de una orden y el cambio de su estado.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración inicial y creación de orden

**Objetivo:** Configurar el entorno de desarrollo y permitir la creación de una orden en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Configurar el proyecto React con Vite 5.
- Implementar la funcionalidad para crear una orden y persistirla en DynamoDB.
- Asegurar que la creación de una orden se pueda probar y versionar la infraestructura con Terraform.

**Entregable:** Proyecto React configurado con Vite 5, funcionalidad para crear ordenes en DynamoDB y script de Terraform para versionar la infraestructura.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de hooks para manejar el estado local en React.
- Configuración de DynamoDB y acceso desde el servidor.

</details>

### Fase 2: Lectura y actualización de orden

**Objetivo:** Implementar la funcionalidad para leer y actualizar ordenes en DynamoDB.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Implementar la funcionalidad para leer una orden desde DynamoDB.
- Implementar la funcionalidad para actualizar el estado de una orden en DynamoDB.
- Asegurar que las pruebas de aceptación cubran la lectura y actualización de ordenes.

**Entregable:** Funcionalidad para leer y actualizar ordenes en DynamoDB, con pruebas de aceptación que cubran estos casos.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de hooks para manejar la actualización del estado en React.
- Manejo de errores y validaciones en la actualización de ordenes.

</details>

### Fase 3: Eliminación de orden y versionado de infraestructura

**Objetivo:** Implementar la funcionalidad para eliminar ordenes en DynamoDB y versionar la infraestructura con Terraform.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Implementar la funcionalidad para eliminar una orden en DynamoDB.
- Versionar la infraestructura con Terraform para asegurar la consistencia y reproducibilidad del entorno.
- Asegurar que la eliminación de ordenes se pueda probar y que la infraestructura esté correctamente versionada.

**Entregable:** Funcionalidad para eliminar ordenes en DynamoDB y script de Terraform actualizado para versionar la infraestructura.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de hooks para manejar la eliminación de ordenes en React.
- Prácticas de versionado de infraestructura con Terraform.

</details>

### Fase 4: Refactorización y optimización

**Objetivo:** Refactorizar el código para mejorar la legibilidad y rendimiento, y optimizar las operaciones en DynamoDB.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Refactorizar el servicio de órdenes en el componente `api` para separar responsabilidades de validación y persistencia.
- Optimizar las consultas a DynamoDB en el adaptador de salida para reducir lecturas innecesarias.
- Asegurar que todas las pruebas de aceptación existentes pasen después de la refactorización.

**Entregable:** Código refactorizado y optimizado para las operaciones CRUD en DynamoDB, con pruebas que aseguren el correcto funcionamiento.

<details>
<summary>Pistas de conocimiento</summary>

- Prácticas de refactorización y optimización de código.
- Uso eficiente de DynamoDB para mejorar el rendimiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB desde una interfaz React?
- **paraQueSirve**: ¿Para qué sirve versionar la infraestructura con Terraform en este contexto?
- **comoSeUsa**: ¿Cómo se usan hooks para manejar el estado local en React sin Redux Toolkit?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB y cómo se manejan?
- **queDecisionesImplica**: ¿Qué decisiones implica la refactorización y optimización del código en este contexto?

## Criterios de Evaluacion

- Configuración correcta del proyecto React con Vite 5.
- Implementación de la funcionalidad para crear, leer, actualizar y eliminar ordenes en DynamoDB.
- Uso de hooks para manejar el estado local en React sin Redux Toolkit.
- Versionado correcto de la infraestructura con Terraform.
- Refactorización y optimización del código para mejorar la legibilidad y rendimiento.

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

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite@5` | Restriccion no verificada en chequeo estatico (manifest): exige `vite@5` |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (code): prohibe `@reduxjs/toolkit`, `redux` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
