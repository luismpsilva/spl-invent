/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
(function($) {
  'use strict';

  var _currentSpinnerId = 0;

  function _scopedEventName(name, id) {
    return name + '.touchspin_' + id;
  }

  function _scopeEventNames(names, id) {
    return $.map(names, function(name) {
      return _scopedEventName(name, id);
    });
  }

  $.fn.TouchSpin = function(options) {

    if (options === 'destroy') {
      this.each(function() {
        var originalinput = $(this),
            originalinput_data = originalinput.data();
        $(document).off(_scopeEventNames([
          'mouseup',
          'touchend',
          'touchcancel',
          'mousemove',
          'touchmove',
          'scroll',
          'scrollstart'], originalinput_data.spinnerid).join(' '));
      });
      return;
    }

    var defaults = {
      min: 0,
      max: 100,
      initval: '',
      replacementval: '',
      step: 1,
      decimals: 0,
      stepinterval: 100,
      forcestepdivisibility: 'round', // none | floor | round | ceil
      stepintervaldelay: 500,
      verticalbuttons: false,
      verticalupclass: 'glyphicon glyphicon-chevron-up',
      verticaldownclass: 'glyphicon glyphicon-chevron-down',
      prefix: '',
      postfix: '',
      prefix_extraclass: '',
      postfix_extraclass: '',
      booster: true,
      boostat: 10,
      maxboostedstep: false,
      mousewheel: true,
      buttondown_class: 'btn btn-default',
      buttonup_class: 'btn btn-default',
      buttondown_txt: '-',
      buttonup_txt: '+'
    };

    var attributeMap = {
      min: 'min',
      max: 'max',
      initval: 'init-val',
      replacementval: 'replacement-val',
      step: 'step',
      decimals: 'decimals',
      stepinterval: 'step-interval',
      verticalbuttons: 'vertical-buttons',
      verticalupclass: 'vertical-up-class',
      verticaldownclass: 'vertical-down-class',
      forcestepdivisibility: 'force-step-divisibility',
      stepintervaldelay: 'step-interval-delay',
      prefix: 'prefix',
      postfix: 'postfix',
      prefix_extraclass: 'prefix-extra-class',
      postfix_extraclass: 'postfix-extra-class',
      booster: 'booster',
      boostat: 'boostat',
      maxboostedstep: 'max-boosted-step',
      mousewheel: 'mouse-wheel',
      buttondown_class: 'button-down-class',
      buttonup_class: 'button-up-class',
      buttondown_txt: 'button-down-txt',
      buttonup_txt: 'button-up-txt'
    };

    return this.each(function() {

      var settings,
          originalinput = $(this),
          originalinput_data = originalinput.data(),
          container,
          elements,
          value,
          downSpinTimer,
          upSpinTimer,
          downDelayTimeout,
          upDelayTimeout,
          spincount = 0,
          spinning = false;

      init();


      function init() {
        if (originalinput.data('alreadyinitialized')) {
          return;
        }

        originalinput.data('alreadyinitialized', true);
        _currentSpinnerId += 1;
        originalinput.data('spinnerid', _currentSpinnerId);


        if (!originalinput.is('input')) {
          console.log('Must be an input.');
          return;
        }

        _initSettings();
        _setInitval();
        _checkValue();
        _buildHtml();
        _initElements();
        _hideEmptyPrefixPostfix();
        _bindEvents();
        _bindEventsInterface();
        elements.input.css('display', 'block');
      }

      function _setInitval() {
        if (settings.initval !== '' && originalinput.val() === '') {
          originalinput.val(settings.initval);
        }
      }

      function changeSettings(newsettings) {
        _updateSettings(newsettings);
        _checkValue();

        var value = elements.input.val();

        if (value !== '') {
          value = Number(elements.input.val());
          elements.input.val(value.toFixed(settings.decimals));
        }
      }

      function _initSettings() {
        settings = $.extend({}, defaults, originalinput_data, _parseAttributes(), options);
      }

      function _parseAttributes() {
        var data = {};
        $.each(attributeMap, function(key, value) {
          var attrName = 'bts-' + value + '';
          if (originalinput.is('[data-' + attrName + ']')) {
            data[key] = originalinput.data(attrName);
          }
        });
        return data;
      }

      function _updateSettings(newsettings) {
        settings = $.extend({}, settings, newsettings);

        // Update postfix and prefix texts if those settings were changed.
        if (newsettings.postfix) {
          originalinput.parent().find('.bootstrap-touchspin-postfix').text(newsettings.postfix);
        }
        if (newsettings.prefix) {
          originalinput.parent().find('.bootstrap-touchspin-prefix').text(newsettings.prefix);
        }
      }

      function _buildHtml() {
        var initval = originalinput.val(),
            parentelement = originalinput.parent();

        if (initval !== '') {
          initval = Number(initval).toFixed(settings.decimals);
        }

        originalinput.data('initvalue', initval).val(initval);
        originalinput.addClass('form-control');

        if (parentelement.hasClass('input-group')) {
          _advanceInputGroup(parentelement);
        }
        else {
          _buildInputGroup();
        }
      }

      function _advanceInputGroup(parentelement) {
        parentelement.addClass('bootstrap-touchspin');

        var prev = originalinput.prev(),
            next = originalinput.next();

        var downhtml,
            uphtml,
            prefixhtml = '<span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span>',
            postfixhtml = '<span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span>';

        if (prev.hasClass('input-group-btn')) {
          downhtml = '<button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button>';
          prev.append(downhtml);
        }
        else {
          downhtml = '<span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span>';
          $(downhtml).insertBefore(originalinput);
        }

        if (next.hasClass('input-group-btn')) {
          uphtml = '<button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button>';
          next.prepend(uphtml);
        }
        else {
          uphtml = '<span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span>';
          $(uphtml).insertAfter(originalinput);
        }

        $(prefixhtml).insertBefore(originalinput);
        $(postfixhtml).insertAfter(originalinput);

        container = parentelement;
      }

      function _buildInputGroup() {
        var html;

        if (settings.verticalbuttons) {
          html = '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn-vertical"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-up" type="button"><i class="' + settings.verticalupclass + '"></i></button><button class="' + settings.buttonup_class + ' bootstrap-touchspin-down" type="button"><i class="' + settings.verticaldownclass + '"></i></button></span></div>';
        }
        else {
          html = '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' + settings.buttondown_class + ' bootstrap-touchspin-down" type="button">' + settings.buttondown_txt + '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' + settings.prefix + '</span><span class="input-group-addon bootstrap-touchspin-postfix">' + settings.postfix + '</span><span class="input-group-btn"><button class="' + settings.buttonup_class + ' bootstrap-touchspin-up" type="button">' + settings.buttonup_txt + '</button></span></div>';
        }

        container = $(html).insertBefore(originalinput);

        $('.bootstrap-touchspin-prefix', container).after(originalinput);

        if (originalinput.hasClass('input-sm')) {
          container.addClass('input-group-sm');
        }
        else if (originalinput.hasClass('input-lg')) {
          container.addClass('input-group-lg');
        }
      }

      function _initElements() {
        elements = {
          down: $('.bootstrap-touchspin-down', container),
          up: $('.bootstrap-touchspin-up', container),
          input: $('input', container),
          prefix: $('.bootstrap-touchspin-prefix', container).addClass(settings.prefix_extraclass),
          postfix: $('.bootstrap-touchspin-postfix', container).addClass(settings.postfix_extraclass)
        };
      }

      function _hideEmptyPrefixPostfix() {
        if (settings.prefix === '') {
          elements.prefix.hide();
        }

        if (settings.postfix === '') {
          elements.postfix.hide();
        }
      }

      function _bindEvents() {
        originalinput.on('keydown', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 38) {
            if (spinning !== 'up') {
              upOnce();
              startUpSpin();
            }
            ev.preventDefault();
          }
          else if (code === 40) {
            if (spinning !== 'down') {
              downOnce();
              startDownSpin();
            }
            ev.preventDefault();
          }
        });

        originalinput.on('keyup', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 38) {
            stopSpin();
          }
          else if (code === 40) {
            stopSpin();
          }
        });

        originalinput.on('blur', function() {
          _checkValue();
        });

        elements.down.on('keydown', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 32 || code === 13) {
            if (spinning !== 'down') {
              downOnce();
              startDownSpin();
            }
            ev.preventDefault();
          }
        });

        elements.down.on('keyup', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 32 || code === 13) {
            stopSpin();
          }
        });

        elements.up.on('keydown', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 32 || code === 13) {
            if (spinning !== 'up') {
              upOnce();
              startUpSpin();
            }
            ev.preventDefault();
          }
        });

        elements.up.on('keyup', function(ev) {
          var code = ev.keyCode || ev.which;

          if (code === 32 || code === 13) {
            stopSpin();
          }
        });

        elements.down.on('mousedown.touchspin', function(ev) {
          elements.down.off('touchstart.touchspin');  // android 4 workaround

          if (originalinput.is(':disabled')) {
            return;
          }

          downOnce();
          startDownSpin();

          ev.preventDefault();
          ev.stopPropagation();
        });

        elements.down.on('touchstart.touchspin', function(ev) {
          elements.down.off('mousedown.touchspin');  // android 4 workaround

          if (originalinput.is(':disabled')) {
            return;
          }

          downOnce();
          startDownSpin();

          ev.preventDefault();
          ev.stopPropagation();
        });

        elements.up.on('mousedown.touchspin', function(ev) {
          elements.up.off('touchstart.touchspin');  // android 4 workaround

          if (originalinput.is(':disabled')) {
            return;
          }

          upOnce();
          startUpSpin();

          ev.preventDefault();
          ev.stopPropagation();
        });

        elements.up.on('touchstart.touchspin', function(ev) {
          elements.up.off('mousedown.touchspin');  // android 4 workaround

          if (originalinput.is(':disabled')) {
            return;
          }

          upOnce();
          startUpSpin();

          ev.preventDefault();
          ev.stopPropagation();
        });

        elements.up.on('mouseout touchleave touchend touchcancel', function(ev) {
          if (!spinning) {
            return;
          }

          ev.stopPropagation();
          stopSpin();
        });

        elements.down.on('mouseout touchleave touchend touchcancel', function(ev) {
          if (!spinning) {
            return;
          }

          ev.stopPropagation();
          stopSpin();
        });

        elements.down.on('mousemove touchmove', function(ev) {
          if (!spinning) {
            return;
          }

          ev.stopPropagation();
          ev.preventDefault();
        });

        elements.up.on('mousemove touchmove', function(ev) {
          if (!spinning) {
            return;
          }

          ev.stopPropagation();
          ev.preventDefault();
        });

        $(document).on(_scopeEventNames(['mouseup', 'touchend', 'touchcancel'], _currentSpinnerId).join(' '), function(ev) {
          if (!spinning) {
            return;
          }

          ev.preventDefault();
          stopSpin();
        });

        $(document).on(_scopeEventNames(['mousemove', 'touchmove', 'scroll', 'scrollstart'], _currentSpinnerId).join(' '), function(ev) {
          if (!spinning) {
            return;
          }

          ev.preventDefault();
          stopSpin();
        });

        originalinput.on('mousewheel DOMMouseScroll', function(ev) {
          if (!settings.mousewheel || !originalinput.is(':focus')) {
            return;
          }

          var delta = ev.originalEvent.wheelDelta || -ev.originalEvent.deltaY || -ev.originalEvent.detail;

          ev.stopPropagation();
          ev.preventDefault();

          if (delta < 0) {
            downOnce();
          }
          else {
            upOnce();
          }
        });
      }

      function _bindEventsInterface() {
        originalinput.on('touchspin.uponce', function() {
          stopSpin();
          upOnce();
        });

        originalinput.on('touchspin.downonce', function() {
          stopSpin();
          downOnce();
        });

        originalinput.on('touchspin.startupspin', function() {
          startUpSpin();
        });

        originalinput.on('touchspin.startdownspin', function() {
          startDownSpin();
        });

        originalinput.on('touchspin.stopspin', function() {
          stopSpin();
        });

        originalinput.on('touchspin.updatesettings', function(e, newsettings) {
          changeSettings(newsettings);
        });
      }

      function _forcestepdivisibility(value) {
        switch (settings.forcestepdivisibility) {
          case 'round':
            return (Math.round(value / settings.step) * settings.step).toFixed(settings.decimals);
          case 'floor':
            return (Math.floor(value / settings.step) * settings.step).toFixed(settings.decimals);
          case 'ceil':
            return (Math.ceil(value / settings.step) * settings.step).toFixed(settings.decimals);
          default:
            return value;
        }
      }

      function _checkValue() {
        var val, parsedval, returnval;

        val = originalinput.val();

        if (val === '') {
          if (settings.replacementval !== '') {
            originalinput.val(settings.replacementval);
            originalinput.trigger('change');
          }
          return;
        }

        if (settings.decimals > 0 && val === '.') {
          return;
        }

        parsedval = parseFloat(val);

        if (isNaN(parsedval)) {
          if (settings.replacementval !== '') {
            parsedval = settings.replacementval;
          }
          else {
            parsedval = 0;
          }
        }

        returnval = parsedval;

        if (parsedval.toString() !== val) {
          returnval = parsedval;
        }

        if (parsedval < settings.min) {
          returnval = settings.min;
        }

        if (parsedval > settings.max) {
          returnval = settings.max;
        }

        returnval = _forcestepdivisibility(returnval);

        if (Number(val).toString() !== returnval.toString()) {
          originalinput.val(returnval);
          originalinput.trigger('change');
        }
      }

      function _getBoostedStep() {
        if (!settings.booster) {
          return settings.step;
        }
        else {
          var boosted = Math.pow(2, Math.floor(spincount / settings.boostat)) * settings.step;

          if (settings.maxboostedstep) {
            if (boosted > settings.maxboostedstep) {
              boosted = settings.maxboostedstep;
              value = Math.round((value / boosted)) * boosted;
            }
          }

          return Math.max(settings.step, boosted);
        }
      }

      function upOnce() {
        _checkValue();

        value = parseFloat(elements.input.val());
        if (isNaN(value)) {
          value = 0;
        }

        var initvalue = value,
            boostedstep = _getBoostedStep();

        value = value + boostedstep;

        if (value > settings.max) {
          value = settings.max;
          originalinput.trigger('touchspin.on.max');
          stopSpin();
        }

        elements.input.val(Number(value).toFixed(settings.decimals));

        if (initvalue !== value) {
          originalinput.trigger('change');
        }
      }

      function downOnce() {
        _checkValue();

        value = parseFloat(elements.input.val());
        if (isNaN(value)) {
          value = 0;
        }

        var initvalue = value,
            boostedstep = _getBoostedStep();

        value = value - boostedstep;

        if (value < settings.min) {
          value = settings.min;
          originalinput.trigger('touchspin.on.min');
          stopSpin();
        }

        elements.input.val(value.toFixed(settings.decimals));

        if (initvalue !== value) {
          originalinput.trigger('change');
        }
      }

      function startDownSpin() {
        stopSpin();

        spincount = 0;
        spinning = 'down';

        originalinput.trigger('touchspin.on.startspin');
        originalinput.trigger('touchspin.on.startdownspin');

        downDelayTimeout = setTimeout(function() {
          downSpinTimer = setInterval(function() {
            spincount++;
            downOnce();
          }, settings.stepinterval);
        }, settings.stepintervaldelay);
      }

      function startUpSpin() {
        stopSpin();

        spincount = 0;
        spinning = 'up';

        originalinput.trigger('touchspin.on.startspin');
        originalinput.trigger('touchspin.on.startupspin');

        upDelayTimeout = setTimeout(function() {
          upSpinTimer = setInterval(function() {
            spincount++;
            upOnce();
          }, settings.stepinterval);
        }, settings.stepintervaldelay);
      }

      function stopSpin() {
        clearTimeout(downDelayTimeout);
        clearTimeout(upDelayTimeout);
        clearInterval(downSpinTimer);
        clearInterval(upSpinTimer);

        switch (spinning) {
          case 'up':
            originalinput.trigger('touchspin.on.stopupspin');
            originalinput.trigger('touchspin.on.stopspin');
            break;
          case 'down':
            originalinput.trigger('touchspin.on.stopdownspin');
            originalinput.trigger('touchspin.on.stopspin');
            break;
        }

        spincount = 0;
        spinning = false;
      }

    });

  };

})(jQuery);

/*!

JSZip - A Javascript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2014 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
!function (a) { if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else { var b; b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, b.JSZip = a() } }(function () {
    return function a(b, c, d) { function e(g, h) { if (!c[g]) { if (!b[g]) { var i = "function" == typeof require && require; if (!h && i) return i(g, !0); if (f) return f(g, !0); var j = new Error("Cannot find module '" + g + "'"); throw j.code = "MODULE_NOT_FOUND", j } var k = c[g] = { exports: {} }; b[g][0].call(k.exports, function (a) { var c = b[g][1][a]; return e(c ? c : a) }, k, k.exports, a, b, c, d) } return c[g].exports } for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]); return e }({
        1: [function (a, b, c) { "use strict"; function d(a) { if (a) { this.data = a, this.length = this.data.length, this.index = 0, this.zero = 0; for (var b = 0; b < this.data.length; b++) a[b] = 255 & a[b] } } var e = a("./dataReader"); d.prototype = new e, d.prototype.byteAt = function (a) { return this.data[this.zero + a] }, d.prototype.lastIndexOfSignature = function (a) { for (var b = a.charCodeAt(0), c = a.charCodeAt(1), d = a.charCodeAt(2), e = a.charCodeAt(3), f = this.length - 4; f >= 0; --f) if (this.data[f] === b && this.data[f + 1] === c && this.data[f + 2] === d && this.data[f + 3] === e) return f - this.zero; return -1 }, d.prototype.readData = function (a) { if (this.checkOffset(a), 0 === a) return []; var b = this.data.slice(this.zero + this.index, this.zero + this.index + a); return this.index += a, b }, b.exports = d }, { "./dataReader": 6 }], 2: [function (a, b, c) { "use strict"; var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; c.encode = function (a, b) { for (var c, e, f, g, h, i, j, k = "", l = 0; l < a.length;) c = a.charCodeAt(l++), e = a.charCodeAt(l++), f = a.charCodeAt(l++), g = c >> 2, h = (3 & c) << 4 | e >> 4, i = (15 & e) << 2 | f >> 6, j = 63 & f, isNaN(e) ? i = j = 64 : isNaN(f) && (j = 64), k = k + d.charAt(g) + d.charAt(h) + d.charAt(i) + d.charAt(j); return k }, c.decode = function (a, b) { var c, e, f, g, h, i, j, k = "", l = 0; for (a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "") ; l < a.length;) g = d.indexOf(a.charAt(l++)), h = d.indexOf(a.charAt(l++)), i = d.indexOf(a.charAt(l++)), j = d.indexOf(a.charAt(l++)), c = g << 2 | h >> 4, e = (15 & h) << 4 | i >> 2, f = (3 & i) << 6 | j, k += String.fromCharCode(c), 64 != i && (k += String.fromCharCode(e)), 64 != j && (k += String.fromCharCode(f)); return k } }, {}], 3: [function (a, b, c) { "use strict"; function d() { this.compressedSize = 0, this.uncompressedSize = 0, this.crc32 = 0, this.compressionMethod = null, this.compressedContent = null } d.prototype = { getContent: function () { return null }, getCompressedContent: function () { return null } }, b.exports = d }, {}], 4: [function (a, b, c) { "use strict"; c.STORE = { magic: "\x00\x00", compress: function (a, b) { return a }, uncompress: function (a) { return a }, compressInputType: null, uncompressInputType: null }, c.DEFLATE = a("./flate") }, { "./flate": 9 }], 5: [function (a, b, c) { "use strict"; var d = a("./utils"), e = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049, 498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275, 3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277, 2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143, 2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112, 2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918e3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746, 711928724, 3020668471, 3272380065, 1510334235, 755167117]; b.exports = function (a, b) { if ("undefined" == typeof a || !a.length) return 0; var c = "string" !== d.getTypeOf(a); "undefined" == typeof b && (b = 0); var f = 0, g = 0, h = 0; b = -1 ^ b; for (var i = 0, j = a.length; j > i; i++) h = c ? a[i] : a.charCodeAt(i), g = 255 & (b ^ h), f = e[g], b = b >>> 8 ^ f; return -1 ^ b } }, { "./utils": 22 }], 6: [function (a, b, c) { "use strict"; function d(a) { this.data = null, this.length = 0, this.index = 0, this.zero = 0 } var e = a("./utils"); d.prototype = { checkOffset: function (a) { this.checkIndex(this.index + a) }, checkIndex: function (a) { if (this.length < this.zero + a || 0 > a) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + a + "). Corrupted zip ?") }, setIndex: function (a) { this.checkIndex(a), this.index = a }, skip: function (a) { this.setIndex(this.index + a) }, byteAt: function (a) { }, readInt: function (a) { var b, c = 0; for (this.checkOffset(a), b = this.index + a - 1; b >= this.index; b--) c = (c << 8) + this.byteAt(b); return this.index += a, c }, readString: function (a) { return e.transformTo("string", this.readData(a)) }, readData: function (a) { }, lastIndexOfSignature: function (a) { }, readDate: function () { var a = this.readInt(4); return new Date((a >> 25 & 127) + 1980, (a >> 21 & 15) - 1, a >> 16 & 31, a >> 11 & 31, a >> 5 & 63, (31 & a) << 1) } }, b.exports = d }, { "./utils": 22 }], 7: [function (a, b, c) { "use strict"; c.base64 = !1, c.binary = !1, c.dir = !1, c.createFolders = !1, c.date = null, c.compression = null, c.compressionOptions = null, c.comment = null, c.unixPermissions = null, c.dosPermissions = null }, {}], 8: [function (a, b, c) { "use strict"; var d = a("./utils"); c.string2binary = function (a) { return d.string2binary(a) }, c.string2Uint8Array = function (a) { return d.transformTo("uint8array", a) }, c.uint8Array2String = function (a) { return d.transformTo("string", a) }, c.string2Blob = function (a) { var b = d.transformTo("arraybuffer", a); return d.arrayBuffer2Blob(b) }, c.arrayBuffer2Blob = function (a) { return d.arrayBuffer2Blob(a) }, c.transformTo = function (a, b) { return d.transformTo(a, b) }, c.getTypeOf = function (a) { return d.getTypeOf(a) }, c.checkSupport = function (a) { return d.checkSupport(a) }, c.MAX_VALUE_16BITS = d.MAX_VALUE_16BITS, c.MAX_VALUE_32BITS = d.MAX_VALUE_32BITS, c.pretty = function (a) { return d.pretty(a) }, c.findCompression = function (a) { return d.findCompression(a) }, c.isRegExp = function (a) { return d.isRegExp(a) } }, { "./utils": 22 }], 9: [function (a, b, c) { "use strict"; var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, e = a("pako"); c.uncompressInputType = d ? "uint8array" : "array", c.compressInputType = d ? "uint8array" : "array", c.magic = "\b\x00", c.compress = function (a, b) { return e.deflateRaw(a, { level: b.level || -1 }) }, c.uncompress = function (a) { return e.inflateRaw(a) } }, { pako: 25 }], 10: [function (a, b, c) { "use strict"; function d(a, b) { return this instanceof d ? (this.files = {}, this.comment = null, this.root = "", a && this.load(a, b), void (this.clone = function () { var a = new d; for (var b in this) "function" != typeof this[b] && (a[b] = this[b]); return a })) : new d(a, b) } var e = a("./base64"); d.prototype = a("./object"), d.prototype.load = a("./load"), d.support = a("./support"), d.defaults = a("./defaults"), d.utils = a("./deprecatedPublicUtils"), d.base64 = { encode: function (a) { return e.encode(a) }, decode: function (a) { return e.decode(a) } }, d.compressions = a("./compressions"), b.exports = d }, { "./base64": 2, "./compressions": 4, "./defaults": 7, "./deprecatedPublicUtils": 8, "./load": 11, "./object": 14, "./support": 18 }], 11: [function (a, b, c) { "use strict"; var d = a("./base64"), e = a("./utf8"), f = a("./utils"), g = a("./zipEntries"); b.exports = function (a, b) { var c, h, i, j; for (b = f.extend(b || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: e.utf8decode }), b.base64 && (a = d.decode(a)), h = new g(a, b), c = h.files, i = 0; i < c.length; i++) j = c[i], this.file(j.fileNameStr, j.decompressed, { binary: !0, optimizedBinaryString: !0, date: j.date, dir: j.dir, comment: j.fileCommentStr.length ? j.fileCommentStr : null, unixPermissions: j.unixPermissions, dosPermissions: j.dosPermissions, createFolders: b.createFolders }); return h.zipComment.length && (this.comment = h.zipComment), this } }, { "./base64": 2, "./utf8": 21, "./utils": 22, "./zipEntries": 23 }], 12: [function (a, b, c) { (function (a) { "use strict"; b.exports = function (b, c) { return new a(b, c) }, b.exports.test = function (b) { return a.isBuffer(b) } }).call(this, "undefined" != typeof Buffer ? Buffer : void 0) }, {}], 13: [function (a, b, c) { "use strict"; function d(a) { this.data = a, this.length = this.data.length, this.index = 0, this.zero = 0 } var e = a("./uint8ArrayReader"); d.prototype = new e, d.prototype.readData = function (a) { this.checkOffset(a); var b = this.data.slice(this.zero + this.index, this.zero + this.index + a); return this.index += a, b }, b.exports = d }, { "./uint8ArrayReader": 19 }], 14: [function (a, b, c) { "use strict"; var d = a("./support"), e = a("./utils"), f = a("./crc32"), g = a("./signature"), h = a("./defaults"), i = a("./base64"), j = a("./compressions"), k = a("./compressedObject"), l = a("./nodeBuffer"), m = a("./utf8"), n = a("./stringWriter"), o = a("./uint8ArrayWriter"), p = function (a) { if (a._data instanceof k && (a._data = a._data.getContent(), a.options.binary = !0, a.options.base64 = !1, "uint8array" === e.getTypeOf(a._data))) { var b = a._data; a._data = new Uint8Array(b.length), 0 !== b.length && a._data.set(b, 0) } return a._data }, q = function (a) { var b = p(a), c = e.getTypeOf(b); return "string" === c ? !a.options.binary && d.nodebuffer ? l(b, "utf-8") : a.asBinary() : b }, r = function (a) { var b = p(this); return null === b || "undefined" == typeof b ? "" : (this.options.base64 && (b = i.decode(b)), b = a && this.options.binary ? D.utf8decode(b) : e.transformTo("string", b), a || this.options.binary || (b = e.transformTo("string", D.utf8encode(b))), b) }, s = function (a, b, c) { this.name = a, this.dir = c.dir, this.date = c.date, this.comment = c.comment, this.unixPermissions = c.unixPermissions, this.dosPermissions = c.dosPermissions, this._data = b, this.options = c, this._initialMetadata = { dir: c.dir, date: c.date } }; s.prototype = { asText: function () { return r.call(this, !0) }, asBinary: function () { return r.call(this, !1) }, asNodeBuffer: function () { var a = q(this); return e.transformTo("nodebuffer", a) }, asUint8Array: function () { var a = q(this); return e.transformTo("uint8array", a) }, asArrayBuffer: function () { return this.asUint8Array().buffer } }; var t = function (a, b) { var c, d = ""; for (c = 0; b > c; c++) d += String.fromCharCode(255 & a), a >>>= 8; return d }, u = function (a) { return a = a || {}, a.base64 !== !0 || null !== a.binary && void 0 !== a.binary || (a.binary = !0), a = e.extend(a, h), a.date = a.date || new Date, null !== a.compression && (a.compression = a.compression.toUpperCase()), a }, v = function (a, b, c) { var d, f = e.getTypeOf(b); if (c = u(c), "string" == typeof c.unixPermissions && (c.unixPermissions = parseInt(c.unixPermissions, 8)), c.unixPermissions && 16384 & c.unixPermissions && (c.dir = !0), c.dosPermissions && 16 & c.dosPermissions && (c.dir = !0), c.dir && (a = x(a)), c.createFolders && (d = w(a)) && y.call(this, d, !0), c.dir || null === b || "undefined" == typeof b) c.base64 = !1, c.binary = !1, b = null, f = null; else if ("string" === f) c.binary && !c.base64 && c.optimizedBinaryString !== !0 && (b = e.string2binary(b)); else { if (c.base64 = !1, c.binary = !0, !(f || b instanceof k)) throw new Error("The data of '" + a + "' is in an unsupported format !"); "arraybuffer" === f && (b = e.transformTo("uint8array", b)) } var g = new s(a, b, c); return this.files[a] = g, g }, w = function (a) { "/" == a.slice(-1) && (a = a.substring(0, a.length - 1)); var b = a.lastIndexOf("/"); return b > 0 ? a.substring(0, b) : "" }, x = function (a) { return "/" != a.slice(-1) && (a += "/"), a }, y = function (a, b) { return b = "undefined" != typeof b ? b : !1, a = x(a), this.files[a] || v.call(this, a, null, { dir: !0, createFolders: b }), this.files[a] }, z = function (a, b, c) { var d, g = new k; return a._data instanceof k ? (g.uncompressedSize = a._data.uncompressedSize, g.crc32 = a._data.crc32, 0 === g.uncompressedSize || a.dir ? (b = j.STORE, g.compressedContent = "", g.crc32 = 0) : a._data.compressionMethod === b.magic ? g.compressedContent = a._data.getCompressedContent() : (d = a._data.getContent(), g.compressedContent = b.compress(e.transformTo(b.compressInputType, d), c))) : (d = q(a), d && 0 !== d.length && !a.dir || (b = j.STORE, d = ""), g.uncompressedSize = d.length, g.crc32 = f(d), g.compressedContent = b.compress(e.transformTo(b.compressInputType, d), c)), g.compressedSize = g.compressedContent.length, g.compressionMethod = b.magic, g }, A = function (a, b) { var c = a; return a || (c = b ? 16893 : 33204), (65535 & c) << 16 }, B = function (a, b) { return 63 & (a || 0) }, C = function (a, b, c, d, h, i) { var j, k, l, n, o = (c.compressedContent, i !== m.utf8encode), p = e.transformTo("string", i(b.name)), q = e.transformTo("string", m.utf8encode(b.name)), r = b.comment || "", s = e.transformTo("string", i(r)), u = e.transformTo("string", m.utf8encode(r)), v = q.length !== b.name.length, w = u.length !== r.length, x = b.options, y = "", z = "", C = ""; l = b._initialMetadata.dir !== b.dir ? b.dir : x.dir, n = b._initialMetadata.date !== b.date ? b.date : x.date; var D = 0, E = 0; l && (D |= 16), "UNIX" === h ? (E = 798, D |= A(b.unixPermissions, l)) : (E = 20, D |= B(b.dosPermissions, l)), j = n.getHours(), j <<= 6, j |= n.getMinutes(), j <<= 5, j |= n.getSeconds() / 2, k = n.getFullYear() - 1980, k <<= 4, k |= n.getMonth() + 1, k <<= 5, k |= n.getDate(), v && (z = t(1, 1) + t(f(p), 4) + q, y += "up" + t(z.length, 2) + z), w && (C = t(1, 1) + t(this.crc32(s), 4) + u, y += "uc" + t(C.length, 2) + C); var F = ""; F += "\n\x00", F += o || !v && !w ? "\x00\x00" : "\x00\b", F += c.compressionMethod, F += t(j, 2), F += t(k, 2), F += t(c.crc32, 4), F += t(c.compressedSize, 4), F += t(c.uncompressedSize, 4), F += t(p.length, 2), F += t(y.length, 2); var G = g.LOCAL_FILE_HEADER + F + p + y, H = g.CENTRAL_FILE_HEADER + t(E, 2) + F + t(s.length, 2) + "\x00\x00\x00\x00" + t(D, 4) + t(d, 4) + p + y + s; return { fileRecord: G, dirRecord: H, compressedObject: c } }, D = { load: function (a, b) { throw new Error("Load method is not defined. Is the file jszip-load.js included ?") }, filter: function (a) { var b, c, d, f, g = []; for (b in this.files) this.files.hasOwnProperty(b) && (d = this.files[b], f = new s(d.name, d._data, e.extend(d.options)), c = b.slice(this.root.length, b.length), b.slice(0, this.root.length) === this.root && a(c, f) && g.push(f)); return g }, file: function (a, b, c) { if (1 === arguments.length) { if (e.isRegExp(a)) { var d = a; return this.filter(function (a, b) { return !b.dir && d.test(a) }) } return this.filter(function (b, c) { return !c.dir && b === a })[0] || null } return a = this.root + a, v.call(this, a, b, c), this }, folder: function (a) { if (!a) return this; if (e.isRegExp(a)) return this.filter(function (b, c) { return c.dir && a.test(b) }); var b = this.root + a, c = y.call(this, b), d = this.clone(); return d.root = c.name, d }, remove: function (a) { a = this.root + a; var b = this.files[a]; if (b || ("/" != a.slice(-1) && (a += "/"), b = this.files[a]), b && !b.dir) delete this.files[a]; else for (var c = this.filter(function (b, c) { return c.name.slice(0, a.length) === a }), d = 0; d < c.length; d++) delete this.files[c[d].name]; return this }, generate: function (a) { a = e.extend(a || {}, { base64: !0, compression: "STORE", compressionOptions: null, type: "base64", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: m.utf8encode }), e.checkSupport(a.type), "darwin" !== a.platform && "freebsd" !== a.platform && "linux" !== a.platform && "sunos" !== a.platform || (a.platform = "UNIX"), "win32" === a.platform && (a.platform = "DOS"); var b, c, d = [], f = 0, h = 0, k = e.transformTo("string", a.encodeFileName(a.comment || this.comment || "")); for (var l in this.files) if (this.files.hasOwnProperty(l)) { var p = this.files[l], q = p.options.compression || a.compression.toUpperCase(), r = j[q]; if (!r) throw new Error(q + " is not a valid compression method !"); var s = p.options.compressionOptions || a.compressionOptions || {}, u = z.call(this, p, r, s), v = C.call(this, l, p, u, f, a.platform, a.encodeFileName); f += v.fileRecord.length + u.compressedSize, h += v.dirRecord.length, d.push(v) } var w = ""; w = g.CENTRAL_DIRECTORY_END + "\x00\x00\x00\x00" + t(d.length, 2) + t(d.length, 2) + t(h, 4) + t(f, 4) + t(k.length, 2) + k; var x = a.type.toLowerCase(); for (b = "uint8array" === x || "arraybuffer" === x || "blob" === x || "nodebuffer" === x ? new o(f + h + w.length) : new n(f + h + w.length), c = 0; c < d.length; c++) b.append(d[c].fileRecord), b.append(d[c].compressedObject.compressedContent); for (c = 0; c < d.length; c++) b.append(d[c].dirRecord); b.append(w); var y = b.finalize(); switch (a.type.toLowerCase()) { case "uint8array": case "arraybuffer": case "nodebuffer": return e.transformTo(a.type.toLowerCase(), y); case "blob": return e.arrayBuffer2Blob(e.transformTo("arraybuffer", y), a.mimeType); case "base64": return a.base64 ? i.encode(y) : y; default: return y } }, crc32: function (a, b) { return f(a, b) }, utf8encode: function (a) { return e.transformTo("string", m.utf8encode(a)) }, utf8decode: function (a) { return m.utf8decode(a) } }; b.exports = D }, { "./base64": 2, "./compressedObject": 3, "./compressions": 4, "./crc32": 5, "./defaults": 7, "./nodeBuffer": 12, "./signature": 15, "./stringWriter": 17, "./support": 18, "./uint8ArrayWriter": 20, "./utf8": 21, "./utils": 22 }], 15: [function (a, b, c) { "use strict"; c.LOCAL_FILE_HEADER = "PK", c.CENTRAL_FILE_HEADER = "PK", c.CENTRAL_DIRECTORY_END = "PK", c.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK", c.ZIP64_CENTRAL_DIRECTORY_END = "PK", c.DATA_DESCRIPTOR = "PK\b" }, {}], 16: [function (a, b, c) { "use strict"; function d(a, b) { this.data = a, b || (this.data = f.string2binary(this.data)), this.length = this.data.length, this.index = 0, this.zero = 0 } var e = a("./dataReader"), f = a("./utils"); d.prototype = new e, d.prototype.byteAt = function (a) { return this.data.charCodeAt(this.zero + a) }, d.prototype.lastIndexOfSignature = function (a) { return this.data.lastIndexOf(a) - this.zero }, d.prototype.readData = function (a) { this.checkOffset(a); var b = this.data.slice(this.zero + this.index, this.zero + this.index + a); return this.index += a, b }, b.exports = d }, { "./dataReader": 6, "./utils": 22 }], 17: [function (a, b, c) { "use strict"; var d = a("./utils"), e = function () { this.data = [] }; e.prototype = { append: function (a) { a = d.transformTo("string", a), this.data.push(a) }, finalize: function () { return this.data.join("") } }, b.exports = e }, { "./utils": 22 }], 18: [function (a, b, c) { (function (a) { "use strict"; if (c.base64 = !0, c.array = !0, c.string = !0, c.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, c.nodebuffer = "undefined" != typeof a, c.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) c.blob = !1; else { var b = new ArrayBuffer(0); try { c.blob = 0 === new Blob([b], { type: "application/zip" }).size } catch (d) { try { var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, f = new e; f.append(b), c.blob = 0 === f.getBlob("application/zip").size } catch (d) { c.blob = !1 } } } }).call(this, "undefined" != typeof Buffer ? Buffer : void 0) }, {}], 19: [function (a, b, c) { "use strict"; function d(a) { a && (this.data = a, this.length = this.data.length, this.index = 0, this.zero = 0) } var e = a("./arrayReader"); d.prototype = new e, d.prototype.readData = function (a) { if (this.checkOffset(a), 0 === a) return new Uint8Array(0); var b = this.data.subarray(this.zero + this.index, this.zero + this.index + a); return this.index += a, b }, b.exports = d }, { "./arrayReader": 1 }], 20: [function (a, b, c) { "use strict"; var d = a("./utils"), e = function (a) { this.data = new Uint8Array(a), this.index = 0 }; e.prototype = { append: function (a) { 0 !== a.length && (a = d.transformTo("uint8array", a), this.data.set(a, this.index), this.index += a.length) }, finalize: function () { return this.data } }, b.exports = e }, { "./utils": 22 }], 21: [function (a, b, c) { "use strict"; for (var d = a("./utils"), e = a("./support"), f = a("./nodeBuffer"), g = new Array(256), h = 0; 256 > h; h++) g[h] = h >= 252 ? 6 : h >= 248 ? 5 : h >= 240 ? 4 : h >= 224 ? 3 : h >= 192 ? 2 : 1; g[254] = g[254] = 1; var i = function (a) { var b, c, d, f, g, h = a.length, i = 0; for (f = 0; h > f; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4; for (b = e.uint8array ? new Uint8Array(i) : new Array(i), g = 0, f = 0; i > g; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c); return b }, j = function (a, b) { var c; for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]) ;) c--; return 0 > c ? b : 0 === c ? b : c + g[a[c]] > b ? c : b }, k = function (a) { var b, c, e, f, h = a.length, i = new Array(2 * h); for (c = 0, b = 0; h > b;) if (e = a[b++], 128 > e) i[c++] = e; else if (f = g[e], f > 4) i[c++] = 65533, b += f - 1; else { for (e &= 2 === f ? 31 : 3 === f ? 15 : 7; f > 1 && h > b;) e = e << 6 | 63 & a[b++], f--; f > 1 ? i[c++] = 65533 : 65536 > e ? i[c++] = e : (e -= 65536, i[c++] = 55296 | e >> 10 & 1023, i[c++] = 56320 | 1023 & e) } return i.length !== c && (i.subarray ? i = i.subarray(0, c) : i.length = c), d.applyFromCharCode(i) }; c.utf8encode = function (a) { return e.nodebuffer ? f(a, "utf-8") : i(a) }, c.utf8decode = function (a) { if (e.nodebuffer) return d.transformTo("nodebuffer", a).toString("utf-8"); a = d.transformTo(e.uint8array ? "uint8array" : "array", a); for (var b = [], c = 0, f = a.length, g = 65536; f > c;) { var h = j(a, Math.min(c + g, f)); e.uint8array ? b.push(k(a.subarray(c, h))) : b.push(k(a.slice(c, h))), c = h } return b.join("") } }, { "./nodeBuffer": 12, "./support": 18, "./utils": 22 }], 22: [function (a, b, c) { "use strict"; function d(a) { return a } function e(a, b) { for (var c = 0; c < a.length; ++c) b[c] = 255 & a.charCodeAt(c); return b } function f(a) { var b = 65536, d = [], e = a.length, f = c.getTypeOf(a), g = 0, h = !0; try { switch (f) { case "uint8array": String.fromCharCode.apply(null, new Uint8Array(0)); break; case "nodebuffer": String.fromCharCode.apply(null, j(0)) } } catch (i) { h = !1 } if (!h) { for (var k = "", l = 0; l < a.length; l++) k += String.fromCharCode(a[l]); return k } for (; e > g && b > 1;) try { "array" === f || "nodebuffer" === f ? d.push(String.fromCharCode.apply(null, a.slice(g, Math.min(g + b, e)))) : d.push(String.fromCharCode.apply(null, a.subarray(g, Math.min(g + b, e)))), g += b } catch (i) { b = Math.floor(b / 2) } return d.join("") } function g(a, b) { for (var c = 0; c < a.length; c++) b[c] = a[c]; return b } var h = a("./support"), i = a("./compressions"), j = a("./nodeBuffer"); c.string2binary = function (a) { for (var b = "", c = 0; c < a.length; c++) b += String.fromCharCode(255 & a.charCodeAt(c)); return b }, c.arrayBuffer2Blob = function (a, b) { c.checkSupport("blob"), b = b || "application/zip"; try { return new Blob([a], { type: b }) } catch (d) { try { var e = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, f = new e; return f.append(a), f.getBlob(b) } catch (d) { throw new Error("Bug : can't construct the Blob.") } } }, c.applyFromCharCode = f; var k = {}; k.string = { string: d, array: function (a) { return e(a, new Array(a.length)) }, arraybuffer: function (a) { return k.string.uint8array(a).buffer }, uint8array: function (a) { return e(a, new Uint8Array(a.length)) }, nodebuffer: function (a) { return e(a, j(a.length)) } }, k.array = { string: f, array: d, arraybuffer: function (a) { return new Uint8Array(a).buffer }, uint8array: function (a) { return new Uint8Array(a) }, nodebuffer: function (a) { return j(a) } }, k.arraybuffer = { string: function (a) { return f(new Uint8Array(a)) }, array: function (a) { return g(new Uint8Array(a), new Array(a.byteLength)) }, arraybuffer: d, uint8array: function (a) { return new Uint8Array(a) }, nodebuffer: function (a) { return j(new Uint8Array(a)) } }, k.uint8array = { string: f, array: function (a) { return g(a, new Array(a.length)) }, arraybuffer: function (a) { return a.buffer }, uint8array: d, nodebuffer: function (a) { return j(a) } }, k.nodebuffer = { string: f, array: function (a) { return g(a, new Array(a.length)) }, arraybuffer: function (a) { return k.nodebuffer.uint8array(a).buffer }, uint8array: function (a) { return g(a, new Uint8Array(a.length)) }, nodebuffer: d }, c.transformTo = function (a, b) { if (b || (b = ""), !a) return b; c.checkSupport(a); var d = c.getTypeOf(b), e = k[d][a](b); return e }, c.getTypeOf = function (a) { return "string" == typeof a ? "string" : "[object Array]" === Object.prototype.toString.call(a) ? "array" : h.nodebuffer && j.test(a) ? "nodebuffer" : h.uint8array && a instanceof Uint8Array ? "uint8array" : h.arraybuffer && a instanceof ArrayBuffer ? "arraybuffer" : void 0 }, c.checkSupport = function (a) { var b = h[a.toLowerCase()]; if (!b) throw new Error(a + " is not supported by this browser") }, c.MAX_VALUE_16BITS = 65535, c.MAX_VALUE_32BITS = -1, c.pretty = function (a) { var b, c, d = ""; for (c = 0; c < (a || "").length; c++) b = a.charCodeAt(c), d += "\\x" + (16 > b ? "0" : "") + b.toString(16).toUpperCase(); return d }, c.findCompression = function (a) { for (var b in i) if (i.hasOwnProperty(b) && i[b].magic === a) return i[b]; return null }, c.isRegExp = function (a) { return "[object RegExp]" === Object.prototype.toString.call(a) }, c.extend = function () { var a, b, c = {}; for (a = 0; a < arguments.length; a++) for (b in arguments[a]) arguments[a].hasOwnProperty(b) && "undefined" == typeof c[b] && (c[b] = arguments[a][b]); return c } }, { "./compressions": 4, "./nodeBuffer": 12, "./support": 18 }], 23: [function (a, b, c) { "use strict"; function d(a, b) { this.files = [], this.loadOptions = b, a && this.load(a) } var e = a("./stringReader"), f = a("./nodeBufferReader"), g = a("./uint8ArrayReader"), h = a("./arrayReader"), i = a("./utils"), j = a("./signature"), k = a("./zipEntry"), l = a("./support"); a("./object"); d.prototype = { checkSignature: function (a) { var b = this.reader.readString(4); if (b !== a) throw new Error("Corrupted zip or bug : unexpected signature (" + i.pretty(b) + ", expected " + i.pretty(a) + ")") }, isSignature: function (a, b) { var c = this.reader.index; this.reader.setIndex(a); var d = this.reader.readString(4), e = d === b; return this.reader.setIndex(c), e }, readBlockEndOfCentral: function () { this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2); var a = this.reader.readData(this.zipCommentLength), b = l.uint8array ? "uint8array" : "array", c = i.transformTo(b, a); this.zipComment = this.loadOptions.decodeFileName(c) }, readBlockZip64EndOfCentral: function () { this.zip64EndOfCentralSize = this.reader.readInt(8), this.versionMadeBy = this.reader.readString(2), this.versionNeeded = this.reader.readInt(2), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {}; for (var a, b, c, d = this.zip64EndOfCentralSize - 44, e = 0; d > e;) a = this.reader.readInt(2), b = this.reader.readInt(4), c = this.reader.readString(b), this.zip64ExtensibleData[a] = { id: a, length: b, value: c } }, readBlockZip64EndOfCentralLocator: function () { if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), this.disksCount > 1) throw new Error("Multi-volumes zip are not supported") }, readLocalFiles: function () { var a, b; for (a = 0; a < this.files.length; a++) b = this.files[a], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(j.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes() }, readCentralDir: function () { var a; for (this.reader.setIndex(this.centralDirOffset) ; this.reader.readString(4) === j.CENTRAL_FILE_HEADER;) a = new k({ zip64: this.zip64 }, this.loadOptions), a.readCentralPart(this.reader), this.files.push(a); if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length) }, readEndOfCentral: function () { var a = this.reader.lastIndexOfSignature(j.CENTRAL_DIRECTORY_END); if (0 > a) { var b = !this.isSignature(0, j.LOCAL_FILE_HEADER); throw b ? new Error("Can't find end of central directory : is this a zip file ? If it is, see http://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip : can't find end of central directory") } this.reader.setIndex(a); var c = a; if (this.checkSignature(j.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) { if (this.zip64 = !0, a = this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR), 0 > a) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory locator"); if (this.reader.setIndex(a), this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, j.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(j.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip : can't find the ZIP64 end of central directory"); this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(j.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral() } var d = this.centralDirOffset + this.centralDirSize; this.zip64 && (d += 20, d += 12 + this.zip64EndOfCentralSize); var e = c - d; if (e > 0) this.isSignature(c, j.CENTRAL_FILE_HEADER) || (this.reader.zero = e); else if (0 > e) throw new Error("Corrupted zip: missing " + Math.abs(e) + " bytes.") }, prepareReader: function (a) { var b = i.getTypeOf(a); if (i.checkSupport(b), "string" !== b || l.uint8array) if ("nodebuffer" === b) this.reader = new f(a); else if (l.uint8array) this.reader = new g(i.transformTo("uint8array", a)); else { if (!l.array) throw new Error("Unexpected error: unsupported type '" + b + "'"); this.reader = new h(i.transformTo("array", a)) } else this.reader = new e(a, this.loadOptions.optimizedBinaryString) }, load: function (a) { this.prepareReader(a), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles() } }, b.exports = d }, { "./arrayReader": 1, "./nodeBufferReader": 13, "./object": 14, "./signature": 15, "./stringReader": 16, "./support": 18, "./uint8ArrayReader": 19, "./utils": 22, "./zipEntry": 24 }], 24: [function (a, b, c) {
            "use strict"; function d(a, b) { this.options = a, this.loadOptions = b } var e = a("./stringReader"), f = a("./utils"), g = a("./compressedObject"), h = a("./object"), i = a("./support"), j = 0, k = 3; d.prototype = {
                isEncrypted: function () { return 1 === (1 & this.bitFlag) }, useUTF8: function () { return 2048 === (2048 & this.bitFlag) }, prepareCompressedContent: function (a, b, c) { return function () { var d = a.index; a.setIndex(b); var e = a.readData(c); return a.setIndex(d), e } }, prepareContent: function (a, b, c, d, e) { return function () { var a = f.transformTo(d.uncompressInputType, this.getCompressedContent()), b = d.uncompress(a); if (b.length !== e) throw new Error("Bug : uncompressed data size mismatch"); return b } }, readLocalPart: function (a) {
                    var b, c; if (a.skip(22), this.fileNameLength = a.readInt(2), c = a.readInt(2), this.fileName = a.readData(this.fileNameLength), a.skip(c), -1 == this.compressedSize || -1 == this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough informations from the central directory (compressedSize == -1 || uncompressedSize == -1)"); if (b = f.findCompression(this.compressionMethod), null === b) throw new Error("Corrupted zip : compression " + f.pretty(this.compressionMethod) + " unknown (inner file : " + f.transformTo("string", this.fileName) + ")"); if (this.decompressed = new g, this.decompressed.compressedSize = this.compressedSize, this.decompressed.uncompressedSize = this.uncompressedSize, this.decompressed.crc32 = this.crc32, this.decompressed.compressionMethod = this.compressionMethod, this.decompressed.getCompressedContent = this.prepareCompressedContent(a, a.index, this.compressedSize, b), this.decompressed.getContent = this.prepareContent(a, a.index, this.compressedSize, b, this.uncompressedSize), this.loadOptions.checkCRC32 && (this.decompressed = f.transformTo("string", this.decompressed.getContent()),
                    h.crc32(this.decompressed) !== this.crc32)) throw new Error("Corrupted zip : CRC32 mismatch")
                }, readCentralPart: function (a) { if (this.versionMadeBy = a.readInt(2), this.versionNeeded = a.readInt(2), this.bitFlag = a.readInt(2), this.compressionMethod = a.readString(2), this.date = a.readDate(), this.crc32 = a.readInt(4), this.compressedSize = a.readInt(4), this.uncompressedSize = a.readInt(4), this.fileNameLength = a.readInt(2), this.extraFieldsLength = a.readInt(2), this.fileCommentLength = a.readInt(2), this.diskNumberStart = a.readInt(2), this.internalFileAttributes = a.readInt(2), this.externalFileAttributes = a.readInt(4), this.localHeaderOffset = a.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported"); this.fileName = a.readData(this.fileNameLength), this.readExtraFields(a), this.parseZIP64ExtraField(a), this.fileComment = a.readData(this.fileCommentLength) }, processAttributes: function () { this.unixPermissions = null, this.dosPermissions = null; var a = this.versionMadeBy >> 8; this.dir = !!(16 & this.externalFileAttributes), a === j && (this.dosPermissions = 63 & this.externalFileAttributes), a === k && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0) }, parseZIP64ExtraField: function (a) { if (this.extraFields[1]) { var b = new e(this.extraFields[1].value); this.uncompressedSize === f.MAX_VALUE_32BITS && (this.uncompressedSize = b.readInt(8)), this.compressedSize === f.MAX_VALUE_32BITS && (this.compressedSize = b.readInt(8)), this.localHeaderOffset === f.MAX_VALUE_32BITS && (this.localHeaderOffset = b.readInt(8)), this.diskNumberStart === f.MAX_VALUE_32BITS && (this.diskNumberStart = b.readInt(4)) } }, readExtraFields: function (a) { var b, c, d, e = a.index; for (this.extraFields = this.extraFields || {}; a.index < e + this.extraFieldsLength;) b = a.readInt(2), c = a.readInt(2), d = a.readString(c), this.extraFields[b] = { id: b, length: c, value: d } }, handleUTF8: function () { var a = i.uint8array ? "uint8array" : "array"; if (this.useUTF8()) this.fileNameStr = h.utf8decode(this.fileName), this.fileCommentStr = h.utf8decode(this.fileComment); else { var b = this.findExtraFieldUnicodePath(); if (null !== b) this.fileNameStr = b; else { var c = f.transformTo(a, this.fileName); this.fileNameStr = this.loadOptions.decodeFileName(c) } var d = this.findExtraFieldUnicodeComment(); if (null !== d) this.fileCommentStr = d; else { var e = f.transformTo(a, this.fileComment); this.fileCommentStr = this.loadOptions.decodeFileName(e) } } }, findExtraFieldUnicodePath: function () { var a = this.extraFields[28789]; if (a) { var b = new e(a.value); return 1 !== b.readInt(1) ? null : h.crc32(this.fileName) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5)) } return null }, findExtraFieldUnicodeComment: function () { var a = this.extraFields[25461]; if (a) { var b = new e(a.value); return 1 !== b.readInt(1) ? null : h.crc32(this.fileComment) !== b.readInt(4) ? null : h.utf8decode(b.readString(a.length - 5)) } return null }
            }, b.exports = d
        }, { "./compressedObject": 3, "./object": 14, "./stringReader": 16, "./support": 18, "./utils": 22 }], 25: [function (a, b, c) { "use strict"; var d = a("./lib/utils/common").assign, e = a("./lib/deflate"), f = a("./lib/inflate"), g = a("./lib/zlib/constants"), h = {}; d(h, e, f, g), b.exports = h }, { "./lib/deflate": 26, "./lib/inflate": 27, "./lib/utils/common": 28, "./lib/zlib/constants": 31 }], 26: [function (a, b, c) { "use strict"; function d(a) { if (!(this instanceof d)) return new d(a); this.options = i.assign({ level: s, method: u, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: t, to: "" }, a || {}); var b = this.options; b.raw && b.windowBits > 0 ? b.windowBits = -b.windowBits : b.gzip && b.windowBits > 0 && b.windowBits < 16 && (b.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0; var c = h.deflateInit2(this.strm, b.level, b.method, b.windowBits, b.memLevel, b.strategy); if (c !== p) throw new Error(k[c]); b.header && h.deflateSetHeader(this.strm, b.header) } function e(a, b) { var c = new d(b); if (c.push(a, !0), c.err) throw c.msg; return c.result } function f(a, b) { return b = b || {}, b.raw = !0, e(a, b) } function g(a, b) { return b = b || {}, b.gzip = !0, e(a, b) } var h = a("./zlib/deflate"), i = a("./utils/common"), j = a("./utils/strings"), k = a("./zlib/messages"), l = a("./zlib/zstream"), m = Object.prototype.toString, n = 0, o = 4, p = 0, q = 1, r = 2, s = -1, t = 0, u = 8; d.prototype.push = function (a, b) { var c, d, e = this.strm, f = this.options.chunkSize; if (this.ended) return !1; d = b === ~~b ? b : b === !0 ? o : n, "string" == typeof a ? e.input = j.string2buf(a) : "[object ArrayBuffer]" === m.call(a) ? e.input = new Uint8Array(a) : e.input = a, e.next_in = 0, e.avail_in = e.input.length; do { if (0 === e.avail_out && (e.output = new i.Buf8(f), e.next_out = 0, e.avail_out = f), c = h.deflate(e, d), c !== q && c !== p) return this.onEnd(c), this.ended = !0, !1; 0 !== e.avail_out && (0 !== e.avail_in || d !== o && d !== r) || ("string" === this.options.to ? this.onData(j.buf2binstring(i.shrinkBuf(e.output, e.next_out))) : this.onData(i.shrinkBuf(e.output, e.next_out))) } while ((e.avail_in > 0 || 0 === e.avail_out) && c !== q); return d === o ? (c = h.deflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === p) : d === r ? (this.onEnd(p), e.avail_out = 0, !0) : !0 }, d.prototype.onData = function (a) { this.chunks.push(a) }, d.prototype.onEnd = function (a) { a === p && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = i.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg }, c.Deflate = d, c.deflate = e, c.deflateRaw = f, c.gzip = g }, { "./utils/common": 28, "./utils/strings": 29, "./zlib/deflate": 33, "./zlib/messages": 38, "./zlib/zstream": 40 }], 27: [function (a, b, c) { "use strict"; function d(a) { if (!(this instanceof d)) return new d(a); this.options = h.assign({ chunkSize: 16384, windowBits: 0, to: "" }, a || {}); var b = this.options; b.raw && b.windowBits >= 0 && b.windowBits < 16 && (b.windowBits = -b.windowBits, 0 === b.windowBits && (b.windowBits = -15)), !(b.windowBits >= 0 && b.windowBits < 16) || a && a.windowBits || (b.windowBits += 32), b.windowBits > 15 && b.windowBits < 48 && 0 === (15 & b.windowBits) && (b.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l, this.strm.avail_out = 0; var c = g.inflateInit2(this.strm, b.windowBits); if (c !== j.Z_OK) throw new Error(k[c]); this.header = new m, g.inflateGetHeader(this.strm, this.header) } function e(a, b) { var c = new d(b); if (c.push(a, !0), c.err) throw c.msg; return c.result } function f(a, b) { return b = b || {}, b.raw = !0, e(a, b) } var g = a("./zlib/inflate"), h = a("./utils/common"), i = a("./utils/strings"), j = a("./zlib/constants"), k = a("./zlib/messages"), l = a("./zlib/zstream"), m = a("./zlib/gzheader"), n = Object.prototype.toString; d.prototype.push = function (a, b) { var c, d, e, f, k, l = this.strm, m = this.options.chunkSize, o = !1; if (this.ended) return !1; d = b === ~~b ? b : b === !0 ? j.Z_FINISH : j.Z_NO_FLUSH, "string" == typeof a ? l.input = i.binstring2buf(a) : "[object ArrayBuffer]" === n.call(a) ? l.input = new Uint8Array(a) : l.input = a, l.next_in = 0, l.avail_in = l.input.length; do { if (0 === l.avail_out && (l.output = new h.Buf8(m), l.next_out = 0, l.avail_out = m), c = g.inflate(l, j.Z_NO_FLUSH), c === j.Z_BUF_ERROR && o === !0 && (c = j.Z_OK, o = !1), c !== j.Z_STREAM_END && c !== j.Z_OK) return this.onEnd(c), this.ended = !0, !1; l.next_out && (0 !== l.avail_out && c !== j.Z_STREAM_END && (0 !== l.avail_in || d !== j.Z_FINISH && d !== j.Z_SYNC_FLUSH) || ("string" === this.options.to ? (e = i.utf8border(l.output, l.next_out), f = l.next_out - e, k = i.buf2string(l.output, e), l.next_out = f, l.avail_out = m - f, f && h.arraySet(l.output, l.output, e, f, 0), this.onData(k)) : this.onData(h.shrinkBuf(l.output, l.next_out)))), 0 === l.avail_in && 0 === l.avail_out && (o = !0) } while ((l.avail_in > 0 || 0 === l.avail_out) && c !== j.Z_STREAM_END); return c === j.Z_STREAM_END && (d = j.Z_FINISH), d === j.Z_FINISH ? (c = g.inflateEnd(this.strm), this.onEnd(c), this.ended = !0, c === j.Z_OK) : d === j.Z_SYNC_FLUSH ? (this.onEnd(j.Z_OK), l.avail_out = 0, !0) : !0 }, d.prototype.onData = function (a) { this.chunks.push(a) }, d.prototype.onEnd = function (a) { a === j.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = h.flattenChunks(this.chunks)), this.chunks = [], this.err = a, this.msg = this.strm.msg }, c.Inflate = d, c.inflate = e, c.inflateRaw = f, c.ungzip = e }, { "./utils/common": 28, "./utils/strings": 29, "./zlib/constants": 31, "./zlib/gzheader": 34, "./zlib/inflate": 36, "./zlib/messages": 38, "./zlib/zstream": 40 }], 28: [function (a, b, c) { "use strict"; var d = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array; c.assign = function (a) { for (var b = Array.prototype.slice.call(arguments, 1) ; b.length;) { var c = b.shift(); if (c) { if ("object" != typeof c) throw new TypeError(c + "must be non-object"); for (var d in c) c.hasOwnProperty(d) && (a[d] = c[d]) } } return a }, c.shrinkBuf = function (a, b) { return a.length === b ? a : a.subarray ? a.subarray(0, b) : (a.length = b, a) }; var e = { arraySet: function (a, b, c, d, e) { if (b.subarray && a.subarray) return void a.set(b.subarray(c, c + d), e); for (var f = 0; d > f; f++) a[e + f] = b[c + f] }, flattenChunks: function (a) { var b, c, d, e, f, g; for (d = 0, b = 0, c = a.length; c > b; b++) d += a[b].length; for (g = new Uint8Array(d), e = 0, b = 0, c = a.length; c > b; b++) f = a[b], g.set(f, e), e += f.length; return g } }, f = { arraySet: function (a, b, c, d, e) { for (var f = 0; d > f; f++) a[e + f] = b[c + f] }, flattenChunks: function (a) { return [].concat.apply([], a) } }; c.setTyped = function (a) { a ? (c.Buf8 = Uint8Array, c.Buf16 = Uint16Array, c.Buf32 = Int32Array, c.assign(c, e)) : (c.Buf8 = Array, c.Buf16 = Array, c.Buf32 = Array, c.assign(c, f)) }, c.setTyped(d) }, {}], 29: [function (a, b, c) { "use strict"; function d(a, b) { if (65537 > b && (a.subarray && g || !a.subarray && f)) return String.fromCharCode.apply(null, e.shrinkBuf(a, b)); for (var c = "", d = 0; b > d; d++) c += String.fromCharCode(a[d]); return c } var e = a("./common"), f = !0, g = !0; try { String.fromCharCode.apply(null, [0]) } catch (h) { f = !1 } try { String.fromCharCode.apply(null, new Uint8Array(1)) } catch (h) { g = !1 } for (var i = new e.Buf8(256), j = 0; 256 > j; j++) i[j] = j >= 252 ? 6 : j >= 248 ? 5 : j >= 240 ? 4 : j >= 224 ? 3 : j >= 192 ? 2 : 1; i[254] = i[254] = 1, c.string2buf = function (a) { var b, c, d, f, g, h = a.length, i = 0; for (f = 0; h > f; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), i += 128 > c ? 1 : 2048 > c ? 2 : 65536 > c ? 3 : 4; for (b = new e.Buf8(i), g = 0, f = 0; i > g; f++) c = a.charCodeAt(f), 55296 === (64512 & c) && h > f + 1 && (d = a.charCodeAt(f + 1), 56320 === (64512 & d) && (c = 65536 + (c - 55296 << 10) + (d - 56320), f++)), 128 > c ? b[g++] = c : 2048 > c ? (b[g++] = 192 | c >>> 6, b[g++] = 128 | 63 & c) : 65536 > c ? (b[g++] = 224 | c >>> 12, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c) : (b[g++] = 240 | c >>> 18, b[g++] = 128 | c >>> 12 & 63, b[g++] = 128 | c >>> 6 & 63, b[g++] = 128 | 63 & c); return b }, c.buf2binstring = function (a) { return d(a, a.length) }, c.binstring2buf = function (a) { for (var b = new e.Buf8(a.length), c = 0, d = b.length; d > c; c++) b[c] = a.charCodeAt(c); return b }, c.buf2string = function (a, b) { var c, e, f, g, h = b || a.length, j = new Array(2 * h); for (e = 0, c = 0; h > c;) if (f = a[c++], 128 > f) j[e++] = f; else if (g = i[f], g > 4) j[e++] = 65533, c += g - 1; else { for (f &= 2 === g ? 31 : 3 === g ? 15 : 7; g > 1 && h > c;) f = f << 6 | 63 & a[c++], g--; g > 1 ? j[e++] = 65533 : 65536 > f ? j[e++] = f : (f -= 65536, j[e++] = 55296 | f >> 10 & 1023, j[e++] = 56320 | 1023 & f) } return d(j, e) }, c.utf8border = function (a, b) { var c; for (b = b || a.length, b > a.length && (b = a.length), c = b - 1; c >= 0 && 128 === (192 & a[c]) ;) c--; return 0 > c ? b : 0 === c ? b : c + i[a[c]] > b ? c : b } }, { "./common": 28 }], 30: [function (a, b, c) { "use strict"; function d(a, b, c, d) { for (var e = 65535 & a | 0, f = a >>> 16 & 65535 | 0, g = 0; 0 !== c;) { g = c > 2e3 ? 2e3 : c, c -= g; do e = e + b[d++] | 0, f = f + e | 0; while (--g); e %= 65521, f %= 65521 } return e | f << 16 | 0 } b.exports = d }, {}], 31: [function (a, b, c) { "use strict"; b.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 } }, {}], 32: [function (a, b, c) { "use strict"; function d() { for (var a, b = [], c = 0; 256 > c; c++) { a = c; for (var d = 0; 8 > d; d++) a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1; b[c] = a } return b } function e(a, b, c, d) { var e = f, g = d + c; a ^= -1; for (var h = d; g > h; h++) a = a >>> 8 ^ e[255 & (a ^ b[h])]; return -1 ^ a } var f = d(); b.exports = e }, {}], 33: [function (a, b, c) { "use strict"; function d(a, b) { return a.msg = H[b], b } function e(a) { return (a << 1) - (a > 4 ? 9 : 0) } function f(a) { for (var b = a.length; --b >= 0;) a[b] = 0 } function g(a) { var b = a.state, c = b.pending; c > a.avail_out && (c = a.avail_out), 0 !== c && (D.arraySet(a.output, b.pending_buf, b.pending_out, c, a.next_out), a.next_out += c, b.pending_out += c, a.total_out += c, a.avail_out -= c, b.pending -= c, 0 === b.pending && (b.pending_out = 0)) } function h(a, b) { E._tr_flush_block(a, a.block_start >= 0 ? a.block_start : -1, a.strstart - a.block_start, b), a.block_start = a.strstart, g(a.strm) } function i(a, b) { a.pending_buf[a.pending++] = b } function j(a, b) { a.pending_buf[a.pending++] = b >>> 8 & 255, a.pending_buf[a.pending++] = 255 & b } function k(a, b, c, d) { var e = a.avail_in; return e > d && (e = d), 0 === e ? 0 : (a.avail_in -= e, D.arraySet(b, a.input, a.next_in, e, c), 1 === a.state.wrap ? a.adler = F(a.adler, b, e, c) : 2 === a.state.wrap && (a.adler = G(a.adler, b, e, c)), a.next_in += e, a.total_in += e, e) } function l(a, b) { var c, d, e = a.max_chain_length, f = a.strstart, g = a.prev_length, h = a.nice_match, i = a.strstart > a.w_size - ka ? a.strstart - (a.w_size - ka) : 0, j = a.window, k = a.w_mask, l = a.prev, m = a.strstart + ja, n = j[f + g - 1], o = j[f + g]; a.prev_length >= a.good_match && (e >>= 2), h > a.lookahead && (h = a.lookahead); do if (c = b, j[c + g] === o && j[c + g - 1] === n && j[c] === j[f] && j[++c] === j[f + 1]) { f += 2, c++; do; while (j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && j[++f] === j[++c] && m > f); if (d = ja - (m - f), f = m - ja, d > g) { if (a.match_start = b, g = d, d >= h) break; n = j[f + g - 1], o = j[f + g] } } while ((b = l[b & k]) > i && 0 !== --e); return g <= a.lookahead ? g : a.lookahead } function m(a) { var b, c, d, e, f, g = a.w_size; do { if (e = a.window_size - a.lookahead - a.strstart, a.strstart >= g + (g - ka)) { D.arraySet(a.window, a.window, g, g, 0), a.match_start -= g, a.strstart -= g, a.block_start -= g, c = a.hash_size, b = c; do d = a.head[--b], a.head[b] = d >= g ? d - g : 0; while (--c); c = g, b = c; do d = a.prev[--b], a.prev[b] = d >= g ? d - g : 0; while (--c); e += g } if (0 === a.strm.avail_in) break; if (c = k(a.strm, a.window, a.strstart + a.lookahead, e), a.lookahead += c, a.lookahead + a.insert >= ia) for (f = a.strstart - a.insert, a.ins_h = a.window[f], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + 1]) & a.hash_mask; a.insert && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[f + ia - 1]) & a.hash_mask, a.prev[f & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = f, f++, a.insert--, !(a.lookahead + a.insert < ia)) ;); } while (a.lookahead < ka && 0 !== a.strm.avail_in) } function n(a, b) { var c = 65535; for (c > a.pending_buf_size - 5 && (c = a.pending_buf_size - 5) ; ;) { if (a.lookahead <= 1) { if (m(a), 0 === a.lookahead && b === I) return ta; if (0 === a.lookahead) break } a.strstart += a.lookahead, a.lookahead = 0; var d = a.block_start + c; if ((0 === a.strstart || a.strstart >= d) && (a.lookahead = a.strstart - d, a.strstart = d, h(a, !1), 0 === a.strm.avail_out)) return ta; if (a.strstart - a.block_start >= a.w_size - ka && (h(a, !1), 0 === a.strm.avail_out)) return ta } return a.insert = 0, b === L ? (h(a, !0), 0 === a.strm.avail_out ? va : wa) : a.strstart > a.block_start && (h(a, !1), 0 === a.strm.avail_out) ? ta : ta } function o(a, b) { for (var c, d; ;) { if (a.lookahead < ka) { if (m(a), a.lookahead < ka && b === I) return ta; if (0 === a.lookahead) break } if (c = 0, a.lookahead >= ia && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ia - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), 0 !== c && a.strstart - c <= a.w_size - ka && (a.match_length = l(a, c)), a.match_length >= ia) if (d = E._tr_tally(a, a.strstart - a.match_start, a.match_length - ia), a.lookahead -= a.match_length, a.match_length <= a.max_lazy_match && a.lookahead >= ia) { a.match_length--; do a.strstart++, a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ia - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart; while (0 !== --a.match_length); a.strstart++ } else a.strstart += a.match_length, a.match_length = 0, a.ins_h = a.window[a.strstart], a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + 1]) & a.hash_mask; else d = E._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++; if (d && (h(a, !1), 0 === a.strm.avail_out)) return ta } return a.insert = a.strstart < ia - 1 ? a.strstart : ia - 1, b === L ? (h(a, !0), 0 === a.strm.avail_out ? va : wa) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? ta : ua } function p(a, b) { for (var c, d, e; ;) { if (a.lookahead < ka) { if (m(a), a.lookahead < ka && b === I) return ta; if (0 === a.lookahead) break } if (c = 0, a.lookahead >= ia && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ia - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart), a.prev_length = a.match_length, a.prev_match = a.match_start, a.match_length = ia - 1, 0 !== c && a.prev_length < a.max_lazy_match && a.strstart - c <= a.w_size - ka && (a.match_length = l(a, c), a.match_length <= 5 && (a.strategy === T || a.match_length === ia && a.strstart - a.match_start > 4096) && (a.match_length = ia - 1)), a.prev_length >= ia && a.match_length <= a.prev_length) { e = a.strstart + a.lookahead - ia, d = E._tr_tally(a, a.strstart - 1 - a.prev_match, a.prev_length - ia), a.lookahead -= a.prev_length - 1, a.prev_length -= 2; do ++a.strstart <= e && (a.ins_h = (a.ins_h << a.hash_shift ^ a.window[a.strstart + ia - 1]) & a.hash_mask, c = a.prev[a.strstart & a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = a.strstart); while (0 !== --a.prev_length); if (a.match_available = 0, a.match_length = ia - 1, a.strstart++, d && (h(a, !1), 0 === a.strm.avail_out)) return ta } else if (a.match_available) { if (d = E._tr_tally(a, 0, a.window[a.strstart - 1]), d && h(a, !1), a.strstart++, a.lookahead--, 0 === a.strm.avail_out) return ta } else a.match_available = 1, a.strstart++, a.lookahead-- } return a.match_available && (d = E._tr_tally(a, 0, a.window[a.strstart - 1]), a.match_available = 0), a.insert = a.strstart < ia - 1 ? a.strstart : ia - 1, b === L ? (h(a, !0), 0 === a.strm.avail_out ? va : wa) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? ta : ua } function q(a, b) { for (var c, d, e, f, g = a.window; ;) { if (a.lookahead <= ja) { if (m(a), a.lookahead <= ja && b === I) return ta; if (0 === a.lookahead) break } if (a.match_length = 0, a.lookahead >= ia && a.strstart > 0 && (e = a.strstart - 1, d = g[e], d === g[++e] && d === g[++e] && d === g[++e])) { f = a.strstart + ja; do; while (d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && d === g[++e] && f > e); a.match_length = ja - (f - e), a.match_length > a.lookahead && (a.match_length = a.lookahead) } if (a.match_length >= ia ? (c = E._tr_tally(a, 1, a.match_length - ia), a.lookahead -= a.match_length, a.strstart += a.match_length, a.match_length = 0) : (c = E._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++), c && (h(a, !1), 0 === a.strm.avail_out)) return ta } return a.insert = 0, b === L ? (h(a, !0), 0 === a.strm.avail_out ? va : wa) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? ta : ua } function r(a, b) { for (var c; ;) { if (0 === a.lookahead && (m(a), 0 === a.lookahead)) { if (b === I) return ta; break } if (a.match_length = 0, c = E._tr_tally(a, 0, a.window[a.strstart]), a.lookahead--, a.strstart++, c && (h(a, !1), 0 === a.strm.avail_out)) return ta } return a.insert = 0, b === L ? (h(a, !0), 0 === a.strm.avail_out ? va : wa) : a.last_lit && (h(a, !1), 0 === a.strm.avail_out) ? ta : ua } function s(a, b, c, d, e) { this.good_length = a, this.max_lazy = b, this.nice_length = c, this.max_chain = d, this.func = e } function t(a) { a.window_size = 2 * a.w_size, f(a.head), a.max_lazy_match = C[a.level].max_lazy, a.good_match = C[a.level].good_length, a.nice_match = C[a.level].nice_length, a.max_chain_length = C[a.level].max_chain, a.strstart = 0, a.block_start = 0, a.lookahead = 0, a.insert = 0, a.match_length = a.prev_length = ia - 1, a.match_available = 0, a.ins_h = 0 } function u() { this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = Z, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new D.Buf16(2 * ga), this.dyn_dtree = new D.Buf16(2 * (2 * ea + 1)), this.bl_tree = new D.Buf16(2 * (2 * fa + 1)), f(this.dyn_ltree), f(this.dyn_dtree), f(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new D.Buf16(ha + 1), this.heap = new D.Buf16(2 * da + 1), f(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new D.Buf16(2 * da + 1), f(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0 } function v(a) { var b; return a && a.state ? (a.total_in = a.total_out = 0, a.data_type = Y, b = a.state, b.pending = 0, b.pending_out = 0, b.wrap < 0 && (b.wrap = -b.wrap), b.status = b.wrap ? ma : ra, a.adler = 2 === b.wrap ? 0 : 1, b.last_flush = I, E._tr_init(b), N) : d(a, P) } function w(a) { var b = v(a); return b === N && t(a.state), b } function x(a, b) { return a && a.state ? 2 !== a.state.wrap ? P : (a.state.gzhead = b, N) : P } function y(a, b, c, e, f, g) { if (!a) return P; var h = 1; if (b === S && (b = 6), 0 > e ? (h = 0, e = -e) : e > 15 && (h = 2, e -= 16), 1 > f || f > $ || c !== Z || 8 > e || e > 15 || 0 > b || b > 9 || 0 > g || g > W) return d(a, P); 8 === e && (e = 9); var i = new u; return a.state = i, i.strm = a, i.wrap = h, i.gzhead = null, i.w_bits = e, i.w_size = 1 << i.w_bits, i.w_mask = i.w_size - 1, i.hash_bits = f + 7, i.hash_size = 1 << i.hash_bits, i.hash_mask = i.hash_size - 1, i.hash_shift = ~~((i.hash_bits + ia - 1) / ia), i.window = new D.Buf8(2 * i.w_size), i.head = new D.Buf16(i.hash_size), i.prev = new D.Buf16(i.w_size), i.lit_bufsize = 1 << f + 6, i.pending_buf_size = 4 * i.lit_bufsize, i.pending_buf = new D.Buf8(i.pending_buf_size), i.d_buf = i.lit_bufsize >> 1, i.l_buf = 3 * i.lit_bufsize, i.level = b, i.strategy = g, i.method = c, w(a) } function z(a, b) { return y(a, b, Z, _, aa, X) } function A(a, b) { var c, h, k, l; if (!a || !a.state || b > M || 0 > b) return a ? d(a, P) : P; if (h = a.state, !a.output || !a.input && 0 !== a.avail_in || h.status === sa && b !== L) return d(a, 0 === a.avail_out ? R : P); if (h.strm = a, c = h.last_flush, h.last_flush = b, h.status === ma) if (2 === h.wrap) a.adler = 0, i(h, 31), i(h, 139), i(h, 8), h.gzhead ? (i(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0) + (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0) + (h.gzhead.comment ? 16 : 0)), i(h, 255 & h.gzhead.time), i(h, h.gzhead.time >> 8 & 255), i(h, h.gzhead.time >> 16 & 255), i(h, h.gzhead.time >> 24 & 255), i(h, 9 === h.level ? 2 : h.strategy >= U || h.level < 2 ? 4 : 0), i(h, 255 & h.gzhead.os), h.gzhead.extra && h.gzhead.extra.length && (i(h, 255 & h.gzhead.extra.length), i(h, h.gzhead.extra.length >> 8 & 255)), h.gzhead.hcrc && (a.adler = G(a.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status = na) : (i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 0), i(h, 9 === h.level ? 2 : h.strategy >= U || h.level < 2 ? 4 : 0), i(h, xa), h.status = ra); else { var m = Z + (h.w_bits - 8 << 4) << 8, n = -1; n = h.strategy >= U || h.level < 2 ? 0 : h.level < 6 ? 1 : 6 === h.level ? 2 : 3, m |= n << 6, 0 !== h.strstart && (m |= la), m += 31 - m % 31, h.status = ra, j(h, m), 0 !== h.strstart && (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), a.adler = 1 } if (h.status === na) if (h.gzhead.extra) { for (k = h.pending; h.gzindex < (65535 & h.gzhead.extra.length) && (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending !== h.pending_buf_size)) ;) i(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++; h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), h.gzindex === h.gzhead.extra.length && (h.gzindex = 0, h.status = oa) } else h.status = oa; if (h.status === oa) if (h.gzhead.name) { k = h.pending; do { if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) { l = 1; break } l = h.gzindex < h.gzhead.name.length ? 255 & h.gzhead.name.charCodeAt(h.gzindex++) : 0, i(h, l) } while (0 !== l); h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.gzindex = 0, h.status = pa) } else h.status = pa; if (h.status === pa) if (h.gzhead.comment) { k = h.pending; do { if (h.pending === h.pending_buf_size && (h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), g(a), k = h.pending, h.pending === h.pending_buf_size)) { l = 1; break } l = h.gzindex < h.gzhead.comment.length ? 255 & h.gzhead.comment.charCodeAt(h.gzindex++) : 0, i(h, l) } while (0 !== l); h.gzhead.hcrc && h.pending > k && (a.adler = G(a.adler, h.pending_buf, h.pending - k, k)), 0 === l && (h.status = qa) } else h.status = qa; if (h.status === qa && (h.gzhead.hcrc ? (h.pending + 2 > h.pending_buf_size && g(a), h.pending + 2 <= h.pending_buf_size && (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), a.adler = 0, h.status = ra)) : h.status = ra), 0 !== h.pending) { if (g(a), 0 === a.avail_out) return h.last_flush = -1, N } else if (0 === a.avail_in && e(b) <= e(c) && b !== L) return d(a, R); if (h.status === sa && 0 !== a.avail_in) return d(a, R); if (0 !== a.avail_in || 0 !== h.lookahead || b !== I && h.status !== sa) { var o = h.strategy === U ? r(h, b) : h.strategy === V ? q(h, b) : C[h.level].func(h, b); if (o !== va && o !== wa || (h.status = sa), o === ta || o === va) return 0 === a.avail_out && (h.last_flush = -1), N; if (o === ua && (b === J ? E._tr_align(h) : b !== M && (E._tr_stored_block(h, 0, 0, !1), b === K && (f(h.head), 0 === h.lookahead && (h.strstart = 0, h.block_start = 0, h.insert = 0))), g(a), 0 === a.avail_out)) return h.last_flush = -1, N } return b !== L ? N : h.wrap <= 0 ? O : (2 === h.wrap ? (i(h, 255 & a.adler), i(h, a.adler >> 8 & 255), i(h, a.adler >> 16 & 255), i(h, a.adler >> 24 & 255), i(h, 255 & a.total_in), i(h, a.total_in >> 8 & 255), i(h, a.total_in >> 16 & 255), i(h, a.total_in >> 24 & 255)) : (j(h, a.adler >>> 16), j(h, 65535 & a.adler)), g(a), h.wrap > 0 && (h.wrap = -h.wrap), 0 !== h.pending ? N : O) } function B(a) { var b; return a && a.state ? (b = a.state.status, b !== ma && b !== na && b !== oa && b !== pa && b !== qa && b !== ra && b !== sa ? d(a, P) : (a.state = null, b === ra ? d(a, Q) : N)) : P } var C, D = a("../utils/common"), E = a("./trees"), F = a("./adler32"), G = a("./crc32"), H = a("./messages"), I = 0, J = 1, K = 3, L = 4, M = 5, N = 0, O = 1, P = -2, Q = -3, R = -5, S = -1, T = 1, U = 2, V = 3, W = 4, X = 0, Y = 2, Z = 8, $ = 9, _ = 15, aa = 8, ba = 29, ca = 256, da = ca + 1 + ba, ea = 30, fa = 19, ga = 2 * da + 1, ha = 15, ia = 3, ja = 258, ka = ja + ia + 1, la = 32, ma = 42, na = 69, oa = 73, pa = 91, qa = 103, ra = 113, sa = 666, ta = 1, ua = 2, va = 3, wa = 4, xa = 3; C = [new s(0, 0, 0, 0, n), new s(4, 4, 8, 4, o), new s(4, 5, 16, 8, o), new s(4, 6, 32, 32, o), new s(4, 4, 16, 16, p), new s(8, 16, 32, 32, p), new s(8, 16, 128, 128, p), new s(8, 32, 128, 256, p), new s(32, 128, 258, 1024, p), new s(32, 258, 258, 4096, p)], c.deflateInit = z, c.deflateInit2 = y, c.deflateReset = w, c.deflateResetKeep = v, c.deflateSetHeader = x, c.deflate = A, c.deflateEnd = B, c.deflateInfo = "pako deflate (from Nodeca project)" }, { "../utils/common": 28, "./adler32": 30, "./crc32": 32, "./messages": 38, "./trees": 39 }], 34: [function (a, b, c) { "use strict"; function d() { this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1 } b.exports = d }, {}], 35: [function (a, b, c) { "use strict"; var d = 30, e = 12; b.exports = function (a, b) { var c, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C; c = a.state, f = a.next_in, B = a.input, g = f + (a.avail_in - 5), h = a.next_out, C = a.output, i = h - (b - a.avail_out), j = h + (a.avail_out - 257), k = c.dmax, l = c.wsize, m = c.whave, n = c.wnext, o = c.window, p = c.hold, q = c.bits, r = c.lencode, s = c.distcode, t = (1 << c.lenbits) - 1, u = (1 << c.distbits) - 1; a: do { 15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = r[p & t]; b: for (; ;) { if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, 0 === w) C[h++] = 65535 & v; else { if (!(16 & w)) { if (0 === (64 & w)) { v = r[(65535 & v) + (p & (1 << w) - 1)]; continue b } if (32 & w) { c.mode = e; break a } a.msg = "invalid literal/length code", c.mode = d; break a } x = 65535 & v, w &= 15, w && (w > q && (p += B[f++] << q, q += 8), x += p & (1 << w) - 1, p >>>= w, q -= w), 15 > q && (p += B[f++] << q, q += 8, p += B[f++] << q, q += 8), v = s[p & u]; c: for (; ;) { if (w = v >>> 24, p >>>= w, q -= w, w = v >>> 16 & 255, !(16 & w)) { if (0 === (64 & w)) { v = s[(65535 & v) + (p & (1 << w) - 1)]; continue c } a.msg = "invalid distance code", c.mode = d; break a } if (y = 65535 & v, w &= 15, w > q && (p += B[f++] << q, q += 8, w > q && (p += B[f++] << q, q += 8)), y += p & (1 << w) - 1, y > k) { a.msg = "invalid distance too far back", c.mode = d; break a } if (p >>>= w, q -= w, w = h - i, y > w) { if (w = y - w, w > m && c.sane) { a.msg = "invalid distance too far back", c.mode = d; break a } if (z = 0, A = o, 0 === n) { if (z += l - w, x > w) { x -= w; do C[h++] = o[z++]; while (--w); z = h - y, A = C } } else if (w > n) { if (z += l + n - w, w -= n, x > w) { x -= w; do C[h++] = o[z++]; while (--w); if (z = 0, x > n) { w = n, x -= w; do C[h++] = o[z++]; while (--w); z = h - y, A = C } } } else if (z += n - w, x > w) { x -= w; do C[h++] = o[z++]; while (--w); z = h - y, A = C } for (; x > 2;) C[h++] = A[z++], C[h++] = A[z++], C[h++] = A[z++], x -= 3; x && (C[h++] = A[z++], x > 1 && (C[h++] = A[z++])) } else { z = h - y; do C[h++] = C[z++], C[h++] = C[z++], C[h++] = C[z++], x -= 3; while (x > 2); x && (C[h++] = C[z++], x > 1 && (C[h++] = C[z++])) } break } } break } } while (g > f && j > h); x = q >> 3, f -= x, q -= x << 3, p &= (1 << q) - 1, a.next_in = f, a.next_out = h, a.avail_in = g > f ? 5 + (g - f) : 5 - (f - g), a.avail_out = j > h ? 257 + (j - h) : 257 - (h - j), c.hold = p, c.bits = q } }, {}], 36: [function (a, b, c) {
            "use strict"; function d(a) { return (a >>> 24 & 255) + (a >>> 8 & 65280) + ((65280 & a) << 8) + ((255 & a) << 24) } function e() { this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new r.Buf16(320), this.work = new r.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0 } function f(a) { var b; return a && a.state ? (b = a.state, a.total_in = a.total_out = b.total = 0, a.msg = "", b.wrap && (a.adler = 1 & b.wrap), b.mode = K, b.last = 0, b.havedict = 0, b.dmax = 32768, b.head = null, b.hold = 0, b.bits = 0, b.lencode = b.lendyn = new r.Buf32(oa), b.distcode = b.distdyn = new r.Buf32(pa), b.sane = 1, b.back = -1, C) : F } function g(a) { var b; return a && a.state ? (b = a.state, b.wsize = 0, b.whave = 0, b.wnext = 0, f(a)) : F } function h(a, b) { var c, d; return a && a.state ? (d = a.state, 0 > b ? (c = 0, b = -b) : (c = (b >> 4) + 1, 48 > b && (b &= 15)), b && (8 > b || b > 15) ? F : (null !== d.window && d.wbits !== b && (d.window = null), d.wrap = c, d.wbits = b, g(a))) : F } function i(a, b) { var c, d; return a ? (d = new e, a.state = d, d.window = null, c = h(a, b), c !== C && (a.state = null), c) : F } function j(a) { return i(a, ra) } function k(a) { if (sa) { var b; for (p = new r.Buf32(512), q = new r.Buf32(32), b = 0; 144 > b;) a.lens[b++] = 8; for (; 256 > b;) a.lens[b++] = 9; for (; 280 > b;) a.lens[b++] = 7; for (; 288 > b;) a.lens[b++] = 8; for (v(x, a.lens, 0, 288, p, 0, a.work, { bits: 9 }), b = 0; 32 > b;) a.lens[b++] = 5; v(y, a.lens, 0, 32, q, 0, a.work, { bits: 5 }), sa = !1 } a.lencode = p, a.lenbits = 9, a.distcode = q, a.distbits = 5 } function l(a, b, c, d) { var e, f = a.state; return null === f.window && (f.wsize = 1 << f.wbits, f.wnext = 0, f.whave = 0, f.window = new r.Buf8(f.wsize)), d >= f.wsize ? (r.arraySet(f.window, b, c - f.wsize, f.wsize, 0), f.wnext = 0, f.whave = f.wsize) : (e = f.wsize - f.wnext, e > d && (e = d), r.arraySet(f.window, b, c - d, e, f.wnext), d -= e, d ? (r.arraySet(f.window, b, c - d, d, 0), f.wnext = d, f.whave = f.wsize) : (f.wnext += e, f.wnext === f.wsize && (f.wnext = 0), f.whave < f.wsize && (f.whave += e))), 0 } function m(a, b) {
                var c, e, f, g, h, i, j, m, n, o, p, q, oa, pa, qa, ra, sa, ta, ua, va, wa, xa, ya, za, Aa = 0, Ba = new r.Buf8(4), Ca = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]; if (!a || !a.state || !a.output || !a.input && 0 !== a.avail_in) return F; c = a.state, c.mode === V && (c.mode = W), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, o = i, p = j, xa = C; a: for (; ;) switch (c.mode) {
                    case K: if (0 === c.wrap) { c.mode = W; break } for (; 16 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (2 & c.wrap && 35615 === m) { c.check = 0, Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0), m = 0, n = 0, c.mode = L; break } if (c.flags = 0, c.head && (c.head.done = !1), !(1 & c.wrap) || (((255 & m) << 8) + (m >> 8)) % 31) { a.msg = "incorrect header check", c.mode = la; break } if ((15 & m) !== J) { a.msg = "unknown compression method", c.mode = la; break } if (m >>>= 4, n -= 4, wa = (15 & m) + 8, 0 === c.wbits) c.wbits = wa; else if (wa > c.wbits) { a.msg = "invalid window size", c.mode = la; break } c.dmax = 1 << wa, a.adler = c.check = 1, c.mode = 512 & m ? T : V, m = 0, n = 0; break; case L: for (; 16 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (c.flags = m, (255 & c.flags) !== J) { a.msg = "unknown compression method", c.mode = la; break } if (57344 & c.flags) { a.msg = "unknown header flags set", c.mode = la; break } c.head && (c.head.text = m >> 8 & 1), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = M; case M: for (; 32 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.head && (c.head.time = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, Ba[2] = m >>> 16 & 255, Ba[3] = m >>> 24 & 255, c.check = t(c.check, Ba, 4, 0)), m = 0, n = 0, c.mode = N; case N: for (; 16 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.head && (c.head.xflags = 255 & m, c.head.os = m >> 8), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0, c.mode = O; case O: if (1024 & c.flags) { for (; 16 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.length = m, c.head && (c.head.extra_len = m), 512 & c.flags && (Ba[0] = 255 & m, Ba[1] = m >>> 8 & 255, c.check = t(c.check, Ba, 2, 0)), m = 0, n = 0 } else c.head && (c.head.extra = null); c.mode = P; case P: if (1024 & c.flags && (q = c.length, q > i && (q = i), q && (c.head && (wa = c.head.extra_len - c.length, c.head.extra || (c.head.extra = new Array(c.head.extra_len)), r.arraySet(c.head.extra, e, g, q, wa)), 512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, c.length -= q), c.length)) break a; c.length = 0, c.mode = Q; case Q: if (2048 & c.flags) { if (0 === i) break a; q = 0; do wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.name += String.fromCharCode(wa)); while (wa && i > q); if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a } else c.head && (c.head.name = null); c.length = 0, c.mode = R; case R: if (4096 & c.flags) { if (0 === i) break a; q = 0; do wa = e[g + q++], c.head && wa && c.length < 65536 && (c.head.comment += String.fromCharCode(wa)); while (wa && i > q); if (512 & c.flags && (c.check = t(c.check, e, q, g)), i -= q, g += q, wa) break a } else c.head && (c.head.comment = null); c.mode = S; case S: if (512 & c.flags) {
                        for (; 16 > n;) {
                            if (0 === i) break a; i--, m += e[g++] << n, n += 8
                        } if (m !== (65535 & c.check)) { a.msg = "header crc mismatch", c.mode = la; break } m = 0, n = 0
                    } c.head && (c.head.hcrc = c.flags >> 9 & 1, c.head.done = !0), a.adler = c.check = 0, c.mode = V; break; case T: for (; 32 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } a.adler = c.check = d(m), m = 0, n = 0, c.mode = U; case U: if (0 === c.havedict) return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, E; a.adler = c.check = 1, c.mode = V; case V: if (b === A || b === B) break a; case W: if (c.last) { m >>>= 7 & n, n -= 7 & n, c.mode = ia; break } for (; 3 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } switch (c.last = 1 & m, m >>>= 1, n -= 1, 3 & m) { case 0: c.mode = X; break; case 1: if (k(c), c.mode = ba, b === B) { m >>>= 2, n -= 2; break a } break; case 2: c.mode = $; break; case 3: a.msg = "invalid block type", c.mode = la } m >>>= 2, n -= 2; break; case X: for (m >>>= 7 & n, n -= 7 & n; 32 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if ((65535 & m) !== (m >>> 16 ^ 65535)) { a.msg = "invalid stored block lengths", c.mode = la; break } if (c.length = 65535 & m, m = 0, n = 0, c.mode = Y, b === B) break a; case Y: c.mode = Z; case Z: if (q = c.length) { if (q > i && (q = i), q > j && (q = j), 0 === q) break a; r.arraySet(f, e, g, q, h), i -= q, g += q, j -= q, h += q, c.length -= q; break } c.mode = V; break; case $: for (; 14 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (c.nlen = (31 & m) + 257, m >>>= 5, n -= 5, c.ndist = (31 & m) + 1, m >>>= 5, n -= 5, c.ncode = (15 & m) + 4, m >>>= 4, n -= 4, c.nlen > 286 || c.ndist > 30) { a.msg = "too many length or distance symbols", c.mode = la; break } c.have = 0, c.mode = _; case _: for (; c.have < c.ncode;) { for (; 3 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.lens[Ca[c.have++]] = 7 & m, m >>>= 3, n -= 3 } for (; c.have < 19;) c.lens[Ca[c.have++]] = 0; if (c.lencode = c.lendyn, c.lenbits = 7, ya = { bits: c.lenbits }, xa = v(w, c.lens, 0, 19, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) { a.msg = "invalid code lengths set", c.mode = la; break } c.have = 0, c.mode = aa; case aa: for (; c.have < c.nlen + c.ndist;) { for (; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa) ;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (16 > sa) m >>>= qa, n -= qa, c.lens[c.have++] = sa; else { if (16 === sa) { for (za = qa + 2; za > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (m >>>= qa, n -= qa, 0 === c.have) { a.msg = "invalid bit length repeat", c.mode = la; break } wa = c.lens[c.have - 1], q = 3 + (3 & m), m >>>= 2, n -= 2 } else if (17 === sa) { for (za = qa + 3; za > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } m >>>= qa, n -= qa, wa = 0, q = 3 + (7 & m), m >>>= 3, n -= 3 } else { for (za = qa + 7; za > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } m >>>= qa, n -= qa, wa = 0, q = 11 + (127 & m), m >>>= 7, n -= 7 } if (c.have + q > c.nlen + c.ndist) { a.msg = "invalid bit length repeat", c.mode = la; break } for (; q--;) c.lens[c.have++] = wa } } if (c.mode === la) break; if (0 === c.lens[256]) { a.msg = "invalid code -- missing end-of-block", c.mode = la; break } if (c.lenbits = 9, ya = { bits: c.lenbits }, xa = v(x, c.lens, 0, c.nlen, c.lencode, 0, c.work, ya), c.lenbits = ya.bits, xa) { a.msg = "invalid literal/lengths set", c.mode = la; break } if (c.distbits = 6, c.distcode = c.distdyn, ya = { bits: c.distbits }, xa = v(y, c.lens, c.nlen, c.ndist, c.distcode, 0, c.work, ya), c.distbits = ya.bits, xa) { a.msg = "invalid distances set", c.mode = la; break } if (c.mode = ba, b === B) break a; case ba: c.mode = ca; case ca: if (i >= 6 && j >= 258) { a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, u(a, p), h = a.next_out, f = a.output, j = a.avail_out, g = a.next_in, e = a.input, i = a.avail_in, m = c.hold, n = c.bits, c.mode === V && (c.back = -1); break } for (c.back = 0; Aa = c.lencode[m & (1 << c.lenbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa) ;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (ra && 0 === (240 & ra)) { for (ta = qa, ua = ra, va = sa; Aa = c.lencode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= ta + qa) ;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } m >>>= ta, n -= ta, c.back += ta } if (m >>>= qa, n -= qa, c.back += qa, c.length = sa, 0 === ra) { c.mode = ha; break } if (32 & ra) { c.back = -1, c.mode = V; break } if (64 & ra) { a.msg = "invalid literal/length code", c.mode = la; break } c.extra = 15 & ra, c.mode = da; case da: if (c.extra) { for (za = c.extra; za > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.length += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra } c.was = c.length, c.mode = ea; case ea: for (; Aa = c.distcode[m & (1 << c.distbits) - 1], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= qa) ;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (0 === (240 & ra)) { for (ta = qa, ua = ra, va = sa; Aa = c.distcode[va + ((m & (1 << ta + ua) - 1) >> ta)], qa = Aa >>> 24, ra = Aa >>> 16 & 255, sa = 65535 & Aa, !(n >= ta + qa) ;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } m >>>= ta, n -= ta, c.back += ta } if (m >>>= qa, n -= qa, c.back += qa, 64 & ra) { a.msg = "invalid distance code", c.mode = la; break } c.offset = sa, c.extra = 15 & ra, c.mode = fa; case fa: if (c.extra) { for (za = c.extra; za > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } c.offset += m & (1 << c.extra) - 1, m >>>= c.extra, n -= c.extra, c.back += c.extra } if (c.offset > c.dmax) { a.msg = "invalid distance too far back", c.mode = la; break } c.mode = ga; case ga: if (0 === j) break a; if (q = p - j, c.offset > q) { if (q = c.offset - q, q > c.whave && c.sane) { a.msg = "invalid distance too far back", c.mode = la; break } q > c.wnext ? (q -= c.wnext, oa = c.wsize - q) : oa = c.wnext - q, q > c.length && (q = c.length), pa = c.window } else pa = f, oa = h - c.offset, q = c.length; q > j && (q = j), j -= q, c.length -= q; do f[h++] = pa[oa++]; while (--q); 0 === c.length && (c.mode = ca); break; case ha: if (0 === j) break a; f[h++] = c.length, j--, c.mode = ca; break; case ia: if (c.wrap) { for (; 32 > n;) { if (0 === i) break a; i--, m |= e[g++] << n, n += 8 } if (p -= j, a.total_out += p, c.total += p, p && (a.adler = c.check = c.flags ? t(c.check, f, p, h - p) : s(c.check, f, p, h - p)), p = j, (c.flags ? m : d(m)) !== c.check) { a.msg = "incorrect data check", c.mode = la; break } m = 0, n = 0 } c.mode = ja; case ja: if (c.wrap && c.flags) { for (; 32 > n;) { if (0 === i) break a; i--, m += e[g++] << n, n += 8 } if (m !== (4294967295 & c.total)) { a.msg = "incorrect length check", c.mode = la; break } m = 0, n = 0 } c.mode = ka; case ka: xa = D; break a; case la: xa = G; break a; case ma: return H; case na: default: return F
                } return a.next_out = h, a.avail_out = j, a.next_in = g, a.avail_in = i, c.hold = m, c.bits = n, (c.wsize || p !== a.avail_out && c.mode < la && (c.mode < ia || b !== z)) && l(a, a.output, a.next_out, p - a.avail_out) ? (c.mode = ma, H) : (o -= a.avail_in, p -= a.avail_out, a.total_in += o, a.total_out += p, c.total += p, c.wrap && p && (a.adler = c.check = c.flags ? t(c.check, f, p, a.next_out - p) : s(c.check, f, p, a.next_out - p)), a.data_type = c.bits + (c.last ? 64 : 0) + (c.mode === V ? 128 : 0) + (c.mode === ba || c.mode === Y ? 256 : 0), (0 === o && 0 === p || b === z) && xa === C && (xa = I), xa)
            } function n(a) { if (!a || !a.state) return F; var b = a.state; return b.window && (b.window = null), a.state = null, C } function o(a, b) { var c; return a && a.state ? (c = a.state, 0 === (2 & c.wrap) ? F : (c.head = b, b.done = !1, C)) : F } var p, q, r = a("../utils/common"), s = a("./adler32"), t = a("./crc32"), u = a("./inffast"), v = a("./inftrees"), w = 0, x = 1, y = 2, z = 4, A = 5, B = 6, C = 0, D = 1, E = 2, F = -2, G = -3, H = -4, I = -5, J = 8, K = 1, L = 2, M = 3, N = 4, O = 5, P = 6, Q = 7, R = 8, S = 9, T = 10, U = 11, V = 12, W = 13, X = 14, Y = 15, Z = 16, $ = 17, _ = 18, aa = 19, ba = 20, ca = 21, da = 22, ea = 23, fa = 24, ga = 25, ha = 26, ia = 27, ja = 28, ka = 29, la = 30, ma = 31, na = 32, oa = 852, pa = 592, qa = 15, ra = qa, sa = !0; c.inflateReset = g, c.inflateReset2 = h, c.inflateResetKeep = f, c.inflateInit = j, c.inflateInit2 = i, c.inflate = m, c.inflateEnd = n, c.inflateGetHeader = o, c.inflateInfo = "pako inflate (from Nodeca project)"
        }, { "../utils/common": 28, "./adler32": 30, "./crc32": 32, "./inffast": 35, "./inftrees": 37 }], 37: [function (a, b, c) { "use strict"; var d = a("../utils/common"), e = 15, f = 852, g = 592, h = 0, i = 1, j = 2, k = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], l = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], m = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], n = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64]; b.exports = function (a, b, c, o, p, q, r, s) { var t, u, v, w, x, y, z, A, B, C = s.bits, D = 0, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = null, O = 0, P = new d.Buf16(e + 1), Q = new d.Buf16(e + 1), R = null, S = 0; for (D = 0; e >= D; D++) P[D] = 0; for (E = 0; o > E; E++) P[b[c + E]]++; for (H = C, G = e; G >= 1 && 0 === P[G]; G--); if (H > G && (H = G), 0 === G) return p[q++] = 20971520, p[q++] = 20971520, s.bits = 1, 0; for (F = 1; G > F && 0 === P[F]; F++); for (F > H && (H = F), K = 1, D = 1; e >= D; D++) if (K <<= 1, K -= P[D], 0 > K) return -1; if (K > 0 && (a === h || 1 !== G)) return -1; for (Q[1] = 0, D = 1; e > D; D++) Q[D + 1] = Q[D] + P[D]; for (E = 0; o > E; E++) 0 !== b[c + E] && (r[Q[b[c + E]]++] = E); if (a === h ? (N = R = r, y = 19) : a === i ? (N = k, O -= 257, R = l, S -= 257, y = 256) : (N = m, R = n, y = -1), M = 0, E = 0, D = F, x = q, I = H, J = 0, v = -1, L = 1 << H, w = L - 1, a === i && L > f || a === j && L > g) return 1; for (var T = 0; ;) { T++, z = D - J, r[E] < y ? (A = 0, B = r[E]) : r[E] > y ? (A = R[S + r[E]], B = N[O + r[E]]) : (A = 96, B = 0), t = 1 << D - J, u = 1 << I, F = u; do u -= t, p[x + (M >> J) + u] = z << 24 | A << 16 | B | 0; while (0 !== u); for (t = 1 << D - 1; M & t;) t >>= 1; if (0 !== t ? (M &= t - 1, M += t) : M = 0, E++, 0 === --P[D]) { if (D === G) break; D = b[c + r[E]] } if (D > H && (M & w) !== v) { for (0 === J && (J = H), x += F, I = D - J, K = 1 << I; G > I + J && (K -= P[I + J], !(0 >= K)) ;) I++, K <<= 1; if (L += 1 << I, a === i && L > f || a === j && L > g) return 1; v = M & w, p[v] = H << 24 | I << 16 | x - q | 0 } } return 0 !== M && (p[x + M] = D - J << 24 | 64 << 16 | 0), s.bits = H, 0 } }, { "../utils/common": 28 }], 38: [function (a, b, c) { "use strict"; b.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" } }, {}], 39: [function (a, b, c) { "use strict"; function d(a) { for (var b = a.length; --b >= 0;) a[b] = 0 } function e(a, b, c, d, e) { this.static_tree = a, this.extra_bits = b, this.extra_base = c, this.elems = d, this.max_length = e, this.has_stree = a && a.length } function f(a, b) { this.dyn_tree = a, this.max_code = 0, this.stat_desc = b } function g(a) { return 256 > a ? ia[a] : ia[256 + (a >>> 7)] } function h(a, b) { a.pending_buf[a.pending++] = 255 & b, a.pending_buf[a.pending++] = b >>> 8 & 255 } function i(a, b, c) { a.bi_valid > X - c ? (a.bi_buf |= b << a.bi_valid & 65535, h(a, a.bi_buf), a.bi_buf = b >> X - a.bi_valid, a.bi_valid += c - X) : (a.bi_buf |= b << a.bi_valid & 65535, a.bi_valid += c) } function j(a, b, c) { i(a, c[2 * b], c[2 * b + 1]) } function k(a, b) { var c = 0; do c |= 1 & a, a >>>= 1, c <<= 1; while (--b > 0); return c >>> 1 } function l(a) { 16 === a.bi_valid ? (h(a, a.bi_buf), a.bi_buf = 0, a.bi_valid = 0) : a.bi_valid >= 8 && (a.pending_buf[a.pending++] = 255 & a.bi_buf, a.bi_buf >>= 8, a.bi_valid -= 8) } function m(a, b) { var c, d, e, f, g, h, i = b.dyn_tree, j = b.max_code, k = b.stat_desc.static_tree, l = b.stat_desc.has_stree, m = b.stat_desc.extra_bits, n = b.stat_desc.extra_base, o = b.stat_desc.max_length, p = 0; for (f = 0; W >= f; f++) a.bl_count[f] = 0; for (i[2 * a.heap[a.heap_max] + 1] = 0, c = a.heap_max + 1; V > c; c++) d = a.heap[c], f = i[2 * i[2 * d + 1] + 1] + 1, f > o && (f = o, p++), i[2 * d + 1] = f, d > j || (a.bl_count[f]++, g = 0, d >= n && (g = m[d - n]), h = i[2 * d], a.opt_len += h * (f + g), l && (a.static_len += h * (k[2 * d + 1] + g))); if (0 !== p) { do { for (f = o - 1; 0 === a.bl_count[f];) f--; a.bl_count[f]--, a.bl_count[f + 1] += 2, a.bl_count[o]--, p -= 2 } while (p > 0); for (f = o; 0 !== f; f--) for (d = a.bl_count[f]; 0 !== d;) e = a.heap[--c], e > j || (i[2 * e + 1] !== f && (a.opt_len += (f - i[2 * e + 1]) * i[2 * e], i[2 * e + 1] = f), d--) } } function n(a, b, c) { var d, e, f = new Array(W + 1), g = 0; for (d = 1; W >= d; d++) f[d] = g = g + c[d - 1] << 1; for (e = 0; b >= e; e++) { var h = a[2 * e + 1]; 0 !== h && (a[2 * e] = k(f[h]++, h)) } } function o() { var a, b, c, d, f, g = new Array(W + 1); for (c = 0, d = 0; Q - 1 > d; d++) for (ka[d] = c, a = 0; a < 1 << ba[d]; a++) ja[c++] = d; for (ja[c - 1] = d, f = 0, d = 0; 16 > d; d++) for (la[d] = f, a = 0; a < 1 << ca[d]; a++) ia[f++] = d; for (f >>= 7; T > d; d++) for (la[d] = f << 7, a = 0; a < 1 << ca[d] - 7; a++) ia[256 + f++] = d; for (b = 0; W >= b; b++) g[b] = 0; for (a = 0; 143 >= a;) ga[2 * a + 1] = 8, a++, g[8]++; for (; 255 >= a;) ga[2 * a + 1] = 9, a++, g[9]++; for (; 279 >= a;) ga[2 * a + 1] = 7, a++, g[7]++; for (; 287 >= a;) ga[2 * a + 1] = 8, a++, g[8]++; for (n(ga, S + 1, g), a = 0; T > a; a++) ha[2 * a + 1] = 5, ha[2 * a] = k(a, 5); ma = new e(ga, ba, R + 1, S, W), na = new e(ha, ca, 0, T, W), oa = new e(new Array(0), da, 0, U, Y) } function p(a) { var b; for (b = 0; S > b; b++) a.dyn_ltree[2 * b] = 0; for (b = 0; T > b; b++) a.dyn_dtree[2 * b] = 0; for (b = 0; U > b; b++) a.bl_tree[2 * b] = 0; a.dyn_ltree[2 * Z] = 1, a.opt_len = a.static_len = 0, a.last_lit = a.matches = 0 } function q(a) { a.bi_valid > 8 ? h(a, a.bi_buf) : a.bi_valid > 0 && (a.pending_buf[a.pending++] = a.bi_buf), a.bi_buf = 0, a.bi_valid = 0 } function r(a, b, c, d) { q(a), d && (h(a, c), h(a, ~c)), G.arraySet(a.pending_buf, a.window, b, c, a.pending), a.pending += c } function s(a, b, c, d) { var e = 2 * b, f = 2 * c; return a[e] < a[f] || a[e] === a[f] && d[b] <= d[c] } function t(a, b, c) { for (var d = a.heap[c], e = c << 1; e <= a.heap_len && (e < a.heap_len && s(b, a.heap[e + 1], a.heap[e], a.depth) && e++, !s(b, d, a.heap[e], a.depth)) ;) a.heap[c] = a.heap[e], c = e, e <<= 1; a.heap[c] = d } function u(a, b, c) { var d, e, f, h, k = 0; if (0 !== a.last_lit) do d = a.pending_buf[a.d_buf + 2 * k] << 8 | a.pending_buf[a.d_buf + 2 * k + 1], e = a.pending_buf[a.l_buf + k], k++, 0 === d ? j(a, e, b) : (f = ja[e], j(a, f + R + 1, b), h = ba[f], 0 !== h && (e -= ka[f], i(a, e, h)), d--, f = g(d), j(a, f, c), h = ca[f], 0 !== h && (d -= la[f], i(a, d, h))); while (k < a.last_lit); j(a, Z, b) } function v(a, b) { var c, d, e, f = b.dyn_tree, g = b.stat_desc.static_tree, h = b.stat_desc.has_stree, i = b.stat_desc.elems, j = -1; for (a.heap_len = 0, a.heap_max = V, c = 0; i > c; c++) 0 !== f[2 * c] ? (a.heap[++a.heap_len] = j = c, a.depth[c] = 0) : f[2 * c + 1] = 0; for (; a.heap_len < 2;) e = a.heap[++a.heap_len] = 2 > j ? ++j : 0, f[2 * e] = 1, a.depth[e] = 0, a.opt_len--, h && (a.static_len -= g[2 * e + 1]); for (b.max_code = j, c = a.heap_len >> 1; c >= 1; c--) t(a, f, c); e = i; do c = a.heap[1], a.heap[1] = a.heap[a.heap_len--], t(a, f, 1), d = a.heap[1], a.heap[--a.heap_max] = c, a.heap[--a.heap_max] = d, f[2 * e] = f[2 * c] + f[2 * d], a.depth[e] = (a.depth[c] >= a.depth[d] ? a.depth[c] : a.depth[d]) + 1, f[2 * c + 1] = f[2 * d + 1] = e, a.heap[1] = e++, t(a, f, 1); while (a.heap_len >= 2); a.heap[--a.heap_max] = a.heap[1], m(a, b), n(f, j, a.bl_count) } function w(a, b, c) { var d, e, f = -1, g = b[1], h = 0, i = 7, j = 4; for (0 === g && (i = 138, j = 3), b[2 * (c + 1) + 1] = 65535, d = 0; c >= d; d++) e = g, g = b[2 * (d + 1) + 1], ++h < i && e === g || (j > h ? a.bl_tree[2 * e] += h : 0 !== e ? (e !== f && a.bl_tree[2 * e]++, a.bl_tree[2 * $]++) : 10 >= h ? a.bl_tree[2 * _]++ : a.bl_tree[2 * aa]++, h = 0, f = e, 0 === g ? (i = 138, j = 3) : e === g ? (i = 6, j = 3) : (i = 7, j = 4)) } function x(a, b, c) { var d, e, f = -1, g = b[1], h = 0, k = 7, l = 4; for (0 === g && (k = 138, l = 3), d = 0; c >= d; d++) if (e = g, g = b[2 * (d + 1) + 1], !(++h < k && e === g)) { if (l > h) { do j(a, e, a.bl_tree); while (0 !== --h) } else 0 !== e ? (e !== f && (j(a, e, a.bl_tree), h--), j(a, $, a.bl_tree), i(a, h - 3, 2)) : 10 >= h ? (j(a, _, a.bl_tree), i(a, h - 3, 3)) : (j(a, aa, a.bl_tree), i(a, h - 11, 7)); h = 0, f = e, 0 === g ? (k = 138, l = 3) : e === g ? (k = 6, l = 3) : (k = 7, l = 4) } } function y(a) { var b; for (w(a, a.dyn_ltree, a.l_desc.max_code), w(a, a.dyn_dtree, a.d_desc.max_code), v(a, a.bl_desc), b = U - 1; b >= 3 && 0 === a.bl_tree[2 * ea[b] + 1]; b--); return a.opt_len += 3 * (b + 1) + 5 + 5 + 4, b } function z(a, b, c, d) { var e; for (i(a, b - 257, 5), i(a, c - 1, 5), i(a, d - 4, 4), e = 0; d > e; e++) i(a, a.bl_tree[2 * ea[e] + 1], 3); x(a, a.dyn_ltree, b - 1), x(a, a.dyn_dtree, c - 1) } function A(a) { var b, c = 4093624447; for (b = 0; 31 >= b; b++, c >>>= 1) if (1 & c && 0 !== a.dyn_ltree[2 * b]) return I; if (0 !== a.dyn_ltree[18] || 0 !== a.dyn_ltree[20] || 0 !== a.dyn_ltree[26]) return J; for (b = 32; R > b; b++) if (0 !== a.dyn_ltree[2 * b]) return J; return I } function B(a) { pa || (o(), pa = !0), a.l_desc = new f(a.dyn_ltree, ma), a.d_desc = new f(a.dyn_dtree, na), a.bl_desc = new f(a.bl_tree, oa), a.bi_buf = 0, a.bi_valid = 0, p(a) } function C(a, b, c, d) { i(a, (L << 1) + (d ? 1 : 0), 3), r(a, b, c, !0) } function D(a) { i(a, M << 1, 3), j(a, Z, ga), l(a) } function E(a, b, c, d) { var e, f, g = 0; a.level > 0 ? (a.strm.data_type === K && (a.strm.data_type = A(a)), v(a, a.l_desc), v(a, a.d_desc), g = y(a), e = a.opt_len + 3 + 7 >>> 3, f = a.static_len + 3 + 7 >>> 3, e >= f && (e = f)) : e = f = c + 5, e >= c + 4 && -1 !== b ? C(a, b, c, d) : a.strategy === H || f === e ? (i(a, (M << 1) + (d ? 1 : 0), 3), u(a, ga, ha)) : (i(a, (N << 1) + (d ? 1 : 0), 3), z(a, a.l_desc.max_code + 1, a.d_desc.max_code + 1, g + 1), u(a, a.dyn_ltree, a.dyn_dtree)), p(a), d && q(a) } function F(a, b, c) { return a.pending_buf[a.d_buf + 2 * a.last_lit] = b >>> 8 & 255, a.pending_buf[a.d_buf + 2 * a.last_lit + 1] = 255 & b, a.pending_buf[a.l_buf + a.last_lit] = 255 & c, a.last_lit++, 0 === b ? a.dyn_ltree[2 * c]++ : (a.matches++, b--, a.dyn_ltree[2 * (ja[c] + R + 1)]++, a.dyn_dtree[2 * g(b)]++), a.last_lit === a.lit_bufsize - 1 } var G = a("../utils/common"), H = 4, I = 0, J = 1, K = 2, L = 0, M = 1, N = 2, O = 3, P = 258, Q = 29, R = 256, S = R + 1 + Q, T = 30, U = 19, V = 2 * S + 1, W = 15, X = 16, Y = 7, Z = 256, $ = 16, _ = 17, aa = 18, ba = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], ca = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], da = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], ea = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], fa = 512, ga = new Array(2 * (S + 2)); d(ga); var ha = new Array(2 * T); d(ha); var ia = new Array(fa); d(ia); var ja = new Array(P - O + 1); d(ja); var ka = new Array(Q); d(ka); var la = new Array(T); d(la); var ma, na, oa, pa = !1; c._tr_init = B, c._tr_stored_block = C, c._tr_flush_block = E, c._tr_tally = F, c._tr_align = D }, { "../utils/common": 28 }], 40: [function (a, b, c) { "use strict"; function d() { this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0 } b.exports = d }, {}]
    }, {}, [10])(10)
});
/**


Copyright (c) 2014 torrmal:Jorge Torres, jorge-at-turned.mobi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

try{
	var tmp = LocalFileSystem.PERSISTENT;
	var tmp = null;
}
catch(e){

	var LocalFileSystem= {PERSISTENT : window.PERSISTENT, TEMPORARY: window.TEMPORARY}; 
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
}

var DirManager = function(origin){
	this.cache = {};
	var current_object = this;

	// recursive create
	this.create_r =function(path, callback, fail, position)
	{
		position = (typeof position == 'undefined')? 0: position;
		
		var path_split 		= path.split('/');
		var new_position 	= position+1;
		var sub_path 		= path_split.slice(0,new_position).join('/');

		//Log('DirManager','mesg')('path:'+sub_path,'DirManager');
		
		
		
		var inner_callback = function(obj){
			return function(){
				Log('DirManager','mesg')('inner_callback:'+path);

				obj.create_r(path, callback, fail, new_position);
			}
		}

		
		if(new_position == path_split.length){
			this.create(sub_path, callback, fail);
		}
		else
		{
			this.create(sub_path, inner_callback(this), fail);
		}
		

	};

	this.list = function(path, success, fail){
		fail = (typeof fail == 'undefined')? Log('DirManager','crete fail'): fail;

		var template_callback = function(success){

			return 	function(entries) {
			        var i;
			        var ret = [];
			        
			        limit=entries.length;
			        	
			        
			        for (i=0; i<limit; i++) {
			            //console.log(entries[i].name);
			            ret.push(entries[i].name);

			        }
			        // console.log('LIST: '+ret);
			        success(ret);
				}
		}

		if(current_object.cache[path]){
			current_object.cache[path].readEntries(template_callback(success));
			return;
		}

		fileSystemSingleton.load(
			function(fileSystem) {
				var entry=fileSystem.root; 
				
	        	entry.getDirectory(path, {create: true, exclusive: false}, function(entry) {
	        			var directoryReader = entry.createReader();
	        			current_object.cache[path] = directoryReader;
			            directoryReader.readEntries(
			            	template_callback(success)
			            );
	        	}, function(err){
					current_object.create_r(path,function(){success([]);},fail);
					Log('DirManager','crete fail')('error creating directory');
					//fail(err);
				});
		});
	}

	this.create = function(path, callback, fail){
		fail = (typeof fail == 'undefined')? Log('DirManager','crete fail'): fail;

		fileSystemSingleton.load(function(fileSystem){
			var deferred = $.Deferred();
			var entry=fileSystem.root;
			if (origin && origin !== undefined) {
				window.resolveLocalFileSystemURL(origin, function (entry) {
					deferred.resolve(entry);
				});
			}
			else{
				deferred.resolve(entry);
			}
			
			deferred.done(function(entry) {
				entry.getDirectory(path, {create: true, exclusive: false}, function(entry) {
					//Log('FileSystem','msg')('Directory created successfuly');
					callback(entry);
				}, 
				function(err){
					Log('DirManager','crete fail')('error creating directory');
					fail(err);
				});
			});
			
		});
	};

	this.remove = function(path, success, fail){
		fail = (typeof fail == 'undefined')? Log('DirManager','crete fail'): fail;
		success = (typeof success == 'undefined')? Log('DirManager','crete fail'): success;
		
		//console.log(current_object.cache);
		delete current_object.cache[path];
		//console.log(current_object.cache);
		this.create(path, function(entry) {
			entry.removeRecursively(success, fail);
		});
	}
	
};

var Log = function(bucket, tag){
  return function(message){
    if(typeof bucket != 'undefined')
    {
      //console.log(' '+bucket+':');
    }
    if(typeof tag != 'undefined')
    {
      //console.log(' '+tag+':');
    }
    if(typeof message != 'object'){
      //console.log('       '+message);
    }
    else
    {
      //console.log(message);
    }
  };
}


var fileSystemSingleton = {
	fileSystem: false,

	load : function(callback, fail){
		fail = (typeof fail == 'undefined')? Log('FileSystem','load fail'): fail;
		if(fileSystemSingleton.fileSystem){
			callback(fileSystemSingleton.fileSystem);
			return; 
		}

		if(!window.requestFileSystem){
			return fail();
		}


		window.requestFileSystem(
			LocalFileSystem.PERSISTENT,
			0, 
			function(fileSystem){
				fileSystemSingleton.fileSystem = fileSystem;
				callback(fileSystemSingleton.fileSystem);
			}, 
			function(err){
				Log('FileSystem','load fail')('error loading file system');
				fail(err);
			}
		);
	}
};


var Log = function(bucket, tag){
  return function(message){
    if(typeof bucket != 'undefined')
    {
      console.log(' '+bucket+':');
    }
    if(typeof tag != 'undefined')
    {
      console.log(' '+tag+':');
    }
    if(typeof message != 'object'){
      console.log('       '+message);
    }
    else
    {
      console.log(message);
    }
  };
}


var fileSystemSingleton = {
	fileSystem: false,

	load : function(callback, fail){
		fail = (typeof fail == 'undefined')? Log('FileSystem','load fail'): fail;
		if(fileSystemSingleton.fileSystem){
			callback(fileSystemSingleton.fileSystem);
			return; 
		}

		if(!window.requestFileSystem){
			return fail();
		}


		window.requestFileSystem(
			LocalFileSystem.PERSISTENT,
			0, 
			function(fileSystem){
				fileSystemSingleton.fileSystem = fileSystem;
				callback(fileSystemSingleton.fileSystem);
			}, 
			function(err){
				Log('FileSystem','load fail')('error loading file system');
				fail(err);
			}
		);
	}
};

var FileManager = function(){

	

	this.get_path = function(todir,tofilename, success){
		fail = (typeof fail == 'undefined')? Log('FileManager','read file fail'): fail;
		this.load_file(
			todir,
			tofilename,
			function(fileEntry){

					var sPath = fileEntry.toURL();
					
					
					success(sPath);
			},
			Log('fail')
		);


		
	}

	this.load_file = function(dir, file, success, fail, dont_repeat){
		if(!dir || dir =='')
		{
			Log('error','msg')('No file should be created, without a folder, to prevent a mess');
			fail();
			return;
		}
		fail = (typeof fail == 'undefined')? Log('FileManager','load file fail'): fail;
		var full_file_path = dir+'/'+file;
		var object = this;
		// well, here it will be a bit of diharrea code, 
		// but, this requires to be this chain of crap, thanks to phonegap file creation asynch stuff
		// get fileSystem
		fileSystemSingleton.load(
			function(fs){
				var dont_repeat_inner = dont_repeat;
				// get file handler
				//console.log(fs.root);
				fs.root.getFile(
					full_file_path, 
					{create: true, exclusive: false}, 
					success, 

					function(error){
						
						if(dont_repeat == true){
							Log('FileManager','error')('recurring error, gettingout of here!');
							return;
						}
						// if target folder does not exist, create it
						if(error.code == 3){
							Log('FileManager','msg')('folder does not exist, creating it');
							var a = new DirManager();
      						a.create_r(
      							dir, 
      							function(){
      								Log('FileManager','mesg')('trying to create the file again: '+file);
      								object.load_file(dir,file,success,fail,true);
      							},
      							fail
      						);
							return;
						}
						fail(error);
					}
				);
			}
		);
	};

	this.download_file = function(url, todir, tofilename, success, fail){

		fail = (typeof fail == 'undefined')? Log('FileManager','read file fail'): fail;
		this.load_file(
			todir,
			tofilename,
			function(fileEntry){

					var sPath = fileEntry.toURL();

		            var fileTransfer = new FileTransfer();
		            fileEntry.remove();
		           
		            fileTransfer.download(
		                encodeURI(url),
		                sPath,
		                function(theFile) {
		                    console.log("download complete: " + theFile.toURI());
		                    success(theFile);
		                },
		                function(error) {
		                    console.log("download error source " + error.source);
		                    console.log("download error target " + error.target);
		                    console.log("upload error code: " + error.code);
		                    fail(error);
		                }
		            );


				

			},
			fail
		);

		
	};

	this.read_file = function(dir, filename, success, fail){
		// console.log(dir);
		fail = (typeof fail == 'undefined')? Log('FileManager','read file fail'): fail;
		this.load_file(
			dir,
			filename,
			function(fileEntry){
				fileEntry.file(
					function(file){
						var reader = new FileReader();

						reader.onloadend = function(evt) {
						    
						    success(evt.target.result);
						};

						reader.readAsText(file);
					}, 
					fail
				);

			},
			fail
		);
	};

	this.write_file = function(dir, filename, data, success, fail){
		fail = (typeof fail == 'undefined')? Log('FileManager','write file fail'): fail;
		this.load_file(
			dir,
			filename,
			function(fileEntry){
				fileEntry.createWriter(
					function(writer){
						Log('FileManager','mesg')('writing to file: '+filename);
						writer.onwriteend = function(evt){
							Log('FileManager','mesg')('file write success!');
							success(evt);
						}
				        writer.write(data);
					}, 
					fail
				);
			},			
			fail
		);

		//
	};


	this.remove_file = function(dir, filename, success, fail){
		var full_file_path = dir+'/'+filename;
		fileSystemSingleton.load(
			function(fs){
				
				// get file handler
				fs.root.getFile(full_file_path, {create: false, exclusive: false}, function(fileEntry){fileEntry.remove(success, fail);}, fail);
			}

		);
		//
	};
};




var ParallelAgregator = function(count, success, fail, bucket)
{
  ////System.log('success: aggregator count:'+count);
  var success_results = [];
  var fail_results = [];
  var success_results_labeled = {};
  var ini_count = 0;
  var log_func= function(the_data){
    //console.log(the_data)
  }
  var object = this;
  current_bucket = (typeof bucket == 'undefined')? 'aggregator' : bucket;
  var success_callback =  (typeof success == 'undefined')? log_func : success;
  var fail_callback = (typeof fail == 'undefined')? log_func: fail;

  

  this.success = function(label){
    return function(result){
      //System.log('one aggregator success!',current_bucket);
      ini_count++;
      success_results.push(result);
      if(!success_results_labeled[label]){
        success_results_labeled[label] = [];
      }
      success_results_labeled[label].push(result);
      //System.log('success: aggregator count:'+ini_count,current_bucket);
      object.call_success_or_fail();
    }
  };

  this.call_success_or_fail = function(){
    if(ini_count == count){
      //System.log('aggregator complete',current_bucket);
      if(success_results.length == count)
      {
        //System.log('aggregator success',current_bucket);
        success_callback(success_results_labeled);
      }
      else{
        //System.log('aggregator fail',current_bucket);
        fail_callback({success:success_results,fail:fail_results});
      }
    }
  };

  this.fail = function(result){
    //System.log('one aggregator fail!',current_bucket);
    ini_count++;
    fail_results.push(result);
    //System.log('fail: aggregator count:'+ini_count, current_bucket);
    this.call_success_or_fail();
  }
}

/**

//TEST CODE:
var start=	function(){
		

		//
		//CREATE A DIRECTORY RECURSEVLY
		var a = new DirManager(); // Initialize a Folder manager
        a.create_r('folder_a/folder_b',Log('complete/jorge'));

		//LIST A DIRECTORY 
		a.list('cosa', Log('List'));

        //REMOVE A DIRECTORY RECURSEVLY
        a.remove('folder_a/folder_b',Log('complete delte'), Log('delete fail'));

		//
		//FILES MANAGEMENT:
		//
        var b = new FileManager();
        // create an empty  FILE (simialr unix touch command), directory will be created recursevly if it doesnt exist
        b.load_file('dira/dirb/dirc','demofile.txt',Log('file created'),Log('something went wrong'));
        
        // WRITE TO A FILE
        b.write_file('dira/dirb/dirc/dird','demofile_2.txt','this is demo content',Log('wrote sucessful!'));

        // READ A FILE
        b.read_file('dira/dirb/dirc/dird','demofile_2.txt',Log('file contents: '),Log('something went wrong'));
        
        // download a file from a remote location and store it localy
        b.download_file('http://www.greylock.com/teams/42-Josh-Elman','filder_a/dwonloads_folder/','target_name.html',Log('downloaded sucess'));
       

		
}
document.addEventListener('deviceready', start, false);
*/

window.fileStorage = {
    save: function (appPath, relativePath, filename, data) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        /*var gotFileSystem = function (fileSystem) {
			if (cordova && cordova.file) {
				//var fileLocation = cordova.file.externalApplicationStorageDirectory + 'Temp';
				var fileLocation = appPath + relativePath;
				var relativeDirectory = fileLocation.replace(cordova.file.externalRootDirectory, '');
				fileLocation = fileLocation.replace('file://', '');

				new DirManager().create_r(relativeDirectory, function () {
					fileSystem.root.getDirectory(relativeDirectory, { create: true, exclusive: false }, function (dirEntry) { // Android/data/pt.alidata.goMobile2/temp
						dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
					}, fail);
				});

			} else {
				deferred.resolve();
			}
		};*/

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                new DirManager(appPath).create_r(relativePath, function () {
                    window.resolveLocalFileSystemURL(appPath + relativePath, function (dirEntry) {
                        //fileSystem.root.getDirectory(relativeDirectory, { create: true, exclusive: false }, function (dirEntry) {
                        dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
                        //}, fail);
                    });
                });

            } else {
                deferred.resolve();
            }
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        };

        var gotFileWriter = function (writer) {
            writer.onwrite = function () {
                deferred.resolve();
            };
            writer.onerror = fail;
            writer.write(data);
        }

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, data.length || 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    move: function (appPath, relativePath, origin) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var fileLocation = appPath + relativePath;
                //var relativeDirectory = fileLocation.replace(cordova.file.externalRootDirectory, '');
                //fileLocation = fileLocation.replace('file://', '');

                fileSystem.root.getDirectory(fileLocation, { create: true, exclusive: false }, function (dirEntry) {
                    //new DirManager().create_r(relativeDirectory, function () {
                    //fileSystem.root.getDirectory(fileLocation, { create: true, exclusive: false }, function (dirEntry) {
                    //	dirEntry.getFile(filename, { create: true, exclusive: false }, gotFileEntry, fail);
                    //}, fail);

                    /*window.resolveLocalFileSystemURI(origin, function(file) {
                        window.resolveLocalFileSystemURI(fileLocation, function(destination) {
                            file.moveTo(fileLocation, origin.split('/')[origin.split('/').length - 1], function (entry) {
                                //alert("New Path: " + entry.fullPath);
                            }, fail);
                        },fail);
                    },fail);*/
                    var filename = origin.split('/')[origin.split('/').length - 1];
                    var destinationURL = fileLocation + filename;

                    if (destinationURL === origin) {
                        deferred.resolve(destinationURL);
                    }
                    else {
                        window.resolveLocalFileSystemURL(origin, function (fileEntry) {
                            //window.resolveLocalFileSystemURL(fileLocation, function (dirEntry) {
                            // move the file to a new directory and rename it
                            fileEntry.moveTo(dirEntry, filename, function (entry) {
                                deferred.resolve(fileLocation + '/' + filename);
                            }, fail);
                            //}, fail);
                        }, fail);
                    }
                    //});
                }, fail);
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    load: function (name) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getFile(name, { create: false, exclusive: false }, gotFileEntry, fail);
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.file(gotFile, fail);
        };

        var gotFileWriter = function (writer) {
            reader = new FileReader();
            reader.onloadend = function (evt) {
                data = evt.target.result;
                deferred.resolve(data);
            };

            reader.readAsText(file);
        }

        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, data.length || 0, gotFileSystem, fail);
        return deferred.promise();
    },

    delete: function (name) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            fileSystem.root.getFile(name, { create: false, exclusive: false }, gotFileEntry, fail);
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.remove();
        };

        window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        return deferred.promise();
    },

    read: function (path) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                path = path.replace('file://', '');
                fileSystem.root.getDirectory(path, { create: false, exclusive: false }, function (dirEntry) {
                    // Get a directory reader
                    var directoryReader = dirEntry.createReader();
                    // Get a list of all the entries in the directory
                    directoryReader.readEntries(function (entries) {
                        var data = [];
                        for (var i = 0; i < entries.length; i++) {
                            //dirEntry.getFile(entries[i].name, { create: false, exclusive: false }, function (fileEntry) {
                            //	fileEntry.file(function (file) {
                            //		var filename = file.name;
                            //	});
                            //});
                            if (entries[i].isFile) {
                                data.push({ 'name': entries[i].name, 'nativeURL': entries[i].nativeURL, 'fullPath': entries[i].fullPath });
                            }
                        }

                        deferred.resolve(data);
                    });
                }, fail);
            } else {
                deferred.resolve();
            }
        };

        var gotFileEntry = function (fileEntry) {
            fileEntry.createWriter(gotFileWriter, fail);
        };

        var gotFileWriter = function (writer) {
            writer.onwrite = function () {
                deferred.resolve();
            };
            writer.onerror = fail;
            writer.write(data);
        }

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    read_file: function (path, filename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(path, function (dirEntry) {
                    dirEntry.getFile(filename, { create: false, exclusive: false }, function (fileEntry) {
                        deferred.resolve(fileEntry);
                    }, fail);
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    get_file: function (dataDirectory, destinationFolder, filename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {
                    new DirManager(dataDirectory).create_r(destinationFolder, function () {
                        window.resolveLocalFileSystemURL(dataDirectory + destinationFolder, function (dirEntry) {
                            dirEntry.getFile(filename, { create: true, exclusive: false }, function (fileEntry) {
                                deferred.resolve(fileEntry);
                            }, fail);
                        });
                    });
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    read_dir: function (path) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(path, function (dirEntry) {
                    dirEntry.createReader().readEntries(function (entries) {
                        deferred.resolve(entries);
                    });
                }, function (error) {
                    var destinationFolder = path.substring(path.lastIndexOf('/')).replace('/', '');
                    new DirManager(path.replace('/' + destinationFolder, '')).create_r(destinationFolder, function () {
                        deferred.resolve([]);
                    });
                });
            } else {
                deferred.resolve([]);
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve([]);
        }

        return deferred.promise();
    },
    read_dir2: function (dataDirectory, destinationFolder) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {

                window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {
                    new DirManager(dataDirectory).create_r(destinationFolder, function () {
                        window.resolveLocalFileSystemURL(dataDirectory + destinationFolder, function (dirEntry) {
                            dirEntry.createReader().readEntries(function (entries) {
                                deferred.resolve(entries);
                            });
                        });
                    });
                });

            } else {
                deferred.resolve([]);
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve([]);
        }

        return deferred.promise();
    },
    move_file: function (filepath, newpath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                window.resolveLocalFileSystemURL(filepath, function (fileEntry) {
                    window.resolveLocalFileSystemURL(newpath, function (dirEntry) {
                        fileEntry.moveTo(dirEntry, newfilename, function (fileEntry) {
                            deferred.resolve(fileEntry);
                        }, fail);
                    }, fail);
                });
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },
    move_file2: function (dataDirectory, destinationFolder, originFilePath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var destinationPath = dataDirectory + destinationFolder;

                window.resolveLocalFileSystemURL(originFilePath, function (fileEntry) {

                    window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {

                        new DirManager(dataDirectory).create_r(destinationFolder, function () {

                            //dirEntry.getDirectory(destinationFolder, {create: true, exclusive: false}, function(dirName) {
                            window.resolveLocalFileSystemURL(destinationPath, function (dirEntry) {
                                fileEntry.moveTo(dirEntry, newfilename, function (fileEntry) {
                                    deferred.resolve(fileEntry);
                                }, fail);
                            }, fail);
                            //});

                        }); // new DirManager().create_r

                    }, fail); // window.resolveLocalFileSystemURL(dataDirectory

                }, fail); // window.resolveLocalFileSystemURL(originFilePath
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    },

    copy_file: function (dataDirectory, destinationFolder, originFilePath, newfilename) {
        var deferred = $.Deferred();

        var fail = function (error) {
            deferred.reject(error);
        };

        var gotFileSystem = function (fileSystem) {
            if (cordova && cordova.file) {
                var destinationPath = dataDirectory + destinationFolder;

                window.resolveLocalFileSystemURL(originFilePath, function (fileEntry) {

                    window.resolveLocalFileSystemURL(dataDirectory, function (dirEntry) {

                        new DirManager(dataDirectory).create_r(destinationFolder, function () {

                            window.resolveLocalFileSystemURL(destinationPath, function (dirEntry) {
                                fileEntry.copyTo(dirEntry, newfilename, function (fileEntry) {
                                    deferred.resolve(fileEntry);
                                }, fail);
                            }, fail);

                        }); // new DirManager().create_r

                    }, fail); // window.resolveLocalFileSystemURL(dataDirectory

                }, fail); // window.resolveLocalFileSystemURL(originFilePath
            } else {
                deferred.resolve();
            }
        };

        if (window.requestFileSystem) {
            window.requestFileSystem(window.LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);
        } else {
            deferred.resolve();
        }

        return deferred.promise();
    }
};
function fileError(error) {
    switch (error.code) {
        case FileError.NOT_FOUND_ERR:
            alert('NOT_FOUND_ERR');
            break;
        case FileError.SECURITY_ERR:
            alert('SECURITY_ERR');
            break;
        case FileError.ABORT_ERR:
            alert('ABORT_ERR');
            break;
        case FileError.NOT_READABLE_ERR:
            alert('NOT_READABLE_ERR');
            break;
        case FileError.ENCODING_ERR:
            alert('ENCODING_ERR');
            break;
        case FileError.NO_MODIFICATION_ALLOWED_ERR:
            alert('NO_MODIFICATION_ALLOWED_ERR');
            break;
        case FileError.INVALID_STATE_ERR:
            alert('INVALID_STATE_ERR');
            break;
        case FileError.SYNTAX_ERR:
            alert('SYNTAX_ERR');
            break;
        case FileError.INVALID_MODIFICATION_ERR:
            alert('INVALID_MODIFICATION_ERR');
            break;
        case FileError.QUOTA_EXCEEDED_ERR:
            alert('QUOTA_EXCEEDED_ERR');
            break;
        case FileError.TYPE_MISMATCH_ERR:
            alert('TYPE_MISMATCH_ERR');
            break;
        case FileError.PATH_EXISTS_ERR:
            alert('PATH_EXISTS_ERR');
            break;
    }
    window.kendoMobileApplication.hideLoading();
}