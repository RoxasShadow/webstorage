<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>{{title}}</title>
<meta name="description" content="{{description}}" />
<meta name="keywords" content="{{keywords}}" />
<meta name="author" content="Giovanni Capuano" />
<meta name="robots" content="index,follow" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="resources/css/loadStyles.css.php" />
<script type="text/javascript">var token = '{{token}}';</script>
<script type="text/javascript" src="resources/js/loadJavascript.js.php"></script>
</head>
<body>
<div id="menu" class="hidden">{{#logged}}<a title="View your public profile." id="gotomyprofile">{{nickname}}</a> (<a title="Users who you are following." id="gotomyfollowing">Following</a>) | <a title="Edit your profile." class="editprofile">Edit your profile</a> | <a title="View your repository." id="gotorepository">Repository</a> | <a title="View the users profile." id="gotouserlist">Users</a> | <a title="Read your personal messages." id="gotopmreader">Read PM</a> | <a title="Send a personal message to an user." class="sendpm">Send a PM</a> | <a title="Read the frequently asked questions." class="gotofaq">FAQ</a> | <a title="Make a donation." id="gotodonation">Donation</a> | <a title="Quit from your profile." id="logout">Log out</a>{{/logged}}{{^logged}}<a title="Sign in to take advantage of features of the site." class="login">Login</a> | <a title="Sign up to take advantage of features of the site." class="register">Register</a> | <a title="Read the frequently asked questions." class="gotofaq">FAQ</a> | <a title="Make a donation." id="gotodonation">Donation</a>{{/logged}}</div>
	<div id="box" class="hidden">
		<div id="logo"><img src="resources/img/logo.png" width="250" height="80" alt="Ocarina Project" /></div>
		<div id="content">
			<div align="center" id="title"><h2>{{title}}</h2></div>
			<div id="repository" class="hidden">
				<div id="upload">
					<div id="file-uploader" align="center"></div>
					<div id="manup"><a title="Your file will be to uploaded as public." id="infostatus"><img id="changestatus" src="resources/img/public.png" width="16" height="16" alt="Change status" /></a></div>
				</div>
				<div id="storage">
					<p align="center" id="loader"><a title="Loading..."><img src="resources/img/loader.gif" alt="Loading..." width="24" height="24" /></a></p>
					<table id="files"><tr><td></td></tr></table>
				</div>
			</div>
			<div id="profile" align="center" class="hidden"></div>
			<div id="pms" class="hidden"></div>
			<div id="welcome" class="hidden">
				<p>Welcome in {{title}} :)</p>
				<p>If you want to know about this project, take a look at the <a title="Read the frequently asked questions." class="gotofaq">FAQ</a>, otherwise not waste time, <a title="Sign in to take advantage of features of the site." class="login">login</a> or <a title="Sign up to take advantage of features of the site." class="register">register</a> now!</p>
				<p><font color="red">The registrations are activated with 20mb of storage expandable at 520mb (see FAQ).<br />If you want, you can use (responsibly) the guest account of 100mb with the nickname <b>GuestMan</b> and the password <b>guestman</b> to access and try {{title}} yourself.</font></p>
			</div>
			<div id="faq" class="hidden">
				<div id="questions">
					<h2>General</h2>
					<ul>
						<li><a href="#0x0" class="link">What is {{title}}?</a></li>
						<li><a href="#0x1" class="link">Who is the author?</a></li>
						<li><a href="#0x2" class="link">How do I contact you?</a></li>
						<li><a href="#0x3" class="link">I want to help you with the website. How can I do that?</a></li>
					</ul><br />
					<h2>{{title}}</h2>
					<ul>
						<li><a href="#1x0" class="link">How much storage have I?</a></li>
						<li><a href="#1x1" class="link">How can increase my storage?</a></li>
						<li><a href="#1x2" class="link">What is the difference between a private and a public file?</a></li>
						<li><a href="#1x3" class="link">Are my files secure here?</a></li>
						<li><a href="#1x4" class="link">Where are placed the server?</a></li>
					</ul><br />
					<h2>Miscs</h2>
					<ul>
						<li><a href="#2x0" class="link">I have not a browser which supports Javascript. How can I do?</a></li>
						<li><a href="#2x1" class="link">There are some APIs?</a></li>
						<li><a href="#2x2" class="link">IMHO here miss a few questions...</a></li>
						<li><a href="#2x3" class="link">Can I conquer the world?</a></li>
					</ul>
				</div>
				<div id="faq0x0" class="hidden">
					<h2>What is {{title}}?</h2>
					<p>{{title}} is a virtual place where you can send any type of file you want.</p>
					<p>The system is simple.<br />
					You have only to do the registration in order to obtain your required space.<br />
					You can now upload the files in your repository, chosen their status, download or view it, and yes, too delete.</p>
					<p>{{title}} works as a social network too!</p>
					<p>You can send a personal message (PM) to another user, read the yours, edit your public profile and follow your friends, so you know when they upload new public files on their repository!</p>
				</div>
				<div id="faq0x1" class="hidden">
					<h2>Who is the author?</h2>
					<p>The author am I, Giovanni `Roxas Shadow` Capuano!</p>
					<p>I'm a class '95 guy who loves the programmation.</p>
					<p>Follow me on my <a href="http://www.giovannicapuano.net" title="Giovanni Capuano Blog" target="_blank">blog</a>!</p>
				</div>
				<div id="faq0x2" class="hidden">
					<h2>How do I contact you?</h2>
					<p>You can send me an mail at <a href="mailto:webmaster@giovannicapuano.net">webmaster@giovannicapuano.net</a>, or on my <a href="http://www.giovannicapuano.net" title="Giovanni Capuano Blog" target="_blank">blog</a>.</p>
				</div>
				<div id="faq0x3" class="hidden">
					<h2>I want to help you with the website. How can I do that?</h2>
					<p>If you are a programmer, take a look at the APIs, develope nice apps and contact me.</p>
					<p>If you find a bug, do the same.</p>
					<p>Otherwise, you can make a donation, beacuse, you have to know, this project is very expensive, and I profit nothing... so a donation is always welcome.</p>
					<p>Thank you very much for your interest :)</p>
				</div>
				<div id="faq1x0" class="hidden">
					<h2>How much storage have I?</h2>
					<p>You have initially {{initstorage}}mb of space storage.</p>
					<p>If you want more space of storage for free, find a way to run somewhere this site :)</p>
				</div>
				<div id="faq1x1" class="hidden">
					<h2>How can increase my storage?</h2>
					<p>If you have to upload more files, you can do a donation via PayPal of €{{euroblock}}.</p>
					<p>Your space storage will increase of {{morestorage}}mb.</p>
					<p>More of that I cannot do.</p>
				</div>
				<div id="faq1x2" class="hidden">
					<h2>What is the difference between a private and a public file?</h2>
					<p>If you make a file with the status <em>private</em>, it will downloadable/viewable only by you.</p>
					<p>If you make a file with the status <em>public</em>, you will able to share it with whomever you want.</p>
					<p>If you set your profile as <em>private</em>, your files will be setted as <em>private</em>, but if you return to <em>public</em>, the files will be back as first.</p>
					<p>Oh, a last thing: if you share with others a public file, for each download or view done, the relative counter will be increased.</p> 
				</div>
				<div id="faq1x3" class="hidden">
					<h2>Are my files secure here?</h2>
					<p>Yes, your files are secure here.</p>
					<p>They (as your informations, which are hashed and salted) will never be sold at third-party companies.</p>
				</div>
				<div id="faq1x4" class="hidden">
					<h2>Where are placed the server?</h2>
					<p><s>The server is my computer :)</s></p>
					<p><s>I live in province of Naples, Italy.</s></p>
					<p><s>My webserver is Apache, my DBMS is MySQL, and my OS is Debian, with the GNU/Linux kernel.</s></p>
					<p>Actually I cannot host this site in my computer, so I have hosted it on the server of my blog, on TopHost.</p>
					<p>{{title}} is written in PHP5, with OOP paradigm, the UI is XHTML 1.0, CSS3 and Javascript (with jQuery as framework) based.<br />The template engine (which processes only a template file, lol) is provided by Mustache.</p>
					<p>All data calls are done via AJAX to the APIs.</p>   
				</div>
				<div id="faq2x0" class="hidden">
					<h2>I have not a browser which supports Javascript. How can I do?</h2>
					<p>To run, the browser version of {{title}} needs to Javascript.</p>
					<p>If you have problems to provide it, you can use the static version, available soon.</p>
				</div>
				<div id="faq2x1" class="hidden">
					<h2>There are some APIs?</h2>
					<p>Yes.</p>
					<p>They are available at &lt;{{url_index}}/api.php>, and a documentation is available directly entering in this link without send any type of parameter.</p>
				</div>
				<div id="faq2x2" class="hidden">
					<h2>IMHO here miss a few questions...</h2>
					<p>Well, contact me now, thanks in advance :)</p>
				</div>
				<div id="faq2x3" class="hidden">
					<h2>Can I conquer the world with this?.</h2>
					<p>Yes, you can. Show me what you can do &lt;3</p>
				</div>
			</div>
		</div>
	</div>
	<div id="login" class="bouncebox">
		<p><b>Login</b></p>
		<p class="alert" id="login_alert">The login details are incorrect. Please try again.</p>
		<input type="text" id="login_nickname" placeholder="nickname" value="" /><br />
		<input type="password" id="login_password" placeholder="password" value="" /><br />
		<button id="login_submit">Login</button><button class="cancel">Cancel</button>
	</div>
	<div id="register" class="bouncebox">
		<p><b>Register</b></p>
		<p class="alert" id="reg_alert">The register details are incorrect. Please try again.</p>
		<input type="text" id="reg_nickname" placeholder="nickname" value="" /><br />
		<input type="password" id="reg_password" placeholder="password" value="" /><br />
		<input type="password" id="reg_repassword" placeholder="retype password" value="" /><br />
		<input type="text" id="reg_email" placeholder="yourname@provider.ext" value="" /><br />
		<img src="api.php?request=captcha" alt="captcha" width="228" height="20" /><br />
		<input type="text" id="reg_captcha" placeholder="captcha" value="" maxlength="5" /><br />
		<button id="reg_submit">Register</button><button class="cancel">Cancel</button>
	</div>
	<div id="editprofile" class="bouncebox">
		<p><b>Edit your profile</b></p>
		<input type="text" id="edit_email" placeholder="yourname@provider.ext" /><br />
		<input type="text" id="edit_bio" placeholder="some words about you" /><br />
		<input type="text" id="edit_avatar" placeholder="avatar" /><br />
		<input type="password" id="edit_password" placeholder="password (keep blank to not change)" /><br />
		<input type="password" id="edit_newpassword" placeholder="new password (keep blank to not change)" /><br />
		<button id="edit_status">Loading...</button><br />
		<button id="edit_submit">Edit</button><button class="cancel">Cancel</button>
	</div>
	<div id="sendpm" class="bouncebox">
		<p><b>Send a PM</b></p>
		<select id="pm_to"><option value="">---Choose an receiver---</option></select><br />
		<input type="text" id="pm_subject" placeholder="subject"/><br />
		<textarea id="pm_msg" rows="10" cols="10" placeholder="message"></textarea><br />
		<button id="pm_send">Send</button><button class="cancel">Cancel</button>
	</div>
	<div id="mailvalidator" class="bouncebox"><p><b>Account validator</b></p></div>
	<div id="bottominfo">{{#logged}}<a id="storagespace">Loading...</a>{{/logged}}<br />&copy; <a href="http://www.giovannicapuano.net" target="_blank">Giovanni Capuano</a> 2011 | <a id="gotostats">Stats</a></div>
	<script type="text/javascript" src="http://www.giovannicapuano.net/stats/php-stats.js.php"></script>
	<noscript><img src="http://www.giovannicapuano.net/stats/php-stats.php" border="0" alt=""></noscript>
</body>
</html>
