import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div style={{backgroundColor: "#212a31"}}>
      <Navbar />
      <main className='main'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
