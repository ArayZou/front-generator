//引入css
require("../../less/components/reset.less");
require("../../less/common/global.less");
require("../../less/common/grid.less");
require("../../less/page/list.less");


import $ from 'jquery';

var html = '';
for(var i=0;i<5;i++){
	html += '<li>列表'+(i+1)+'</li>';
}

$('#list').html(html);

var arr = document.getElementsByTagName("li");
for(var i = 0;i<arr.length;i++){
    let j = i;
    arr[i].onclick = function () {
        alert(j);
    };
}

