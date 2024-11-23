'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from '@/app/lib/supabase'

type Beach = {
  id: number
  name: string
  lat: number
  lng: number
  rating: number
}

export default function BeachList() {
  const [beaches, setBeaches] = useState<Beach[]>([])

  useEffect(() => {
    const fetchBeaches = async () => {
      const { data, error } = await supabase
        .from('beaches')
        .select('*')
        .order('rating', { ascending: false })
        .limit(5)

      if (error) {
        console.error('Erro ao buscar praias:', error)
      } else {
        setBeaches(data)
      }
    }

    fetchBeaches()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Melhores Praias para Surf</CardTitle>
      </CardHeader>
      <CardContent>
        <ul>
          {beaches.map((beach) => (
            <li key={beach.id} className="mb-2">
              <strong>{beach.name}</strong> - Avaliação: {beach.rating}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

