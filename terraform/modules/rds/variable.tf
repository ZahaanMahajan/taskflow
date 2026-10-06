variable "name" {
  type = string
}

variable "subnet_ids" {
  type = list(string)
}

variable "vpc_id" {
  type = string
}

variable "allowed_security_group_id" {
  type = string
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
