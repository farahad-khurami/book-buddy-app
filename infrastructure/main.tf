resource "aws_ecr_repository" "backend_ecr_repo" {
  name = "app-backend-repo"
  force_delete = true
}

resource "aws_ecr_repository" "frontend_ecr_repo" {
  name = "app-frontend-repo"
  force_delete = true
}

resource "aws_ecs_cluster" "book-buddy-cluster" {
  name = "app-cluster"

}