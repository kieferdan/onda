'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star } from 'lucide-react'
import { getNearbyBeaches } from '@/utils/api'
import { toast } from '@/hooks/use-toast'

type Beach = {
  id: number
  name: string
  rating: number
  distance?: number
}

interface BeachListProps {
  lat: number;
  lng: number;
}

export default function BeachList({ lat, lng }: BeachListProps) {
  const [beaches, setBeaches] = useState<Beach[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBeaches = async () => {
      setLoading(true)
      try {
        const data = await getNearbyBeaches(lat, lng, 5)
        setBeaches(data)
      } catch (error) {
        console.error('Error fetching beaches:', error)
        toast({
          title: "Erro",
          description: "Não foi possível carregar as praias próximas. Por favor, tente novamente mais tarde.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBeaches()
  }, [lat, lng])

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
        {beaches.length === 0 ? (
          <p>Nenhuma praia encontrada nas proximidades.</p>
        ) : (
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
        )}
      </CardContent>
    </Card>
  )
}

