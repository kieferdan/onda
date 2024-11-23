package config

import "os"

type Config struct {
	SupabaseURL string
	SupabaseKey string
}

func Load() (*Config, error) {
	return &Config{
		SupabaseURL: os.Getenv("SUPABASE_URL"),
		SupabaseKey: os.Getenv("SUPABASE_KEY"),
	}, nil
}
