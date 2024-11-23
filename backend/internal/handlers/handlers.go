package handlers

import (
	"net/http"
	"strconv"

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
	// TODO: Implement beach fetching logic
	c.JSON(http.StatusOK, gin.H{"message": "Get beaches endpoint"})
}

func (h *Handler) GetNearbyBeaches(c *gin.Context) {
	lat := c.Query("lat")
	lng := c.Query("lng")
	limit := c.DefaultQuery("limit", "5")

	latFloat, err := strconv.ParseFloat(lat, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid latitude"})
		return
	}

	lngFloat, err := strconv.ParseFloat(lng, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid longitude"})
		return
	}

	limitInt, err := strconv.Atoi(limit)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit"})
		return
	}

	beaches, err := h.supabaseClient.GetNearbyBeaches(latFloat, lngFloat, limitInt)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, beaches)
}

func (h *Handler) GetWeatherConditions(c *gin.Context) {
	// TODO: Implement weather conditions logic
	c.JSON(http.StatusOK, gin.H{"message": "Get weather conditions endpoint"})
}
