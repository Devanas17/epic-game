const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("MyEpicGame");
  const gameContract = await gameContractFactory.deploy(
    ["Steyn", "Starc", "Rabada"], // Names
    [
      "https://i.imgur.com/FAhXkof.jpg", // Images
      "https://i.imgur.com/CuGxkUA.jpg",
      "https://i.imgur.com/PzCMw2i.jpg",
    ],
    [300, 250, 200], // HP values
    [200, 250, 270], // Attack damage values
    "Virat Kohli", // Boss name
    "https://i.imgur.com/GZLZxRU.jpeg", // Boss image
    5000, // Boss hp
    50 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("Contract Deployed to...", gameContract.address);

  let txn;
  txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  console.log("Minted NFT #1");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #2");

  txn = await gameContract.mintCharacterNFT(2);
  await txn.wait();
  console.log("Minted NFT #3");

  txn = await gameContract.mintCharacterNFT(1);
  await txn.wait();
  console.log("Minted NFT #4");

  txn = await gameContract.attackBoss();
  await txn.wait();

  txn = await gameContract.attackBoss();
  await txn.wait();

  console.log("Done deploying and minting!");
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
