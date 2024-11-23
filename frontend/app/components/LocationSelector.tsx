'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { toast } from '@/hooks/use-toast'


interface LocationSelectorProps {
  onLocationChange: (lat: number, lng: number) => void;
}

export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
  const [location, setLocation] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulating geocoding API call
      const response = await fetch(`https://api.example.com/geocode?address=${encodeURIComponent(location)}`)
      if (!response.ok) {
        throw new Error('Falha ao buscar localização')
      }
      const data = await response.json()
      
      // Assuming the API returns lat and lng
      const { lat, lng } = data
      onLocationChange(lat, lng)
      toast({
        title: "Localização atualizada",
        description: `Latitude: ${lat}, Longitude: ${lng}`,
      })
    } catch (error) {
      console.error('Error fetching location:', error)
      toast({
        title: "Erro",
        description: "Não foi possível encontrar a localização. Por favor, tente novamente.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLocationSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Digite sua localização"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit" className="bg-secondary hover:bg-secondary/90" disabled={loading}>
        {loading ? (
          <span className="animate-spin mr-2">⏳</span>
        ) : (
          <Search className="mr-2 h-4 w-4" />
        )}
        Buscar
      </Button>
    </form>
  )
}

