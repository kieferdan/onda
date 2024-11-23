package models

type Beach struct {
	ID     int     `json:"id"`
	Name   string  `json:"name"`
	Lat    float64 `json:"lat"`
	Lng    float64 `json:"lng"`
	Rating float64 `json:"rating"`
}

type WeatherCondition struct {
	Temperature float64 `json:"temperature"`
	WindSpeed   float64 `json:"windSpeed"`
	WaveHeight  float64 `json:"waveHeight"`
}
