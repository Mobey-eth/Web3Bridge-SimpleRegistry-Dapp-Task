// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const age = 21;

  const entityName = "Moby"

  const simpleRegistry = await hre.ethers.deployContract("SimpleRegistry", [entityName, age]);

  await simpleRegistry.waitForDeployment();

  console.log(
    `Contract deployed to ${simpleRegistry.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// 0xDF10a20A7E93bD28b341908df6B02C7E301803d3