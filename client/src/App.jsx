import UserChat from "./Components/UserChat";
import StockHistogram from "./Components/StockHistogram";
import ProfilePage from "./Components/ProfilePage";
import NavBar from "./Components/NavBar";
import { Spacer } from "@nextui-org/react";

function App({ className }) {
  return (
    <>
      <NavBar className={`${className}`} />
      <div class="flex flex-row w-full justify-center items-center h-screen bg-zinc-900">
        <div className={`${className} rounded-lg w-1/4 h-full m-4`}>
          <ProfilePage />
        </div>
        <Spacer x={4} />
        <div className={`${className} rounded-lg w-1/4 h-full m-4`}>
          <StockHistogram />
        </div>

        <Spacer x={4} />
        <div className={`${className} rounded-lg w-1/2 h-full m-4`}>
          <UserChat />
        </div>
      </div>
    </>
  );
}

export default App;
