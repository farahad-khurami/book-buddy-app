resource "aws_ecr_repository" "backend_ecr_repo" {
  name = "app-backend-repo"
}

resource "aws_ecr_repository" "frontend_ecr_repo" {
  name = "app-frontend-repo"
}