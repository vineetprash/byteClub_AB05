import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex items-center h-screen w-max justify-center m-4">
      <div className="w-80 ">
        <div className=" bg-black shadow-xl rounded-lg py-3 p-6">
          <div className="flex justify-evenly items-center">
            <div className="photo-wrapper p-2 ">
              <img
                className="w-32 h-32 rounded-full mx-auto"
                src="https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp"
                alt="John Doe"
              />
            </div>
            <div>
              <h3 className="text-center text-xl text-white font-medium leading-8  font-mono">
                Sumit singh{" "}
              </h3>
            </div>
          </div>

          <div className="p-2">
            <div className="border-y-2 p-1 text-center ">
              <div>
                <h2 className="font-semibold text-white font-mono">
                  Your portfolio
                </h2>
              </div>
            </div>

            <div className="mt-4  flex-col flex gap-2 text-white">
              {/*we can create component of single div and depending on number on invesments we can fetch from bd and use map function .map() so that many div's will be created of investments*/}
              <div className="flex gap-3 border rounded-sm hover:text-blue-500  font-mono p-1 ">
                <div className=" ml-3">Bank Nifty</div>
                <div>2{/* up or down logo*/}</div>
              </div>

              <div className="flex gap-3 border rounded-sm hover:text-blue-500  font-mono p-1">
                <div className=" ml-3">Bank Nifty</div>
                <div>2{/*logo*/}</div>
              </div>
              <div className="flex gap-3 border rounded-sm hover:text-blue-500  font-mono p-1">
                <div className=" ml-3">Bank Nifty</div>
                <div>2{/*logo*/}</div>
              </div>
            </div>

            <div className="text-center my-3">
              <a
                className="text-xs text-white hover:underline font-medium"
                href="#"
              >
                View Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
