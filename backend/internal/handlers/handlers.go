package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/kieferdan/onda-backend/internal/services"
	"github.com/kieferdan/onda-backend/pkg/supabase"
)

type Handler struct {
	supabaseClient *supabase.Client
	weatherService services.WeatherService
}

func NewHandler(supabaseClient *supabase.Client, weatherService services.WeatherService) *Handler {
	return &Handler{
		supabaseClient: supabaseClient,
		weatherService: weatherService,
	}
}

func (h *Handler) GetBeaches(c *gin.Context) {
	// Implement beach fetching logic here
	c.JSON(http.StatusOK, gin.H{"message": "Beaches fetched successfully"})
}

func (h *Handler) GetWeatherConditions(c *gin.Context) {
	// Implement weather conditions fetching logic here
	c.JSON(http.StatusOK, gin.H{"message": "Weather conditions fetched successfully"})
}
