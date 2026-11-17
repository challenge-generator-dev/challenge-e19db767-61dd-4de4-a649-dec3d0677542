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