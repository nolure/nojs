/*nolure@vip.qq.com*/define("lib/nojs/mods/layer",["lib/jquery/jquery","lib/nojs/ui"],function(require){var a=require("lib/jquery/jquery"),b=require("lib/nojs/ui"),c={};return c.overlay=function(d){d=a.extend(!0,{},b.config.overlay,d),d.className=[d.className||"",d.name||""].join(" ");var e=(d.parent?window.parent:window).document;d.insertTo="body"==d.insertTo?e.body:a(e).find(d.insertTo),c.overlay.baseConstructor.call(this,d),this.visible=!1,this.content=null,this.arrow=this.options.arrow,this.timeout=this.options.timeout,this.onShow=this.options.onShow,this.onHide=this.options.onHide,c.overlay.item.push(this),this.init()},b.config.overlay=a.extend({showClassName:"nj_overlay_show",insertTo:"body"},b.config.overlay),b.extend(c.overlay,b.align),b.extend.proto(c.overlay,{set:function(a,b,c){"content"==b?(this.content.empty().append(c),this.options.onContent&&this.options.onContent.call(this,c)):a.call(this,c)}}),c.overlay.item=[],c.overlay.hide=function(){for(var a=c.overlay.item,b=a.length,d=0;b>d;d++)a[d].hide()},c.overlay.prototype.init=function(){this.element=a('<div class="v_hide d_show nj_overlay '+this.options.className+'"><div class="nj_overlay_wrap"></div></div>').appendTo(this.options.insertTo),this.content=this.element.find(".nj_overlay_wrap"),this.arrow&&(this.arrow.element=a('<div class="nj_overlay_arrow"></div>').appendTo(this.element),this.arrow.offset=this.arrow.offset||[0,0]),this._effect=new b.effect(this.element,this.options.effect),this.bind()},c.overlay.prototype.show=function(a){if(!this.visible){var b=this;return this.element.addClass(this.options.showClassName),this.timeout&&(this.autoHide=setTimeout(function(){b.hide()},this.timeout)),this._effect.show(),this.visible=!0,this.set(),a&&a.call(this),void(this.onShow&&this.onShow.call(this))}},c.overlay.prototype.hide=function(a){this.visible&&(this._effect.hide(),this.element.removeClass(this.options.showClassName),this.autoHide=clearTimeout(this.autoHide),this.visible=!1,a&&a.call(this),this.onHide&&this.onHide.call(this))},c.overlay.prototype.on=function(c){c=c||{};var d,e,f,g,h,i,j=this,k=c.mode||b.config.eventType,l="array"==a.type(c.element)&&c.element.length>1,m=!!this.nearby,n=b.dom(l?c.element[0]:c.element)||this.nearby,o=this.options.hoverClass||"nj_overlay_show";if(n){d="mouseover"==k,i=d?" mouseout":"",e=function(b){var f,k,p,q;if(l){if(f=b.target,k=f.tagName.toLowerCase(),q=c.element[1],p=typeof q,"function"==p)q=q.call(f,k);else if("string"==p){if(q=a(f).closest(q),!q.length)return}else q=null;if(!q)return;var r=a("boolean"==typeof q?f:q);j.visible&&j.set("align",{nearby:r}),j.visible&&j.nearby.removeClass(o),j.nearby=r}else m||(n.length>1&&j.hide(),j.nearby=a(this));q=a(this),d?(h=clearTimeout(h),g=setTimeout(function(){l||m||(j.nearby=q),e.e()},50)):!i&&j.visible?j.hide():e.e(),b.preventDefault(),d||c.stopBubble===!1||b.stopPropagation()},e.e=function(){j.show(),j.nearby.addClass(o),c.callback&&c.callback.call(j)},f=function(a){a.stopPropagation(),i?!function(){g=clearTimeout(g),h=setTimeout(function(){j.hide()},10)}():j.hide()};var p=this.onHide;this.onHide=function(){p&&p.call(this),j.nearby&&j.nearby.removeClass(o)},n.on(k,e),i&&n.on(i,f),!d&&!function(){a(document).on(k,f),j.element.on(k,function(a){a.stopPropagation()})}(),d&&this.element.hover(function(){h=clearTimeout(h)},f)}},c.overlay.prototype.destroy=function(){this.element.remove()},c.mask=function(){function c(){h=a('<div id="nj_layer" class="nj_layer"></div>').appendTo(document.body),a.browser.ie&&6==parseInt(a.browser.version)&&(S=function(){h.css({width:g.width(),height:g.height()})},S(),g.on("scroll resize",S),new b.align({element:h})),a.onScroll(h[0]),i.element=h,f=new b.effect(h)}function d(){!document.getElementById("nj_layer")&&c(),h.addClass("nj_layer_show"),f.show()}function e(){h&&f&&(h.removeClass("nj_layer_show"),f.hide())}var f,g=a(window),h=a("#nj_layer"),i={show:d,hide:e};return i}(),c.popup=function(d){d=a.extend(!0,{},b.config.popup,d),d.name=["nj_win",d.name||""].join(" "),d.nearby=d.nearby||(d.parent?window.parent:window),c.popup.baseConstructor.call(this,d),this.theme=d.themeItem[d.theme],this.close=null,this.title=null,this.operating=null,this.mask=0==d.mask?!1:!0,this.bindEsc=0==d.bindEsc?!1:!0,this.onShow=d.onShow,this.onHide=d.onHide,this.create()},b.config.popup={themeItem:{"default":{button:{base:"nj_btn",submit:"n_b_sb"}}},width:400,theme:"default",className:"drop_pop",showClassName:"drop_pop_show"},b.extend(c.popup,c.overlay),b.extend.proto(c.popup,{set:function(a,b,c){if("title"==b)c&&this.title.html(c).show();else if("button"==b){if(this.button=[],this.operating.empty()[c?"show":"hide"](),c)for(var d=0;d<c.length;d++)this.addBtn.apply(this,c[d])}else a.call(this,b,c)},show:function(a,b){this.visible||(this.mask&&c.mask.show(),a.call(this,b),this.bindEsc&&!c.popup.focus[this.key]&&(c.popup.focus[this.key]=this))},hide:function(b,d){if(this.visible){var e=this,f=this.mask;(!this.onbeforehide||this.onbeforehide())&&(b.call(e,d),this.mask&&a.each(c.popup.item,function(){return this.key!=e.key&&this.visible&&this.mask?(f=!1,!1):void 0}),f&&c.mask.hide(),delete c.popup.focus[this.key])}}}),c.popup.prototype.create=function(){var d=this,e="nj_popup_"+ +new Date;c.popup.item[e]=this,this.key=e,this.set("content",['<span class="win_close nj_ico n_i_close">×</span><div class="win_tit"></div>','<div class="win_con clearfix"></div>','<div class="win_opt"></div>'].join("")),this.content.addClass("win_wrap"),this.options.fullScreen?(this.element.css({width:"100%",height:"100%"}),this.position={top:0,left:0},this.element.addClass("full_pop"),this.layer=null):this.element.css({width:this.options.width}),this.element[0].id=e,this.close=this.element.find(".win_close"),this.title=this.element.find(".win_tit").hide(),this.content=this.element.find(".win_con"),this.operating=this.element.find(".win_opt").hide(),this.close.on(b.config.clickEvent,function(){d.hide()}),this.bindEsc&&!c.popup.bind.init&&c.popup.bind(),a.onScroll(this.element[0])},c.popup.prototype.addBtn=function(c,d,e){if(void 0!==c){this.operating.is(":hidden")&&this.operating.show(),this.button=this.button||[];var f=this,g="string"==typeof c&&/[<>]/.test(c),h=a(g?c:'<a href=""></a>'),e=e?e:"",i=this.theme.button||{};"string"==typeof d&&"close"!=d&&(e=d,d=null),!g&&h.attr({"class":"no"==e?"":i.base+" "+(i[e]||"")}),!g&&h.html(c),this.operating.append(h),this.button.push(h),d&&(d="close"==d?function(){f.hide()}:d,h.on(b.config.clickEvent,function(){return d.call(f),!1}))}},c.popup.item={},c.popup.clear=function(a){function b(a){a.self.remove(),a=null}if(a){var d=c.popup.item[a];d&&b(d)}else{for(var e in c.popup.item)b(c.popup.item[e]);c.popup.item={},c.msg.win=null}},c.popup.focus={},c.popup.bind=function(){c.popup.bind.init||(c.popup.bind.init=!0,a(document).on("keydown",function(a){if(27==a.keyCode){var b,d;for(b in c.popup.focus)d=c.popup.focus[b];d&&d.bindEsc&&d.visible&&d.hide()}}))},c.msg=function(){var d={};return b.config.msg={width:null},{show:function(e,f,g){var h="confirm"==e;g=a.extend(!0,{title:h&&"温馨提醒：",bindEsc:h?!0:!1,timeout:1500,mask:h?null:!1},b.config.msg,g);var i=g.button,j=d[e];return this.hide(!0),f=f||"","loading"==e?f=f||"正在处理请求,请稍候……":h&&(i=i||[["确定",function(){j.hide(function(){"function"==typeof g.ok&&g.ok.call(this)})},"submit"],["取消","close"]]),j&&a("#"+j.key).length||(g.name="msg_tip_win msg_tip_"+e+" "+(g.name||""),j=new c.popup(g),j.set("title",g.title),j.set("content",'<div class="con clearfix"><i class="tip_ico nj_ico n_i_'+(h?"warn":e)+'">'+(b.config.iconText[e]||"")+'</i><span class="tip_con"></span></div>'),d[e]=j,h&&(j.onShow=function(){c.mask.element.addClass("higher_layer")},j.onHide=function(){c.mask.element.removeClass("higher_layer")})),j.timeout=h||"loading"==e||g.reload?0:g.timeout,g.reload&&setTimeout(function(){g.reload===!0?location.reload():"string"==typeof g.reload&&(location.href=g.reload)},1500),!i&&j.operating.hide().empty(),j.set("button",i),j.content.find(".tip_con").html(f),j.show(),h&&j.button[0].focus(),j},hide:function(a){for(var b in d)a&&d[b].element.addClass("v_hide"),d[b].hide()}}}(),c});