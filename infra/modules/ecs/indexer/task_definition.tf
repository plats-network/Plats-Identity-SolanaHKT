# task definition for repo api
resource "aws_ecs_task_definition" "core" {
  family                   = aws_ecs_cluster.cluster.name
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  container_definitions = jsonencode([
    {
      name         = "plat-fellowship-${var.environment_name}-indexer"
      image        = "${var.ecr_uri}:latest"
      links        = []
      portMappings = []
      essential    = true
      entryPoint   = []
      command      = []
      environment = [
        {
          "name" : "RPC_URL",
          "value" : "https://api.devnet.solana.com"
        },
        {
          "name" : "BACKEND_URL",
          "value" : "http://172.31.21.6"
        }
      ]
      environmentFiles = []
      mountPoints      = []
      volumesFrom      = []
      secrets = [
        {
          name      = "REDIS_HOST",
          valueFrom = "${var.secret_arn}:redisHost::"
        },
        {
          name      = "REDIS_PORT",
          valueFrom = "${var.secret_arn}:redisPort::"
        },
        {
          name      = "REDIS_DB",
          valueFrom = "${var.secret_arn}:redisDb::"
        },
        {
          name      = "REDIS_PASSWORD",
          valueFrom = "${var.secret_arn}:redisPassword::"
        }
      ]
      dnsServers            = []
      dnsSearchDomains      = []
      extraHosts            = []
      dockerSecurityOptions = []
      dockerLabels          = {}
      ulimits               = []
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group         = "/aws/ecs/${aws_ecs_cluster.cluster.name}"
          awslogs-create-group  = "true"
          awslogs-region        = var.logs_region
          awslogs-stream-prefix = "core"
        },
        secretOptions = []
      }
      systemControls  = []
      credentialSpecs = []
      # healthCheck = {
      #   retries = 3
      #   command = [
      #     "CMD-SHELL",
      #     "curl -f http://localhost/_health || exit 1"
      #   ],
      #   timeout     = 5
      #   interval    = 60
      #   startPeriod = null
      # }
    }
  ])
  # The task execution role grants the Amazon ECS container and Fargate agents permission to make AWS API calls on your behalf.
  execution_role_arn = var.ecs_task_execution_role_arn
  # This role allows your application code (on the container) to use other AWS services
  task_role_arn = var.ecs_task_container_role_arn
  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }
  ephemeral_storage {
    size_in_gib = 21
  }
  tags = {
    Environment = var.environment_name
    SystemName  = "plat"
    ProductName = "plat-fellowship"
    Service     = "indexer"
  }
}