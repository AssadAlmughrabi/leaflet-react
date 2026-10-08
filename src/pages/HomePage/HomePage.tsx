import { useNavigate } from 'react-router-dom'
import { Header } from '@/components/Header/Header'
import { Summary } from '@/components/Summary/Summary'
import { usePlants } from '@/hooks/usePlants'
import './HomePage.css'

export function HomePage() {
  const navigate = useNavigate()
  const { plants } = usePlants()

  const total = plants.length
  const watered = plants.filter((plant) => plant.wateredToday).length

  return (
    <main className="screen home">
      <Header onAdd={() => navigate('/add')} />
      <Summary watered={watered} total={total} />
    </main>
  )
}
