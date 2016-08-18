//引入css
require("../../less/components/reset.less");
require("../../less/common/global.less");
require("../../less/common/grid.less");
require("../../less/page/index.less");

import $ from 'jquery';

$('.g-bd').append('<p class="text">这是由js生成的一句话。</p>');

//增加事件
$('.btn').click(function() {
	var Dialog = require('../components/dialog/index.js');
	new Dialog();
});