variable "aws_region" {
  description = "AWS region for TaskFlow production infrastructure"
  type        = string
  default     = "ap-south-1"
}

variable "database_name" {
  description = "TaskFlow PostgreSQL database name"
  type        = string
  default     = "taskflow"
}

variable "database_username" {
  description = "TaskFlow PostgreSQL username"
  type        = string
  default     = "taskflow"
}

variable "database_password" {
  description = "TaskFlow PostgreSQL password"
  type        = string
  sensitive   = true
}
