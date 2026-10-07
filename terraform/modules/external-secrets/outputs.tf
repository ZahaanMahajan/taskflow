output "secret_arn" {
  value = aws_secretsmanager_secret.taskflow_database.arn
}

output "role_arn" {
  value = aws_iam_role.external_secrets.arn
}
