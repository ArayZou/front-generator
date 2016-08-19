//引入css
import '../../less/common/reset.less';
import '../../less/common/preset.less';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../../less/page/list.less';

import 'jquery';
import 'bootstrap';

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

