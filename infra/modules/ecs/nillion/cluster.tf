resource "aws_ecs_cluster" "cluster" {
  name = "plat-fellowship-${var.environment_name}-nillion"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}