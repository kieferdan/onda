package models

import (
	"math"
)

type Beach struct {
	ID            int     `json:"id"`
	Name          string  `json:"name"`
	Lat           float64 `json:"lat"`
	Lng           float64 `json:"lng"`
	Rating        float64 `json:"rating"`
	Distance      float64 `json:"distance"`
	SurfCondition string  `json:"surfCondition"`
}

type WeatherCondition struct {
	Temperature   float64 `json:"temperature"`
	WindSpeed     float64 `json:"windSpeed"`
	WindDirection string  `json:"windDirection"`
	WaveHeight    float64 `json:"waveHeight"`
	WavePeriod    float64 `json:"wavePeriod"`
	WaveDirection string  `json:"waveDirection"`
}

func (b *Beach) CalculateSurfCondition(w WeatherCondition) {
	// Simple surf condition calculation
	windQuality := calculateWindQuality(b.WindDirection(), w.WindDirection)
	waveQuality := calculateWaveQuality(w.WaveHeight, w.WavePeriod)

	overallQuality := (windQuality + waveQuality) / 2

	switch {
	case overallQuality >= 0.8:
		b.SurfCondition = "Excelente"
	case overallQuality >= 0.6:
		b.SurfCondition = "Bom"
	case overallQuality >= 0.4:
		b.SurfCondition = "Razoável"
	default:
		b.SurfCondition = "Ruim"
	}
}

func (b *Beach) WindDirection() string {
	// Simplified wind direction calculation based on beach orientation
	// This should be replaced with actual data for each beach
	return "NE"
}

func calculateWindQuality(beachDirection, windDirection string) float64 {
	// Simplified wind quality calculation
	// Ideally, this would take into account the angle between beach and wind direction
	if beachDirection == windDirection {
		return 1.0
	}
	return 0.5
}

func calculateWaveQuality(waveHeight, wavePeriod float64) float64 {
	// Simplified wave quality calculation
	// This can be made more sophisticated based on ideal surfing conditions
	heightQuality := math.Min(waveHeight/2, 1.0)
	periodQuality := math.Min(wavePeriod/10, 1.0)
	return (heightQuality + periodQuality) / 2
}
