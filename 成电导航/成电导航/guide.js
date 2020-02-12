window.onload = function () {
    changeHeigh();
    bindEngineFunc();
    bindUrlAddFunc();
    jQuery("#add_my_link").on("click", showForm);
    jQuery("#add_link_form input[value='添加']").on("click", addFilledSite);

    let oSpan = document.getElementsByClassName("title_text")[0];
    oSpan["style"]["font-size"] = oSpan.offsetWidth * 0.20 + "px";
};

function change_engine(){
    let aEngines = document.getElementsByClassName("engines");
    let oInput = document.getElementById("input_text");

    let aPlaceholders = ["百度一下", "Google搜索", "必应搜索", "在知乎搜索", "在微信搜索", "在Bilibili搜索"];
    let len = aEngines.length;

    //并将除选中引擎外所有选项的样式设置为默认样式
    for(let i = 0; i < len; i++){
        aEngines[i].className = "engines";
        if (i === this["index"]){
            aEngines[i].className = "engines chosen_engine"
        }
    }
    //设置placeholder
    oInput.placeholder = aPlaceholders[this["index"]];
}

//为添加网址的表单中的选项添加一个存储对应网址的属性url
function bindUrlAddFunc() {
    let aLi = document.querySelectorAll("form li");
    let len = aLi.length;
    let sites = [
        "https://www.uestc.edu.cn/",
        "http://portal.uestc.edu.cn/",
        "http://ecard.uestc.edu.cn/",
        "http://eams.uestc.edu.cn/eams/home!submenus.action?menu.id=",
        "http://mail.std.uestc.edu.cn/",
        "http://www.lib.uestc.edu.cn/",
        "https://www.icourse163.org/",
        "https://www.cnki.net/",
        "https://edu.csdn.net/",
        "http://bbs.uestc.edu.cn/"
    ];

    for (let i = 0; i < len; i++){
        aLi[i]["url"] = sites[i];
        aLi[i]["onclick"] = addSite;
    }
}

//表单中选项被点击时的回调函数
function addSite() {
    let oLi = document.createElement("li");
    let oA = document.createElement("a");
    let oAddLi = document.getElementById("add_my_link");
    let site_name = this.innerHTML.toString();
    let site_url = this["url"];
    let site = {
        "name": site_name,
        "url": site_url
    };

    if (!checkSite(site)){
        oA.text = site_name;
        oA.href = site_url;
        oA.target = "_blank";
        oLi.className = "my_links";
        oLi.appendChild(oA);

        oAddLi.parentElement.insertBefore(oLi, oAddLi);
    }
    jQuery("#add_link_form").css("display", "none");
}

//修改图片高度
function changeHeigh() {
    let p_b = jQuery("#picture_box");
    p_b.height(p_b.outerWidth() * 0.32);
}

//给搜索引擎数组的DOM对象添加index属性用来为input对应添加placeholder
//并设置点击事件
function bindEngineFunc() {
    let aEngines = document.getElementsByClassName("engines");

    let len = aEngines.length;

    for(let i = 0; i < len; i++){
        aEngines[i]["index"] = i;
        aEngines[i].onclick = change_engine;
    }
}

function showForm() {
    let oAdd = document.getElementById("add_my_link");
    let oForm = document.getElementById("add_link_form");
    let pos = getPagePosition(oAdd);

    //清空上一次输入
    document.querySelector('form input[type="text"]')["value"] = "";
    document.querySelector("form input[type='url']")["value"] = "";

    oForm.style.left = pos.x + "px";
    oForm.style.top = pos.y + 70 + "px";
    oForm.style.display = "block";
}

//获取指定元素在页面中的位置
function getPagePosition(dom_obj) {
    let _pos = {x: 0, y: 0};
    for( ; dom_obj; dom_obj = dom_obj.offsetParent) {
        _pos.x += dom_obj.offsetLeft;
        _pos.y += dom_obj.offsetTop;
    }
    return _pos;
}

//添加自填写网址的提交事件回调函数
function addFilledSite() {
    let site_name = document.querySelector('form input[type="text"]')["value"];
    let site_url = document.querySelector("form input[type='url']")["value"];

    let oLi = document.createElement("li");
    let oA = document.createElement("a");
    let oAddLi = document.getElementById("add_my_link");

    //要求网站名称和网址都要填写
    if (site_name && site_url){
        oA.text = site_name;
        oA.href = site_url;
        oA.target = "_blank";
        oLi.className = "my_links";
        oLi.appendChild(oA);

        oAddLi.parentElement.insertBefore(oLi, oAddLi);
        jQuery("#add_link_form").css("display", "none");
    }
    else {
        alert("请填写完整！");
    }

}

//遍历已添加的网站，创建数组保存，每一单元为对象
function getAddedSites() {
    let aLinks = document.querySelectorAll(".links>ul>li>a");
    let len = aLinks.length - 1;
    let aAddedSites = [];

    for (let i = 0; i < len; i++){
        let site = {};
        site["name"] = aLinks[i]["text"];
        site["url"] = aLinks[i]["href"];
        aAddedSites.push(site);
    }

    return aAddedSites;
}

//检查已添加数组，查看数否重复添加网站
function checkSite(site_obj) {
    let aAddedSites = getAddedSites();
    let len = aAddedSites.length;
    let flag = false;

    for (let i = 0; i < len; i++){
        //名称或连接相同都算重复
        flag = (site_obj["name"] === aAddedSites[i]["name"])||(site_obj["url"] === aAddedSites[i]["url"]);
        if (flag){
            break;
        }
    }

    return flag;
}

//滚动条滚动的时候带动导航栏向下走
window.onscroll = function () {
    let oNav = document.getElementById("navigation");
    let oFooter = document.getElementById("footer");

    if (window.scrollY + oNav.offsetHeight + 200 < oFooter.offsetTop){
        oNav["style"]["top"] = window.scrollY + 50 +"px";
    }
    else {
        oNav["style"]["top"] = oFooter.offsetTop - oNav.offsetHeight - 200+ "px";
    }

};