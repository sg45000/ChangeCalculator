'use strict';
let calcBtn = document.getElementById('calcBtn'); 
let price = document.getElementById('price');
let cash = document.getElementsByName('cash');
let cashSum = document.getElementById('cashSum');
let cashInput = document.getElementById('cashInput');
let cashImage = document.getElementById('cashImage'); 
let changeImage = document.getElementById('changeImage'); 
let change = document.getElementById('change');
let sum=0;
const CASHTYPE = [10000,5000,1000,500,100,50,10,5,1];
cashInput.onchange=function(){
  sum=0;
  for(let i=0;i<cash.length;i++){
    let value = cash.item(i).value-0;
    let id = cash.item(i).id-0;
    sum += id*value;
  }
  cashSum.value=sum;
}

calcBtn.addEventListener('click',function(){
  let result = changeResult(cashSum.value,price.value);
  change.value = result.get('change');
  console.log(result);
},false)

function changeResult(cashSum,price){
  let myMoney = cashSum-price;
  let result = new Map([['change',myMoney]]);
  result = calculator(myMoney,result);
  imageUpload(result,changeImage);
  return result;
}

function calculator(myMoney,result){
  for(let unit of CASHTYPE){
    if(!(myMoney-unit<0)){
      let amount = Math.floor(myMoney/unit);
      myMoney %= unit;
      result.set(String(unit),amount);
    }
  }
  return result;
}

function imageUpload(result,imageId){
  for(let unit of CASHTYPE){
    let amount = result.get(String(unit));
    if(amount>0){
      var imgHolder = document.createElement('div');
      for(let i=0;i<amount;i++){
        imgHolder.className="imgHolder";
        let img = document.createElement('img');
        img.src = `images/${unit}yen.png`;
        img.style.marginTop=`${i*15}px`;
        img.style.marginLeft=`${i*2}px`;
        img.className="image";
        imgHolder.appendChild(img);
      }
      imageId.appendChild(imgHolder);
    }
  }
}