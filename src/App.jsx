import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
