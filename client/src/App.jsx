import UserChat from "./Components/UserChat";
import StockHistogram from "./Components/StockHistogram";
import NavBar from "./Components/NavBar";
import { Spacer } from "@nextui-org/react";

function App({ className }) {
  return (
    <>
      <NavBar className={`${className}`} />
      <div class="flex flex-row w-full justify-center items-center h-screen bg-zinc-900">
        <div className={`${className} rounded-lg w-1/3 h-full`}>
          <StockHistogram />
        </div>

        <Spacer x={4} />
        <div className={`${className} w-1/2 h-full m-4`}>
          <UserChat />
        </div>
      </div>
    </>
  );
}

export default App;
