import plusIcon from '@/assets/icons/plus.svg'
import { Button } from '@/components/Button/Button'
import './Header.css'

interface HeaderProps {
  onAdd: () => void
}

export function Header({ onAdd }: HeaderProps) {
  return (
    <header className="header">
      <h1 className="title">My Plants</h1>
      <Button onClick={onAdd}>
        <img src={plusIcon} alt="plus" width="16" height="16" />
        Add plant
      </Button>
    </header>
  )
}
