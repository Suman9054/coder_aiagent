import { Link } from '@tanstack/react-router'
import { User2 } from 'lucide-react'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-black/10 text-gray-300 justify-between rounded-2xl m-4 z-10 start-1">
      <nav className="flex flex-row justify-center items-stretch gap-6">
        <div className='gap-2 '><Link to='/' className='p-1'>Home</Link> <Link to='/userworkspaces' className='p-1'>Workspaces</Link> <Link to='/userDasbord'className='p-1'>Contectus</Link></div>
         <div className='right-1'><Link to='/userDasbord'><User2 /></Link></div>
      </nav>
    </header>
  )
}
