let web3, marketInst, user;
const marketAddr = "0xB9FCcb4d56d3206cb424F3C7E9e3eE75f866A81f";
const tokenAddr = "0x78d7d6202cd9B8A8922be75B3882D4FAC2047b48";

$(document).ready(async () => {
  web3 = await new Web3(Web3.givenProvider);
  contract =  await new web3.eth.Contract(abi.pmarket, marketAddr);
  tokenInst =  await new web3.eth.Contract(abi.token, tokenAddr);
})

$(".btn.login").click(async () => {
  try{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    user = accounts[0];
    $(".btn.login").html(user.slice(0,3)+"…"+user.slice(-3));
    let myunclaimed = await getUnclaimed();
    //$('p.unclaimed').html("報酬残高" + myunclaimed);
  } catch (error){
    alert(error.message);
  }
})

$('.btn.claim').click(async () => {
  try{
    const claimTx = await contract.methods.claim(tokenAddr).send({from: user});
  }catch(err){
    alert(err);
  }
})

$('.btn.predict.make').click(async () => {
  try{
    const makePredictTx = await contract.methods.makePredict($('input.predict.value').val(), $('input.predict.amount').val()).send({from: user});
  }catch(err){
    alert(err);
  }
})

$('.btn.showResult').click(async () => {
  try{
    const showResultTx = await contract.methods.showResult($(this).val()).send({from: user});
  }catch(err){
    alert(err);
  }
  alert(showResultTx);
})

$('.btn.buy').click(async () => {
  try{
    const buyTx = await contract.methods.buyPredict($(this).val(), tokenAddr).send({from: user});
    alert(addWhitelistTx);
  }catch(err){
    alert(err);
  }
})

async function getUnclaimed(){
  console.log(user);
  console.log(user.address);
  const myunclaimed = await contract.methods.unclaimed("0x8A9cE2105EDBcf594c8a73785F7cb40A7165746a").call();
  return myunclaimed;
}

async function buy(_id){
  const allowance =await tokenInst.methods.allowance(user, marketAddr).call();
  const price = 5;
  if(price > parseInt(allowance)){
    try{
      await tokenInst.methods.approve(marketAddr, price).send();
    } catch(err){
      throw(err);
    }
  }

  try{
    const tokenAddr = tokenInst._address;
    await contract.methods
    .buyPredict(_id, tokenAddr)
    .send({from: user});
  }catch (err){
    throw (err);
  }
}