// Write your Character component here

import React from "react";
import { Card, CardImg, CardTitle, CardSubtitle, Badge } from "reactstrap";

const Character = props => {
  return (
    <Card>
      <CardImg src={props.character.image} />
      <CardTitle className="text-center font-weight-bolder">
        {props.character.name}
      </CardTitle>
      <div>
        <Badge>Species:</Badge>{" "}
        <CardSubtitle>{props.character.species}</CardSubtitle>
      </div>
      <div>
        <Badge>Origin:</Badge>{" "}
        <CardSubtitle>{props.character.origin.name}</CardSubtitle>
      </div>
      <div>
        <Badge>Status:</Badge>{" "}
        <CardSubtitle>{props.character.status}</CardSubtitle>
      </div>
    </Card>
  );
};

export default Character;
