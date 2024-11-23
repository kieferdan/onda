'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LocationSelector() {
  const [location, setLocation] = useState('')

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar a lógica para buscar a localização usando uma API de geocoding
    console.log('Localização submetida:', location)
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
      <Button type="submit">Buscar</Button>
    </form>
  )
}

