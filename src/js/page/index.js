//为了支持html热更新必须引入这段，生产环境不会引入
if (process.env.NODE_ENV !== 'prod') {
  	require('../../html/index.html');
}
//引入css
import '../../less/common/reset.less';
import '../../less/common/preset.less';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../../less/page/index.less';

import 'jquery';
import 'bootstrap';

$('.g-bd').append('<p class="text">这是由js生成的一句话。2</p>');

//增加事件
$('.btn').click(function() {
	var Dialog = require('../components/dialog/index.js');
	new Dialog();
});