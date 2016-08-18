//加载模块css
require('./css/dialog.css');
//加载模板
import html from'./tmpl/dialog.html';
import $ from 'jquery';


module.exports = function() {
	var $dialog = $(html).clone();
	$dialog.find('.close').on('click', function() {
		$dialog.fadeOut(function() {
			$(this).remove();
		});
	});
	$('body').append($dialog);
	$dialog.fadeIn();
}