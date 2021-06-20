import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import NoteCard from "../components/NoteCard";
import "./card.css";
import * as homeStuff from "./Home/Home";
import PostList from "./MyTable/PostList";
import { FunctionsSharp } from "@material-ui/icons";

const endpoint = PostList.endpoint;

const cards1 = [];

const cardClick = (e) => {
  console.log(e);
  // changeSomeState([],e)

  // console.log(e.target.parentElement.parentElement,"clicked me")
  // console.log(e.target.parentElement.parentElement.id,"clicked me")
};

const Cards = ({ changeFunction, fSignal }) => {
  const [cards, setCards] = useState(cards1);
  console.log("cards rerendered");
  //   setCards(cards1);

  useEffect(() => {
    fetch(endpoint + "favourites")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch(console.log("backend signal failed."));
  }, [fSignal]);

  const handleDelete = async (id) => {
    await fetch(endpoint + "favourites/" + id, {
      method: "DELETE",
    });
    const newCards = cards.filter((card) => card.person_id != id);
    setCards(newCards);
  };

  return (
    <Container>
      <Grid className="card_spacing" container spacing={3}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={card.person_id}
            onClick={() => changeFunction("Person", card, null)}
          >
            <NoteCard
              className="singleCard"
              card={card}
              handleDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Cards;
