$(document).ready(function() {
	var str = new Language();
	if(typeof(str) == undefined) {
		alert('Initialization failed. Impossible to load the languages file.');
		return false;
	}
	var ws = new Webstorage(str);
	
	/* Drag&Drop, 'cause is very cool! */
	$('#menu').draggable();
	$('#logo').draggable();
	$('#content').draggable();
	$('#bottominfo').draggable();
	
	/* Bouncebox */
	$('#login').bounceBox();
	$('#register').bounceBox();
	$('#mailvalidator').bounceBox();
	$('#editprofile').bounceBox();
	$('#sendpm').bounceBox();
	$('a.login').click(function(e) {
		$('#login').css('display', 'block');
		$('#login').bounceBoxToggle();
		e.preventDefault();
	});
	$('a.register').click(function(e) {
		$('#register').css('display', 'block');
		$('#register').bounceBoxToggle();
		e.preventDefault();
	});
	$('a.editprofile').click(function(e) {
		$('#editprofile').css('display', 'block');
		$('#editprofile').bounceBoxToggle();
		ws.initEditProfile();
		e.preventDefault();
	});
	$('a.sendpm').click(function(e) {
		$('#sendpm').css('display', 'block');
		$('#sendpm').bounceBoxToggle();
		ws.initSendPm();
		e.preventDefault();
	});
	$('.cancel').click(function() {
		$('#login').bounceBoxHide();
		$('#register').bounceBoxHide();
		$('#editprofile').bounceBoxHide();
		$('#sendpm').bounceBoxHide();
	});
	
	/* qTip */
	$('a[title]').qtip({
		style: {
			classes: 'ui-tooltip-dark'
		}
	});
	
	/* Placeholder */
	$('input[placeholder], textarea[placeholder]').placeholder();
	
	/* Just a nice effect... */
	$('#menu').toggle('slow');
	$('#welcome').fadeIn('slow');
	$('#box').fadeIn('slow');
	
	/* Services */
	var params = ws.getUrlVars();
	if(params !== undefined)
		if(params['code'] !== undefined)
			ws.mailValidator(params['code']);
		else if(params['profile'] !== undefined)
			ws.profileViewer(params['profile']);
			
	/* For all */
	$('#gotouserlist').click(function() {
		ws.modalProfileViewer();
	});
	$('#gotostats').click(function() {
		ws.getStats();
	});
	$('.gotofaq').click(function() {
		ws.fadeDivs();
		$('#title').fadeOut('slow');
		$('#title').hide();
		$('#title').html('<h2>FAQ</h2>');
		$('#title').slideToggle('slow');
		$('#welcome').hide();
		$('#welcome').html($('#faq').html());
		$('#welcome').slideToggle('slow');
		$('title').html('FAQ'+ws.getTitle());
		$('.link').click(function() {
			var id = this.href.replace(/(.*?)#(.*?)/g, 'faq');
			$.facebox($('#'+id).html());
		});
	});
	$('#gotodonation').click(function() {
		$.facebox(str['donate']+'<br /><div align="center"><form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="ZDRJ7VPAC9JEW"><input type="image" src="resources/img/donate.png" border="0" name="submit" alt="PayPal — The safer, easier way to pay online."><img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1"></form></div>');
	});
	
	/* Only for logged users. */
	$('#logout').click(function() {
		ws.logout();
	});
	$('#changestatus').click(function() {
		ws.changeUploadStatus();
	});
	$('#editprofile').keypress(function(e) {
		var code = (e.keyCode) ? e.keyCode : e.which;
		if((code == 13) && ($('#editprofile').css('display') == 'block'))
			ws.editProfile();
	});
	$('#edit_submit').click(function() {
		ws.editProfile();
	});
	$('#sendpm').keypress(function(e) {
		var code = (e.keyCode) ? e.keyCode : e.which;
		if((code == 13) && ($('#sendpm').css('display') == 'block'))
			ws.sendPm();
	});
	$('#pm_send').click(function() {
		ws.sendPm();
	});
	$('#gotomyfollowing').click(function() {
		ws.following();
	});
	$('#gotopmreader').click(function() {
		ws.modalPmReader();
	});
	$('#gotomyprofile').click(function() {
		ws.profileViewer($('#gotomyprofile').html());
	});
	$('#gotorepository').click(function() {
		ws.updateList();
	});
	var uploader = new qq.FileUploader({
		element: document.getElementById('file-uploader'),
		action: 'api.php?request=uploader&token='+ws.getToken()+'&status='+ws.getStatus(),
		onSubmit: function(id, file) {
			$('body').css('cursor', 'wait');
	    		$.jGrowl(str['upload']['wait'].replace('{$file}', file).replace('{$status}', ws.getStatus()));
		},
		onComplete: function(id, file, response) {
			$('body').css('cursor', 'auto');
			if(response.success == true)
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25">'+str['upload']['success'].replace('{$file}', file).replace('{$status}', ws.getStatus()));
			else if(response.error == 'duplicate')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25">'+str['upload']['duplicate']);
			else if(response.error == 'badrequest')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25">'+str['badrequest']);
			else if(response.error == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25">'+str['denied']);
			else if(response.error == 'overflow')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25">'+str['upload']['finished']);
			else
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25">'+str['error']);
			ws.updateList();
		}
	});
	/* Only for visitators. */
	$('#login_submit').click(function() {
		ws.login();
	});
	$('#reg_submit').click(function() {
		ws.register();
	});
	$('#login').keypress(function(e) { // Just emulate the enter keypress in a form
		var code = (e.keyCode) ? e.keyCode : e.which;
		if((code == 13) && ($('#login').css('display') == 'block')) // 13 == enter
			ws.login();
	});
	$('#register').keypress(function(e) {
		var code = (e.keyCode) ? e.keyCode : e.which;
		if((code == 13) && ($('#register').css('display') == 'block'))
			ws.register();
	});
	ws.init();
});
