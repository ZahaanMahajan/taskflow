resource "aws_secretsmanager_secret" "taskflow_database" {
  name        = "taskflow/production/database"
  description = "TaskFlow production PostgreSQL credentials"

  tags = {
    Project     = "taskflow"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_secretsmanager_secret" "taskflow_ghcr" {
  name        = "taskflow/production/ghcr"
  description = "TaskFlow production GHCR pull credentials"

  tags = {
    Project     = "taskflow"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_secretsmanager_secret" "argocd_github" {
  name        = "taskflow/production/argocd-github"
  description = "TaskFlow production Argo CD GitHub repository credentials"

  tags = {
    Project     = "taskflow"
    Environment = "production"
    ManagedBy   = "terraform"
  }
}

resource "aws_iam_policy" "external_secrets" {
  name        = "${var.cluster_name}-external-secrets"
  description = "Allow External Secrets Operator to read TaskFlow database secret"

  policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Action = [
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret",
          "secretsmanager:GetResourcePolicy",
          "secretsmanager:ListSecretVersionIds"
        ]

        Resource = [
          aws_secretsmanager_secret.taskflow_database.arn,
          aws_secretsmanager_secret.taskflow_ghcr.arn,
          aws_secretsmanager_secret.argocd_github.arn,
        ]
      }
    ]
  })
}

resource "aws_iam_role" "external_secrets" {
  name = "${var.cluster_name}-external-secrets"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"

    Statement = [
      {
        Effect = "Allow"

        Principal = {
          Service = "pods.eks.amazonaws.com"
        }

        Action = [
          "sts:AssumeRole",
          "sts:TagSession"
        ]
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "external_secrets" {
  role       = aws_iam_role.external_secrets.name
  policy_arn = aws_iam_policy.external_secrets.arn
}

resource "helm_release" "external_secrets" {
  name       = "external-secrets"
  namespace  = var.namespace
  repository = "https://charts.external-secrets.io"
  chart      = "external-secrets"
  version    = var.chart_version

  create_namespace = true

  values = [
    yamlencode({
      installCRDs = true

      serviceAccount = {
        create = true
        name   = var.service_account_name
      }
    })
  ]
}

resource "aws_eks_pod_identity_association" "external_secrets" {
  cluster_name    = var.cluster_name
  namespace       = var.namespace
  service_account = var.service_account_name
  role_arn        = aws_iam_role.external_secrets.arn

  depends_on = [
    helm_release.external_secrets
  ]
}
