import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
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
