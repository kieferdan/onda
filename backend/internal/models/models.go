package models

type Beach struct {
	ID     int     `json:"id"`
	Name   string  `json:"name"`
	Lat    float64 `json:"lat"`
	Lng    float64 `json:"lng"`
	Rating float64 `json:"rating"`
}

type WeatherCondition struct {
	Temperature   float64 `json:"temperature"`
	WindSpeed     float64 `json:"windSpeed"`
	WindDirection string  `json:"windDirection"`
	WaveHeight    float64 `json:"waveHeight"`
	WavePeriod    float64 `json:"wavePeriod"`
	WaveDirection string  `json:"waveDirection"`
}

type BeachWithWeather struct {
	Beach
	Weather WeatherCondition `json:"weather"`
}
