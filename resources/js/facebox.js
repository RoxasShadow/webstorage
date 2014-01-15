(function(f){f.facebox=function(n,m){f.facebox.loading();if(n.ajax){g(n.ajax,m)}else{if(n.iframe){j(n.iframe,m,n.rev)}else{if(n.image){c(n.image,m)}else{if(n.div){j(n.div,m)}else{if(f.isFunction(n)){n.call(f)}else{f.facebox.reveal(n,m)}}}}}};f.extend(f.facebox,{settings:{opacity:0.2,overlay:true,loadingImage:"resources/img/loader.gif",closeImage:"resources/img/closelabel.png",imageTypes:["png","jpg","jpeg","gif"],faceboxHtml:'    <div id="facebox" style="display:none;">       <div class="popup">         <div class="content">         </div>         <a href="#" class="close"></a>       </div>     </div>'},loading:function(){l();if(f("#facebox .loading").length==1){return true}e();f("#facebox .content").empty().append('<div class="loading"><img src="'+f.facebox.settings.loadingImage+'" width="24" height="24" alt="Loading" title="Loading" /></div>');f("#facebox").show().css({top:h()[1]+(i()/10),left:f(window).width()/2-(f("#facebox .popup").outerWidth()/2)});f(document).bind("keydown.facebox",function(m){if(m.keyCode==27){f.facebox.close()}return true});f(document).trigger("loading.facebox")},reveal:function(n,m){f(document).trigger("beforeReveal.facebox");if(m){f("#facebox .content").addClass(m)}f("#facebox .content").empty().append(n);f("#facebox .popup").children().fadeIn("normal");f("#facebox").css("left",f(window).width()/2-(f("#facebox .popup").outerWidth()/2));f(document).trigger("reveal.facebox").trigger("afterReveal.facebox")},close:function(){f(document).trigger("close.facebox");return false}});f.fn.facebox=function(m){if(f(this).length==0){return}l(m);function n(){f.facebox.loading(true);var o=this.rel.match(/facebox\[?\.(\w+)\]?/);if(o){o=o[1]}j(this.href,o,this.rev);return false}return this.bind("click.facebox",n)};function l(o){if(f.facebox.settings.inited){return true}else{f.facebox.settings.inited=true}f(document).trigger("init.facebox");d();var m=f.facebox.settings.imageTypes.join("|");f.facebox.settings.imageTypesRegexp=new RegExp("\\.("+m+")(\\?.*)?$","i");if(o){f.extend(f.facebox.settings,o)}f("body").append(f.facebox.settings.faceboxHtml);var n=[new Image(),new Image()];n[0].src=f.facebox.settings.closeImage;n[1].src=f.facebox.settings.loadingImage;f("#facebox").find(".b:first, .bl").each(function(){n.push(new Image());n.slice(-1).src=f(this).css("background-image").replace(/url\((.+)\)/,"$1")});f("#facebox .close").click(f.facebox.close).append('<img src="'+f.facebox.settings.closeImage+'" class="close_image" title="Close" width="8" height="8" alt="Close" />')}function h(){var n,m;if(self.pageYOffset){m=self.pageYOffset;n=self.pageXOffset}else{if(document.documentElement&&document.documentElement.scrollTop){m=document.documentElement.scrollTop;n=document.documentElement.scrollLeft}else{if(document.body){m=document.body.scrollTop;n=document.body.scrollLeft}}}return new Array(n,m)}function i(){var m;if(self.innerHeight){m=self.innerHeight}else{if(document.documentElement&&document.documentElement.clientHeight){m=document.documentElement.clientHeight}else{if(document.body){m=document.body.clientHeight}}}return m}function d(){var m=f.facebox.settings;m.loadingImage=m.loading_image||m.loadingImage;m.closeImage=m.close_image||m.closeImage;m.imageTypes=m.image_types||m.imageTypes;m.faceboxHtml=m.facebox_html||m.faceboxHtml}function k(o,n,m){f.facebox.reveal('<iframe scrolling="no" marginwidth="0" width="500" height="'+m+'" frameborder="0" src="'+o+'" marginheight="0"></iframe>',n)}function j(o,m,n){if(o.match(/#/)){var p=window.location.href.split("#")[0];var q=o.replace(p,"");f.facebox.reveal(f(q).clone().show(),m)}else{if(o.match(f.facebox.settings.imageTypesRegexp)){c(o,m)}else{if(n.split("|")[0]=="iframe"){k(o,m,n.split("|")[1])}else{g(o,m)}}}}function c(n,m){var o=new Image();o.onload=function(){f.facebox.reveal('<div class="image"><img src="'+o.src+'" /></div>',m)};o.src=n}function g(n,m){f.get(n,function(o){f.facebox.reveal(o,m)})}function b(){return f.facebox.settings.overlay==false||f.facebox.settings.opacity===null}function e(){if(b()){return}if(f("#facebox_overlay").length==0){f("body").append('<div id="facebox_overlay" class="facebox_hide"></div>')}f("#facebox_overlay").hide().addClass("facebox_overlayBG").css("opacity",f.facebox.settings.opacity).click(function(){f(document).trigger("close.facebox")}).fadeIn(200);return false}function a(){if(b()){return}f("#facebox_overlay").fadeOut(200,function(){f("#facebox_overlay").removeClass("facebox_overlayBG");f("#facebox_overlay").addClass("facebox_hide");f("#facebox_overlay").remove()});return false}f(document).bind("close.facebox",function(){f(document).unbind("keydown.facebox");f("#facebox").fadeOut(function(){f("#facebox .content").removeClass().addClass("content");f("#facebox .loading").remove();f(document).trigger("afterClose.facebox")});a()})})(jQuery);