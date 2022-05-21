/*const pMarket = artifacts.require("predictMarket");
const Token = artifacts.require("kxshareToken");

const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), 'ether');

module.exports = async function (deployer) {
  await deployer.deploy(Token);
  const token = await Token.deployed();
  await deployer.deploy(pMarket);
  const pmarket = await pMarket.deployed();

  await token.transfer(pmarket.address, toWei(500000));
};
*/

const ethmarket = artifacts.require("ethPredictMarket");

module.exports = async function (deployer) {
  await deployer.deploy(ethmarket);
};