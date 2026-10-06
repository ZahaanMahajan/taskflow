output "rds_endpoint" {
  value = module.rds.endpoint
}

output "rds_port" {
  value = module.rds.port
}

output "rds_database_name" {
  value = module.rds.database_name
}

output "rds_security_group_id" {
  value = module.rds.security_group_id
}

output "route53_zone_id" {
  value = module.route53.zone_id
}

output "route53_name_servers" {
  value = module.route53.name_servers
}
