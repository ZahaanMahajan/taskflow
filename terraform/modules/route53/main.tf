resource "aws_route53_zone" "this" {
  name = var.domain_name

  comment = "TaskFlow production DNS zone"
}

resource "aws_route53_record" "argocd" {
  zone_id = aws_route53_zone.this.zone_id
  name    = "argocd.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.alb_dns_name
    zone_id                = "ZP97RAFLXTNZK"
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "taskflow" {
  zone_id = aws_route53_zone.this.zone_id
  name    = "taskflow.${var.domain_name}"
  type    = "A"

  alias {
    name                   = var.alb_dns_name
    zone_id                = "ZP97RAFLXTNZK"
    evaluate_target_health = false
  }
}
