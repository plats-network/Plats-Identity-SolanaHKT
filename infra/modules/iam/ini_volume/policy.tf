# policy: read-write log
resource "aws_iam_policy" "cloud_watch_log" {
  name = "plat-fellowship-${var.environment_name}-ini-volume-cloud-watch-log"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogStreams",
          "logs:GetLogEvents",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

# policy: full sqs
resource "aws_iam_policy" "sqs_io" {
  name = "plat-fellowship-${var.environment_name}-ini-volume-sqs-io"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sqs:SendMessage",
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}

# policy: full lambda
resource "aws_iam_policy" "lambda_io" {
  name = "plat-fellowship-${var.environment_name}-ini-volume-lambda-io"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "lambda:InvokeFunction"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}
# policy: secret manager readonly
resource "aws_iam_policy" "secret_manager_readonly" {
  name = "plat-fellowship-${var.environment_name}-ini-volume-secret-manager-readonly"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
}