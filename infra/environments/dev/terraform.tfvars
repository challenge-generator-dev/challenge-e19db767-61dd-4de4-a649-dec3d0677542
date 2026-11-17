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