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

for(let c of cash){
  c.onchange=function(){
    sum=0;
    cashImage.textContent=null;
    let result = new Map();
    for(let i=0;i<cash.length;i++){
      let value = cash.item(i).value;
      let id = cash.item(i).id;
      sum += (id-0)*(value-0);
      result.set(id,value-0)
    }
    cashSum.value=sum;
    imageUpload(result,cashImage);
  }
}

calcBtn.addEventListener('click',function(){
  changeImage.textContent=null;
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
        img.src = `images/${unit}yen.png`
        //お札5枚ごとに左へずらして表示
        if(i<5){
          img.style.marginTop=`${i*15}px`;
          img.style.marginLeft=`${i*2}px`;
        }else if(i<10){
          img.style.left="40px";
          img.style.marginTop=`${(i-5)*15}px`;
          img.style.marginLeft=`${(i-5)*2}px`;
        }else{
          img.style.left="80px";
          img.style.marginTop=`${(i-10)*15}px`;
          img.style.marginLeft=`${(i-10)*2}px`;
        }
        img.className="image";
        imgHolder.appendChild(img);
      }
      imageId.appendChild(imgHolder);
    }
  }
}