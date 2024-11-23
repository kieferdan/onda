'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Waves } from 'lucide-react'
import { getNearbyBeaches, Beach } from '@/utils/api'
import { toast } from '@/hooks/use-toast'

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
            <Skeleton key={index} className="h-20 w-full" />
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
              <li key={beach.id} className="flex flex-col p-4 bg-white rounded-md shadow">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">{beach.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{beach.rating.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>{beach.distance.toFixed(1)} km de distância</span>
                  <div className="flex items-center">
                    <Waves className="h-4 w-4 mr-1 text-blue-500" />
                    <span className={`font-medium ${getSurfConditionColor(beach.surfCondition)}`}>
                      {beach.surfCondition}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

function getSurfConditionColor(condition: string): string {
  switch (condition) {
    case 'Excelente':
      return 'text-green-600';
    case 'Bom':
      return 'text-blue-600';
    case 'Razoável':
      return 'text-yellow-600';
    case 'Ruim':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
}

