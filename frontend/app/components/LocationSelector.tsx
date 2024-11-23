'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function LocationSelector() {
  const [location, setLocation] = useState('')

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar a lógica para buscar a localização
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
      <Button type="submit" className="bg-secondary hover:bg-secondary/90">
        <Search className="mr-2 h-4 w-4" /> Buscar
      </Button>
    </form>
  )
}

