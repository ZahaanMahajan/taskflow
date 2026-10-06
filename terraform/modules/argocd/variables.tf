variable "namespace" {
  type    = string
  default = "argocd"
}

variable "chart_version" {
  type    = string
  default = "9.4.3"
}

variable "certificate_arn" {
  description = "ACM certificate ARN for *.aws.zahaan.online"
  type        = string
}
