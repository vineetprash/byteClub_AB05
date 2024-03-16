import React from "react";
import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

function Articles(x, setArticles) {
  let articles = [
    "Eiusmod amet do nostrud exercitation consequat ea ut dolor culpa proident.",
    "Et sit in essesicing lr ad in pariatur elit quis nisi laborum labore nostrud officia ut reprehenderit cupidatat.",
    "Duis excepteur ad maecat nuunt consectetur sit occaecat anim mollit sunt qui id enim aute sunt reprehenderit.",
  ];
  return (
    <div className="flex flex-col text-white">
      <Divider />
      <div className="flex  flex-row gap-1 w-full h-full justify-center items-center">
        <div className="w-1/4">
          <Card isPressable isBlurred fullWidth>
            <CardHeader>
              <h3>Headline 1</h3>
            </CardHeader>
            <Divider />
            <CardBody>{articles ? <p>{articles[0]}</p> : <p></p>}</CardBody>
          </Card>
        </div>

        <div className="w-1/4">
          <Card isPressable isBlurred fullWidth>
            <CardHeader>
              <h3>Headline 2</h3>
            </CardHeader>
            <Divider />
            <CardBody>{articles ? <p>{articles[1]}</p> : <p></p>}</CardBody>
          </Card>
        </div>

        <div className="w-1/4">
          <Card isPressable isBlurred fullWidth>
            <CardHeader>
              <h3>Headline 3</h3>
            </CardHeader>
            <Divider />
            <CardBody>{articles ? <p>{articles[2]}</p> : <p></p>}</CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Articles;
