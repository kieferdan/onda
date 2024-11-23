'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type WeatherData = {
  temperature: number
  windSpeed: number
  waveHeight: number
}

export default function WeatherConditions() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      // TODO: Implementar a lógica para buscar dados reais de uma API de previsão do tempo
      // Por enquanto, usaremos dados simulados
      setWeatherData({
        temperature: 25,
        windSpeed: 15,
        waveHeight: 1.5,
      })
    }

    fetchWeatherData()
  }, [])

  if (!weatherData) {
    return <div>Carregando condições...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições Atuais</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Temperatura: {weatherData.temperature}°C</p>
        <p>Velocidade do Vento: {weatherData.windSpeed} km/h</p>
        <p>Altura das Ondas: {weatherData.waveHeight} m</p>
      </CardContent>
    </Card>
  )
}

