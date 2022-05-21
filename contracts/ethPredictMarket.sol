// SPDX-License-Identifier: Unlicence
pragma solidity ^0.8.4;

contract ethPredictMarket {
  struct predict {
    address predictor;
    uint value;
    uint amount;
  }
  mapping(uint => predict) public predicts;
  mapping(address => uint[]) public purchasedPredicts;
  mapping(address => uint) public unclaimed;
  uint public predictCount;
  uint public provisionalNum;

  constructor(){
    predictCount = 0;
    provisionalNum = 100;
  }

  function makePredict(uint _value, uint _amount) public {
    predicts[predictCount] = predict(msg.sender, _value, _amount);
    predictCount ++;
  }

  function showResult(uint _id) public returns(uint){
    uint result = provisionalNum - predicts[_id].value;
    if(result < 0){
      result = result - (result*2);
    }
    unclaimed[msg.sender] += 100 - result;
    return result;
  }

  function buyPredict(uint _id) public payable {
    uint _amount = predicts[_id].amount;
    require(msg.value == _amount, "Insufficient fund");    purchasedPredicts[msg.sender].push(_id);
    unclaimed[predicts[_id].predictor] += _amount;
  }

  function viewPredict(uint _id) public view returns(predict memory) {
    bool viewable = false;
    for(uint i=0;i < purchasedPredicts[msg.sender].length;i++){
      if(purchasedPredicts[msg.sender][i] == _id){
        viewable = true;
      }
    }
    require(viewable, "you hasn't purchase article");
    return predicts[_id];
  }

  function claim() public {
    uint _amount = unclaimed[msg.sender];
    unclaimed[msg.sender] = 0;
    require(_amount > 0, "no unclaimed");
    require(address(this).balance >= _amount, "Dex does not have enough funds");
    (bool success, ) = payable(msg.sender).call{value: _amount}("");
    require(success, "ETH transfer failed");
  }

  function deposit() public payable returns(string memory){
    return "thank you for donation!";
  }
}
