/*nolure@vip.qq.com*/define("pj/test",["lib/jquery/jquery"],function(require){function a(a){return a*Math.random()}function b(){return document.createElement("canvas")}function c(){var b,c,d,e;for(x+=.01,c=Math.sin(x),b=0;s>b;b++)e=w[b],d=Math.sin(4*x+b),e[1]+=e[2]/2+(2+d),e[0]+=6*(c+d/2)/(10/e[2]),e[1]>k&&(e[1]=-v,e[0]=a(j)),(e[0]>j||e[0]<-v)&&(e[0]=c>0?-v:j),w[b]=e}function d(){var b,c;for(c=0;s>c;c++)b=.6*s>c?0:.8*s>c?1:.9*s>c?2:.98*s>c?3:4,w[c]=[a(j),a(k),b]}function e(){j=window.innerWidth,k=window.innerHeight,void 0!==p&&(p.width=j,p.height=k,s=j*k/6e3,r=q.createLinearGradient(0,0,0,k),d())}function d(){var b,c;for(c=0;s>c;c++)b=.6*s>c?0:.8*s>c?1:.9*s>c?2:.98*s>c?3:4,w[c]=[a(j),a(k),b]}function f(){var a;for(q.fillStyle=r,q.clearRect(0,0,j,k),q.beginPath(),a=0;s>a;a++)q.drawImage(u[w[a][2]],w[a][0],w[a][1]);q.fill(),c()}function e(){j=window.innerWidth,k=window.innerHeight,void 0!==p&&(p.width=j,p.height=k,s=j*k/6e3,r=q.createLinearGradient(0,0,0,k),d())}function g(){var a=!1;try{document.createElement("canvas").getContext("2d"),a=t.browser.ie?11<=parseInt(t.browser.version)?!0:!1:!0}catch(c){}return a?(window.addEventListener("resize",e,!1),p=document.createElement("canvas"),p.style.position="fixed",p.style.top="0px",p.style.left="0px",p.style.zIndex=5e3,p.style.pointerEvents="none",p.id="canvas_snow",document.body.appendChild(p),q=p.getContext("2d"),q.strokeStyle="none",l=b(),c=b(),m=b(),n=b(),o=b(),u=[l,c,m,n,o],i({canvas:l,width:.4*v,height:.4*v,color:"#FFF",soft:.05}),i({canvas:c,width:.5*v,height:.5*v,color:"#FFF",soft:.05}),i({canvas:m,width:.6*v,height:.6*v,color:"#FFF",soft:.3}),i({canvas:n,width:.8*v,height:.8*v,color:"#FFF",soft:.2}),i({canvas:o,width:v,height:v,color:"#FFF",soft:.05}),e(null),void(snowTimer=setInterval(function(){y(f)},50))):!1}function h(a,b){var c,d,e;return a=a.replace(/^s*#|s*$/g,""),3===a.length&&(a=a.replace(/([0-9a-fA-F])/g,"$1$1")),d=parseInt(a.substr(2,2),16),e=parseInt(a.substr(4,2),16),c=parseInt(a.substr(0,2),16),"rgba("+c+", "+d+", "+e+", "+b+")"}function i(a){var b,c,d,e,f,g,i,j,k;d=a.width||30,e=a.height||30,f=d/2,g=e/2,j=a.color||"#FFF",i=a.soft||0,b=a.canvas,b.width=d,b.height=d,c=b.getContext("2d"),c.clearRect(0,0,d,e),k=c.createRadialGradient(f,g,0,f,g,f),k.addColorStop(0,j),k.addColorStop(.1,j),k.addColorStop(.85,h(j,i)),k.addColorStop(1,h(j,0)),c.fillStyle=k,c.fillRect(0,0,d,e)}var j,k,l,m,n,o,p,q,r,s,t=require("lib/jquery/jquery"),u=[],v=20,w=[],x=0,y=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,62.5)}}();g()});