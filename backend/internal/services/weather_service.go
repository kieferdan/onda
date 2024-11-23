package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/kieferdan/onda-backend/internal/models"
)

type WeatherService interface {
	GetWeatherConditions(lat, lng float64) (*models.WeatherCondition, error)
}

type weatherService struct {
	apiKey string
}

func NewWeatherService() WeatherService {
	return &weatherService{
		apiKey: os.Getenv("OPENWEATHERMAP_API_KEY"),
	}
}

func (s *weatherService) GetWeatherConditions(lat, lng float64) (*models.WeatherCondition, error) {
	url := fmt.Sprintf("https://api.openweathermap.org/data/2.5/weather?lat=%f&lon=%f&units=metric&appid=%s", lat, lng, s.apiKey)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error fetching weather data: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var data struct {
		Main struct {
			Temp float64 `json:"temp"`
		} `json:"main"`
		Wind struct {
			Speed float64 `json:"speed"`
			Deg   float64 `json:"deg"`
		} `json:"wind"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("error decoding weather data: %w", err)
	}

	// Note: Wave data is not available in the free OpenWeatherMap API.
	// For a real application, you'd need to use a specialized marine weather API.
	return &models.WeatherCondition{
		Temperature:   data.Main.Temp,
		WindSpeed:     data.Wind.Speed,
		WindDirection: getWindDirection(data.Wind.Deg),
		WaveHeight:    0,  // Placeholder
		WavePeriod:    0,  // Placeholder
		WaveDirection: "", // Placeholder
	}, nil
}

func getWindDirection(degrees float64) string {
	directions := []string{"N", "NE", "E", "SE", "S", "SW", "W", "NW"}
	index := int((degrees+22.5)/45) % 8
	return directions[index]
}
