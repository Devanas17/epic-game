const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Kohli", "Devilliers", "Gayle"], // Names
    [
      "https://i.imgur.com/GZLZxRU.jpeg", // Images
      "https://i.imgur.com/dra2VhB.jpg",
      "https://i.imgur.com/wI4ODDj.jpg",
    ],
    [300, 250, 200], // HP values
    [200, 250, 270] // Attack damage values
  );
  await gameContract.deployed();
  console.log("Contract Deployed to...", gameContract.address);

  let txn;
  // We only have three characters.
  // an NFT w/ the character at index 2 of our array.
  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();

  // Get the value of the NFT's URI.
  let returnedTokenUri = await gameContract.tokenURI(1);
  console.log("Token URI:", returnedTokenUri);
};
const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
