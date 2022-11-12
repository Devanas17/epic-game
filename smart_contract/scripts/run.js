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
