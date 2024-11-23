package main

import (
	"log"
	"net/http"
	"os"

	"github.com/kieferdan/onda-backend/internal/config"
	"github.com/kieferdan/onda-backend/internal/handlers"
	"github.com/kieferdan/onda-backend/internal/services"
	"github.com/kieferdan/onda-backend/pkg/supabase"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	supabaseClient := supabase.NewClient(cfg.SupabaseURL, cfg.SupabaseKey)
	weatherService := services.NewWeatherService() // You'll implement this later

	handler := handlers.NewHandler(supabaseClient, weatherService)

	r := gin.Default()
	r.GET("/api/beaches", handler.GetBeaches)
	r.GET("/api/weather", handler.GetWeatherConditions)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, r); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
