// for react
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
// for function
import { readDeck } from "../utils/api/index";
// for icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faHome } from "@fortawesome/free-solid-svg-icons";

function Study(){
    const [ deck, setDeck ] = useState({});
    const [ cards, setCards ] = useState([]);
    const [ cardIndexNumber, setCardIndexNumber ] = useState(0);
    const [ cardFrontSide, setCardFrontSide ] = useState(true);
    const [ cardsLength, setCardsLength ] = useState(0);
    const history = useHistory();
    const { deckId } = useParams();


  // storing data for setDeck, setCards, setCardsLength
  useEffect(() => {
    async function loadDeck(){
      // calling readDeck with argument deckId to initialize response
      const response = await readDeck(deckId)
        // calling setDeck with argument response
        setDeck(response)
      // calling setCards with argument response.cards
        setCards(response.cards)
      // calling setCardsLength with argument response.cards.length
        setCardsLength(response.cards.length)
    }
    // running loadDeck
    loadDeck()
  }, [deckId]);

  // if cardFrontSide is true call setCardFrontSide with argument false
  const flipButtonHandler = (event) => {
    // if (cardFrontSide === true){
    if (cardFrontSide) { setCardFrontSide(false)
    // else call setCardFrontSide with argument true
    } else { setCardFrontSide(true) }
  };


  // Next Button: go to next card if last card goback to first or home page
  const nextButtonHandler = (event) => {
    // call setCardIndexNumber with argument current state plus one
    setCardIndexNumber(cardIndexNumber + 1)
    // console.log(cardsLength, cardIndexNumber)
    if (cardIndexNumber === cardsLength - 1){
      const message = "Restart cards? Click 'cancel' to return to the home page.";
      if ( window.confirm(message) ) {
        // window.confirm("Restart cards? Click 'cancel' to return to the home page.")
      // ) {
        setCardIndexNumber(0);
        setCardFrontSide(true);
      } else { history.push("/") }
    } else {
      setCardIndexNumber(cardIndexNumber + 1);
      setCardFrontSide(true)
    }
  }


  if (cardsLength <= 2){
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <FontAwesomeIcon icon={faHome}/>
              Home
            </Link>                </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <h1>{deck.name}: Study</h1>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {cardsLength} cards in this deck.</p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary ml-2 float-left">
          <FontAwesomeIcon icon={faPlus} />
          {" "}Add Cards
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
               <Link to="/">
               <FontAwesomeIcon icon={faHome}/>
                Home</Link>
            </li>
            <li className="breadcrumb-item">
                  <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
      </div>
      <div>
        <h1>{deck.name}: Study</h1>
      </div>
      <div className="card float-center d-grid gap-2 d-md-block mt-2 mb-4" style={{ width: '30rem' }}>
        <div className="card-body">
          <h2>Card {cardIndexNumber+1} of {cardsLength}</h2>
          <div>
            {cardFrontSide ? <p>{cards[cardIndexNumber]?.front}</p> : <p>{cards[cardIndexNumber]?.back}</p>}
          </div>
          <button className="btn btn-secondary" onClick={flipButtonHandler}>Flip</button>
          {cardFrontSide ? <p></p> : <button className="btn btn-primary" onClick={nextButtonHandler}>Next</button>}
        </div>
      </div>
    </div>
  )
}

export default Study;
