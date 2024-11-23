'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from 'lucide-react'
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
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`)
      if (!response.ok) {
        throw new Error('Falha ao buscar localização')
      }
      const data = await response.json()
      
      if (data && data.length > 0) {
        const { lat, lon } = data[0]
        onLocationChange(parseFloat(lat), parseFloat(lon))
        toast({
          title: "Localização atualizada",
          description: `Latitude: ${lat}, Longitude: ${lon}`,
        })
      } else {
        throw new Error('Localização não encontrada')
      }
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

  const handleGeolocation = () => {
    setLoading(true)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onLocationChange(latitude, longitude)
          toast({
            title: "Localização atualizada",
            description: `Latitude: ${latitude}, Longitude: ${longitude}`,
          })
          setLoading(false)
        },
        (error) => {
          console.error('Error getting geolocation:', error)
          toast({
            title: "Erro",
            description: "Não foi possível obter sua localização. Por favor, tente inserir manualmente.",
            variant: "destructive",
          })
          setLoading(false)
        }
      )
    } else {
      toast({
        title: "Erro",
        description: "Geolocalização não é suportada pelo seu navegador.",
        variant: "destructive",
      })
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
      <Button type="button" onClick={handleGeolocation} disabled={loading}>
        <MapPin className="mr-2 h-4 w-4" />
        Usar minha localização
      </Button>
    </form>
  )
}

