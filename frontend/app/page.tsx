'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import BeachList from './components/BeachList'
import WeatherConditions from './components/WeatherConditions'
import LocationSelector from './components/LocationSelector'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { RefreshCw } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [location, setLocation] = useState({ lat: -23.9618, lng: -46.3322 }) // Default to Santos, SP
  const [refreshKey, setRefreshKey] = useState(0)

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng })
    setRefreshKey(prevKey => prevKey + 1)
  }

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1)
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-primary">Surf Spot Finder</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Encontre as melhores praias para surfar</CardTitle>
            <CardDescription>Insira sua localização para descobrir as melhores opções de surf próximas a você</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <LocationSelector onLocationChange={handleLocationChange} />
              <Button onClick={handleRefresh} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Atualizar
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          <WeatherConditions lat={location.lat} lng={location.lng} />
          <BeachList lat={location.lat} lng={location.lng} />
        </div>
      </div>
      <Toaster />
    </main>
  )
}

