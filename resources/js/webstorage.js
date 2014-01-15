function Webstorage(str) {
	var ws = this;
	var status = 'public';
	var title = ' &raquo; Webstorage';
	var list = [];
	var token = '';
	$.ajax({
		type: 'GET',
		url: 'api.php?request=token',
		cache: false,
		async: false,
		success: function(data) {
			token = data;
		}
	});
	
	this.getStatus = function() {
		return status;
	}
	
	this.getTitle = function() {
		return title;
	}
	
	this.getToken = function() {
		return token;
	}
	
	this.fadeDivs = function() {
		$('#repository').fadeOut('slow');
		$('#files').fadeOut('slow');
		$('#profile').fadeOut('slow');
		$('#welcome').fadeOut('slow');
		$('#pms').fadeOut('slow');
	}
	
	this.changeStatus = function(filename) {
		$.get('api.php?request=changestatus&token='+token+'&file='+filename, function(data) {
			if(data == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
			else if(data == 'notfound')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['changestatus']);
			else if(data == 'badrequest')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
			else if(data == 'invalidtoken')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidtoken']);
			else
				ws.updateList();
		});
	}

	this.changeUploadStatus = function(filename) {
		if($('#changestatus').attr('src') == 'resources/img/public.png') {
			status = 'private';
			$('#changestatus').attr('src', 'resources/img/private.png');
			$('#infostatus').attr('title', str['uploadstatus']['private']); // Change the static title
			$('#infostatus').qtip('option', 'content.text', str['uploadstatus']['private']); // Change the qtip title
		}
		else if($('#changestatus').attr('src') == 'resources/img/private.png') {
			status = 'public';
			$('#changestatus').attr('src', 'resources/img/public.png');
			$('#infostatus').attr('title', str['uploadstatus']['public']);
			$('#infostatus').qtip('option', 'content.text', str['uploadstatus']['public']);
		}
	}
	
	this.deleteFile = function(filename) {
		$.get('api.php?request=deleter&token='+token+'&file='+filename, function(data) {
			if(data == 'error')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['deletefile']['error'].replace('{$file}', filename));
			else if(data == 'success')
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['deletefile']['success'].replace('{$file}', filename));
			else if(data == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
			else if(data == 'notfound')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['deletefile']['notfound']);
			else if(data == 'badrequest')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
			else if(data == 'invalidtoken')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidtoken']);
			ws.updateList();
		});
	}

	/* If you are not the owner, give it as argument the owner's nickname */
	this.downloadFile = function(filename, nickname) {
		$.get('api.php?request=info', function(data) {
			if(nickname === undefined) {
				var info = $.parseJSON(data);
				nickname = info['nickname'];
			}
			$.get('api.php?request=downloader&file='+filename+'&nickname='+nickname, function(data) {
				if(data == 'denied')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
				else if(data == 'notfound')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['downloadfile']['notfound']);
				else if(data == 'badrequest')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
				else {
					$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['downloadfile']['success']);
				
					// Downloader
					var downloader = document.createElement('iframe');
					downloader.setAttribute('id', 'downloader');
					downloader.setAttribute('src', 'api.php?request=downloader&file='+filename+'&nickname='+nickname);
					downloader.setAttribute('frameborder', '0');
					document.getElementById('storage').appendChild(downloader);
				}			
			});
		});
	}

	this.editProfile = function() {
		var status = '';
		if($('#edit_status').html() == str['repository']['private'])
			status = 'open';
		else if($('#edit_status').html() == str['repository']['public'])
			status = 'close';
		$.get('api.php?request=editprofile&token='+token+'&email='+ws.HTMLEncode($('#edit_email').val())+'&bio='+ws.HTMLEncode($('#edit_bio').val())+'&avatar='+ws.HTMLEncode($('#edit_avatar').val())+'&password='+ws.HTMLEncode($('#edit_password').val())+'&newpassword='+ws.HTMLEncode($('#edit_newpassword').val())+'&status='+ws.HTMLEncode(status), function(data) {
			if(data == 'success')
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['editprofile']['success']);
			else if((data == 'error') || (data == 'badrequest'))
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['editprofile']['error']);
			else if((data == 'denied') || (data == 'notfound'))
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
			else if(data == 'invalidpassword')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidpassword']);
			else if(data == 'invalidtoken')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidtoken']);
			if(($('#edit_password').val() !== '') && ($('#edit_newpassword').val() !== '')) {
				$.get('api.php?request=logout');
				self.location.reload();
				return true;
			}
			else {
				ws.profileViewer($('#gotomyprofile').html());
				$('#editprofile').bounceBoxHide();
			}
		}).error(function() {
			$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['editprofile']['error']);
		});
		
	}

	this.following = function() {
		$.get('api.php?request=following', function(data) {
			var vals = $.parseJSON(data);
			var text = str['following']['following']+'<br /><br />';
			$.each(vals, function(i, val) {
				text += '<b><a href="?profile='+val.you+'">'+val.you+'</a></b> ('+str['following']['date']+' '+val.date+')<br />';
			});
			$.facebox(text);
		});
	}
	
	this.initEditProfile = function() {
		$('#editprofile').css('height', '290px');
		$('#edit_email').attr('readonly', true);
		$('#edit_avatar').attr('readonly', true);
		$('#edit_bio').attr('readonly', true);
		$('#edit_status').attr('disabled', true);
		$('#edit_submit').attr('disabled', true);
		$.get('api.php?request=getuser&nickname='+$('#gotomyprofile').html(), function(data) {
			var vals = $.parseJSON(data);
			$.each(vals, function(i, val) {
				if(val.email !== '')
					$('#edit_email').val(val.email);
				if(val.bio !== '')
					$('#edit_bio').val(val.bio);
				if(val.avatar !== '')
					$('#edit_avatar').val(val.avatar);
				if(val.profile == 'close')
					$('#edit_status').html(str['repository']['public']);
				else if(val.profile == 'open')
					$('#edit_status').html(str['repository']['private']);
				$('#edit_status').click(function() {
					if($('#edit_status').html() == str['repository']['private'])
						$('#edit_status').html(str['repository']['public']);
					else if($('#edit_status').html() == str['repository']['public'])
						$('#edit_status').html(str['repository']['private']);
				});
			});
			$('#edit_email').attr('readonly', false);
			$('#edit_avatar').attr('readonly', false);
			$('#edit_bio').attr('readonly', false);
			$('#edit_status').attr('disabled', false);
			$('#edit_submit').attr('disabled', false);
		});
	}
	
	this.initSendPm = function() {
		$('#sendpm').css('height', '320px');
		$('#pm_send').attr('disabled', true);
		$.get('api.php?request=getuser', function(data) {
			var vals = $.parseJSON(data);
			var text = '';
			$.each(vals, function(i, val) {
				text += '<option value="'+val.nickname+'">'+val.nickname+'</option>';
			});
			$('#pm_to').append(text);
			$('#pm_to').selectbox();
			$('#pm_send').attr('disabled', false);
		});
	}

	this.getStats = function() {
		$.get('api.php?request=getonlineusers', function(data) {
			var vals = $.parseJSON(data);
			var nusers = vals.length;
			var users = '';
			if(nusers > 0) {
				$.each(vals, function(i, val) {
					users += '<a href="?profile='+val+'">'+val+'</a>, ';
				});
				if(users.substr(-2, users.length) == ', ')
					users = users.substr(0, users.length-2);
				users = '('+users+')';
			}
			$.get('api.php?request=getonlinevisitators', function(data) {
				var visitators = (data > 0) ? data : 0;
				$.facebox(str['stats']['users']+' '+nusers+' '+users+'<br />'+str['stats']['visitators']+' '+visitators+'<br />'+str['stats']['languages']+str['stats']['languageslist']);
			});
		});
	}

	this.getUrlVars = function() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
			vars[key] = value;
		});
		return vars;
	}
	
	this.HTMLEncode = function(str) {
		return encodeURIComponent(str);
	}
	
	this.HTMLDecode = function(str) {
		return decodeURIComponent(str);
	}

	this.init = function() {
		$.get('api.php?request=info', function(data) {
			if(data !== 'denied') {
				ws.updateAvailableStorageSpace();
				ws.updateUnreadedPm();
				$('#welcome').html('<p>'+str['welcomeback']+'<ul id="live"></ul>');

				/* Long polling */
				(function live() {
					$.ajax({
						url: 'api.php?request=getlive',
						success: function(data) {
							$('#live').fadeOut('slow');
							$('#live').html('');
							if(data == 'notfound')
								return false;
							var vals = $.parseJSON(data);
							var list = [];
							$.each(vals, function(i, val) {
								list[i] = val;
								$('#live').append('<li id="live'+i+'">'+str['live']['live'].replace('{$date}', val.date).replace('{$hour}', val.hour).replace('{$nickname}', '<a href="?profile='+val.nickname+'">'+val.nickname+'</a>').replace('{$file}', '<a class="view">'+val.path+'</a>')+'</li>');
								$('#live'+i+' a.view').click(function(e) {
									ws.viewFile(list[i].path, list[i].nickname);
								});
							});
							$('#live').fadeIn('slow');
						},
						dataType: 'html',
						complete: live,
						timeout: 60000  // 1 minuto
					});
				})();
			}
		});
	}

	this.login = function() {
		nickname = $('#login_nickname').val();
		password = $('#login_password').val();
		if((nickname == '') || (password == '')) {
			$('#login_alert').css('display', 'block');
			$('#login').css('height', '170px');
			$('#login input[type=text]').css('border-color', 'red');
			$('#login input[type=text]').css('box-shadow', '0px 0px 5px #900');
			$('#login input[type=password]').css('border-color', 'red');
			$('#login input[type=password]').css('box-shadow', '0px 0px 5px #900');
			return false;
		}
		$.get('api.php?request=login&nickname='+nickname+'&password='+password+'&language='+navigator.language, function(data) {
			if(data == 'alreadylogged') {
				$('#login').html('<p class="alertimg">'+str['login']['alreadylogged']+'</p>');
				$('#login').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if((data == 'error') || (data == 'badrequest')) {
				$('#login_alert').css('display', 'block');
				$('#login').css('height', '170px');
				$('#login input[type=text]').css('border-color', 'red');
				$('#login input[type=text]').css('box-shadow', '0px 0px 5px #900');
				$('#login input[type=password]').css('border-color', 'red');
				$('#login input[type=password]').css('box-shadow', '0px 0px 5px #900');
			}
			else if(data == 'success') {
				$('#login').html('<p class="alertimg">'+str['login']['success']+'</p>');
				$('#login').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
		}).error(function() {
			$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['editprofile']['error']);
		});
	}

	this.logout = function(force) {
		$.get('api.php?request=info', function(data) {
			if(data == 'denied') {
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['logout']['notlogged']);
				return false;
			}
		});
		$.get('api.php?request=logout', function(data) {
			if(data == 'notlogged')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['logout']['notlogged']);
			else if(data == 'success') {
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['logout']['success']);
				window.setTimeout("self.location.reload();", 1000);
			}
		});
	}

	this.mailValidator = function(code) {
		$.get('api.php?request=mailvalidator&code='+code, function(data) {
			$('#mailvalidator').bounceBoxToggle();
			if(data == 'alreadylogged')
				$('#mailvalidator').html('<p class="alertimg">'+str['mailvalidator']['havelogout']+'</p>');
			else if(data == 'notneed')
				$('#mailvalidator').html('<p class="alertimg">'+str['mailvalidator']['notneed']+'</p>');
			else if(data == 'invalid')
				$('#mailvalidator').html('<p class="alertimg">'+str['mailvalidator']['invalid']+'</p>');
			else if(data == 'success')
				$('#mailvalidator').html('<p class="alertimg">'+str['mailvalidator']['success']+'</p>');
			else if(data == 'error')
				$('#mailvalidator').html('<p class="alertimg">'+str['mailvalidator']['error']+'</p>');
			$('#mailvalidator').css('height', '40px');
			$('#mailvalidator').css('display', 'block');
			window.setTimeout("window.location.replace(window.location.pathname);", 3000);
		});
	}

	this.modalPmReader = function() {
		$.get('api.php?request=getpm', function(data) {
			var vals = $.parseJSON(data);
			var text = '<div align="center"><select id="selectpm"><option value="">'+str['pm']['choose']+'</option>';
			$.each(vals, function(i, val) {
				if(val.readed == '0')
					text += '<option value="'+val.id+'">&bull;'+val.subject+'</option>';
				else if(val.readed == '1')
					text += '<option value="'+val.id+'">'+val.subject+'</option>';
			});
			$.facebox(text+'</select></div>');
			$('#selectpm').selectbox({
				onClose: function() {
					var value = $('#selectpm').val();
					if(value !== '') {
						$('#selectpm').selectbox('disable');
						ws.pmReader(value);
						$.facebox.close();
					}
				}
			});
		});
	}

	this.modalProfileViewer = function() {
		$.get('api.php?request=getuser', function(data) {
			var vals = $.parseJSON(data);
			var text = '<div align="center"><select id="selectuser"><option value="">'+str['user']['choose']+'</option>';
			$.each(vals, function(i, val) {
				text += '<option value="'+val.nickname+'">'+val.nickname+'</option>';
			});
			$.facebox(text+'</select></div>');
			$('#selectuser').selectbox({
				onClose: function() {
					var value = $('#selectuser').val();
					if(value !== '') {
						$('#selectuser').selectbox('disable');
						ws.profileViewer(value);
						$.facebox.close();
					}
				}
			});
		});
	}

	this.pmReader = function(id) {
		$.get('api.php?request=getpm&id='+id, function(data) {
			if(data == 'badrequest')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
			else if(data == 'notfound')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['notfound']);
			else {
				var vals = $.parseJSON(data);
				ws.fadeDivs();
				$('#title').html('');
				$('#pms').html('');
				$('#title').hide();
				$('#pms').hide();
				$.each(vals, function(i, val) {
					$('title').html(val.subject+title);
					$('#title').html('<h2>'+val.subject+' &raquo; '+val.sender+'</h2>');
					$('#pms').append(str['pm']['subject']+val.subject+'<br />'+str['pm']['from']+' <a href="?profile='+val.sender+'">'+val.sender+'</a><br />'+str['pm']['date']+val.date+str['pm']['hour']+val.hour+'<hr />'+val.message);
				});
				$('#title').slideToggle('slow');
				$('#pms').slideToggle('slow');
			}
			ws.updateUnreadedPm();
		});
	}

	this.profileViewer = function(nickname) {
		$.get('api.php?request=getuser&nickname='+nickname, function(data) {
			if(data == 'badrequest')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
			else if(data == 'notfound')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['notfound']);
			else {
				var vals = $.parseJSON(data);
				ws.fadeDivs();
				$('#title').html('');
				$('#profile').html('');
				$('#title').hide();
				$('#profile').hide();
				$.each(vals, function(i, val) {
					$('title').html(val.nickname+title);
					if(val.grade == '1')
						$('#title').append('<img src="resources/img/star.gif" width="18" height="18" alt="Super powah membah. " />');
					$('#title').append('<h2>'+val.nickname+'<img src="resources/img/languages/'+val.language+'.gif" width="16" height="11" alt=" '+val.language+'" /></h2>');
					if(val.avatar !== '')
						$('#profile').append('<p><img src="'+val.avatar+'" alt="'+val.nickname+'\'s avatar" /></p>');
					$.get('api.php?request=isfollowing&you='+nickname, function(data) {
						if(data == 'notfollowing') {
							$('#profile').append('<button id="follow">'+str['user']['follow']+ws.HTMLDecode(nickname)+'</button>');
							$('#profile').append('<button class="userrepository" id="'+nickname+'">'+str['user']['repository']+'</button>');
							$('.userrepository').click(function() {
								ws.updateList(this.id);
							});
							$('#follow').click(function() {
								$.get('api.php?request=newfollow&you='+nickname, function(data) {
									if(data == 'notfound')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['notfound']);
									else if(data == 'duplicate')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['notfound'].replace('{$nickname}', nickname));
									else if(data == 'same')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['followyouself']);
									else if(data == 'error')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['errorfollow']);
									else if(data == 'success')
										ws.profileViewer(nickname);
								});
							});
						}
						else if(data == 'following') {
							$('#profile').append('<button id="stopfollow">'+str['user']['stoptofollow'].replace('{$nickname}', ws.HTMLDecode(nickname))+'</button>');
							$('#profile').append('<button class="userrepository" id="'+nickname+'">'+str['user']['repository']+'</button>');
							$('.userrepository').click(function() {
								ws.updateList(this.id);
							});
							$('#stopfollow').click(function() {
								$.get('api.php?request=deletefollow&you='+nickname, function(data) {
									if(data == 'notfound')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['notfound']);
									else if(data == 'notfollow')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['nofollow'].replace('{$nickname}', nickname));
									else if(data == 'same')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['nofollowyouself']);
									else if(data == 'error')
										$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['errornofollow']);
									else if(data == 'success')
										ws.profileViewer(nickname);
								});
							});
						}
						else if(data == 'notfound')
							$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['user']['notfound']);
					});
					if(val.bio !== '')
						$('#profile').append('<em>'+val.bio+'</em>');
					$('#profile').append('<p>'+str['user']['since']+val.date+'.</p>');
					if(val.browsername !== '')
						$('#profile').append('<p>'+str['user']['browser']+val.browsername+' '+val.browserversion+' '+str['user']['os']+val.platform+'.</p>');
				});
				$('#profile').slideToggle('slow');
				$('#title').slideToggle('slow');
			}
		});
	}
	
	this.register = function() {
		nickname = $('#reg_nickname').val();
		password = $('#reg_password').val();
		repassword = $('#reg_repassword').val();
		email = $('#reg_email').val();
		captcha = $('#reg_captcha').val();
		if((nickname == '') || (password == '') || (email == '') || (captcha == '')) {
			$('#reg_alert').css('display', 'block');
			$('#register').css('height', '290px');
			$('#register input[type=text]').css('border-color', 'red');
			$('#register input[type=text]').css('box-shadow', '0px 0px 5px #900');
			$('#register input[type=password]').css('border-color', 'red');
			$('#register input[type=password]').css('box-shadow', '0px 0px 5px #900');
			return false;
		}
		$.get('api.php?request=register&token='+token+'&nickname='+nickname+'&password='+password+'&repassword='+repassword+'&email='+email+'&captcha='+captcha, function(data) {
			if(data == 'alreadylogged') {
				$('#register').html('<p class="alertimg">'+str['registration']['alreadyregistrated']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'short') {
				$('#register').html('<p class="alertimg">'+str['registration']['short']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'passwordnotequals') {
				$('#register').html('<p class="alertimg">'+str['registration']['passwordnotequals']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'denied') {
				$('#register').html('<p class="alertimg">'+str['registration']['disabled']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'invalidcaptcha') {
				$('#register').html('<p class="alertimg">Invalid captcha.</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'invalidtoken') {
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidtoken']);
				$('#reg_alert').css('display', 'block');
				$('#register').css('height', '250px');
				$('#register input[type=text]').css('border-color', 'red');
				$('#register input[type=text]').css('box-shadow', '0px 0px 5px #900');
				$('#register input[type=password]').css('border-color', 'red');
				$('#register input[type=password]').css('box-shadow', '0px 0px 5px #900');
			}
			else if((data == 'error') || (data == 'badrequest')) {
				$('#reg_alert').css('display', 'block');
				$('#register').css('height', '250px');
				$('#register input[type=text]').css('border-color', 'red');
				$('#register input[type=text]').css('box-shadow', '0px 0px 5px #900');
				$('#register input[type=password]').css('border-color', 'red');
				$('#register input[type=password]').css('box-shadow', '0px 0px 5px #900');
			}
			else if(data == 'successwithconfirm') {
				$('#register').html('<p class="alertimg">'+str['registration']['successwithconfirm']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
			else if(data == 'success') {
				$('#register').html('<p class="alertimg">'+str['registration']['successnoconfirm']+'</p>');
				$('#register').css('height', '40px');
				window.setTimeout("self.location.reload();", 1000);
			}
		}).error(function() {
			$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['editprofile']['error']);
		});
	}
	
	this.sendPm = function() {
		$.get('api.php?request=sendpm&token='+token+'&to='+ws.HTMLEncode($('#pm_to').val())+'&subject='+ws.HTMLEncode($('#pm_subject').val())+'&msg='+ws.HTMLEncode($('#pm_msg').val()), function(data) {
			if(data == 'success')
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['pm']['success']);
			else if(data == 'error')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['error']);
			else if(data == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
			else if(data == 'invalidtoken')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['invalidtoken']);
			$('#sendpm').bounceBoxHide();
		}).error(function() {
			$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['error']);
		});
	}
	
	this.share = function(filename, nickname) {
		$.get('api.php?request=info&file='+filename+'&nickname='+nickname, function(data) {
			if(data == 'notfound')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['share']['notfound']);
			else {
				var vals = $.parseJSON(data);
				var status = '';
				$.each(vals, function(i, val) {
					if(val.status == 'private')
						alert(str['share']['private']);
					else {
						$.get('api.php?request=info', function(data) {
							var info = $.parseJSON(data);
							if(nickname === undefined)
								nickname = info['nickname'];
							$.facebox('<h3>'+str['share']['view']+'</h3><textarea class="code" readonly="readonly">'+location.href+'api.php?request=viewer&clear=true&file='+filename+'&nickname='+nickname+'</textarea><br /><h3>'+str['share']['download']+'</h3><textarea class="code" readonly="readonly">'+location.href+'api.php?request=downloader&file='+filename+'&nickname='+nickname+'</textarea>');
						});
					}
				});
			}
		});	
	}
	
	this.updateAvailableStorageSpace = function() {
		$.get('api.php?request=availablestoragespace', function(available) {
			if(available == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
			else {
				$.get('api.php?request=info', function(data) {
					var info = $.parseJSON(data);
					$('#storagespace').hide();
					$('#storagespace').html(str['stats']['total']+info['storage']+'mb | '+str['stats']['used']+(info['storage']-available).toFixed(6)+'mb | '+str['stats']['available']+parseFloat(available).toFixed(6)+'mb');
					$('#storagespace').toggle('slow');
				});
			}
		});
	};
	
	this.updateUnreadedPm = function() {
		$.get('api.php?request=countunreadedpm', function(data) {
			if(data == 'denied')
				$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['denied']);
			else if(parseInt(data) > 0)
				$.jGrowl('<img src="resources/img/good.png" width="25" height="25" alt="Good" />'+str['pm']['unreaded'].replace('{$count}', parseInt(data)));
		});
	};

	this.updateList = function(nickname) {
		ws.fadeDivs();
		$('#repository').fadeIn('slow');
		$('#loader').fadeIn('slow');
		$('#files').hide();
		$('#title').hide();
		$('title').html(str['title']['yourrepository']+title);
		$('#title').html('<h2>'+str['title']['yourrepository']+'</h2>');
		$.get('api.php?request=info', function(data) {
			if(nickname === undefined) {
				var info = $.parseJSON(data);
				nickname = info['nickname'];
			}
			$.get('api.php?request=list&nickname='+nickname, function(data) {
				if(data == 'denied')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['denied']);
				else if(data == 'notfound')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['repository']['nofile']);
				else if(data == 'badrequest')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['badrequest']);
				else {
					if(nickname == $('#gotomyprofile').html())
						$('#upload').fadeIn('slow');
					else {
						$('#upload').fadeOut('slow');
						$('title').html(str['title']['otherrepository'].replace('{$nickname}', ws.HTMLDecode(nickname))+title);
						$('#title').html('<h2>'+str['title']['otherrepository'].replace('{$nickname}', ws.HTMLDecode(nickname))+'</h2>');
					}
					var vals = $.parseJSON(data);
					var status = '';
					if(nickname == $('#gotomyprofile').html()) {
						$('#files').html('<tr><td><b>'+str['repository']['files']+'</b></td><td><b>'+str['repository']['download']+'</b></td><td><b>'+str['repository']['delete']+'</b></td><td><b>'+str['repository']['share']+'</b></td><td><b>'+str['repository']['datetime']+'</b></td></tr>');
						$.each(vals, function(i, val) {
		                                       list[i] = val;
		                                       status = (val.status == 'public') ? '<a title="This file is public." class="changestatus"><img src="resources/img/public.png" width="16" height="16" alt="Public file" /></a>' : '<a title="This file is private." class="changestatus"><img src="resources/img/private.png" width="16" height="16" alt="Private file" /></a>';
		                                       $('#files').append('<tr id="file'+i+'"><td>'+status+'<a class="view">'+val.path+'('+val.visits+')</a></td><td><a class="download">'+str['repository']['download']+' ('+val.downloads+')</a></td><td><a class="delete">(X)</a></td><td><a class="share">'+str['repository']['share']+'</a><td>'+val.date+' '+val.hour+'</tr>');
							$('#file'+i+' a.view').click(function(e) {
								ws.viewFile(list[i].path, list[i].nickname);
							});
							$('#file'+i+' a.download').click(function(e) {
								ws.downloadFile(list[i].path, list[i].nickname);
							});
							$('#file'+i+' a.delete').click(function(e) {
								 ws.deleteFile(list[i].path);
							});
							$('#file'+i+' a.share').click(function(e) {
								ws.share(list[i].path, list[i].nickname);
							});
							$('#file'+i+' a.changestatus').click(function(e) {
								ws.changeStatus(list[i].path);
							});
						});
					}
					else {
						$('#files').html('<tr><td><b>'+str['repository']['files']+'</b></td><td><b>'+str['repository']['download']+'</b></td><td><b>'+str['repository']['share']+'</b></td><td><b>'+str['repository']['datetime']+'</b></td></tr>');
						$.each(vals, function(i, val) {
		                                       list[i] = val;
		                                       $('#files').append('<tr id="file'+i+'"><td><a class="view">'+val.path+'('+val.visits+')</a></td><td><a class="download">'+str['repository']['download']+' ('+val.downloads+')</a></td><td><a class="share">'+str['repository']['share']+'</a><td>'+val.date+' '+val.hour+'</tr>');
							$('#file'+i+' a.view').click(function(e) {
								ws.viewFile(list[i].path, list[i].nickname);
							});
							$('#file'+i+' a.download').click(function(e) {
								ws.downloadFile(list[i].path, list[i].nickname);
							});
							$('#file'+i+' a.share').click(function(e) {
								ws.share(list[i].path, list[i].nickname);
							});
						});
					}
					$('#files').fadeIn('slow');
				}
				$('#title').fadeIn('slow');
				$('#loader').hide('fast');
				ws.updateAvailableStorageSpace();
			});
		});
	}

	/* If you are not the owner, give it as argument the owner's nickname */
	this.viewFile = function(filename, nickname) {
		$.get('api.php?request=info', function(data) {
			if(nickname === undefined) {
				var info = $.parseJSON(data);
				nickname = info['nickname'];
			}
			$.get('api.php?request=viewer&file='+filename+'&nickname='+nickname, function(data) {
				if(data == 'denied')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['denied']);
				else if(data == 'notfound')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['view']);
				else if(data == 'badrequest')
					$.jGrowl('<img src="resources/img/alert.png" width="25" height="25" />'+str['pm']['badrequest']);
				else
					$.facebox({iframe: 'api.php?request=viewer&file='+ws.HTMLEncode(filename)+'&nickname='+nickname, rev: 'iframe|400|550'});
			});
		});
	}
}
