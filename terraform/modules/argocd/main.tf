resource "kubernetes_namespace_v1" "argocd" {
  metadata {
    name = var.namespace

    labels = {
      "gateway-access" = "taskflow"
    }
  }
}

resource "helm_release" "argocd" {
  name       = "argocd"
  namespace  = var.namespace
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = var.chart_version

  create_namespace = false

  depends_on = [
    kubernetes_namespace_v1.argocd
  ]

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
