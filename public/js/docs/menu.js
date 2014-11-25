/*nolure@vip.qq.com*/define("docs/menu",["lib/jquery/jquery","lib/nojs/ui","./url","../lib/nojs/mods/tree"],function(require){function a(a){var b=a.link,c=a[g.key.id];if(b){var f=i("url"),h=this.box[0].id,j=(h.substring(h.indexOf("_")+1,h.length),f||b),l=document.title,m={title:a.name,url:j};l=l.indexOf(" - ")>-1?l.split(" - ")[1]:l,d.beforeSend&&d.beforeSend(m),document.title=a.name+" - "+l,this.box.siblings(".nj_tree").find("a.current").removeClass("current"),k.load(m),e.localStorage.set("lastNode",c)}}function b(){function a(a){for(var b in a)c(b,a[b])}var b=d.options.menu;"string"==typeof b?e.getJSON(b,a):a(b)}function c(a,b){var c,d,f=b.data;if("true"!=b.disable&&f){d="menu_"+a,c=e('<div id="'+d+'" class="nj_tree"></div>'),h.append(c),c.data("id",a);var i=new g(d,{data:f,onSelect:l.onSelect,defaultNode:l.defaultNode});k.items.push(i)}}var d,e=require("lib/jquery/jquery"),f=(require("lib/nojs/ui"),require("./url")),g=require("../lib/nojs/mods/tree"),h=e("#side_menu"),i=f.setUrl,j=0,k={items:[]};f.onHashChange.push(function(a,b){var c,d=b.id,e=b.key;if(d&&("id"==e||"url"==e)&&k.items.length)for(var f=0;f<k.items.length;f++)if(c=k.items[f],c.data.all[d]){j=2,c.select(d),j=1;break}});var l={onSelect:function(b){if(!j&&i())return a.call(this,b),void(j=1);if(2==j)a.call(this,b);else{var c={id:b[g.key.id]};j&&(c.url=null),i(c),j=1}}};return k.load=function(a){a=a||d.data,e.ajax({url:a.url,type:"get",dataType:"html",headers:{noAjax:!0},success:function(b){d.$content.html(b),d.complete&&d.complete(a)}})},k.init=function(a){d=a,l.defaultNode=i()||d.options.defaultNode,d.options.treeKey&&(g.key=d.options.treeKey),b()},k}),define("docs/url",["lib/jquery/jquery"],function(require){function a(c,e){var f,g,h=location.hash.replace(/^#/,"").split("&"),i={},j="object"==d.type(c);for(c=c||"id",f=0;f<h.length;f++)h[f]&&(g=h[f].split("="),i[g[0]]=g[1]);if(j)return void a.group(d.extend({},i,c));if(e==i[c])return i[c];if(null===e)delete i[c];else{if(void 0===e)return i[c]=i[c]&&decodeURIComponent(i[c]),i[c]&&decodeURIComponent(i[c]);i[c]=e&&encodeURIComponent(e),i[c]=encodeURIComponent(i[c])}h=[];for(f in i)h.push(f+"="+i[f]);a.call&&a.call(),b(h.join("&"))}function b(a){f&&(g.document.getElementById(a)||h.append('<a id="'+a+'" style="display:block;width:1px;height:1px"></a>'),i.href="#"+a,i.click()),location.hash=a}function c(a){var b,d,e=c.hash(a.newURL),f=c.hash(a.oldURL);for(d in e)if(e[d]!=f[d]){b=d;break}if(!b)for(d in f)if(e[d]!=f[d]){b=d;break}return b}var d=require("lib/jquery/jquery"),e={},f=d.browser.ie&&parseFloat(d.browser.version)<8;if(f){var g,h=d('<iframe id="hashIframe" name="hashIframe" style="display:none;position:absolute"></iframe><a target="hashIframe"></a>').appendTo(document.body),i=h[1];g=h[0].contentWindow,h=g.document,h.open(),h.write('<a href="" style="display:block;width:100px;height:500px"></a>'),h.close(),h=d(h.body),h.css({height:"1px",overflow:"scroll"})}if(e.onHashChange=[],a.group=function(c){var d=[];for(var e in c)c[e]&&d.push(e+"="+c[e]);d=d.join("&"),"#"+d!=location.hash&&(a.call&&a.call(),b(d))},e.setUrl=a,c.hash=function(a){var b,c,d={},e=0;if(!a)return d;for(b=a.split("#")[1],b=b?b.split("&"):[];e<b.length;e++)c=b[e].split("="),d[c[0]]=c[1];return d},e.getChange=c,"undefined"!=typeof onhashchange){var j,k,l,m=e.onHashChange,n=location.href,o=function(b){for(b=b||window.event,b.oldURL=b.oldURL||n,b.newURL=b.newURL||location.href,n=b.newURL,k=m.length,l={},l.id=a(),l.key=c(b),j=0;k>j;j++)m[j](b,l)};f?d(g).on("scroll",function(a){o(a)}):window.onhashchange=o}return e}),define("lib/nojs/mods/tree",["lib/jquery/jquery"],function(require){function a(c,d){+new Date;this.box="string"==typeof c?b("#"+c):c,this.options=d=d||{},this._data=d.data,this.ajaxMode="string"==typeof this._data,a.key=b.extend({id:"id",name:"name",parent:"parent",children:"children",open:"open",link:"link"},a.key);var e=d.formatData,f="object"==b.type(e)&&"object"==b.type(e.all)&&"array"==b.type(e.level);if(d.formatData&&!function(){var a,b,c,d=e.all,f=e.level,g=f.length;for(a in d)d[a].init=1;for(a=0;g>a;a++)for(c=f[a],b=0;b<c.length;b++)c[b].init=1}(),this.data=f?e:this.ajaxMode?null:a.format(this._data),this.box.length&&(this.ajaxMode||this.data.level.length))if(this.max=d.max||a.max,this.relationChildren=0==this.options.relationChildren?!1:!0,this.relationParent=0==this.options.relationParent?!1:!0,this.radio=this.options.radio,this.ajaxMode){var g=this;this.data?this.init(null,!0,!0):a.ajax({url:this._data,tree:this,success:function(a){g.init(null,!0,!0),g.options.ajaxSuccess&&g.options.ajaxSuccess.call(g,a)}})}else this.init(null,!0,!0)}var b=require("lib/jquery/jquery");return a.key={},a.max=50,a.rootID=-1,a.ajax=function(c){c=c||{};var d=c.data,e=c.url,f=d&&d[a.key.parent];-1!=e.indexOf("?")||d||(e+="?"+a.key.parent+"="+a.rootID,f=a.rootID),b.getJSON(e,d,function(b){if(1==b.status){var d=c.tree,e=b.data;if(e&&void 0!=f){var g,h=a.key.parent;for(g=0;g<e.length;g++)e[g][h]=f}d&&e&&(d.data=a.format(e,d.data)),c.success&&c.success(e)}})},a.format=function(c,d){function e(b,c){var l,m,n,o,p,q=b.length,r=0;for(i++,l=0;q>l;l++)if(n=b[l],o=n[j.id],r++,void 0!=o&&!k[o]){if(k[o]=n,p=n[j.parent],p==a.rootID)n.level=c=0,n[f]=[];else{if(n[f]=[],!k[p]){delete k[o],r--;continue}if(k[p][f]=k[p][f]||[],k[p][f].push(o),d&&h[c])for(m=0;m<h[c].length;m++)if(h[c][m][j.id]==p){h[c][m][f]=[].concat(k[p][f]);break}n.level=c=k[p].level+1}h[c]=h[c]||[],h[c].push(k[o])}2==g&&q>r&&3>i&&e(b)}var f,g=b.type(c),h=d&&d.level?d.level:[],i=0,j=a.key,k=d&&d.all?d.all:{};return"array"==g&&c.length&&"object"==b.type(c[0])?(f=j.children,g=void 0==c[0][j.parent]?1:2,e(c,0),{all:k,level:h}):{all:k,level:h}},a.parents=function(b,c,d){var e,f=a.key.parent,g=a.key.id,h=[];if(c=c||{},b=c[b],!b)return h;for(e=b[f];(e=c[e])&&(!d||!d(e));e=e[f])h.push(e[g]);return h},a.prototype={init:function(c,d,e){var f,g,h,i,j,k,l,m,n=this,o=a.key.link,p=a.key.id,q=a.key.open,r=a.key.name,s=(a.key.parent,a.key.children),t=void 0!=c&&c!=a.rootID,u=this.data.all,v=t?u[c].level+1:0,w=t?u[c][s]:this.data.level[v],x=this.options.isCheck,y=this.ajaxMode&&this.options.level&&this.options.level-1==v,z="";t&&(u[c].init=2);{if(w.length){if(w["break"]=w["break"]||0,j="",v)for(g=0;v>g;g++)j+='<i class="line"></i>';for(f=w["break"];f<w.length;f++){if(f>=n.max+w["break"]){w["break"]+=n.max,z+='<li class="no_child more"><a href="" id="more_'+(t?c:a.rootID)+"_"+v+'" class="item" pid="'+(t?c:a.rootID)+'" data-action="more">'+j+'<i class="ico last_ico"></i><i class="folder"></i>more</a></li>';break}h=w[f],h=t?u[h]:h,k=h[p],h.init=h.init||1,z+='<li level="'+v+'">',i=h[o]?h[o]:"javascript:void(0)",l="undefined"!=typeof h[q]?'open="'+h[q]+'"':"",m=x?'<input type="checkbox" value="'+k+'" />':"",y=!h[s].length,this.ajaxMode&&(y=null,this.options.level&&this.options.level-1==v&&(y=!0),this.options.formatData&&h.ajax&&(y=!h[s].length)),z+='<a class="item'+(y?" no_child":"")+'" href="'+i+'" reallink="'+i+'" id="'+k+'" '+l+">"+j+'<i class="ico"></i>'+m+'<i class="folder"></i><span class="text">'+h[r]+"</span></a>",y||(1==h[q]||n.options.openAll?(z+='<ul data-init="true">',z+=this.init(k,!1)):z+="<ul>",z+="</ul>"),z+="</li>"}if(d){var A,B=this.box;t?(B=b(z),A=this.box.find("#"+c),A.next("ul").data("init",!0).append(B),this.addClass(A.parent())):(this.rootWrap||(this.rootWrap=b("<ul></ul>"),B.html(this.rootWrap),this.bind()),this.rootWrap.append(z),this.addClass(B,!0)),this.replaceLink(B),function(a){var b=a.find("a.item").not(".no_child");n.options.openAll&&(a.find("ul ul").show(),b.addClass("open")),b.filter(function(){return"0"==this.getAttribute("open")}).removeClass("open").next("ul").hide(),b.filter(function(){return"1"==this.getAttribute("open")}).addClass("open").next("ul").show()}(B),!this.selected&&e&&this.select(this.options.defaultNode)}return z}if(this.ajaxMode){var C=b("#"+u[c][p]);C.addClass("no_child").next("ul").remove(),C.find(".last_ico1").length&&C.find(".last_ico1").addClass("last_ico").removeClass("last_ico1")}}},bind:function(){var c,d,e,f,g=this,h=this.options.radio;this.box.off("click.tree").on("click.tree",function(i){if(f=i.target,c=b(f),d=c.parent(),"more"==c.attr("data-action")||"more"==d.attr("data-action"))c="more"==d.attr("data-action")?d:c,g.init(c.attr("pid"),!0),c.parent().remove();else if(c.hasClass("ico")&&!c.parent().hasClass("no_child"))if(c=c.parent(".item"),e=c.next("ul"),c.hasClass("open"))e&&e.is(":visible")&&e.hide(),c.removeClass("open");else{var j=c[0].id,k=g.ajaxMode,l={};2!=g.data.all[j].init&&(g.options.formatData&&g.options.formatData.all[j]&&g.options.formatData.all[j].ajax&&(k=null),l[a.key.parent]=j,k?a.ajax({url:g._data,data:l,tree:g,success:function(a){g.init(j,!0),g.data.all[j].ajax=1,g.options.ajaxSuccess&&g.options.ajaxSuccess.call(g,a,g.data.all[j])}}):g.init(j,!0)),e&&e.is(":hidden")&&e.show(),c.addClass("open")}else if(c.hasClass("folder")||c.hasClass("item")||c.hasClass("text")||c.hasClass("line")||c.hasClass("ico")){if(!g.options.onSelect)return!1;c.hasClass("item")||(c=c.parent()),g.selected==c[0].id,g.box.find("a.current").removeClass("current"),c.addClass("current"),g.options.onSelect&&g.options.onSelect.call(g,g.data.all[c[0].id]),g.selected=c[0].id}else if("input"==f.tagName.toLowerCase()&&"checkbox"==f.type){var m,n,o=c.closest("a.item").next("ul").find("input"),p=c.parents("ul");if(f.checked){if(g.options.onCheckBefore&&!g.options.onCheckBefore.call(g,g.data.all[f.value]))return!1;h&&c.closest("ul").find("input").not(f).attr("checked",!1),g.relationChildren&&o.attr("checked","checked");for(var m=0;m<p.length;m++)n=p.eq(m),(!n.find("input").not(":checked").length||h)&&g.relationParent&&n.prev("a.item").find("input").attr("checked","checked")}else g.relationChildren&&o.attr("checked",!1),g.relationParent&&p.prev("a.item").find("input").attr("checked",!1);return g.getChecked(),g.options.onCheck&&!g.options.onCheck.call(g,g.data.all[f.value],f),!0}return!1})},getChecked:function(){var a=this.box.find("input:checked");this.checked=a.length?function(){var b=[];return a.each(function(){b.push(this.value)}),b}():null},addClass:function(a,b){a=a||this.box;var c,d,e,f,g,h,i,j,k=a.find("a.item"),l=k.length;for(b&&k.eq(0).find(".ico").addClass("first_ico"),c=0;l>c;c++)if(g=k.eq(c),i=g.closest("li"),g.next("ul").length)for(!i.next().length&&g.find(".ico").addClass("last_ico1"),j=i.attr("level"),d=0;d<i.find("li").length;d++)for(h=i.find("li").eq(d).find(".line"),!i.next().length&&h.eq(j).addClass("last_line"),e=g.find(".last_line"),f=0;f<e.length;f++)h.eq(e.eq(f).index()).addClass("last_line");else!this.ajaxMode&&g.addClass("no_child"),i.next().length||g.find(".ico").addClass("last_ico")},select:function(c,d){function e(){return j.addClass("current"),i.options.onSelect&&i.options.onSelect.call(i,i.data.all[c]),i.selected=c,!1}function f(a){0>a||(n=o.eq(a),n.show().siblings("a.item").addClass("open"),f(--a))}if(c){d=d||"id";var g,h,i=this,j=this.box.find("a["+d+'="'+c+'"]').eq(0),k=this.data.all,l=a.key.parent,m=[];if(k[c]){if(!j||!j.length){if(m=a.parents(c,this.data.all,function(a){return 2==a.init}),m.length){for(g=m.length-1;g>=0;g--){for(h=k[m[g]];!h.init;)b("#more_"+h[l]+"_"+h.level).click();b("#"+m[g]).find("i.ico").click()}m=b("#"+m[0]).next()}else m=b("#"+k[c][l]).next();if(j=m.find("a["+d+'="'+c+'"]').eq(0),!j.length){for(;!k[c].init;)b("#more_"+k[c][l]+"_"+k[c].level).click();j=m.find("a["+d+'="'+c+'"]').eq(0)}}if(this.box.find("a.current").removeClass("current"),j.parents("ul").first().is(":visible"))return e();var n,o=j.parents("ul").not(":visible"),p=o.length;f(p-1),e()}}},check:function(a,c){function d(a){a&&f.data.all[a]&&(c=0==c?!1:!0,e=b("#"+a).find("input")[0],c?!e.checked&&e.click():e.checked&&e.click(),f.getChecked())}var e,f=this;"number"==typeof a||"string"==typeof a?d(a):b.each(a,function(a,b){d(b)})},open:function(a){var c;a&&this.data.all[a]&&(this.data.all[a].init="pending",c=b("#"+a),!c.hasClass("open")&&c.find(".ico").click())},replaceLink:function(a){if(b.browser.ie&&parseFloat(b.browser.version)<8){a=a||this.box;var c=a.find("a");c.each(function(){this.href=this.getAttribute("reallink",2),this.removeAttribute("reallink")})}}},a.select=function(c,d){function e(a,b){var c,d,e="";if(a&&a.length)for(c in a)d=a[c],d="string"==typeof d?m.all[d]:d,e+=g(d,b);return e}function f(a){var b,c="--";for(b=0;a>b;b++)c+="--";return c}function g(a,b){var c=d.disable&&d.disable.indexOf(a[s])>-1?'disabled="disabled"':"";return"<option "+c+' value="'+(void 0!=a[s]?a[s]:"")+'">'+(o?f(a.level):"")+a[t]+"</option>"+(o?e(a[v],b):"")}function h(f){var g,h=0,i="",l=f?m.all[f][v]:q[h];if(l.length){f&&(m.all[f].init=1),h=f?m.all[f].level+1:0,g=d.name?d.name[h]:"",i='<select name="'+g+'">',i+=0==h&&o?'<option value="'+a.rootID+'">根目录</option>':k,i+=e(l,h),i+="</select>",i=b(i),void 0!=n[h]&&(i[0].value=n[h],n[h]=null),c.append(i),x[h]=i[0];var p={};return p[w.event]=function(){j(this,h)},p.value=i.val(),w.init?x[h]=w.init(i,p):(i[0][w.event]=p[w.event],p.value&&j(i[0],h)),!d.value&&d.level&&h+1<d.level,i}}function i(b,c){function e(){q=m.level,c?c():h()}var f=b&&b[u];return l&&(!f||f&&m.all[f].ajax)?void e():void a.ajax({url:d.data,data:b,success:function(b){f&&(m.all[f].ajax=1),b&&b.length&&(m=a.format(b,m),e()),d.ajaxSuccess&&d.ajaxSuccess(b,f,m)}})}function j(a,c){var e=a[w.value],f={},g="select"==w.element?b(a):a[w.element];f[u]=e,d.onSelect&&d.onSelect(e,m),g.nextAll(g).remove(),e!=r&&m.all[e]&&(o||d.level&&c+1>=d.level||(p&&!m.all[e].init?i(f,function(){h(e)}):h(e)))}d=d||{},a.key=b.extend({id:"id",name:"name",parent:"parent",children:"children",open:"open",link:"link"},a.key);var k,l=d.formatData,m=l?l:"string"==typeof d.data?{}:a.format(d.data),n=[].concat(d.select),o=0==d.level,p="string"==typeof d.data,q=p?[]:m.level,r=void 0!=d.empty?d.empty:"",s=a.key.id,t=a.key.name,u=a.key.parent,v=a.key.children,w=b.extend(!0,{event:"onchange",value:"value",element:"select",destroy:"destroy"},d.ui),x=[];return c&&c.length&&q?(k='<option value="'+r+'">请选择</option>',h.empty=function(a){var b=d.name?d.name[a]:"",e='<select name="'+b+'">'+k+"</select>";c.append(e)},h.bind=function(){},p?i():h(),{select:function(a){"array"==b.type(a)&&a.length&&(n=a,c.empty(),h())}}):void 0},a});