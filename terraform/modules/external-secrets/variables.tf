variable "cluster_name" {
  description = "EKS cluster name"
  type        = string
}

variable "namespace" {
  description = "Namespace for External Secrets Operator"
  type        = string
  default     = "external-secrets"
}

variable "service_account_name" {
  description = "ESO controller service account"
  type        = string
  default     = "external-secrets"
}

variable "chart_version" {
  description = "External Secrets Operator Helm chart version"
  type        = string
  default     = "2.12.0"
}
