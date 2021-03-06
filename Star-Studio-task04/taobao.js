window.onload = function () {
    bindRefresh();
    whetherCheckAll_all();
    whetherCheckAll_shop();
    changeQuantity();
    refresh();
    removeOne();
    removeChecked();
};

//获取购物车商品数量
function getGoodsNumInCar() {
    var oCar = document.getElementById("car");
    var aAllKinds = document.getElementsByClassName("all_kinds");
    var aGoods = document.getElementsByClassName("goods_info");

    oCar.innerHTML = aGoods.length.toString();
    for(var i = 0; i < aAllKinds.length; i++)
    {
        aAllKinds[i].innerHTML = aGoods.length.toString();
    }
}

//检测是否有商品被选中
function whetherChoseGoods() {
  var aKinds = document.getElementsByClassName("choose_goods");
  var sum = 0;

  for(var j = 0; j < aKinds.length; j++)
  {
      if (aKinds[j]["checked"] === true)
      {
        sum++;
      }
  }

  return sum;
}

//获取每种商品的消费总额
function getCostOfGoods() {
    var aPrice = document.getElementsByClassName("per_price");
    var aQuantity = document.getElementsByClassName("quantity");
    var aCost = document.getElementsByClassName("cost");

    //要处理小数位数
    for (var i = 0; i < aPrice.length; i++){
        aCost[i].innerHTML = ((Number(aPrice[i].innerHTML) * 10) * Number(aQuantity[i].value) / 10).toString();
    }
}

//获取所有商品消费总额
function getAllCost() {
    var aCost = document.getElementsByClassName("cost");
    var aCheck = document.getElementsByClassName("choose_goods");
    var aAllCost = document.getElementsByClassName("all_cost");
    var allCost = 0;
    getCostOfGoods();

    //处理小数位数
    for (var i = 0; i < aCost.length; i++)
    {
        if (aCheck[i]["checked"] === true)
        {
          allCost += Number(aCost[i].innerHTML);
        }
    }
    for (var j = 0; j < aAllCost.length; j++)
    {
        aAllCost[j].innerHTML = (Math.round(allCost * 10) / 10).toString();
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
      checked = true;
  }
}

//店内商品被取消选择就要取消全选
function unCheckAll() {
    //选出所有店铺全选选择框
    var aShopAll = document.getElementsByClassName("shop_all");
    //选出所有店铺商品表，便于从其中选出选择框
    var aGoodsInfoList = document.getElementsByClassName("goods_info_list");
    var aCheckAll = document.getElementsByClassName("checkall");
    var aGoodsInShop;
    var num = 0;

    //给店铺全选框和商品表赋值相同的索引值
    for(var i = 0; i < aShopAll.length; i++)
    {
        aGoodsInfoList[i]["index"] = i;
        aShopAll[i]["index"] = i;
    }
    for (var j = 0; j < aGoodsInfoList.length; j++)
    {
        aGoodsInShop = aGoodsInfoList[j].getElementsByClassName("choose_goods");
        for (num = 0; num < aGoodsInShop.length; num++)
        {
            if (aGoodsInShop[num]["checked"] === false)
            {
                aShopAll[j]["checked"] = false;
                aCheckAll[0]["checked"] = false;
                aCheckAll[1]["checked"] = false;
                break;
            }
        }
    }
    if (aGoodsInfoList.length === 0)
    {
        aCheckAll[0]["checked"] = false;
        aCheckAll[1]["checked"] = false;
    }
}

//所有店铺被选则全选被选
function allShopChecked() {
    var aShop = document.getElementsByClassName("shop_all");
    var aCheckAll = document.getElementsByClassName("checkall");
    var checked = true;

    for (var i = 0; i < aShop.length; i++)
    {
        if (aShop[i]["checked"] === false)
        {
            checked = false;
        }
    }
    if (aShop.length === 0)
    {
        checked = false;
    }
    aCheckAll[0]["checked"] = checked;
    aCheckAll[1]["checked"] = checked;
}

//点击＋或-就增加或减少选取商品的数量，+，-和数量索引对应，如果已达到虽小数量1，则-不作用
function changeQuantity() {
    var aQuantity = document.getElementsByClassName("quantity");
    var aAdd = document.getElementsByClassName("add");
    var aReduce = document.getElementsByClassName("reduce");
    var i = 0;

    //先给标签附上index索引值
    for ( ; i < aQuantity.length; i++)
    {
        aQuantity[i]["index"] = i;
        aAdd[i]["index"] = i;
        aReduce[i]["index"] = i;
    }

    //当对应的加减被点击时，利用index进行操作
    for(i = 0; i < aQuantity.length; i++)
    {
        aAdd[i]["onclick"] = function () {
            var index = this.index;
            aQuantity[index]["value"] = Number(aQuantity[index]["value"]) + 1;
            refresh();
        };
        aReduce[i]["onclick"] = function () {
            var index = this.index;
            if (Number(aQuantity[index]["value"]) > 1) {
                aQuantity[index]["value"] = Number(aQuantity[index]["value"]) - 1;
                refresh();
            }
        }
    }
}

//刷新数据，任何相关点击事件发生都刷新，保持数据一致性
function refresh() {
    getGoodsNumInCar();
    getCostOfGoods();
    getAllCost();
    allShop();
    toPay();
    howManyToPay();
    removeShop();
    unCheckAll();
    allShopChecked();
    whetherAttach();
}

//根据商铺全选的选中状态来判断点击时是全选还是全不选
function whetherCheckAll_shop() {
    //选出所有店铺全选选择框
    var aShopAll = document.getElementsByClassName("shop_all");
    //选出所有店铺商品表，便于从其中选出选择框
    var aGoodsInfoList = document.getElementsByClassName("goods_info_list");

    //给店铺全选框和商品表赋值相同的索引值
    for(var i = 0; i < aShopAll.length; i++)
    {
        aGoodsInfoList[i]["index"] = i;
        aShopAll[i]["index"] = i;
    }

    //给每个店铺全选框绑定全选和全不选功能
    for (var index = 0; index < aShopAll.length; index++)
    {
        aShopAll[index]["onclick"] = function () {
            var index = this.index;
            var oGoodsInfoList = document.getElementsByClassName("goods_info_list")[index];
            var aChooseGoodsInShop = oGoodsInfoList.getElementsByClassName("choose_goods");
            var i = 0;

            if (this.checked === true)
            {
                for (i = 0; i < aChooseGoodsInShop.length; i++)
                {
                    aChooseGoodsInShop[i]["checked"] = true;
                }
            }
            else
            {
                for (i = 0; i < aChooseGoodsInShop.length; i++)
                {
                    aChooseGoodsInShop[i]["checked"] = false;
                }
            }
            refresh();
        }
    }
}

//根据全部商品全选的选中状态来判断点击时是全选还是全不选
function whetherCheckAll_all() {
    var aCheckAll = document.getElementsByClassName("checkall");

    //为全选框绑定事件
    for (var index = 0; index < aCheckAll.length; index++)
    {
        aCheckAll[index]["onclick"] = function () {
            //选择所有的input，之后对其中type为checkbox的进行操作
            var aCheckBox = document.getElementsByTagName("input");
            var j = 0;

            if (this.checked === true)
            {
                for (j = 0; j < aCheckBox.length; j++)
                {
                    if (aCheckBox[j].type === "checkbox")
                    {
                        aCheckBox[j].checked = true;
                    }
                }
            }
            else
            {
                for (j = 0; j < aCheckBox.length; j++)
                {
                    if (aCheckBox[j].type === "checkbox")
                    {
                        aCheckBox[j].checked = false;
                    }
                }
            }
            refresh();
        }
    }
}

//为所有选择框添加刷新功能
function bindRefresh() {
    var aCheckbox = document.getElementsByClassName("choose_goods");

    for (var i = 0; i < aCheckbox.length; i++)
    {
        aCheckbox[i]["onclick"] = refresh;
    }
}

//只要有商品被选中时结算按钮就要亮起
function toPay() {
    var aPay = document.getElementsByClassName("pay");
    var pay = whetherChoseGoods();
    if (pay)
    {
        aPay[0].className = "to_pay pay";
        aPay[1].className = "to_pay pay";
    }
    else
    {
        aPay[0].className = "not_to_pay pay";
        aPay[1].className = "not_to_pay pay";
    }
}

//单个删除商品
function removeOne() {
    var aRemove = document.getElementsByClassName("remove");

    for (var i = 0; i < aRemove.length; i++)
    {
        aRemove[i]["onclick"] = function () {
            //存放Ul对象
            var goods_list = this.parentNode.parentNode.parentNode.parentNode;
            //存放待删除的li对象
            var goods_li = this.parentNode.parentNode.parentNode;

            goods_list.removeChild(goods_li);
            refresh();
        }
    }
}

//删除选中的商品
function removeChecked() {
    var oRemove = document.getElementById("remove_all_checked");

    oRemove["onclick"] = function () {
        var aCheckbox = document.getElementsByClassName("choose_goods");

        for (var i = 0; i < aCheckbox.length; i++)
        {
            if (aCheckbox[i]["checked"] === true)
            {
                aCheckbox[i].parentNode.parentNode.parentNode.removeChild(aCheckbox[i].parentNode.parentNode);
                i--;
            }
        }
        refresh();
    }
}

//如果商铺内商品被全部删除则商铺被删除
function removeShop() {
    var aShop = document.getElementsByClassName("shop");
    var goods;

    for (var index = 0; index < aShop.length; index++)
    {
        goods = aShop[index].getElementsByClassName("goods_info");
        if (goods.length === 0)
        {
            aShop[index].parentNode.removeChild(aShop[index]);
            index--;
        }
    }
}

//显示已选中商品数
function howManyToPay() {
    var num = whetherChoseGoods();
    var oHowManyChose = document.getElementsByClassName("all_checked")[0];

    oHowManyChose.innerHTML = num.toString();
}

//下方结算栏的吸附功能
function whetherAttach() {
    var oOptionAndPay = document.getElementById("options_and_pay");
    var aShop = document.getElementsByClassName("shop");

    if (aShop.length !== 0)
    {
        var lastShopHeight = aShop[aShop.length - 1].getBoundingClientRect().top;
        var minHeight = window.innerHeight - aShop[aShop.length - 1].offsetHeight;
        if (lastShopHeight < minHeight)
        {
            oOptionAndPay.className = "normal";
        }
        else if (lastShopHeight >= minHeight)
        {
            oOptionAndPay.className = "attach";
        }
    }
    else
    {
        oOptionAndPay.className = "normal";
    }
}
window.onscroll = whetherAttach;


