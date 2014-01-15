function Language(lang) {
	en = function() {
		language = new Array();
		language['denied'] = 'Access denied.';
		language['badrequest'] = 'Bad request.';
		language['invalidpassword'] = 'Invalid password.';
		language['error'] = 'An error has occurred.';
		language['title'] = {'yourrepository':'Your repository', 'otherrepository':'{$nickname}\'s repository'}; 
		language['changestatus'] = 'The file you are trying to edit doest not exists.';
		language['uploadstatus'] = {'private':'Your file will be to uploaded as private.', 'public':'Your file will be to uploaded as public.'};
		language['deletefile'] = {'error':'An error has occurred: the file `{$file}` has not been deleted.', 'success':'The file `{$file}` has been successfully deleted.', 'notfound':'The file you are trying to delete does not exists.'};
		language['downloadfile'] = {'notfound':'The file you are trying to download doest not exists.', 'success':'Download started.'};
		language['editprofile'] = {'success':'Your profile has been edited.', 'error':'An error has occurred during the profile modification.'};
		language['following'] = {'following':'You are following the follow users:', 'date':'from'};
		language['stats'] = {'users':'Online users: ', 'visitators':'Online visitators: ', 'total':'Total: ', 'used':'Used: ', 'available':'Available: ', 'languages':'Languages available: ', 'languageslist':'Italian & English'};
		language['login'] = {'alreadylogged':'You are already logged.', 'success':'Logged in. Please wait...'};
		language['logout'] = {'notlogged':'You are not logged.', 'success':'Logged out. Wait a moment...'};
		language['mailvalidator'] = {'havelogout':'You have to do the logout to valid your account.', 'notneed':'You don\'t need to valid your account. Be happy!', 'invalid':'Invalid code.', 'success':'Your account has been validated. You can sign in just now!', 'error':'An error has occurred during the account validation.'};
		language['pm'] = {'choose':'---Choose a pm---', 'notfound':'PM not found.', 'subject':'Subject: ', 'from':'From: ', 'date':'Sent on: ', 'hour':' at ', 'success':'PM sent.', 'error':'An error has occurred during the pm sending.', 'denied':'Access denied for PMs.', 'unreaded':'You have {$count} PMs unreaded.'};
		language['user'] = {'choose':'---Choose a user---', 'notfound':'User not found.', 'follow':'Follow ', 'stoptofollow':'Stop to follow {$nickname}?', 'alreadyfollow':'You already follow {$nickname}.', 'notfollow':'You does not follow {$nickname}.', 'followyouself':'You cannot follow yourself.', 'notfollowyouself':'You does not no-follow youself.', 'errorfollow':'An error has occurred during the follow request.', 'errornofollow':'An error has occurred during the no-follow request.', 'browser':'Surfing with ', 'os':'runned on ', 'since':'Registrated since: ', 'repository':'Public repository'};
		language['registration'] = {'captcha':'The captcha is not valid.', 'alreadyregistrated':'You are already registrated.', 'short':'Nickname or password are too short (> 4).', 'passwordnotequals':'The password are not equals.', 'disabled':'Registration disabled.', 'successwithconfirm':'Registrated, wait your validation mail.', 'successnoconfirm':'Registrated.'};
		language['share'] = {'notfound':'The file you are trying to share does not exist.', 'private':'The file is private. You cannot share a file with this status.', 'view':'View', 'download':'Download'};
		language['repository'] = {'nofile':'No file currently present.', 'files':'Files', 'download':'Download', 'delete':'Delete', 'share':'Share', 'datetime':'DateTime', 'public':'Set repository as public', 'private':'Set repository as private'};			
		language['view'] = 'The file you are trying to view does not exist.';
		language['upload'] = {'success':'The file `{$file}` has been successfully uploaded as {$status}.', 'duplicate':'Duplicate file.', 'finished':'Your storage space is finished.', 'wait':'Uploading `{$file}`...'};
		language['donate'] = 'As you have already read in the FAQ, this project is very expansive, and I profit nothing.<br />Please, you can help me making a donation for me or in order to expand you storage space.<br />For the first reasong, you can donate to me any amount you want, while for the second, the donation amount at €5 obtaining a block of 500mb.<br />After the payment, send me an email (you can obtain it from the FAQ).<br />All you see (and don\'t), by the graphic at the code, <s>by the server at the hardware upgrade/maintenance</s> is handled by me alone, and each donation can help me to keep alive the project.<br />Thank you very much in any case, really.';
		language['live'] = {'notfound':'Nothing update.', 'live':'{$date} {$hour} - {$nickname} has uploaded `{$file}`.'};
		language['welcomeback'] = '<!--Hi my dear, welcome back in Webstorage :)-->';
		return language;
	}
	it = function() {
		language = new Array();
		language['denied'] = 'Accesso negato.';
		language['badrequest'] = 'Richiesta invalida.';
		language['invalidpassword'] = 'Password invalida.';
		language['error'] = 'È accaduto un errore';
		language['title'] = {'yourrepository':'Il tuo repository', 'otherrepository':'Il repository di {$nickname}'}; 
		language['changestatus'] = 'Il file che stai cercando di modificare non esiste.';
		language['uploadstatus'] = {'private':'I tuoi file saranno caricati come privati.', 'public':'I tuoi file saranno caricati come pubblici.'};
		language['deletefile'] = {'error':'È accaduto un errore: il file `{$file}` non è stato cancellato.', 'success':'Il file `{$file}` è stato cancellato con successo.', 'notfound':'Il file che stai cercando di cancellare non esiste.'};
		language['downloadfile'] = {'notfound':'Il file che stai cercando di scaricare non esiste.', 'success':'Download iniziato.'};
		language['editprofile'] = {'success':'Il tuo profilo è stato modificato.', 'error':'È accaduto un errore durante la modifica del tuo profilo.'};
		language['following'] = {'following':'Stai seguendo i seguenti utenti:', 'date':'da'};
		language['stats'] = {'users':'Utenti online: ', 'visitators':'Visitatori online: ', 'total':'Totale: ', 'used':'Usato: ', 'available':'Disponibile: ', 'languages':'Lingue disponibili: ', 'languageslist':'Italiano & Inglese'};
		language['login'] = {'alreadylogged':'Hai già effettuato l\'accesso.', 'success':'Login completato. Attendi...'};
		language['logout'] = {'notlogged':'Non hai già effettuato l\'accesso.', 'success':'Logout completato. Attendi...'};
		language['mailvalidator'] = {'havelogout':'Devi effettuare il logout per poter validare il tuo account.', 'notneed':'Non hai bisogno di validare il tuo account. Be happy!', 'invalid':'Codice invalido.', 'success':'Il tuo account è stato validato. Puoi accederci già da ora!', 'error':'È accaduto un errore durante la validazione dell\'account.'};
		language['pm'] = {'choose':'---Scegli un MP---', 'notfound':'MP non trovato.', 'subject':'Oggetto: ', 'from':'Data: ', 'date':'Inviato il: ', 'hour':' alle ', 'success':'MP inviato.', 'error':'È accaduto un errore durante l\'invio dell\'MP.', 'denied':'Accesso negato per gli MP.', 'unreaded':'Hai {$count} MP non letti.'};
		language['user'] = {'choose':'---Scegli un utente---', 'notfound':'Utente non trovato.', 'follow':'Segui ', 'stoptofollow':'Smetti di seguire {$nickname}', 'alreadyfollow':'Già segui {$nickname}.', 'notfollow':'Non segui {$nickname}.', 'followyouself':'Non puoi seguire te stesso.', 'notfollowyouself':'Non puoi smettere di seguire te stesso.', 'errorfollow':'È accaduto un errore durante la richiesta di follow.', 'errornofollow':'È accaduto un errore durante la richiesta di no-follow.', 'browser':'Navigando con ', 'os':'avviato su ', 'since':'Registrato dal: ', 'repository':'Repository pubblico'};
		language['registration'] = {'captcha':'Il captcha non è valido.', 'alreadyregistrated':'Sei già registrato.', 'short':'Il nickname o la password sono troppo corti (> 4).', 'passwordnotequals':'Le password non corrispondono.', 'disabled':'Registrazione disabilitata.', 'successwithconfirm':'Registrato, attendi la mail di validazione.', 'successnoconfirm':'Registrato.'};
		language['share'] = {'notfound':'Il file che stai cercando di condividere non esiste.', 'private':'Il file è privato. Non puoi condividere un file con questo status.', 'view':'Visualizza', 'download':'Scarica'};
		language['repository'] = {'nofile':'Nessun file attualmente presente.', 'files':'Files', 'download':'Scarica', 'delete':'Cancella', 'share':'Condividi', 'datetime':'Data', 'public':'Rendi il repository pubblico', 'private':'Rendi il repository privato'};			
		language['view'] = 'Il file che stai cercando di visualizzare non esiste.';
		language['upload'] = {'success':'Il file `{$file}` è stato con successo come {$status}.', 'duplicate':'File duplicato.', 'finished':'Il tuo spazio di storage è finito.', 'wait':'Caricando `{$file}`...'};
		language['donate'] = 'Come hai già letto nelle FAQ, questo progetto è molto costoso, e non ci guadagno nulla.<br />Per piacere, tu puoi aiutarmi facendo una donazione per me oppure per espandere il tuo spazio di storage.<br />Per il primo motivo, puoi donarmi qualsiasi cifra tu voglia, mentre per il secondo, la donazione ammonta a €5 per ottenere un blocco di 500mb.<br />Dopo il pagamento, inviami una email (puoi ottenerla dalle FAQ).<br />Tutto ciò che vedi qui (e non), dalla grafica al codice, <s>dal server all\'aggiornamento e mantenimento hardware</s> è gestito solo da me, e ogni donazione mi può aiutarmi a tenere vivo questo progetto.<br />Grazie molte in ogni caso, davvero.';
		language['live'] = {'notfound':'Nessun aggiornamento.', 'live':'{$date} {$hour} - {$nickname} ha caricato `{$file}`.'};
		language['welcomeback'] = '<!--Hi my dear, welcome back in Webstorage :)-->';
		return language;
	}
	return navigator.language == 'it' ? it() : en();
}
