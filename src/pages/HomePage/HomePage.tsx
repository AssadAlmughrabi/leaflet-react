import { Link } from 'react-router-dom'
import { usePlants } from '@/hooks/usePlants'

export function HomePage() {
  const { plants } = usePlants()

  return (
    <main className="screen">
      <h1 className="title">My Plants</h1>
      {/* TEMP: replaced in step 4 */}
      <p>{plants.length} plants</p>
      <Link to="/add">Add plant</Link>
    </main>
  )
}
