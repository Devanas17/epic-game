import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/context";
import "./SelectCharacter.css";

const SelectCharacter = ({ setCharacterNFT }) => {
  const { contract, getCharacters, characters, mintCharacterNFTAction, onCharacterMint, } =
    useContext(AppContext);

  useEffect(() => {
    if (contract) {
      getCharacters();
    } 

    if (contract) {
      getCharacters();
      // Setup NFT Minted Listener
      contract.on('CharacterNFTMinted', onCharacterMint);
    }

    return () => {
      /*
       * When your component unmounts, let;s make sure to clean up this listener
       */
      if (contract) {
        contract.off('CharacterNFTMinted', onCharacterMint);
      }
    };
  }, [contract]);



  const renderCharacters = () =>
    characters.map((character, index) => (
      <div className="character-item" key={character.name}>
        <div className="name-container">
          <p>{character.name}</p>
        </div>
        <img src={character?.imageURI} alt={character.name} />
        <button
          type="button"
          className="character-mint-button"
          onClick={()=> mintCharacterNFTAction(index)}
        >{`Mint ${character.name}`}</button>
      </div>
    ));
  return (
    <div className="select-character-container">
      <h2>Mint Your Hero. Choose wisely.</h2>
      {characters.length > 0 && (
        <div className="character-grid">{renderCharacters()}</div>
      )}
    </div>
  );
};

export default SelectCharacter;
