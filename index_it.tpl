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
<div id="menu" class="hidden">{{#logged}}<a title="Visualizza il tuo profilo publico." id="gotomyprofile">{{nickname}}</a> (<a title="Gli utenti che stai seguendo." id="gotomyfollowing">Following</a>) | <a title="Modifica il tuo profilo." class="editprofile">Modifica il tuo profilo</a> | <a title="Visualizza il tuo repository." id="gotorepository">Repository</a> | <a title="Visualizza i profili degli utenti." id="gotouserlist">Utenti</a> | <a title="Leggi i tuoi messaggi privati." id="gotopmreader">Leggi MP</a> | <a title="Invia un messaggio privato ad un utente." class="sendpm">Invia MP</a> | <a title="Leggi le frequently asked questions." class="gotofaq">FAQ</a> | <a title="Fai una donazione." id="gotodonation">Donazione</a> | <a title="Esci dal tuo profilo." id="logout">Log out</a>{{/logged}}{{^logged}}<a title="Accedi per usufruire delle funzioni del sito." class="login">Accedi</a> | <a title="Registrati per usufruire delle funzioni del sito." class="register">Registrati</a> | <a title="Leggi le frequently asked questions." class="gotofaq">FAQ</a> | <a title="Fai una donazione." id="gotodonation">Donazione</a>{{/logged}}</div>
	<div id="box" class="hidden">
		<div id="logo"><img src="resources/img/logo.png" width="250" height="80" alt="Ocarina Project" /></div>
		<div id="content">
			<div align="center" id="title"><h2>{{title}}</h2></div>
			<div id="repository" class="hidden">
				<div id="upload">
					<div id="file-uploader"></div>
					<div id="manup"><a title="Il tuo file sarà caricato come pubblico." id="infostatus"><img id="changestatus" src="resources/img/public.png" width="16" height="16" alt="Cambia status" /></a></div>
				</div>
				<div id="storage">
					<p align="center" id="loader"><a title="Caricamento..."><img src="resources/img/loader.gif" alt="Caricamento..." width="24" height="24" /></a></p>
					<table id="files"><tr><td></td></tr></table>
				</div>
			</div>
			<div id="profile" align="center" class="hidden"></div>
			<div id="pms" class="hidden"></div>
			<div id="welcome" class="hidden">
				<p>Benvenuto in {{title}} :)</p>
				<p>Se vuoi sapere di più sul progetto, controlla le <a title="Leggi le frequently asked questions." class="gotofaq">FAQ</a>, altrimenti non perdere tempo, <a title="Accedi per usufruire delle funzioni del sito." class="login">accedi</a> o <a title="Registrati per usufruire delle funzioni del sito." class="register">registrati</a> ora!</p>
				<p><font color="red">Le registrazioni sono attivate con 20mb di storage ampliabile a 520mb (vedi FAQ).<br />Se lo desideri, puoi utilizzare (responsabilmente) l'account di ospite di 100mb con il nickname <b>GuestMan</b> e la password <b>guestman</b> per accedere e provare tu stesso {{title}}.</font></p>
			</div>
			<div id="faq" class="hidden">
				<div id="questions">
					<h2>General</h2>
					<ul>
						<li><a href="#0x0" class="link">Cos'è {{title}}?</a></li>
						<li><a href="#0x1" class="link">Chi è l'autore?</a></li>
						<li><a href="#0x2" class="link">Come posso contattarlo?</a></li>
						<li><a href="#0x3" class="link">Voglio aiutarti con il sito. Che cosa posso fare?</a></li>
					</ul><br />
					<h2>{{title}}</h2>
					<ul>
						<li><a href="#1x0" class="link">Quando spazio ho?</a></li>
						<li><a href="#1x1" class="link">Come posso aumentare lo spazio a mia disposizione?</a></li>
						<li><a href="#1x2" class="link">Che differenza c'è tra un file privato e pubblico?</a></li>
						<li><a href="#1x3" class="link">I miei files sono sicuri qui?</a></li>
						<li><a href="#1x4" class="link">Dov'è situato il server?</a></li>
					</ul><br />
					<h2>Miscs</h2>
					<ul>
						<li><a href="#2x0" class="link">Non ho un browser che supporta Javascript. Come faccio?</a></li>
						<li><a href="#2x1" class="link">Ci sono delle API?</a></li>
						<li><a href="#2x2" class="link">Per me qui mancano alcune domande...</a></li>
						<li><a href="#2x3" class="link">Posso conquistare il mondo?</a></li>
					</ul>
				</div>
				<div id="faq0x0" class="hidden">
					<h2>Cos'è {{title}}?</h2>
					<p>{{title}} è un luogo virtuale dove mettere i propri files.</p>
					<p>È facile.<br />
					Basta che effettui la registrazione per ottenere lo spazio di cui necessiti.<br />
					Puoi così caricare i file nel tuo repository, scegliere il loro status, scaricarli, visualizzarli e si, anche cancellarli.</p>
					<p>{{title}} funziona anche da social network!</p>
					<p>Puoi inoltrare un messaggio privato (MP) ad un utente, leggere i messaggi ricevuti, modicare il tuo profilo e seguire i tuoi amici, cosi saprai quando caricheranno nuovi files nel loro repository!</p>
				</div>
				<div id="faq0x1" class="hidden">
					<h2>Chi è l'autore?</h2>
					<p>Sono io, Giovanni `Roxas Shadow` Capuano!</p>
					<p>Sono un ragazzo classe '95 che ama la programmazione.</p>
					<p>Seguimi sul mio<a href="http://www.giovannicapuano.net" title="Giovanni Capuano Blog" target="_blank">blog</a>!</p>
				</div>
				<div id="faq0x2" class="hidden">
					<h2>Come ti contatto?</h2>
					<p>Puoi inviarmi una mail a <a href="mailto:webmaster@giovannicapuano.net">webmaster@giovannicapuano.net</a>, o sul mio <a href="http://www.giovannicapuano.net" title="Giovanni Capuano Blog" target="_blank">blog</a>.</p>
				</div>
				<div id="faq0x3" class="hidden">
					<h2>Voglio aiutarti con il sito. Che cosa posso fare?</h2>
					<p>Se sei un programmatore, dai un'occhiata alle API, scrivi qualche applicazione utile e contattami.</p>
					<p>Se trovi un bug, fai altrettanto.</p>
					<p>Altrimenti puoi fare una donazione, perché devi sapere che questo progetto è molto costoso, e non guadagno nulla, perciò una donazione è sempre gradita.</p>
					<p>Grazie per il tuo interesse :)</p>
				</div>
				<div id="faq1x0" class="hidden">
					<h2>Quanto spazio ho?</h2>
					<p>Hai uno spazio iniziale di {{initstorage}}mb.</p>
					<p>Se desideri altro spazio in modo gratuito trova un modo di far girare da qualche parte questo sito :)</p>
				</div>
				<div id="faq1x1" class="hidden">
					<h2>Come posso aumentare lo spazio a mia disposizione?</h2>
					<p>Se devi caricare più files, puoi fare una donazione di €{{euroblock}} via PayPal.</p>
					<p>Lo spazio a tua disposizione aumenterà {{morestorage}}mb.</p>
					<p>Più di questo non posso fare.</p>
				</div>
				<div id="faq1x2" class="hidden">
					<h2>Che differenza c'è tra un file privato e pubblico?</h2>
					<p>Se carichi un file con lo stato <em>privato</em>, sarà visibile/scaricabile solo da te.</p>
					<p>Se carichi un file con lo stato <em>pubblico</em>, potrai condividerlo con chi vuoi.</p>
					<p>Se metti il tuo profilo come <em>privato</em>, i tuoi files saranno <em>privati</em>, ma se tornerai a <em>pubblico</em>, torneranno come prima.</p>
					<p>Oh, un' ultima cosa: se condivi con altri i tuoi files, per ogni download o visita, il relativo contatore aumenterà.</p> 
				</div>
				<div id="faq1x3" class="hidden">
					<h2>I miei files sono sicuri qui?</h2>
					<p>Si, i tuoi files sono sicuri qui.</p>
					<p>Non (come tua informazione, saranno crittografati) verranno mai venduti a terzi.</p>
				</div>
				<div id="faq1x4" class="hidden">
					<h2>Dov'è situato il server?</h2>
					<p><s>Il server è il mio computer :)</s></p>
					<p><s>Vivo in provincia di Napoli, Italia.</s></p>
					<p><s>Il mio webserver è Apache, il mio DBMS è MySQL e uso Debian come SO, con il kernel GNU/Linux.</s></p>
					<p>Attualmente non posso ospitare questo sito nel mio computer, quindi lo ho hostato sul server del mio blog, su TopHost</p>
					<p>{{title}} è scritto in PHP5, con paradigmi OOP, come interfaccia XHTML 1.0, CSS3 e basato su Javascript (con jQuery come framework) .<br />Il motore dei template (che processa un solo file di template, lol) è fornito da Mustache.</s></p>
					<p>Ogni chiamata è fatta via AJAX alle API.</s></p>   
				</div>
				<div id="faq2x0" class="hidden">
					<h2>Non ho un browser che supporta JavaScript. Che faccio?</h2>
					<p>Per funzionare, il browser ha bisogno di JavaScript.</p>
					<p>Sa hai problemi a fornirlo, puoi usare la versione statica, presto disponibile.</p>
				</div>
				<div id="faq2x1" class="hidden">
					<h2>Ci sono delle API?</h2>
					<p>Si.</p>
					<p>Sono disponibili su &lt;{{url_index}}/api.php> e una documentazione è reperibile accedendo ad esse direttamente senza inviare alcun parametro.</p>
				</div>
				<div id="faq2x2" class="hidden">
					<h2>Per me qui mancano alcune domande...</h2>
					<p>Beh, contattami ora e grazie in anticipo :)</p>
				</div>
				<div id="faq2x3" class="hidden">
					<h2>Posso conquistare il mondo?.</h2>
					<p>Si, puoi. Fammi vedere che sai fare &lt;3</p>
				</div>
			</div>
		</div>
	</div>
	<div id="login" class="bouncebox">
		<p><b>Login</b></p>
		<p class="alert" id="login_alert">I dati del login sono errati. Riprova.</p>
		<input type="text" id="login_nickname" placeholder="nickname" value="" /><br />
		<input type="password" id="login_password" placeholder="password" value="" /><br />
		<button id="login_submit">Login</button><button class="cancel">Annulla</button>
	</div>
	<div id="register" class="bouncebox">
		<p><b>Registrazione</b></p>
		<p class="alert" id="reg_alert">I dati della registrazione sono errati. Riprova.</p>
		<input type="text" id="reg_nickname" placeholder="nickname" value="" /><br />
		<input type="password" id="reg_password" placeholder="password" value="" /><br />
		<input type="password" id="reg_repassword" placeholder="riscrivi password" value="" /><br />
		<input type="text" id="reg_email" placeholder="yourname@provider.ext" value="" /><br />
		<img src="api.php?request=captcha" alt="captcha" width="228" height="20" /><br />
		<input type="text" id="reg_captcha" placeholder="captcha" value="" maxlength="5" /><br />
		<button id="reg_submit">Registrazione</button><button class="cancel">Annulla</button>
	</div>
	<div id="editprofile" class="bouncebox">
		<p><b>Modifica il tuo profilo</b></p>
		<input type="text" id="edit_email" placeholder="yourname@provider.ext" /><br />
		<input type="text" id="edit_bio" placeholder="qualche parola su di te" /><br />
		<input type="text" id="edit_avatar" placeholder="avatar" /><br />
		<input type="password" id="edit_password" placeholder="password (lascia in bianco per non modificare)" /><br />
		<input type="password" id="edit_newpassword" placeholder="new password (lascia in bianco per non modificare)" /><br />
		<button id="edit_status">Caricamento...</button><br />
		<button id="edit_submit">Modifica</button><button class="cancel">Annulla</button>
	</div>
	<div id="sendpm" class="bouncebox">
		<p><b>Invia un MP</b></p>
		<select id="pm_to"><option value="">---Scegli il destinatario---</option></select><br />
		<input type="text" id="pm_subject" placeholder="oggetto"/><br />
		<textarea id="pm_msg" rows="10" cols="10" placeholder="messaggio"></textarea><br />
		<button id="pm_send">Invia</button><button class="cancel">Annulla</button>
	</div>
	<div id="mailvalidator" class="bouncebox"><p><b>Validatore account</b></p></div>
	<div id="bottominfo">{{#logged}}<a id="storagespace">Caricamento...</a>{{/logged}}<br />&copy; <a href="http://www.giovannicapuano.net" target="_blank">Giovanni Capuano</a> 2011 | <a id="gotostats">Statistiche</a></div>
	<script type="text/javascript" src="http://www.giovannicapuano.net/stats/php-stats.js.php"></script>
	<noscript><img src="http://www.giovannicapuano.net/stats/php-stats.php" border="0" alt=""></noscript>
</body>
</html>
