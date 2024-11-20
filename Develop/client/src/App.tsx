import { Outlet } from "react-router-dom"

// import Profile from "./components/Avatar"

function App() {
  return (
    <>
      {/* <Profile /> */}
        <main>
          <Outlet />
        </main>
    </>
  )
}

export default App
