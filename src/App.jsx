import { useDispatch, useSelector } from "react-redux";
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { setUser, clearUser } from "./store/authSlice";
import { auth } from "./firebase/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { mapFirebaseUser } from "./utils/mapFirebaseUser";
import { fetchFavorites } from "./store/favoritesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Firebase listener for login/logout
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const user = mapFirebaseUser(firebaseUser);
        dispatch(setUser(user));               // set auth state
        dispatch(fetchFavorites(user.uid));    // fetch favorites immediately
      } else {
        dispatch(clearUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);  
  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950">
      <ToastContainer position="top-center" autoClose={3000} />
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
