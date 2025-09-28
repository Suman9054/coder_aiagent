import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-black/10 text-gray-300 justify-between rounded-2xl m-4 z-10 start-1">
      <nav className="flex flex-row">
        <div><Link to='/'>Home</Link></div>
        <div><Link></Link></div>
        <div></div>
        <div></div>
      </nav>
    </header>
  )
}
