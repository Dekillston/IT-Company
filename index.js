var module_export = undefined;
//
HTMLElement.prototype.load = async function(...arg) { // Загрузить
    var data = await new Promise(r => {
        $.get('./'+arg.join('/')+'/'+arg[arg.length-1]+'.html', function(data) {
            r(data);
        });
    });
    //
    data = data.split('_dirhtml_').join('./'+arg.join('/'));
    //
    $(this).append(data);
    //
    const new_module_export = module_export; module_export = undefined;
    //
    return new_module_export;
};
//
(() => { // DOMContentLoaded
    var mass = [];
    //
    document.addEventListener('DOMContentLoaded', function() {
        mass.forEach(m => {m();});
    });
    //
    window.DOMContentLoaded = (fun) => {mass.push(fun)}
})();
//
DOMContentLoaded(() => { const screenNormal = 1920;
    //
    const zoomBool = (() => { // Узнать работает ли zoom
        const blockZoom = document.createElement('div');
        //
        blockZoom.style = 'width: 1px; opacity: 0; position: fixed;top: 0px;left: 0px;';
        //
        document.body.appendChild(blockZoom);
        //
        const w = blockZoom.getBoundingClientRect().width;
        //
        blockZoom.style.zoom = 5;
        //
        return blockZoom.getBoundingClientRect().width !== w;
    })();
    //
    const resize = function() {
        const resize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
        //
        var interest = ( ( resize.width ) / screenNormal );
        //
        if(zoomBool && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
            document.body.style.zoom = interest; 
            document.body.style.transform = '';
            document.body.style.transformOrigin = '';
            document.body.style.width = '';
            document.body.style.height = '';
        } else { // Изменить если нету zoom
            document.body.style.transform = 'scale('+interest+')';
            document.body.style.transformOrigin = 'left top';
            document.body.style.width = 'calc(100% / '+interest+')';
            document.body.style.height = 'calc(100% / '+interest+')'; 
            //
            document.body.style.zoom = '';
        }
    };
    //
    resize();window.addEventListener('resize', resize);
    //
});