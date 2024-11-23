'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from 'lucide-react'

type Beach = {
  id: number
  name: string
  rating: number
  distance?: number
}

export default function BeachList() {
  const [beaches, setBeaches] = useState<Beach[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBeaches = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/beaches/nearby?lat=-23.9618&lng=-46.3322&limit=5')
        const data = await response.json()
        setBeaches(data)
      } catch (error) {
        console.error('Error fetching beaches:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBeaches()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Melhores Praias para Surf</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(5)].map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Melhores Praias para Surf</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {beaches.map((beach) => (
            <li key={beach.id} className="flex items-center justify-between p-2 bg-white rounded-md shadow">
              <div>
                <h3 className="font-semibold">{beach.name}</h3>
                {beach.distance && <p className="text-sm text-gray-500">{beach.distance.toFixed(1)} km de distância</p>}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span>{beach.rating.toFixed(1)}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

