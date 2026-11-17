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