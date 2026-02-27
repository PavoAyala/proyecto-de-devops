resource "vercel_project" "web" {
  name      = "hotel-project-web"
  framework = "nextjs"
  team_id   = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/web"

  environment = [
    {
      key    = "NEXT_PUBLIC_SUPABASE_URL"
      value  = var.supabase_url
      target = ["production", "preview", "development"]
    },
    {
      key    = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      value  = var.supabase_anon_key
      target = ["production", "preview", "development"]
    }
  ]
}

resource "vercel_project" "api" {
  name    = "hotel-project-api"
  team_id = var.vercel_team_id

  git_repository = {
    type = "github"
    repo = var.github_repo
  }

  root_directory = "apps/api"

  # Ensure the build command matches your package.json
  build_command    = "cd ../.. && npx turbo run build --filter=api"
  output_directory = "dist" # Assuming 'tsc' outputs here, adjust if needed

  environment = [
    {
      key    = "NEXT_PUBLIC_SUPABASE_URL"
      value  = var.supabase_url
      target = ["production", "preview", "development"]
    },
    {
      key    = "NEXT_PUBLIC_SUPABASE_ANON_KEY"
      value  = var.supabase_anon_key
      target = ["production", "preview", "development"]
    }
  ]
}
