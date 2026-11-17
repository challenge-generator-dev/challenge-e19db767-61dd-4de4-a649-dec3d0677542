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