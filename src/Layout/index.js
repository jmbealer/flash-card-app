// imports for react
import React from "react";
import { Switch, Route } from "react-router-dom";
// my components
import Header from "./Header";
import Home from "./Home.js";
import NotFound from "./NotFound";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import Study from "./Study";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";

// the site layout
function Layout() {
  return (
    <div className="Layout">
      <Header />
      <div className="container">
      {/* setting up the route */}
      <Switch>
        {/* if route is "/" invoke Home component */}
        <Route exact path="/">
          <Home />
        </Route>
        {/* if route is "/decks/new" invoke CreateDeck component */}
        <Route path="/decks/new">
          <CreateDeck />
        </Route>
        {/* if route is "/decks/:deckId" invoke Deck component */}
        <Route exact path="/decks/:deckId">
          <Deck />
        </Route>
        {/* if route is "/decks/:deckId/study" invoke Study component */}
        <Route path="/decks/:deckId/study">
          <Study />
        </Route>
        {/* if route is "/decks/:deckId/edit" invoke EditDeck component */}
        <Route path="/decks/:deckId/edit">
          <EditDeck />
        </Route>
        {/* if route is "/decks/:deckId/card/new" invoke AddCard component */}
        <Route path="/decks/:deckId/cards/new">
          <AddCard />
        </Route>
        {/* if route is "/decks/:deckId/cards/:cardId/edit" invoke EditCard component */}
        <Route path="/decks/:deckId/cards/:cardId/edit">
          <EditCard />
        </Route>
        {/* if route doesnt match invoke NotFound component */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
      </div>
    </div>
  );
};

export default Layout;
