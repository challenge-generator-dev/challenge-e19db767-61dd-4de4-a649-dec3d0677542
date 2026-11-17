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