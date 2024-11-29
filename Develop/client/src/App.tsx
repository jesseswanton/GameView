import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div>
      <Navbar />
      <main className='container main pt-5'>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
