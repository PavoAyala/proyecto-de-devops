variable "vercel_api_token" {
  description = "The API token for Vercel authentication"
  type        = string
  sensitive   = true
}

variable "vercel_team_id" {
  description = "The Team ID for Vercel Organization"
  type        = string
}

variable "github_repo" {
  description = "The GitHub repository name (e.g., user/repo)"
  type        = string
  default     = "PavoAyala/proyecto-de-devops"
}

variable "supabase_url" {
  description = "The Supabase URL"
  type        = string
}

variable "supabase_anon_key" {
  description = "The Supabase Anon Key"
  type        = string
  sensitive   = true
}
