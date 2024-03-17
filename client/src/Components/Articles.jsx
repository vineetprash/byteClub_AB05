import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

function Articles({ articles }) {
  console.log("Articles:", articles);

  return (
    <div className="flex flex-col text-white">
      <Divider />
      <div className="flex flex-row gap-3 w-full h-full justify-center items-center">
        <div className="w-full">
          <Card
            isPressable
            isBlurred
            fullWidth
            className="bg-black text-white h-48 w-fit opacity-80"
          >
            <CardHeader>
              <h3>Trending headlines: </h3>
            </CardHeader>
            <Divider />
            <CardBody>
              {articles ? <p>{articles}</p> : <p>No articles available</p>}
            </CardBody>
          </Card>
        </div>
      </div>
      <Divider />
    </div>
  );
}

export default Articles;
