'use client'

import { useState } from 'react'
import { Suspense } from 'react'
import BeachList from './components/BeachList'
import WeatherConditions from './components/WeatherConditions'
import LocationSelector from './components/LocationSelector'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [location, setLocation] = useState({ lat: -23.9618, lng: -46.3322 }) // Default to Santos, SP

  const handleLocationChange = (lat: number, lng: number) => {
    setLocation({ lat, lng })
  }

  return (
    <main className="min-h-screen bg-background text-text">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-primary">OИDA</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Encontre as melhores praias para surfar</CardTitle>
            <CardDescription>Insira sua localização para descobrir as melhores opções de surf próximas a você</CardDescription>
          </CardHeader>
          <CardContent>
            <LocationSelector onLocationChange={handleLocationChange} />
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-2 gap-6">
          <Suspense fallback={<div>Carregando condições...</div>}>
            <WeatherConditions lat={location.lat} lng={location.lng} />
          </Suspense>
          <Suspense fallback={<div>Carregando praias...</div>}>
            <BeachList lat={location.lat} lng={location.lng} />
          </Suspense>
        </div>
      </div>
      <Toaster />
    </main>
  )
}

