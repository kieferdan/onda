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
	weatherService := services.NewWeatherService()

	handler := handlers.NewHandler(supabaseClient, weatherService)

	r := gin.Default()

	// Add CORS middleware
	r.Use(corsMiddleware())

	r.GET("/api/beaches", handler.GetBeaches)
	r.GET("/api/beaches/nearby", handler.GetNearbyBeaches)
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

func corsMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
