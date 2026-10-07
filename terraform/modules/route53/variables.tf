variable "domain_name" {
  description = "Route 53 delegated subdomain"
  type        = string
}

variable "alb_dns_name" {
  type        = string
  description = "DNS name of the shared TaskFlow ALB"
}
