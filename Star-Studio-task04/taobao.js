window.onload = function () {
  getNumberOfAllGoods();
  getAllCost();
  shopAll();
  allShop();
  shopAllShop();
};

//获取所有选取了的商品样数总和
function getNumberOfAllGoods() {
  var aKinds = document.getElementsByClassName("choose_goods");
  var aAllKinds = document.getElementsByClassName("all_kinds");
  var sum = 0;

  for(var j = 0; j < aKinds.length; j++)
  {
      if (aKinds[j]["checked"] === true)
      {
        sum++;
      }
  }

  for(var i = 0; i < aAllKinds.length; i++)
  {
      aAllKinds[i].innerHTML = (sum).toString();
  }
}

//获取每种商品的消费总额
function getCostOfGoods() {
    var aPrice = document.getElementsByClassName("per_price");
    var aQuantity = document.getElementsByClassName("quantity");
    var aCost = document.getElementsByClassName("cost");

    for (var i = 0; i < aPrice.length; i++){
        aCost[i].innerHTML = (Number(aPrice[i].innerHTML) * Number(aQuantity[i].value)).toString();
    }
}

//获取所有商品消费总额
function getAllCost() {
    var aCost = document.getElementsByClassName("cost");
    var aCheck = document.getElementsByClassName("choose_goods");
    var aAllCost = document.getElementsByClassName("all_cost");
    var allCost = 0;
    getCostOfGoods();

    for (var i = 0; i < aCost.length; i++)
    {
        if (aCheck[i]["checked"] === true)
        {
          allCost += Number(aCost[i].innerHTML);
        }
    }
    for (var j = 0; j < aAllCost.length; j++)
    {
        aAllCost[j].innerHTML = allCost;
    }
}

//店铺全选则店内商品全选
function shopAll() {
    var aShopAll = document.getElementsByClassName("shop_all");
    var aShop = document.getElementsByClassName("shop");
    var aChoices;
    var j = 0;

    //shopAll和shop并不一一对应，可能一个店铺内选了多个商品
    for (var i = 0; i < aShopAll.length; i++)
    {
      if (aShopAll[i]["checked"] === true)
      {
          aChoices = aShop[i].getElementsByClassName("choose_goods");
          for (j = 0; j < aChoices.length; j++)
          {
              aChoices[j]["checked"] = true;
          }
      }
    }


}

//店内商品全选则店铺全选
function allShop() {
  var aShopAll = document.getElementsByClassName("shop_all");
  var aShop = document.getElementsByClassName("shop");
  var aChoices;
  var j = 0;
  var checked = true;

  for (var i = 0; i < aShopAll.length; i++)
  {   //已经全选的不管
      if (aShopAll[i]["checked"] === false)
      {
          aChoices = aShop[i].getElementsByClassName("choose_goods");
          for (j = 0; j < aChoices.length; j++)
          {
              if (aChoices[j]["checked"] === false)
              {
                  checked = false;
              }
          }
          aShopAll[i]["checked"] = checked;
      }
  }
}

//全选被选则所有checkbox被选
function shopAllShop() {
    var aCheckAll = document.getElementsByClassName("checkall");
    var aCheckBox = document.getElementsByTagName("input");
    //选择所有的input，之后对其中type为checkbox的进行操作

    for (var i = 0; i < aCheckAll.length; i++)
    {
        if (aCheckAll[i]["checked"] === true)
        {
            for (var j = 0; j < aCheckBox.length; j++)
            {
                if (aCheckBox[j]["type"] === "checkbox")
                {
                    aCheckBox[j]["checked"] = true;
                }
            }
            break;
        }
    }
}