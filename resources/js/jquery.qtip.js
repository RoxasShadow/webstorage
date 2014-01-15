(function(aj,ai,ah){function M(a){var j=this,i=a.elements,h=i.tooltip,g=".bgiframe-"+a.id;aj.extend(j,{init:function(){i.bgiframe=aj('<iframe class="ui-tooltip-bgiframe" frameborder="0" tabindex="-1" src="javascript:\'\';"  style="display:block; position:absolute; z-index:-1; filter:alpha(opacity=0); -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";"></iframe>'),i.bgiframe.appendTo(h),h.bind("tooltipmove"+g,j.adjust)},adjust:function(){var b=a.get("dimensions"),l=a.plugins.tip,k=i.tip,e,d;d=parseInt(h.css("border-left-width"),10)||0,d={left:-d,top:-d},l&&k&&(e=l.corner.precedance==="x"?["width","left"]:["height","top"],d[e[1]]-=k[e[0]]()),i.bgiframe.css(d).css(b)},destroy:function(){i.bgiframe.remove(),h.unbind(g)}}),j.init()}function O(v){var u=this,t=v.options.show.modal,s=v.elements,p=s.tooltip,n="#qtip-overlay",h=".qtipmodal",e=h+v.id,d="is-modal-qtip",b=aj(document.body),a;v.checks.modal={"^show.modal.(on|blur)$":function(){u.init(),s.overlay.toggle(p.is(":visible"))}},aj.extend(u,{init:function(){if(!t.on){return u}a=u.create(),p.attr(d,ag).css("z-index",ac.modal.zindex+aj(W+"["+d+"]").length).unbind(h).unbind(e).bind("tooltipshow"+h+" tooltiphide"+h,function(f,j,i){var g=f.originalEvent;g&&f.type==="tooltiphide"&&/mouse(leave|enter)/.test(g.type)&&aj(g.relatedTarget).closest(a[0]).length?f.preventDefault():u[f.type.replace("tooltip","")](f,i)}).bind("tooltipfocus"+h,function(g){if(!g.isDefaultPrevented()){var l=aj(W).filter("["+d+"]"),k=ac.modal.zindex+l.length,j=parseInt(p[0].style.zIndex,10);a[0].style.zIndex=k,l.each(function(){this.style.zIndex>j&&(this.style.zIndex-=1)}),l.end().filter("."+T).qtip("blur",g.originalEvent),p.addClass(T)[0].style.zIndex=k;try{g.preventDefault()}catch(i){}}}).bind("tooltiphide"+h,function(c){aj("["+d+"]").filter(":visible").not(p).last().qtip("focus",c)}),t.escape&&aj(ai).unbind(e).bind("keydown"+e,function(c){c.keyCode===27&&p.hasClass(T)&&v.hide(c)}),t.blur&&s.overlay.unbind(e).bind("click"+e,function(c){p.hasClass(T)&&v.hide(c)});return u},create:function(){var f=aj(n);if(f.length){return s.overlay=f}a=s.overlay=aj("<div />",{id:n.substr(1),html:"<div></div>",mousedown:function(){return af}}).insertBefore(aj(W).first()),aj(ai).unbind(h).bind("resize"+h,function(){a.css({height:aj(ai).height(),width:aj(ai).width()})}).triggerHandler("resize");return a},toggle:function(f,w,q){if(f&&f.isDefaultPrevented()){return u}var m=t.effect,j=w?"show":"hide",g=a.is(":visible"),r=aj("["+d+"]").filter(":visible").not(p),o;a||(a=u.create());if(a.is(":animated")&&g===w||!w&&r.length){return u}w?(a.css({left:0,top:0}),a.toggleClass("blurs",t.blur),b.delegate("*","focusin"+e,function(c){aj(c.target).closest(W)[0]!==p[0]&&aj("a, :input, img",p).add(p).focus()})):b.undelegate("*","focusin"+e),a.stop(ag,af),aj.isFunction(m)?m.call(a,w):m===af?a[j]():a.fadeTo(parseInt(q,10)||90,w?1:0,function(){w||aj(this).hide()}),w||a.queue(function(c){a.css({left:"",top:""}),c()});return u},show:function(f,c){return u.toggle(f,ag,c)},hide:function(f,c){return u.toggle(f,af,c)},destroy:function(){var c=a;c&&(c=aj("["+d+"]").not(p).length<1,c?(s.overlay.remove(),aj(ai).unbind(h)):s.overlay.unbind(h+v.id),b.undelegate("*","focusin"+e));return p.removeAttr(d).unbind(h)}}),u.init()}function Q(A,z){function B(ao){var an=ao.precedance==="y",am=e[an?"width":"height"],al=e[an?"height":"width"],w=ao.string().indexOf("center")>-1,v=am*(w?0.5:1),u=Math.pow,t=Math.round,s,q,p,o=Math.sqrt(u(v,2)+u(al,2)),n=[c/v*o,c/al*o];n[2]=Math.sqrt(u(n[0],2)-u(c,2)),n[3]=Math.sqrt(u(n[1],2)-u(c,2)),s=o+n[2]+n[3]+(w?0:n[0]),q=s/o,p=[t(q*al),t(q*am)];return{height:p[an?0:1],width:p[an?1:0]}}function C(i){var o=r.titlebar&&i.y==="top",n=o?r.titlebar:r.content,m=aj.browser.mozilla,l=m?"-moz-":aj.browser.webkit?"-webkit-":"",k=i.y+(m?"":"-")+i.x,j=l+(m?"border-radius-"+k:"border-"+k+"-radius");return parseInt(n.css(j),10)||parseInt(h.css(j),10)||0}function D(j,i,p){i=i?i:j[j.precedance];var o=h.hasClass(P),n=r.titlebar&&j.y==="top",m=n?r.titlebar:r.content,l="border-"+i+"-width",k;h.addClass(P),k=parseInt(m.css(l),10),k=(p?k||parseInt(h.css(l),10):k)||0,h.toggleClass(P,o);return k}function E(an,am,al,w){if(r.tip){var m=aj.extend({},y.corner),k=al.adjusted,j=A.options.position.adjust.method.split(" "),i=j[0],b=j[1]||j[0],ar={left:af,top:af,x:0,y:0},aq,ap={},ao;y.corner.fixed!==ag&&(i==="shift"&&m.precedance==="x"&&k.left&&m.y!=="center"?m.precedance=m.precedance==="x"?"y":"x":i==="flip"&&k.left&&(m.x=m.x==="center"?k.left>0?"left":"right":m.x==="left"?"right":"left"),b==="shift"&&m.precedance==="y"&&k.top&&m.x!=="center"?m.precedance=m.precedance==="y"?"x":"y":b==="flip"&&k.top&&(m.y=m.y==="center"?k.top>0?"top":"bottom":m.y==="top"?"bottom":"top"),m.string()!==f.corner&&(f.top!==k.top||f.left!==k.left)&&y.update(m,af)),aq=y.position(m,k),aq.right!==ah&&(aq.left=-aq.right),aq.bottom!==ah&&(aq.top=-aq.bottom),aq.user=Math.max(0,x.offset);if(ar.left=i==="shift"&&!!k.left){m.x==="center"?ap["margin-left"]=ar.x=aq["margin-left"]-k.left:(ao=aq.right!==ah?[k.left,-aq.left]:[-k.left,aq.left],(ar.x=Math.max(ao[0],ao[1]))>ao[0]&&(al.left-=k.left,ar.left=af),ap[aq.right!==ah?"right":"left"]=ar.x)}if(ar.top=b==="shift"&&!!k.top){m.y==="center"?ap["margin-top"]=ar.y=aq["margin-top"]-k.top:(ao=aq.bottom!==ah?[k.top,-aq.top]:[-k.top,aq.top],(ar.y=Math.max(ao[0],ao[1]))>ao[0]&&(al.top-=k.top,ar.top=af),ap[aq.bottom!==ah?"bottom":"top"]=ar.y)}r.tip.css(ap).toggle(!(ar.x&&ar.y||m.x==="center"&&ar.y||m.y==="center"&&ar.x)),al.left-=aq.left.charAt?aq.user:i!=="shift"||ar.top||!ar.left&&!ar.top?aq.left:0,al.top-=aq.top.charAt?aq.user:b!=="shift"||ar.left||!ar.left&&!ar.top?aq.top:0,f.left=k.left,f.top=k.top,f.corner=m.string()}}var y=this,x=A.options.style.tip,r=A.elements,h=r.tooltip,f={top:0,left:0,corner:""},e={width:x.width,height:x.height},d={},c=x.border||0,a=".qtip-tip",ak=!!(aj("<canvas />")[0]||{}).getContext;y.mimic=y.corner=ae,y.border=c,y.offset=x.offset,y.size=e,A.checks.tip={"^position.my|style.tip.(corner|mimic|border)$":function(){y.init()||y.destroy(),A.reposition()},"^style.tip.(height|width)$":function(){e={width:x.width,height:x.height},y.create(),y.update(),A.reposition()},"^content.title.text|style.(classes|widget)$":function(){r.tip&&y.update()}},aj.extend(y,{init:function(){var g=y.detectCorner()&&(ak||aj.browser.msie);g&&(y.create(),y.update(),h.unbind(a).bind("tooltipmove"+a,E));return g},detectCorner:function(){var b=x.corner,k=A.options.position,j=k.at,i=k.my.string?k.my.string():k.my;if(b===af||i===af&&j===af){return af}b===ag?y.corner=new ac.Corner(i):b.string||(y.corner=new ac.Corner(b),y.corner.fixed=ag);return y.corner.string()!=="centercenter"},detectColours:function(){var am,al,o,n=r.tip.css({backgroundColor:"",border:""}),l=y.corner,k=l[l.precedance],j="border-"+k+"-color",i="border"+k.charAt(0)+k.substr(1)+"Color",b=/rgba?\(0, 0, 0(, 0)?\)|transparent/i,at="background-color",ar="transparent",aq=aj(document.body).css("color"),ap=A.elements.content.css("color"),ao=r.titlebar&&(l.y==="top"||l.y==="center"&&n.position().top+e.height/2+x.offset<r.titlebar.outerHeight(1)),an=ao?r.titlebar:r.content;h.addClass(P),d.fill=al=n.css(at),d.border=o=n[0].style[i]||n.css(j)||h.css(j);if(!al||b.test(al)){d.fill=an.css(at)||ar,b.test(d.fill)&&(d.fill=h.css(at)||al)}if(!o||b.test(o)||o===aq){d.border=an.css(j)||ar;if(b.test(d.border)||d.border===ap){d.border=o}}aj("*",n).add(n).css(at,ar).css("border",""),h.removeClass(P)},create:function(){var g=e.width,j=e.height,i;r.tip&&r.tip.remove(),r.tip=aj("<div />",{"class":"ui-tooltip-tip"}).css({width:g,height:j}).prependTo(h),ak?aj("<canvas />").appendTo(r.tip)[0].getContext("2d").save():(i='<vml:shape coordorigin="0,0" style="display:inline-block; position:absolute; behavior:url(#default#VML);"></vml:shape>',r.tip.html(i+i))},update:function(an,al){var u=r.tip,s=u.children(),p=e.width,n=e.height,j="px solid ",aq="px dashed transparent",ap=x.mimic,ao=Math.round,am,w,o,k,i;an||(an=y.corner),ap===af?ap=an:(ap=new ac.Corner(ap),ap.precedance=an.precedance,ap.x==="inherit"?ap.x=an.x:ap.y==="inherit"?ap.y=an.y:ap.x===ap.y&&(ap[an.precedance]=an[an.precedance])),am=ap.precedance,y.detectColours(),d.border!=="transparent"&&d.border!=="#123456"?(c=D(an,ae,ag),x.border===0&&c>0&&(d.fill=d.border),y.border=c=x.border!==ag?x.border:c):y.border=c=0,o=S(ap,p,n),y.size=i=B(an),u.css(i),an.precedance==="y"?k=[ao(ap.x==="left"?c:ap.x==="right"?i.width-p-c:(i.width-p)/2),ao(ap.y==="top"?i.height-n:0)]:k=[ao(ap.x==="left"?i.width-p:0),ao(ap.y==="top"?c:ap.y==="bottom"?i.height-n-c:(i.height-n)/2)],ak?(s.attr(i),w=s[0].getContext("2d"),w.restore(),w.save(),w.clearRect(0,0,3000,3000),w.translate(k[0],k[1]),w.beginPath(),w.moveTo(o[0][0],o[0][1]),w.lineTo(o[1][0],o[1][1]),w.lineTo(o[2][0],o[2][1]),w.closePath(),w.fillStyle=d.fill,w.strokeStyle=d.border,w.lineWidth=c*2,w.lineJoin="miter",w.miterLimit=100,c&&w.stroke(),w.fill()):(o="m"+o[0][0]+","+o[0][1]+" l"+o[1][0]+","+o[1][1]+" "+o[2][0]+","+o[2][1]+" xe",k[2]=c&&/^(r|b)/i.test(an.string())?parseFloat(aj.browser.version,10)===8?2:1:0,s.css({antialias:""+(ap.string().indexOf("center")>-1),left:k[0]-k[2]*Number(am==="x"),top:k[1]-k[2]*Number(am==="y"),width:p+c,height:n+c}).each(function(g){var l=aj(this);l[l.prop?"prop":"attr"]({coordsize:p+c+" "+(n+c),path:o,fillcolor:d.fill,filled:!!g,stroked:!g}).css({display:c||g?"block":"none"}),!g&&l.html()===""&&l.html('<vml:stroke weight="'+c*2+'px" color="'+d.border+'" miterlimit="1000" joinstyle="miter"  style="behavior:url(#default#VML); display:inline-block;" />')})),al!==af&&y.position(an)},position:function(j){var q=r.tip,p={},o=Math.max(0,x.offset),n,k,i;if(x.corner===af||!q){return af}j=j||y.corner,n=j.precedance,k=B(j),i=[j.x,j.y],n==="x"&&i.reverse(),aj.each(i,function(b,m){var l,g;m==="center"?(l=n==="y"?"left":"top",p[l]="50%",p["margin-"+l]=-Math.round(k[n==="y"?"width":"height"]/2)+o):(l=D(j,m,ag),g=C(j),p[m]=b?c?D(j,m):0:o+(g>l?g:0))}),p[j[n]]-=k[n==="x"?"width":"height"],q.css({top:"",bottom:"",left:"",right:"",margin:""}).css(p);return p},destroy:function(){r.tip&&r.tip.remove(),h.unbind(a)}}),y.init()}function S(h,g,l){var k=Math.ceil(g/2),j=Math.ceil(l/2),i={bottomright:[[0,0],[g,l],[g,0]],bottomleft:[[0,0],[g,0],[0,l]],topright:[[0,l],[g,0],[g,l]],topleft:[[0,0],[0,l],[g,l]],topcenter:[[0,l],[k,0],[g,l]],bottomcenter:[[0,0],[g,0],[k,l]],rightcenter:[[0,0],[g,j],[0,l]],leftcenter:[[g,0],[g,l],[0,j]]};i.lefttop=i.bottomright,i.righttop=i.bottomleft,i.leftbottom=i.topright,i.rightbottom=i.topleft;return i[h.string()]}function U(a){var n=this,m=a.elements.tooltip,l=a.options.content.ajax,k=".qtip-ajax",e=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,d=ag;a.checks.ajax={"^content.ajax":function(f,c,g){c==="ajax"&&(l=g),c==="once"?n.init():l&&l.url?n.load():m.unbind(k)}},aj.extend(n,{init:function(){l&&l.url&&m.unbind(k)[l.once?"one":"bind"]("tooltipshow"+k,n.load);return n},load:function(t,s){function b(h,o,j){a.set("content.text",o+": "+j)}function c(h){i&&(h=aj("<div/>").append(h.replace(e,"")).find(i)),a.set("content.text",h)}function f(){g&&(m.css("visibility",""),s=af),aj.isFunction(l.complete)&&l.complete.apply(this,arguments)}if(t&&t.isDefaultPrevented()){return n}var r=l.url.indexOf(" "),q=l.url,i,g=l.once&&!l.loading&&s;g&&m.css("visibility","hidden"),r>-1&&(i=q.substr(r),q=q.substr(0,r)),aj.ajax(aj.extend({success:c,error:b,context:a},l,{url:q,complete:f}));return n}}),n.init()}function F(z,y){var x,w,v,u,h,g=aj(this),f=aj(document.body),e=this===document?f:g,d=g.metadata?g.metadata(y.metadata):ae,a=y.metadata.type==="html5"&&d?d[y.metadata.name]:ae,B=g.data(y.metadata.name||"qtipopts");try{B=typeof B==="string"?(new Function("return "+B))():B}catch(A){I("Unable to parse HTML5 attribute data: "+B)}u=aj.extend(ag,{},ad.defaults,y,typeof B==="object"?H(B):ae,H(a||d)),w=u.position,u.id=z;if("boolean"===typeof u.content.text){v=g.attr(u.content.attr);if(u.content.attr!==af&&v){u.content.text=v}else{I("Unable to locate content for tooltip! Aborting render of tooltip on element: ",g);return af}}w.container===af&&(w.container=f),w.target===af&&(w.target=e),u.show.target===af&&(u.show.target=e),u.show.solo===ag&&(u.show.solo=f),u.hide.target===af&&(u.hide.target=e),u.position.viewport===ag&&(u.position.viewport=w.container),w.at=new ac.Corner(w.at),w.my=new ac.Corner(w.my);if(aj.data(this,"qtip")){if(u.overwrite){g.qtip("destroy")}else{if(u.overwrite===af){return af}}}u.suppress&&(h=aj.attr(this,"title"))&&aj(this).removeAttr("title").attr(K,h),x=new G(g,u,z,!!v),aj.data(this,"qtip",x),g.bind("remove.qtip",function(){x.destroy()});return x}function G(v,r,n,k){function a(){var s=[r.show.target[0],r.hide.target[0],i.rendered&&o.tooltip[0],r.position.container[0],r.position.viewport[0],ai,document];i.rendered?aj([]).pushStack(aj.grep(s,function(t){return typeof t==="object"})).unbind(p):r.show.target.unbind(p+"-create")}function b(){function A(D){q.is(":visible")&&i.reposition(D)}function B(D){if(q.hasClass(X)){return af}clearTimeout(i.timers.inactive),i.timers.inactive=setTimeout(function(){i.hide(D)},r.hide.inactive)}function s(D){if(q.hasClass(X)||x||u){return af}var an=aj(D.relatedTarget||D.target),am=an.closest(W)[0]===q[0],E=an[0]===z.show[0];clearTimeout(i.timers.show),clearTimeout(i.timers.hide);C.target==="mouse"&&am||r.hide.fixed&&(/mouse(out|leave|move)/.test(D.type)&&(am||E))?(D.preventDefault(),D.stopImmediatePropagation()):r.hide.delay>0?i.timers.hide=setTimeout(function(){i.hide(D)},r.hide.delay):i.hide(D)}function t(E){if(q.hasClass(X)){return af}z.show.trigger("qtip-"+n+"-inactive"),clearTimeout(i.timers.show),clearTimeout(i.timers.hide);var D=function(){i.toggle(ag,E)};r.show.delay>0?i.timers.show=setTimeout(D,r.show.delay):D()}var C=r.position,z={show:r.show.target,hide:r.hide.target,viewport:aj(C.viewport),document:aj(document),window:aj(ai)},y={show:aj.trim(""+r.show.event).split(" "),hide:aj.trim(""+r.hide.event).split(" ")},w=aj.browser.msie&&parseInt(aj.browser.version,10)===6;q.bind("mouseenter"+p+" mouseleave"+p,function(E){var D=E.type==="mouseenter";D&&i.focus(E),q.toggleClass(R,D)}),r.hide.fixed&&(z.hide=z.hide.add(q),q.bind("mouseover"+p,function(){q.hasClass(X)||clearTimeout(i.timers.hide)})),/mouse(out|leave)/i.test(r.hide.event)?r.hide.leave==="window"&&z.window.bind("mouseout"+p,function(D){/select|option/.test(D.target)&&!D.relatedTarget&&i.hide(D)}):/mouse(over|enter)/i.test(r.show.event)&&z.hide.bind("mouseleave"+p,function(D){clearTimeout(i.timers.show)}),(""+r.hide.event).indexOf("unfocus")>-1&&z.document.bind("mousedown"+p,function(D){var am=aj(D.target),E=!q.hasClass(X)&&q.is(":visible");am[0]!==q[0]&&am.parents(W).length===0&&am.add(v).length>1&&i.hide(D)}),"number"===typeof r.hide.inactive&&(z.show.bind("qtip-"+n+"-inactive",B),aj.each(ad.inactiveEvents,function(E,D){z.hide.add(o.tooltip).bind(D+p+"-inactive",B)})),aj.each(y.hide,function(D,an){var am=aj.inArray(an,y.show),E=aj(z.hide);am>-1&&E.add(z.show).length===E.length||an==="unfocus"?(z.show.bind(an+p,function(ao){q.is(":visible")?s(ao):t(ao)}),delete y.show[am]):z.hide.bind(an+p,s)}),aj.each(y.show,function(E,D){z.show.bind(D+p,t)}),"number"===typeof r.hide.distance&&z.show.add(q).bind("mousemove"+p,function(E){var D=m.origin||{},an=r.hide.distance,am=Math.abs;(am(E.pageX-D.pageX)>=an||am(E.pageY-D.pageY)>=an)&&i.hide(E)}),C.target==="mouse"&&(z.show.bind("mousemove"+p,function(D){ab={pageX:D.pageX,pageY:D.pageY,type:"mousemove"}}),C.adjust.mouse&&(r.hide.event&&q.bind("mouseleave"+p,function(D){(D.relatedTarget||D.target)!==z.show[0]&&i.hide(D)}),z.document.bind("mousemove"+p,function(D){!q.hasClass(X)&&q.is(":visible")&&i.reposition(D||ab)}))),(C.adjust.resize||z.viewport.length)&&(aj.event.special.resize?z.viewport:z.window).bind("resize"+p,A),(z.viewport.length||w&&q.css("position")==="fixed")&&z.viewport.bind("scroll"+p,A)}function c(s,y){function t(z){function A(D){D&&(delete B[D.src],clearTimeout(i.timers.img[D.src]),aj(D).unbind(p)),aj.isEmptyObject(B)&&(i.redraw(),y!==af&&i.reposition(m.event),z())}var C,B={};if((C=w.find("img:not([height]):not([width])")).length===0){return A()}C.each(function(D,am){B[am.src]===ah&&(function E(){if(am.height||am.width){return A(am)}i.timers.img[am.src]=setTimeout(E,700)}(),aj(am).bind("error"+p+" load"+p,function(){A(this)}),B[am.src]=am)})}var w=o.content;if(!i.rendered||!s){return af}aj.isFunction(s)&&(s=s.call(v,m.event,i)||""),s.jquery&&s.length>0?w.empty().append(s.css({display:"block"})):w.html(s),i.rendered<0?q.queue("fx",t):(u=0,t(aj.noop));return i}function d(s,w){var t=o.title;if(!i.rendered||!s){return af}aj.isFunction(s)&&(s=s.call(v,m.event,i));if(s===af){return h(af)}s.jquery&&s.length>0?t.empty().append(s.css({display:"block"})):t.html(s),i.redraw(),w!==af&&i.rendered&&q.is(":visible")&&i.reposition(m.event)}function e(t){var s=o.button,w=o.title;if(!i.rendered){return af}t?(w||f(),g()):s.remove()}function f(){var s=ak+"-title";o.titlebar&&h(),o.titlebar=aj("<div />",{"class":Z+"-titlebar "+(r.style.widget?"ui-widget-header":"")}).append(o.title=aj("<div />",{id:s,"class":Z+"-title","aria-atomic":ag})).insertBefore(o.content),r.content.title.button?g():i.rendered&&i.redraw()}function g(){var s=r.content.title.button,w=typeof s==="string",t=w?s:"Close tooltip";o.button&&o.button.remove(),s.jquery?o.button=s:o.button=aj("<a />",{"class":"ui-state-default "+(r.style.widget?"":Z+"-icon"),title:t,"aria-label":t}).prepend(aj("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),o.button.appendTo(o.titlebar).attr("role","button").hover(function(y){aj(this).toggleClass("ui-state-hover",y.type==="mouseenter")}).click(function(y){q.hasClass(X)||i.hide(y);return af}).bind("mousedown keydown mouseup keyup mouseout",function(y){aj(this).toggleClass("ui-state-active ui-state-focus",y.type.substr(-4)==="down")}),i.redraw()}function h(s){o.title&&(o.titlebar.remove(),o.titlebar=o.title=o.button=ae,s!==af&&i.reposition())}function j(){var s=r.style.widget;q.toggleClass(Y,s).toggleClass(V,!s),o.content.toggleClass(Y+"-content",s),o.titlebar&&o.titlebar.toggleClass(Y+"-header",s),o.button&&o.button.toggleClass(Z+"-icon",!s)}function l(t){var s=0,z,y=r,w=t.split(".");while(y=y[w[s++]]){s<w.length&&(z=y)}return[z||r,w.pop()]}var i=this,al=document.body,ak=Z+"-"+n,x=0,u=0,q=aj(),p=".qtip-"+n,o,m;i.id=n,i.rendered=af,i.elements=o={target:v},i.timers={img:{}},i.options=r,i.checks={},i.plugins={},i.cache=m={event:{},target:aj(),disabled:af,attr:k},i.checks.builtin={"^id$":function(s,z,y){var w=y===ag?ad.nextid:y,t=Z+"-"+w;w!==af&&w.length>0&&!aj("#"+t).length&&(q[0].id=t,o.content[0].id=t+"-content",o.title[0].id=t+"-title")},"^content.text$":function(t,s,w){c(w)},"^content.title.text$":function(t,s,w){if(!w){return h()}!o.title&&w&&f(),d(w)},"^content.title.button$":function(t,s,w){e(w)},"^position.(my|at)$":function(t,s,w){"string"===typeof w&&(t[s]=new ac.Corner(w))},"^position.container$":function(t,s,w){i.rendered&&q.appendTo(w)},"^show.ready$":function(){i.rendered?i.toggle(ag):i.render(1)},"^style.classes$":function(t,s,w){q.attr("class",Z+" qtip ui-helper-reset "+w)},"^style.widget|content.title":j,"^events.(render|show|move|hide|focus|blur)$":function(s,w,t){q[(aj.isFunction(t)?"":"un")+"bind"]("tooltip"+w,t)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var s=r.position;q.attr("tracking",s.target==="mouse"&&s.adjust.mouse),a(),b()}},aj.extend(i,{render:function(s){if(i.rendered){return i}var y=r.content.title.text,w=r.position,t=aj.Event("tooltiprender");aj.attr(v[0],"aria-describedby",ak),q=o.tooltip=aj("<div/>",{id:ak,"class":Z+" qtip ui-helper-reset "+V+" "+r.style.classes+" "+Z+"-pos-"+r.position.my.abbreviation(),width:r.style.width||"",height:r.style.height||"",tracking:w.target==="mouse"&&w.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":af,"aria-describedby":ak+"-content","aria-hidden":ag}).toggleClass(X,m.disabled).data("qtip",i).appendTo(r.position.container).append(o.content=aj("<div />",{"class":Z+"-content",id:ak+"-content","aria-atomic":ag})),i.rendered=-1,x=u=1,y&&(f(),d(y,af)),c(r.content.text,af),i.rendered=ag,j(),aj.each(r.events,function(z,A){aj.isFunction(A)&&q.bind(z==="toggle"?"tooltipshow tooltiphide":"tooltip"+z,A)}),aj.each(ac,function(){this.initialize==="render"&&this(i)}),b(),q.queue("fx",function(z){t.originalEvent=m.event,q.trigger(t,[i]),x=u=0,i.redraw(),(r.show.ready||s)&&i.toggle(ag,m.event),z()});return i},get:function(t){var s,w;switch(t.toLowerCase()){case"dimensions":s={height:q.outerHeight(),width:q.outerWidth()};break;case"offset":s=ac.offset(q,r.position.container);break;default:w=l(t.toLowerCase()),s=w[0][w[1]],s=s.precedance?s.string():s}return s},set:function(D,C){function s(am,E){var ap,ao,an;for(ap in w){for(ao in w[ap]){if(an=(new RegExp(ao,"i")).exec(am)){E.push(an),w[ap][ao].apply(i,E)}}}}var B=/^position\.(my|at|adjust|target|container)|style|content|show\.ready/i,A=/^content\.(title|attr)|style/i,z=af,y=af,w=i.checks,t;"string"===typeof D?(t=D,D={},D[t]=C):D=aj.extend(ag,{},D),aj.each(D,function(ao,an){var am=l(ao.toLowerCase()),E;E=am[0][am[1]],am[0][am[1]]="object"===typeof an&&an.nodeType?aj(an):an,D[ao]=[am[0],am[1],an,E],z=B.test(ao)||z,y=A.test(ao)||y}),H(r),x=u=1,aj.each(D,s),x=u=0,q.is(":visible")&&i.rendered&&(z&&i.reposition(r.position.target==="mouse"?ae:m.event),y&&i.redraw());return i},toggle:function(am,E){function s(){am?(aj.browser.msie&&q[0].style.removeAttribute("filter"),q.css("overflow",""),"string"===typeof C.autofocus&&aj(C.autofocus,q).focus(),t=aj.Event("tooltipvisible"),t.originalEvent=E?m.event:ae,q.trigger(t,[i])):q.css({display:"",visibility:"",opacity:"",left:"",top:""})}if(!i.rendered){if(am){i.render(1)}else{return i}}var D=am?"show":"hide",C=r[D],B=q.is(":visible"),A=!E||r[D].target.length<2||m.target[0]===E.target,z=r.position,y=r.content,w,t;(typeof am).search("boolean|number")&&(am=!B);if(!q.is(":animated")&&B===am&&A){return i}if(E){if(/over|enter/.test(E.type)&&/out|leave/.test(m.event.type)&&E.target===r.show.target[0]&&q.has(E.relatedTarget).length){return i}m.event=aj.extend({},E)}t=aj.Event("tooltip"+D),t.originalEvent=E?m.event:ae,q.trigger(t,[i,90]);if(t.isDefaultPrevented()){return i}aj.attr(q[0],"aria-hidden",!am),am?(m.origin=aj.extend({},ab),i.focus(E),aj.isFunction(y.text)&&c(y.text,af),aj.isFunction(y.title.text)&&d(y.title.text,af),!J&&z.target==="mouse"&&z.adjust.mouse&&(aj(document).bind("mousemove.qtip",function(an){ab={pageX:an.pageX,pageY:an.pageY,type:"mousemove"}}),J=ag),i.reposition(E),C.solo&&aj(W,C.solo).not(q).qtip("hide",t)):(clearTimeout(i.timers.show),delete m.origin,J&&!aj(W+'[tracking="true"]:visible',C.solo).not(q).length&&(aj(document).unbind("mousemove.qtip"),J=af),i.blur(E)),A&&q.stop(0,1),C.effect===af?(q[D](),s.call(q)):aj.isFunction(C.effect)?(C.effect.call(q,i),q.queue("fx",function(an){s(),an()})):q.fadeTo(90,am?1:0,s),am&&C.target.trigger("qtip-"+n+"-inactive");return i},show:function(s){return i.toggle(ag,s)},hide:function(s){return i.toggle(af,s)},focus:function(s){if(!i.rendered){return i}var B=aj(W),A=parseInt(q[0].style.zIndex,10),z=ad.zindex+B.length,y=aj.extend({},s),w,t;q.hasClass(T)||(t=aj.Event("tooltipfocus"),t.originalEvent=y,q.trigger(t,[i,z]),t.isDefaultPrevented()||(A!==z&&(B.each(function(){this.style.zIndex>A&&(this.style.zIndex=this.style.zIndex-1)}),B.filter("."+T).qtip("blur",y)),q.addClass(T)[0].style.zIndex=z));return i},blur:function(s){var w=aj.extend({},s),t;q.removeClass(T),t=aj.Event("tooltipblur"),t.originalEvent=w,q.trigger(t,[i]);return i},reposition:function(az,ay){if(!i.rendered||x){return i}x=1;var ax=r.position.target,aw=r.position,av=aw.my,au=aw.at,at=aw.adjust,ar=at.method.split(" "),aq=q.outerWidth(),ap=q.outerHeight(),ao=0,am=0,E=aj.Event("tooltipmove"),D=q.css("position")==="fixed",C=aw.viewport,A={left:0,top:0},z=af,t=i.plugins.tip,an={horizontal:ar[0],vertical:ar[1]=ar[1]||ar[0],enabled:C.jquery&&ax[0]!==ai&&ax[0]!==al&&at.method!=="none",left:function(aG){var aF=an.horizontal==="shift",aE=C.offset.left+C.scrollLeft,aD=av.x==="left"?aq:av.x==="right"?-aq:-aq/2,aC=au.x==="left"?ao:au.x==="right"?-ao:-ao/2,aB=t&&t.size?t.size.width||0:0,aA=t&&t.corner&&t.corner.precedance==="x"&&!aF?aB:0,B=aE-aG+aA,y=aG+aq-C.width-aE+aA,w=aD-(av.precedance==="x"||av.x===av.y?aC:0),s=av.x==="center";aF?(aA=t&&t.corner&&t.corner.precedance==="y"?aB:0,w=(av.x==="left"?1:-1)*aD-aA,A.left+=B>0?B:y>0?-y:0,A.left=Math.max(C.offset.left+(aA&&t.corner.x==="center"?t.offset:0),aG-w,Math.min(Math.max(C.offset.left+C.width,aG+w),A.left))):(B>0&&(av.x!=="left"||y>0)?A.left-=w:y>0&&(av.x!=="right"||B>0)&&(A.left-=s?-w:w),A.left!==aG&&s&&(A.left-=at.x),A.left<aE&&-A.left>y&&(A.left=aG));return A.left-aG},top:function(aG){var aF=an.vertical==="shift",aE=C.offset.top+C.scrollTop,aD=av.y==="top"?ap:av.y==="bottom"?-ap:-ap/2,aC=au.y==="top"?am:au.y==="bottom"?-am:-am/2,aB=t&&t.size?t.size.height||0:0,aA=t&&t.corner&&t.corner.precedance==="y"&&!aF?aB:0,B=aE-aG+aA,y=aG+ap-C.height-aE+aA,w=aD-(av.precedance==="y"||av.x===av.y?aC:0),s=av.y==="center";aF?(aA=t&&t.corner&&t.corner.precedance==="x"?aB:0,w=(av.y==="top"?1:-1)*aD-aA,A.top+=B>0?B:y>0?-y:0,A.top=Math.max(C.offset.top+(aA&&t.corner.x==="center"?t.offset:0),aG-w,Math.min(Math.max(C.offset.top+C.height,aG+w),A.top))):(B>0&&(av.y!=="top"||y>0)?A.top-=w:y>0&&(av.y!=="bottom"||B>0)&&(A.top-=s?-w:w),A.top!==aG&&s&&(A.top-=at.y),A.top<0&&-A.top>y&&(A.top=aG));return A.top-aG}};if(aj.isArray(ax)&&ax.length===2){au={x:"left",y:"top"},A={left:ax[0],top:ax[1]}}else{if(ax==="mouse"&&(az&&az.pageX||m.event.pageX)){au={x:"left",y:"top"},az=(az&&(az.type==="resize"||az.type==="scroll")?m.event:az&&az.pageX&&az.type==="mousemove"?az:ab&&ab.pageX&&(at.mouse||!az||!az.pageX)?{pageX:ab.pageX,pageY:ab.pageY}:!at.mouse&&m.origin&&m.origin.pageX?m.origin:az)||az||m.event||ab||{},A={top:az.pageY,left:az.pageX}}else{ax==="event"?az&&az.target&&az.type!=="scroll"&&az.type!=="resize"?ax=m.target=aj(az.target):ax=m.target:m.target=aj(ax),ax=aj(ax).eq(0);if(ax.length===0){return i}ax[0]===document||ax[0]===ai?(ao=ac.iOS?ai.innerWidth:ax.width(),am=ac.iOS?ai.innerHeight:ax.height(),ax[0]===ai&&(A={top:!D||ac.iOS?(C||ax).scrollTop():0,left:!D||ac.iOS?(C||ax).scrollLeft():0})):ax.is("area")&&ac.imagemap?A=ac.imagemap(ax,au,an.enabled?ar:af):ax[0].namespaceURI==="http://www.w3.org/2000/svg"&&ac.svg?A=ac.svg(ax,au):(ao=ax.outerWidth(),am=ax.outerHeight(),A=ac.offset(ax,aw.container,D)),A.offset&&(ao=A.width,am=A.height,z=A.flipoffset,A=A.offset),A.left+=au.x==="right"?ao:au.x==="center"?ao/2:0,A.top+=au.y==="bottom"?am:au.y==="center"?am/2:0}}A.left+=at.x+(av.x==="right"?-aq:av.x==="center"?-aq/2:0),A.top+=at.y+(av.y==="bottom"?-ap:av.y==="center"?-ap/2:0),an.enabled?(C={elem:C,height:C[(C[0]===ai?"h":"outerH")+"eight"](),width:C[(C[0]===ai?"w":"outerW")+"idth"](),scrollLeft:D?0:C.scrollLeft(),scrollTop:D?0:C.scrollTop(),offset:C.offset()||{left:0,top:0}},A.adjusted={left:an.horizontal!=="none"?an.left(A.left):0,top:an.vertical!=="none"?an.top(A.top):0},A.adjusted.left+A.adjusted.top&&q.attr("class",function(w,s){return s.replace(/ui-tooltip-pos-\w+/i,Z+"-pos-"+av.abbreviation())}),z&&A.adjusted.left&&(A.left+=z.left),z&&A.adjusted.top&&(A.top+=z.top)):A.adjusted={left:0,top:0},E.originalEvent=aj.extend({},az),q.trigger(E,[i,A,C.elem||C]);if(E.isDefaultPrevented()){return i}delete A.adjusted,ay===af||isNaN(A.left)||isNaN(A.top)||ax==="mouse"||!aj.isFunction(aw.effect)?q.css(A):aj.isFunction(aw.effect)&&(aw.effect.call(q,i,aj.extend({},A)),q.queue(function(s){aj(this).css({opacity:"",height:""}),aj.browser.msie&&this.style.removeAttribute("filter"),s()})),x=0;return i},redraw:function(){if(i.rendered<1||u){return i}var t=r.position.container,s,z,y,w;u=1,r.style.height&&q.css("height",r.style.height),r.style.width?q.css("width",r.style.width):(q.css("width","").addClass(P),z=q.width()+1,y=q.css("max-width")||"",w=q.css("min-width")||"",s=(y+w).indexOf("%")>-1?t.width()/100:0,y=(y.indexOf("%")>-1?s:1)*parseInt(y,10)||z,w=(w.indexOf("%")>-1?s:1)*parseInt(w,10)||0,z=y+w?Math.min(Math.max(z,w),y):z,q.css("width",Math.round(z)).removeClass(P)),u=0;return i},disable:function(s){"boolean"!==typeof s&&(s=!q.hasClass(X)&&!m.disabled),i.rendered?(q.toggleClass(X,s),aj.attr(q[0],"aria-disabled",s)):m.disabled=!!s;return i},enable:function(){return i.disable(af)},destroy:function(){var s=v[0],t=aj.attr(s,K);i.rendered&&(q.remove(),aj.each(i.plugins,function(){this.destroy&&this.destroy()})),clearTimeout(i.timers.show),clearTimeout(i.timers.hide),a(),aj.removeData(s,"qtip"),r.suppress&&t&&(aj.attr(s,"title",t),v.removeAttr(K)),v.removeAttr("aria-describedby").unbind(".qtip"),delete aa[i.id];return v}})}function H(a){var d;if(!a||"object"!==typeof a){return af}"object"!==typeof a.metadata&&(a.metadata={type:a.metadata});if("content" in a){if("object"!==typeof a.content||a.content.jquery){a.content={text:a.content}}d=a.content.text||af,!aj.isFunction(d)&&(!d&&!d.attr||d.length<1||"object"===typeof d&&!d.jquery)&&(a.content.text=af),"title" in a.content&&("object"!==typeof a.content.title&&(a.content.title={text:a.content.title}),d=a.content.title.text||af,!aj.isFunction(d)&&(!d&&!d.attr||d.length<1||"object"===typeof d&&!d.jquery)&&(a.content.title.text=af))}"position" in a&&("object"!==typeof a.position&&(a.position={my:a.position,at:a.position})),"show" in a&&("object"!==typeof a.show&&(a.show.jquery?a.show={target:a.show}:a.show={event:a.show})),"hide" in a&&("object"!==typeof a.hide&&(a.hide.jquery?a.hide={target:a.hide}:a.hide={event:a.hide})),"style" in a&&("object"!==typeof a.style&&(a.style={classes:a.style})),aj.each(ac,function(){this.sanitize&&this.sanitize(a)});return a}function I(){I.history=I.history||[],I.history.push(arguments);if("object"===typeof console){var e=console[console.warn?"warn":"log"],d=Array.prototype.slice.call(arguments),f;typeof arguments[0]==="string"&&(d[0]="qTip2: "+d[0]),f=e.apply?e.apply(console,d):e(d)}}"use strict";var ag=!0,af=!1,ae=null,ad,ac,ab,aa={},Z="ui-tooltip",Y="ui-widget",X="ui-state-disabled",W="div.qtip."+Z,V=Z+"-default",T=Z+"-focus",R=Z+"-hover",P=Z+"-fluid",N="-31000px",L="_replacedByqTip",K="oldtitle",J;ad=aj.fn.qtip=function(c,o,g){var f=(""+c).toLowerCase(),e=ae,d=f==="disable"?[ag]:aj.makeArray(arguments).slice(1),a=d[d.length-1],p=this[0]?aj.data(this[0],"qtip"):ae;if(!arguments.length&&p||f==="api"){return p}if("string"===typeof c){this.each(function(){var h=aj.data(this,"qtip");if(!h){return ag}a&&a.timeStamp&&(h.cache.event=a);if(f!=="option"&&f!=="options"||!o){h[f]&&h[f].apply(h[f],d)}else{if(aj.isPlainObject(o)||g!==ah){h.set(o,g)}else{e=h.get(o);return af}}});return e!==ae?e:this}if("object"===typeof c||!arguments.length){p=H(aj.extend(ag,{},c));return ad.bind.call(this,p,a)}},ad.bind=function(a,c){return this.each(function(e){function f(k){function l(){h.render(typeof k==="object"||d.show.ready),b.show.add(b.hide).unbind(i)}if(h.cache.disabled){return af}h.cache.event=aj.extend({},k),h.cache.target=k?aj(k.target):[ah],d.show.delay>0?(clearTimeout(h.timers.show),h.timers.show=setTimeout(l,d.show.delay),j.show!==j.hide&&b.hide.bind(j.hide,function(){clearTimeout(h.timers.show)})):l()}var d,b,j,i,h,g;g=aj.isArray(a.id)?a.id[e]:a.id,g=!g||g===af||g.length<1||aa[g]?ad.nextid++:aa[g]=g,i=".qtip-"+g+"-create",h=F.call(this,g,a);if(h===af){return ag}d=h.options,aj.each(ac,function(){this.initialize==="initialize"&&this(h)}),b={show:d.show.target,hide:d.hide.target},j={show:aj.trim(""+d.show.event).replace(/ /g,i+" ")+i,hide:aj.trim(""+d.hide.event).replace(/ /g,i+" ")+i},/mouse(over|enter)/i.test(j.show)&&!/mouse(out|leave)/i.test(j.hide)&&(j.hide+=" mouseleave"+i),b.show.bind("mousemove"+i,function(k){ab={pageX:k.pageX,pageY:k.pageY,type:"mousemove"}}),b.show.bind(j.show,f),(d.show.ready||d.prerender)&&f(c)})},ac=ad.plugins={Corner:function(b){b=(""+b).replace(/([A-Z])/," $1").replace(/middle/gi,"center").toLowerCase(),this.x=(b.match(/left|right/i)||b.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(b.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.precedance=b.charAt(0).search(/^(t|b)/)>-1?"y":"x",this.string=function(){return this.precedance==="y"?this.y+this.x:this.x+this.y},this.abbreviation=function(){var d=this.x.substr(0,1),c=this.y.substr(0,1);return d===c?d:d==="c"||d!=="c"&&c!=="c"?c+d:d+c}},offset:function(r,q,p){function a(d,c){o.left+=c*d.scrollLeft(),o.top+=c*d.scrollTop()}var o=r.offset(),n=q,m=0,h=document.body,b;if(n){do{n.css("position")!=="static"&&(b=n[0]===h?{left:parseInt(n.css("left"),10)||0,top:parseInt(n.css("top"),10)||0}:n.position(),o.left-=b.left+(parseInt(n.css("borderLeftWidth"),10)||0)+(parseInt(n.css("marginLeft"),10)||0),o.top-=b.top+(parseInt(n.css("borderTopWidth"),10)||0),++m);if(n[0]===h){break}}while(n=n.offsetParent());q[0]!==h&&m>1&&a(q,1),(ac.iOS<4.1&&ac.iOS>3.1||!ac.iOS&&p)&&a(aj(ai),-1)}return o},iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,3})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_","."))||af,fn:{attr:function(a,j){if(this.length){var i=this[0],h="title",g=aj.data(i,"qtip");if(a===h&&g&&"object"===typeof g&&g.options.suppress){if(arguments.length<2){return aj.attr(i,K)}g&&g.options.content.attr===h&&g.cache.attr&&g.set("content.text",j);return this.attr(K,j)}}return aj.fn["attr"+L].apply(this,arguments)},clone:function(a){var h=aj([]),g="title",f=aj.fn["clone"+L].apply(this,arguments);a||f.filter("["+K+"]").attr("title",function(){return aj.attr(this,K)}).removeAttr(K);return f},remove:aj.ui?ae:function(a,d){aj(this).each(function(){d||(!a||aj.filter(a,[this]).length)&&aj("*",this).add(this).each(function(){aj(this).triggerHandler("remove")})})}}},aj.each(ac.fn,function(a,f){if(!f||aj.fn[a+L]){return ag}var d=aj.fn[a+L]=aj.fn[a];aj.fn[a]=function(){return f.apply(this,arguments)||d.apply(this,arguments)}}),ad.version="nightly",ad.nextid=0,ad.inactiveEvents="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),ad.zindex=15000,ad.defaults={prerender:af,id:af,overwrite:ag,suppress:ag,content:{text:ag,attr:"title",title:{text:af,button:af}},position:{my:"top left",at:"bottom right",target:af,container:af,viewport:af,adjust:{x:0,y:0,mouse:ag,resize:ag,method:"flip flip"},effect:function(a,f,e){aj(this).animate(f,{duration:200,queue:af})}},show:{target:af,event:"mouseenter",effect:ag,delay:90,solo:af,ready:af,autofocus:af},hide:{target:af,event:"mouseleave",effect:ag,delay:0,fixed:af,inactive:af,leave:"window",distance:af},style:{classes:"",widget:af,width:af,height:af},events:{render:ae,move:ae,show:ae,hide:ae,toggle:ae,visible:ae,focus:ae,blur:ae}},ac.ajax=function(d){var c=d.plugins.ajax;return"object"===typeof c?c:d.plugins.ajax=new U(d)},ac.ajax.initialize="render",ac.ajax.sanitize=function(e){var d=e.content,f;d&&"ajax" in d&&(f=d.ajax,typeof f!=="object"&&(f=e.content.ajax={url:f}),"boolean"!==typeof f.once&&f.once&&(f.once=!!f.once))},aj.extend(ag,ad.defaults,{content:{ajax:{loading:ag,once:ag}}}),ac.imagemap=function(z,y,x){function a(ak,E,D){var C=0,B=1,A=1,n=0,m=0,l=ak.width,k=ak.height;while(l>0&&k>0&&B>0&&A>0){l=Math.floor(l/2),k=Math.floor(k/2),D.x==="left"?B=l:D.x==="right"?B=ak.width-l:B+=Math.floor(l/2),D.y==="top"?A=k:D.y==="bottom"?A=ak.height-k:A+=Math.floor(k/2),C=E.length;while(C--){if(E.length<2){break}n=E[C][0]-ak.offset.left,m=E[C][1]-ak.offset.top,(D.x==="left"&&n>=B||D.x==="right"&&n<=B||D.x==="center"&&(n<B||n>ak.width-B)||D.y==="top"&&m>=A||D.y==="bottom"&&m<=A||D.y==="center"&&(m<A||m>ak.height-A))&&E.splice(C,1)}}return{left:E[0][0],top:E[0][1]}}z.jquery||(z=aj(z));var w=z.attr("shape").toLowerCase(),v=z.attr("coords").split(","),u=[],t=aj('img[usemap="#'+z.parent("map").attr("name")+'"]'),s=t.offset(),r={width:0,height:0,offset:{top:10000000000,right:0,bottom:0,left:10000000000}},q=0,p=0,o;s.left+=Math.ceil((t.outerWidth()-t.width())/2),s.top+=Math.ceil((t.outerHeight()-t.height())/2);if(w==="poly"){q=v.length;while(q--){p=[parseInt(v[--q],10),parseInt(v[q+1],10)],p[0]>r.offset.right&&(r.offset.right=p[0]),p[0]<r.offset.left&&(r.offset.left=p[0]),p[1]>r.offset.bottom&&(r.offset.bottom=p[1]),p[1]<r.offset.top&&(r.offset.top=p[1]),u.push(p)}}else{u=aj.map(v,function(b){return parseInt(b,10)})}switch(w){case"rect":r={width:Math.abs(u[2]-u[0]),height:Math.abs(u[3]-u[1]),offset:{left:u[0],top:u[1]}};break;case"circle":r={width:u[2]+2,height:u[2]+2,offset:{left:u[0],top:u[1]}};break;case"poly":aj.extend(r,{width:Math.abs(r.offset.right-r.offset.left),height:Math.abs(r.offset.bottom-r.offset.top)}),y.string()==="centercenter"?r.offset={left:r.offset.left+r.width/2,top:r.offset.top+r.height/2}:(r.offset=a(r,u.slice(),y),x&&(x[0]==="flip"||x[1]==="flip")&&(r.flipoffset=a(r,u.slice(),{x:y.x==="left"?"right":y.x==="right"?"left":"center",y:y.y==="top"?"bottom":y.y==="bottom"?"top":"center"}),r.flipoffset.left-=r.offset.left,r.flipoffset.top-=r.offset.top)),r.width=r.height=0}r.offset.left+=s.left,r.offset.top+=s.top;return r},ac.tip=function(d){var c=d.plugins.tip;return"object"===typeof c?c:d.plugins.tip=new Q(d)},ac.tip.initialize="render",ac.tip.sanitize=function(e){var d=e.style,f;d&&"tip" in d&&(f=e.style.tip,typeof f!=="object"&&(e.style.tip={corner:f}),/string|boolean/i.test(typeof f.corner)||(f.corner=ag),typeof f.width!=="number"&&delete f.width,typeof f.height!=="number"&&delete f.height,typeof f.border!=="number"&&f.border!==ag&&delete f.border,typeof f.offset!=="number"&&delete f.offset)},aj.extend(ag,ad.defaults,{style:{tip:{corner:ag,mimic:af,width:6,height:6,border:ag,offset:0}}}),ac.svg=function(t,s){var r=aj(document),q=t[0],p={width:0,height:0,offset:{top:10000000000,left:10000000000}},o,n,m,l,a;if(q.getBBox&&q.parentNode){o=q.getBBox(),n=q.getScreenCTM(),m=q.farthestViewportElement||q;if(!m.createSVGPoint){return p}l=m.createSVGPoint(),l.x=o.x,l.y=o.y,a=l.matrixTransform(n),p.offset.left=a.x,p.offset.top=a.y,l.x+=o.width,l.y+=o.height,a=l.matrixTransform(n),p.width=a.x-p.offset.left,p.height=a.y-p.offset.top,p.offset.left+=r.scrollLeft(),p.offset.top+=r.scrollTop()}return p},ac.modal=function(d){var c=d.plugins.modal;return"object"===typeof c?c:d.plugins.modal=new O(d)},ac.modal.initialize="render",ac.modal.sanitize=function(b){b.show&&(typeof b.show.modal!=="object"?b.show.modal={on:!!b.show.modal}:typeof b.show.modal.on==="undefined"&&(b.show.modal.on=ag))},ac.modal.zindex=ad.zindex-=200,aj.extend(ag,ad.defaults,{show:{modal:{on:af,effect:ag,blur:ag,escape:ag}}}),ac.bgiframe=function(a){var f=aj.browser,e=a.plugins.bgiframe;if(aj("select, object").length<1||(!f.msie||f.version.charAt(0)!=="6")){return af}return"object"===typeof e?e:a.plugins.bgiframe=new M(a)},ac.bgiframe.initialize="render"})(jQuery,window);