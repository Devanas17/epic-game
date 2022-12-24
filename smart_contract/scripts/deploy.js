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
