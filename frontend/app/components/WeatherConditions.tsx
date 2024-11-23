'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Wind, Droplet, Thermometer } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

type WeatherData = {
  temperature: number
  windSpeed: number
  windDirection: string
  waveHeight: number
  wavePeriod: number
  waveDirection: string
}

export default function WeatherConditions() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/weather?lat=-23.9618&lng=-46.3322')
        const data = await response.json()
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Condições Atuais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </CardContent>
      </Card>
    )
  }

  if (!weatherData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Condições Atuais</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Erro ao carregar dados meteorológicos.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Condições Atuais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center">
          <Thermometer className="mr-2 h-4 w-4 text-primary" />
          <span>Temperatura: {weatherData.temperature}°C</span>
        </div>
        <div className="flex items-center">
          <Wind className="mr-2 h-4 w-4 text-secondary" />
          <span>Vento: {weatherData.windSpeed} km/h, {weatherData.windDirection}</span>
        </div>
        <div className="flex items-center">
          <Droplet className="mr-2 h-4 w-4 text-accent" />
          <span>Ondas: {weatherData.waveHeight}m, {weatherData.wavePeriod}s, {weatherData.waveDirection}</span>
        </div>
      </CardContent>
    </Card>
  )
}

