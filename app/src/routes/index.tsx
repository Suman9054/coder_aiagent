import Header from '@/components/Header'
import Homeinput from '@/components/homeinput'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
  ssr: false,
})

function App() {
  return (
    <div className="text-center">
      <Header />
      <main className="min-h-screen items-center justify-center">
       <Homeinput  />
      </main>
    </div>
  )
}
