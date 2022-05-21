let web3, marketInst, user;
const marketAddr = "0xb1a986891A52D3E6b109314F8d9C9627249F6Da8";

$(document).ready(async () => {
  web3 = await new Web3(Web3.givenProvider);
  contract =  await new web3.eth.Contract(abi.pmarket, marketAddr);
})

$(".btn.login").click(async () => {
  try{
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    user = accounts[0];
    $(".btn.login").html(user.slice(0,3)+"…"+user.slice(-3));
    let myunclaimed = await getUnclaimed();
    $('p.unclaimed').html("報酬残高" + myunclaimed);
  } catch (error){
    alert(error.message);
  }
})

$('.btn.claim').click(async () => {
  try{
    const claimTx = await contract.methods.claim().send({from: user});
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

$('a.btn.showResult').click(async function() {
  console.log($(this).attr("value"));
  try{
    await contract.methods.showResult($(this).attr("value")).send({from: user});
  }catch(err){
    alert(err);
  }
})

$('.btn.buy').click(async function() {
  await buy($(this).attr("value"));
})

async function getUnclaimed(){
  const myunclaimed = await contract.methods.unclaimed(user).call();
  return myunclaimed;
}

async function buy(_id){
  const price = 5;
  try{
    await contract.methods
    .buyPredict(_id)
    .send({from: user, value: 10});
  }catch (err){
    throw (err);
  }
}