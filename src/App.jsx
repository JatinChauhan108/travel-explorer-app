import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./store/authSlice";
import { auth } from "./firebase/firebase";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Firebase listener for login/logout
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setUser(firebaseUser));
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);  
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
