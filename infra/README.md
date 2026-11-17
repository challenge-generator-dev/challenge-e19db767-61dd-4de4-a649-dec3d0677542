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