resource "helm_release" "argocd" {
  name       = "argocd"
  namespace  = var.namespace
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = var.chart_version

  create_namespace = true

  values = [
    yamlencode({
      server = {
        extraArgs = [
          "--insecure"
        ]
        service = {
          type = "ClusterIP"
        }
      }
    })
  ]
}
