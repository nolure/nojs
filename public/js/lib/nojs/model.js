/*nolure@vip.qq.com*/define("lib/nojs/model",["lib/jquery/jquery"],function(require){function syntaxParse(str,scope){function checkArgument(a){return a=$.trim(a),!a||reStr[a]||/^(\d+|this|return|true|false|var|for)$/.test(a)?!1:!0}function initMethod(a,b){if("$key"!=a){var c=model,d=a.split("."),e=d[0],f=$.trim(d.slice(-1)[0]);if(!b&&e&&!/^(\$(?:key|data)\.)/.test(e+".")&&watchKey.indexOf(e)<0&&watchKey.push(e),void 0!==c[e]||void 0===window[e])for(var g,h=0,i=d.length,j=scope,k=0;i>h&&(g=$.trim(d[h]),g&&!/^true|false&/.test(g));h++){if(("$parent"==g||"$root"==g)&&(j=c[g+"Scope"],k=h),void 0!==c[g]){if(b&&h==i-2&&"array"==$.type(c[g])&&Array.prototype[f]){var l=[d.slice(k+1,i-1).join(".")];for(var m in j.subscriber)0==m.indexOf(l[0]+".")&&l.push(m);watchKey.push({scope:j,key:l});break}}else c[g]=g!=f||b?noopMethod():void 0;c=c[g]}}}var model=scope.model,reStr={},data={watchKey:[],methods:[],vars:[]},watchKey=data.watchKey,methods=data.methods,vars=data.vars,skey="_nj_str_",akey="nj_arg_",n=0;str=str.replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,function(a){if(a){var b=skey+ ++n;return reStr[b]=a,b}}),str=str.replace(/\)\s*{[\w\W]*}/g,")"),str.replace(/([\$\w\.\+\-\*\/\%\!:\?]+)\s*\(/g,function(a,b){methods.indexOf(b)<0&&methods.push(b)}),str=str.replace(/\(([\s\w\$\(\),\.\+\-\*\/\%\!:\?=]*)\)/g,function(a,b){b=b.split(/[,\+\-\*\/\%\!:\?=]/),b.forEach(function(a){a=a.replace(/^\(|\)$/,""),a.indexOf("(")>0&&(a=a.split("("),methods.indexOf(a[0])<0&&methods.push(a[0]),a=a[1]),a=$.trim(a),checkArgument(a)&&vars.indexOf(a)<0&&vars.push(a)});var c=";"+akey+ ++n+";";return reStr[c]=a,c}),str=str.split(";");var regCompute=/[\+\-\*\/%\!=\?:<>\s]/,validStr=/[\$\w\.\+\-\*\/%\!=\?:<>]+/,keyword=/^(\$(?:parent|root)\.)/;str.forEach(function(a,b){if(str[b]=a=$.trim(a),a&&!reStr[";"+a+";"]&&validStr.test(a)&&!(methods.indexOf(a)>=0&&reStr[";"+str[b+1]+";"])){var c=a.split(regCompute);c.forEach(function(a){a=$.trim(a),checkArgument(a)&&vars.indexOf(a)<0&&methods.indexOf(a)<0&&vars.push(a)})}}),methods.forEach(function(a){initMethod(a,!0)});for(var i=0,n=vars.length,name;n>i;i++)name=vars[i]=vars[i].replace(/^this\./,""),checkArgument(name)?initMethod(name):(vars.splice(i,1),i--,n--);str=str.join(";");for(var i in reStr)str=str.replace(eval("/"+i+"/g"),reStr[i]);return data.str=str,data}function syntaxInitialize(a,b,c){return a&&b?a.$syntax?a.$syntax:a.$syntax=syntaxParse(b,c):void 0}function getAllChildren(a,b){function c(a){if(a&&a.length)for(var b,e=0,f=a.length;f>e;e++)b=a[e],d(b),1==b.nodeType&&c(b.childNodes)}function d(a){if(b.filter){var c=b.filter(a);c&&(e=e.concat(c))}else e.push(a)}b=b||{};var e=[];return a?(b.andSelf&&d(a),c("array"==$.type(a)?a:a.childNodes),e):e}function Module(el,model,options){this.element=el;var $el=$(el);this.options=options=options||{},this.models=[],this.subscriber={};var self=this,_model=model,modelType=$.type(model);"function"!=typeof model&&(model=function(){if(this.$data=_model,this.$key=options.$key,"object"==modelType)for(var a in _model)this[a]=_model[a]}),model.prototype.$set=function(a,b){for(var c=this,d=0,e=a.split("."),f=e.length,g=e.slice(-1);f-1>d;d++){if(!c)return;c=c[e[d]]}if("function"==typeof c[g]){var h=slice.call(arguments,1,arguments.length);return"array"==$.type(c)?Array.prototype[g].apply(c,h):c[g].apply(null,h),void self.apply(e.splice(0,f-1).join("."))}c[g]=b,self.apply(a)},this.model=new model(this);var parent=this.options.$parent||this;this.model.$parent=parent.model,this.model.$parentScope=parent,this.domID={};var items=$el.find("[nj-item]");items.each(function(){self.models.push(self.createModel(this))});var clicks=$el.find("[nj-click]");clicks.each(function(){var str=$(this).attr("nj-click");this.onclick=function(e){var data=syntaxInitialize(this,str,self),watchKey=data.watchKey;with(self.model.$event=e,self.model)try{eval(this.$syntax.str)}catch(e){console.error(e)}watchKey.forEach(function(a){if("string"==typeof a)return void self.apply(a);var b=a.scope;a.key.forEach(function(a){b.apply(a)})}),e.preventDefault()}}),this.getSubscriber(el);for(var i in this.subscriber)this.apply(i)}var $=require("lib/jquery/jquery"),slice=Array.prototype.slice,validNode=/{{\s*([\$\w\.\+\-\*\/\%\!:\?\d''""<>&\(\),\s=]+)\s*}}/,validNodes=/{{\s*([\$\w\.\+\-\*\/\%\!:\?\d''""<>&\(\),\s=]+)\s*}}/g,noopMethod=function(){return function(){}};return Module.prototype={createModel:function(el){function setDefault(){}var self=this,tagName=el.tagName.toLowerCase(),isFormElement=/input|select|textarea/.test(tagName),key=$(el).attr("nj-item"),id=+new Date,model={id:id,element:el,key:key};if(this.domID[id]=el,isFormElement){this.pushSubscriber(el,key,{writeAll:!0}),el.$scope=this.model;var checkbox="checkbox"==el.type,_key=key;if("radio"==el.type){if(el.checked)with(self.model)eval(_key+'="'+el.value+'"')}else if(/^select/.test(el.type)){var selectVal=el.value||el.options[0].value;with(el.value=selectVal,self.model)eval(_key+'="'+selectVal+'"')}$(el).on("change keydown",function(){var v=this;setTimeout(function(){var val=v[checkbox?"checked":"value"];with(self.model)eval(checkbox?_key+"="+val:_key+'="'+val+'"'),self.model.$data&&($data[_key]=val);self.apply(key,v)},0)})}return model},getSubscriber:function(a,b){a=a||this.element,b=b||this.model;var c=this,d=getAllChildren(a,{filter:function(a){return c.getValidSubscribe(a)}});d.forEach(function(a){var d=[],e=a.value||a.nodeValue;e.replace(validNodes,function(a,b){b&&d.indexOf(b)<0&&d.push(b)}),c.pushSubscriber(a,d,null),a.$scope=b})},getValidSubscribe:function(a){var b=this,c=[],d=a.nodeType,e=1==d;if(a.$filter||e&&/script|style/.test(a.tagName.toLowerCase()))return c;if(a.$filter=1,1==d){var f=slice.call(a.attributes,0);f.forEach(function(b){validNode.test(b.value)&&(b.$parentElement=a,c.push(b))});var g=e&&a.getAttribute("nj-each");if(g){var h=/^\s*([\$\w]+)\s*$/.exec(g);if(!h)return c;childNodes=slice.call(a.childNodes,0);var i=childNodes,j=document.createComment(h[1]+" each");return i.push(j),getAllChildren(a).forEach(function(a){a.$filter=1}),a.innerHTML="",a.$each={templete:i,models:[]},b.pushSubscriber(a,h[1]),c}}else if(3==d){var k=$.trim(a.nodeValue);validNode.test(k)&&("textarea"==a.parentNode.type&&(a=a.parentNode),c.push(a))}return c},pushSubscriber:function(node,key,data,subScope){function push(a){a.replace(rKey,function(b,c){"parent"==c&&self.options.$parent.pushSubscriber(node,a.replace(rKey,""))}),subScope[a]=subScope[a]||[],data=$.extend({node:node,value:value,vars:vars||[a]},data),subScope[a].push(data)}if(key){var self=this,value=node.value||node.nodeValue,_key=key,keyType=$.type(key),rKey=/^\$(data|parent|root)\./;if(subScope=subScope||this.subscriber,"string"==keyType||data&&data.writeAll)return void push(key);"array"==$.type(key)&&(key=key.join(";"));var d=syntaxInitialize(node,key,this),vars=d?d.vars:[],methods=d?d.methods:[];vars.forEach(push),methods.forEach(function(k){var fnStr;with(self.model)fnStr=eval(k);if("function"==typeof fnStr){fnStr=fnStr.toString().replace(/(?:^function\s*\(\){)|(?:}$)/g,""),fnStr=$.trim(fnStr).replace(/[\r\n]/g,";");var vars=syntaxParse(fnStr,self).vars;vars.forEach(function(a){push(a)})}})}},apply:function(key,notApply){if(key&&this.model){var self=this,subscriber=this.subscriber[key]||[],value;with(this.model)value=eval(key);var valueType=$.type(value),observableArray=/array|object/.test(valueType),_key=key.split(".");for(var i in this.subscriber)0==i.indexOf(key+".")&&this.apply(i);void 0!==this.model.$key&&this.model.$parentScope!==this&&key.indexOf("$")<0&&notApply&&this.model.$parentScope.apply(this.options.$arrayName,notApply),subscriber.forEach(function(item){var node=item.node;if(node!==notApply&&"radio"!=node.type){if(observableArray&&node.$each)return void self.applyArray(node,key);var type=node.nodeType;if(item.writeAll)node.value=value;else{var text=item.value||node.value,reg;if(!text)return;var $val;if(text.replace(validNodes,function(a,b){var scope=node.$scope||self.model;with(reg=eval("/{{\\s*"+b.replace(/([\$\.\/\+\-\*\/\%\?:\(\),])/g,"\\$1")+"\\s*}}/g"),scope){$val=eval(b);try{}catch(e){}}void 0!==$val&&(text=text.replace(reg,$val))}),2==type){var attrName=node.name,parentNode;if(/checked|disabled|readonly|multiple|selected/.test(attrName))return parentNode=node.$parentElement,void parentNode[$val?"setAttribute":"removeAttribute"](attrName,attrName)}node[1==type||2==type?"value":"nodeValue"]=text}}})}},applyArray:function(a,b){function c(a,c,d){var g=[];i.forEach(function(a){var b=a.cloneNode(!0);d.appendChild(b),g.push(b)}),f.models.splice("array"==h?c:f.models.length,0,new Module(g,a,{$key:"array"==h?parseInt(c):c,$parent:e,$arrayName:b}))}if(a.$each){var d,e=this,f=a.$each,g=e.model[b],h=$.type(g),i=f.templete,j=f.models.length;if(j){if("object"==h){for(var b,k=[],l=0;j>l;l++)if(d=f.models[l],b=d.model.$key,void 0!==g[b])k.push(b);else{f.models.splice(l,1);var m=d.element;m.forEach(function(b){a.removeChild(b)}),l--,j--}for(var l in g)if(k.indexOf(l)<0){var n=document.createDocumentFragment();c(g[l],l,n),a.insertBefore(n,a.childNodes[i.length*j])}return}for(var o=g.length>j,p=Math.max(g.length,j),l=0;p>l;l++)if(d=f.models[l]){if(d.model.$key!=l&&(d.model.$key=l,d.apply("$key")),d.model.$data!==g[l])if(o){var n=document.createDocumentFragment();c(g[l],l,n),a.insertBefore(n,a.childNodes[i.length*l])}else{f.models.splice(l,1);var m=d.element;m.forEach(function(b){a.removeChild(b)}),l--,p--}}else{var n=document.createDocumentFragment();c(g[l],l,n),a.insertBefore(n,a.childNodes[i.length*l])}}else{var n=document.createDocumentFragment();for(var l in g)c(g[l],l,n);a.appendChild(n)}}}},{module:function(a,b){var c=$(document.body).find('[nj-module="'+a+'"]')[0];return new Module(c,b).model}}});