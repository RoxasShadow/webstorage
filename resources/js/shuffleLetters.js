(function(b){b.fn.shuffleLetters=function(d){var c=b.extend({step:8,fps:25,text:"",callback:function(){}},d);return this.each(function(){var j=b(this),k="";if(j.data("animated")){return true}j.data("animated",true);if(c.text){k=c.text.split("")}else{k=j.text().split("")}var f=[],l=[];for(var e=0;e<k.length;e++){var h=k[e];if(h==" "){f[e]="space";continue}else{if(/[a-z]/.test(h)){f[e]="lowerLetter"}else{if(/[A-Z]/.test(h)){f[e]="upperLetter"}else{f[e]="symbol"}}}l.push(e)}j.html("");(function g(p){var o,m=l.length,n=k.slice(0);if(p>m){j.data("animated",false);c.callback(j);return}for(o=Math.max(p,0);o<m;o++){if(o<p+c.step){n[l[o]]=a(f[l[o]])}else{n[l[o]]=""}}j.text(n.join(""));setTimeout(function(){g(p+1)},1000/c.fps)})(-c.step)})};function a(e){var d="";if(e=="lowerLetter"){d="abcdefghijklmnopqrstuvwxyz0123456789"}else{if(e=="upperLetter"){d="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"}else{if(e=="symbol"){d=",.?/\\(^)![]{}*&^%$#'\""}}}var c=d.split("");return c[Math.floor(Math.random()*c.length)]}})(jQuery);
