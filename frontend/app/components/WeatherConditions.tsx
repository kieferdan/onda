'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Wind, Droplet, Thermometer } from 'lucide-react'
import { getWeatherConditions, WeatherCondition } from '@/utils/api'
import { toast } from '@/hooks/use-toast'

interface WeatherConditionsProps {
  lat: number;
  lng: number;
}

export default function WeatherConditions({ lat, lng }: WeatherConditionsProps) {
  const [weatherData, setWeatherData] = useState<WeatherCondition | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      try {
        const data = await getWeatherConditions(lat, lng)
        setWeatherData(data)
      } catch (error) {
        console.error('Error fetching weather data:', error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar as condições meteorológicas. Por favor, tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [lat, lng])

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

