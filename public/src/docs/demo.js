define(function(require){
    var $ = require('$'),
        docs = require('./index');

    var $demo;
    function demo(){
        $demo = $([
            '<div id="demo_content" class=""><div class="d_wrap">',
                '<div class="d_close f_icon"></div>',
                '<div class="d_content"></div>',
            '</div></div>'
        ].join('')).appendTo(docs.$wrap);
        $demo.find('div.d_close').click(function(){
            demo.hide();
        })
        demo.$content = $demo.find('div.d_content');
    }   
    demo.show = function(){
        if( !window.demoAction ){
            return;
        }
        !$demo && demo();
        docs.$wrap.addClass('demo_wrap');
        setTimeout(function(){
            $demo.addClass('d_open');
        }, 300)
        demo.render();
    }
    demo.hide = function(){
        docs.$wrap.removeClass('demo_wrap');
        $demo.removeClass('d_open');
    }
    demo.render = function(){
        var data = window.demoAction.item, html = {menu:'',content:''}, i=0, n = data.length;

        for( ; i<n; i++ ){
            html.menu += '<li>demo'+(i+1)+'</li>';
            html.content += '<div class="nj_s_c">'+data[i].content+'</div>';
        }
        html.menu = '<ul class="nj_s_menu clearfix">'+html.menu+'</ul>';
        html.content = '<div class="nj_s_con">'+html.content+'</div>';

        demo.$content.html(html.menu + html.content);

        require.async('lib/nojs/mods/Switch', function(Switch){
            new Switch.tab(demo.$content, {
                onChange : function(index){
                    data[index].callback && data[index].callback();
                }
            });
        })
    }

    return demo
})