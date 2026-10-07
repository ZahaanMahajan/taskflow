module "vpc" {
  source = "../../modules/vpc"

  name = "taskflow-production"

  vpc_cidr = "10.0.0.0/16"

  availability_zones = [
    "ap-south-1a",
    "ap-south-1b"
  ]

  public_subnet_cidrs = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]

  private_subnet_cidrs = [
    "10.0.11.0/24",
    "10.0.12.0/24"
  ]
}

module "eks" {
  source = "../../modules/eks"

  cluster_name       = "taskflow-production"
  kubernetes_version = "1.37"

  vpc_id = module.vpc.vpc_id

  private_subnet_ids = module.vpc.private_subnet_ids

  node_instance_type = "c7i-flex.large"

  node_desired_size = 2
  node_min_size     = 2
  node_max_size     = 3
}

module "rds" {
  source = "../../modules/rds"

  name = "taskflow-production-db"

  subnet_ids = module.vpc.private_subnet_ids
  vpc_id     = module.vpc.vpc_id

  allowed_security_group_id = module.eks.cluster_security_group_id

  database_name     = var.database_name
  database_username = var.database_username
  database_password = var.database_password
}

module "aws_load_balancer_controller" {
  source = "../../modules/eks-controller"

  cluster_name         = module.eks.cluster_name
  namespace            = "kube-system"
  service_account_name = "aws-load-balancer-controller"
  vpc_id               = module.vpc.vpc_id
}

module "argocd" {
  source = "../../modules/argocd"

  certificate_arn = "arn:aws:acm:ap-south-1:372951851996:certificate/8ce98ad6-0de9-41a2-8414-203bda17fb0d"
}

module "route53" {
  source = "../../modules/route53"

  domain_name  = "aws.zahaan.online"
  alb_dns_name = "k8s-taskflow-taskflow-b597d3c40a-1218659813.ap-south-1.elb.amazonaws.com"
}

module "external_secrets" {
  source = "../../modules/external-secrets"

  cluster_name = module.eks.cluster_name
}
