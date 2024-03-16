import UserChat from "./Components/UserChat";
import StockHistogram from "./Components/StockHistogram";
import ProfilePage from "./Components/ProfilePage";
import NavBar from "./Components/NavBar";
import { Spacer } from "@nextui-org/react";

function App() {
  return (
    <div className="overflow-hidder">
      <NavBar />
      <div className="flex flex-row w-full justify-center items-center h-screen bg-zinc-900 overflow-hidden ">
        <div
          id="1"
          className={`flex w-1/4 h-full m-4 justify-center items-center`}
        >
          <ProfilePage />
        </div>

        <div
          id="2"
          className={`flex w-1/4 h-full m-4 justify-center items-center`}
        >
          <StockHistogram />
        </div>

        <div
          id="3"
          className={`flex w-1/2 h-full m-4 justify-center items-center `}
        >
          <UserChat />
        </div>
      </div>
    </div>
  );
}

export default App;
