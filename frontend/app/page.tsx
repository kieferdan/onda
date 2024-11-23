import { Suspense } from 'react'
import WeatherConditions from '@/app/components/WeatherConditions'
import BeachList from '@/app/components/BeachList'
import LocationSelector from '@/app/components/LocationSelector'

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Surf Spot Finder</h1>
      <LocationSelector />
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <Suspense fallback={<div>Carregando condições...</div>}>
          <WeatherConditions />
        </Suspense>
        <Suspense fallback={<div>Carregando praias...</div>}>
          <BeachList />
        </Suspense>
      </div>
    </main>
  )
}

