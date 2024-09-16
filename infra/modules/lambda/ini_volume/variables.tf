# environment
variable "environment_name" {
  type        = string
  description = "This is environment name [prod | stag | dev]"
}

# iam
variable "lambda_execution_role_arn" {
  type        = string
  description = "lambda execution role arn"
}

variable "code_path" {
  type        = string
  description = "code_path"
}

variable "layer_path" {
  type        = string
  description = "layer_path"
}

variable "source_arn" {
  type        = string
  description = "source_arn"
}