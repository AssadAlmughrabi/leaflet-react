import { Link, useParams } from 'react-router-dom'

export function EditPlantPage() {
  const { id } = useParams()

  return (
    <main className="screen">
      <Link to="/">My Plants</Link>
      <h1 className="title">Edit plant</h1>
      {/* TEMP: replaced in step 9 */}
      <p>Editing id: {id}</p>
    </main>
  )
}
