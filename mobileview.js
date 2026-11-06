module.exports = function () {
    var obj = {};
    obj.exports = ['onWebUIStartupEnd'];
    obj.onWebUIStartupEnd = function () {
        if (window.mobileViewLoaded) return;
        window.mobileViewLoaded = true;
        var key = 'meshcentral-mobileview-enabled';
        var enabled = false;
        try { enabled = localStorage.getItem(key) === '1'; } catch (e) {}
        var style = document.createElement('style');
        style.textContent = '\n' + [
            '#mobileview-toggle{position:fixed;right:12px;bottom:12px;z-index:10000;min-height:44px;padding:8px 14px;border:1px solid #517599;border-radius:24px;background:#153553;color:white;font:600 14px sans-serif;box-shadow:0 2px 8px #0005;cursor:pointer}',
            'body.mobileview-active #mobileview-toggle{background:#08735d}',
            'body.mobileview-active{min-width:0!important}',
            'body.mobileview-active #p11,body.mobileview-active #p12{min-width:0!important;width:100%!important;box-sizing:border-box}',
            'body.mobileview-active #p11title h1,body.mobileview-active #p12title h1{font-size:20px}',
            'body.mobileview-active #deskarea0,body.mobileview-active #termTable{width:100%!important;min-width:0!important}',
            'body.mobileview-active #deskarea1,body.mobileview-active #deskarea4,body.mobileview-active #termTable .areaHead,body.mobileview-active #termTable .areaFoot{height:auto!important;min-height:44px;line-height:normal!important;overflow:auto;padding:5px;box-sizing:border-box}',
            'body.mobileview-active #deskarea1 .toright2,body.mobileview-active #deskarea4 .toright2,body.mobileview-active #termTable .toright2{float:none!important;display:flex;flex-wrap:wrap;align-items:center;gap:4px}',
            'body.mobileview-active #p11 input[type=button],body.mobileview-active #p12 input[type=button],body.mobileview-active #p11 select,body.mobileview-active #p12 select{min-height:40px;max-width:100%;font-size:16px;margin:2px}',
            'body.mobileview-active #deskarea3x{max-width:100%;overflow:auto!important;touch-action:pan-x pan-y}',
            'body.mobileview-active #DeskParent{max-width:100%;overflow:auto}',
            'body.mobileview-active #Desk{max-width:100%;height:auto;touch-action:none}',
            'body.mobileview-active #termarea3x{max-width:100%;overflow:auto!important}',
            'body.mobileview-active #termTable table{table-layout:fixed;width:100%}',
            'body.mobileview-active #Term,body.mobileview-active #termarea3xdiv{max-width:100%;overflow:auto}',
            'body.mobileview-active .deskareaicon,body.mobileview-active #deskarea4 .desktopButtons{min-width:32px;min-height:32px;object-fit:contain}',
            'body.mobileview-active #mobileview-keyboard{display:inline-block}',
            '#mobileview-keyboard{display:none;min-height:40px;margin:3px;font-size:16px}',
            '@media(max-width:700px){body.mobileview-active #p11,body.mobileview-active #p12{padding-bottom:64px!important}body.mobileview-active #deskarea4 .toright2{justify-content:flex-start}}'
        ].join('\n');
        document.head.appendChild(style);
        var viewport = document.querySelector('meta[name="viewport"]');
        var originalViewport = viewport && viewport.getAttribute('content');
        var createdViewport = false;
        var button = document.createElement('button');
        button.id = 'mobileview-toggle';
        button.type = 'button';
        function update() {
            document.body.classList.toggle('mobileview-active', enabled);
            button.textContent = enabled ? '📱 Мобильный вид: вкл' : '📱 Мобильный вид';
            button.setAttribute('aria-pressed', String(enabled));
            if (enabled) {
                if (!viewport) { viewport = document.createElement('meta'); viewport.name = 'viewport'; document.head.appendChild(viewport); createdViewport = true; }
                viewport.setAttribute('content', 'width=device-width, initial-scale=1');
            } else if (viewport) {
                if (createdViewport) { viewport.remove(); viewport = null; createdViewport = false; }
                else if (originalViewport === null) viewport.removeAttribute('content');
                else viewport.setAttribute('content', originalViewport);
            }
            window.dispatchEvent(new Event('resize'));
        }
        button.onclick = function () { enabled = !enabled; try { localStorage.setItem(key, enabled ? '1' : '0'); } catch (e) {} update(); };
        document.body.appendChild(button);
        var keyboard = document.createElement('button');
        keyboard.id = 'mobileview-keyboard'; keyboard.type = 'button'; keyboard.textContent = '⌨ Клавиатура';
        keyboard.onclick = function () {
            var target = document.querySelector('#termarea3x .xterm-helper-textarea, #termarea3x textarea, #Term textarea');
            if (target) target.focus();
            else { var paste = document.getElementById('pastebutton'); if (paste && typeof window.showTermPasteDialog === 'function') window.showTermPasteDialog(); }
        };
        var footer = document.querySelector('#termTable .areaFoot');
        if (footer) footer.appendChild(keyboard);
        update();
    };
    return obj;
};
module.exports.mobileview = module.exports;
