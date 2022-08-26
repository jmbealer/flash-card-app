// For React
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
// For functions
import { listDecks, deleteDeck } from "../utils/api/index";
// For Icons
import { faPlus, faEye, faBook, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Home(){
// storing the decks
const [decks, setDecks] = useState([]);
// make it easier to use useHistory
const history = useHistory();

// for getting the list of decks
useEffect(() => {
    async function getDeck() {
      // calling listDecks to get input for setDecks
      const response = await listDecks()
      // storing response in setDecks
      setDecks(response);
    }
    // running the function
    getDeck();
  }, []);

  function deleteButtonHandler(deckId) {
    // checking window.confirm
    if ( window.confirm(
        "Delete this deck? You will not be able to recover it."
       )) {
        // call deleteDeck with parameter deckId then reload page
        deleteDeck(deckId).then(history.go(0));
      }
  };

  return (
    // what going to display on Home page
    <div>
      {/* for the create button */}
      <div>
        {/* Link to /decks/new then use bootstrap in class to display button */}
        <Link to="/decks/new" className="btn btn-secondary text-white">
            {/* for the plus icon */}
            <FontAwesomeIcon icon={faPlus} />
            {" "}Create Deck
        </Link>
      </div>

      {/* mapping over decks to display deck in cards */}
      <div> {decks?.map((deck)=>
        <div className="d-grid gap-2 d-md-block mt-2 mb-4" key={deck}>
          <div className="card w-75">
            <div className="card-header bg-light">
              <h5 className="float-left">{deck.name}</h5>
              <p className="float-right">{deck.cards.length} cards</p>
            </div>
            <div className="card-body">
              <p className="card-text">{deck.description}</p>
            </div>
            <div className="ml-2 mr-2 mb-3">
              {/* view button */}
              <Link to ={`/decks/${deck.id}`} className="btn btn-secondary float-left mr-2">
                <FontAwesomeIcon icon={faEye} />
                {" "}View
              </Link>
              {/* study button */}
              <Link to={`/decks/${deck.id}/study`} className="btn btn-primary float-left">
                <FontAwesomeIcon icon={faBook}/>
                {" "}Study
              </Link>
              {/* delete button */}
              <button className="btn btn-danger float-right" onClick={() => deleteButtonHandler(deck.id)}>
                <FontAwesomeIcon icon={faTrash}/>
              </button>
            </div>
          </div>
        </div>)}
      </div>

    </div>
  )
}

export default Home;
