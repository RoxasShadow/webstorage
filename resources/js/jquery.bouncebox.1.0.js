(function(a){a.fn.bounceBox=function(){this.css({top:-this.outerHeight(),marginLeft:-this.outerWidth()/2,position:"fixed",left:"50%"});return this};a.fn.bounceBoxShow=function(){this.stop().animate({top:0},{easing:"easeOutBounce"});this.data("bounceShown",true);return this};a.fn.bounceBoxHide=function(){this.stop().animate({top:-this.outerHeight()});this.data("bounceShown",false);return this};a.fn.bounceBoxToggle=function(){if(this.data("bounceShown")){this.bounceBoxHide()}else{this.bounceBoxShow()}return this}})(jQuery);