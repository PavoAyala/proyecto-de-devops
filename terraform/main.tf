resource "vercel_project" "web" {
  name      = "hotel-project-web"
  framework = "nextjs"
  
  git_repository = {
    type = "github"
    repo = var.github_repo
  }
  
  root_directory = "apps/web"
}

resource "vercel_project" "api" {
  name      = "hotel-project-api"
  # framework = "node" # Using generic Node.js framework for the API - Removed as "node" is not a valid framework identifier. Omitted to use default/other.
  
  git_repository = {
    type = "github"
    repo = var.github_repo
  }
  
  root_directory = "apps/api"
  
  # Ensure the build command matches your package.json
  build_command = "cd ../.. && npx turbo run build --filter=api"
  output_directory = "dist" # Assuming 'tsc' outputs here, adjust if needed
}
