resource "vercel_project" "web" {
  name      = "hotel-project-web"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/web"

  # Manual configuration overrides
  install_command = "pnpm install --prefix=../.."
  build_command   = "npx turbo run build --filter=web"
}

resource "vercel_project_environment_variable" "web_url" {
  project_id = vercel_project.web.id
  team_id    = var.vercel_team_id
  key        = "NEXT_PUBLIC_SUPABASE_URL"
  value      = var.supabase_url
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "web_key" {
  project_id = vercel_project.web.id
  team_id    = var.vercel_team_id
  key        = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  value      = var.supabase_anon_key
  target     = ["production", "preview", "development"]
}

resource "vercel_project" "api" {
  name    = "hotel-project-api"
  team_id = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/api"

  # Manual configuration overrides
  install_command  = "pnpm install --prefix=../.."
  build_command    = "cd ../.. && npx turbo run build --filter=api"
  output_directory = "dist"
}

resource "vercel_project_environment_variable" "api_url" {
  project_id = vercel_project.api.id
  team_id    = var.vercel_team_id
  key        = "NEXT_PUBLIC_SUPABASE_URL"
  value      = var.supabase_url
  target     = ["production", "preview", "development"]
}

resource "vercel_project_environment_variable" "api_key" {
  project_id = vercel_project.api.id
  team_id    = var.vercel_team_id
  key        = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  value      = var.supabase_anon_key
  target     = ["production", "preview", "development"]
}
