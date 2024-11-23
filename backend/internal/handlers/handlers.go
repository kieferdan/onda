package handlers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kieferdan/onda-backend/internal/models"
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
	beaches, err := h.supabaseClient.GetBeaches()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, beaches)
}

func (h *Handler) GetNearbyBeaches(c *gin.Context) {
	lat, err := strconv.ParseFloat(c.Query("lat"), 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid latitude"})
		return
	}

	lng, err := strconv.ParseFloat(c.Query("lng"), 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid longitude"})
		return
	}

	limit, err := strconv.Atoi(c.DefaultQuery("limit", "5"))
	if err != nil {
		limit = 5
	}

	beaches, err := h.supabaseClient.GetNearbyBeaches(lat, lng, limit)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	beachesWithWeather := make([]models.BeachWithWeather, len(beaches))
	for i, beach := range beaches {
		weather, err := h.weatherService.GetWeatherConditions(beach.Lat, beach.Lng)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching weather data"})
			return
		}

		beachesWithWeather[i] = models.BeachWithWeather{
			Beach:   beach,
			Weather: *weather,
		}
	}

	c.JSON(http.StatusOK, beachesWithWeather)
}

func (h *Handler) GetWeatherConditions(c *gin.Context) {
	lat, err := strconv.ParseFloat(c.Query("lat"), 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid latitude"})
		return
	}

	lng, err := strconv.ParseFloat(c.Query("lng"), 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid longitude"})
		return
	}

	weather, err := h.weatherService.GetWeatherConditions(lat, lng)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, weather)
}
