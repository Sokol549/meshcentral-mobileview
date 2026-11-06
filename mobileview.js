module.exports = function () {
    var obj = {};
    obj.exports = ['onWebUIStartupEnd'];
    obj.onWebUIStartupEnd = function () {
        if (window.mobileViewLoaded) return;
        window.mobileViewLoaded = true;
        var enabled = false, active = '', expanded = false;
        var storageKey = 'meshcentral-mobileview-enabled';
        try { enabled = localStorage.getItem(storageKey) === '1'; } catch (e) {}
        var style = document.createElement('style');
        style.textContent = [
            'body.mobileview-active{min-width:0!important;width:100%!important;overflow-x:hidden}',
            'body.mobileview-active #container{width:100%!important;min-width:0!important;max-width:100%!important;max-height:none!important;box-sizing:border-box;display:block!important}',
            'body.mobileview-active #masthead{height:auto!important;min-height:48px;background-size:auto 48px}',
            'body.mobileview-active #masthead .title{font-size:23px!important;height:auto!important;padding:10px 8px}',
            'body.mobileview-active #masthead .title2{font-size:11px!important;height:auto!important;padding:14px 3px}',
            'body.mobileview-active #page_leftbar{width:100%!important;height:auto!important;white-space:nowrap;overflow-x:auto}',
            'body.mobileview-active #page_leftbar>div{display:inline-block;vertical-align:middle}',
            'body.mobileview-active #page_leftbar>div:first-child{display:none}',
            'body.mobileview-active #topbar{max-width:100%;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch}',
            'body.mobileview-active #MainMenuSpan,body.mobileview-active #MainSubMenu,body.mobileview-active #MeshSubMenu{width:max-content!important;min-width:100%}',
            'body.mobileview-active .topbar_td{height:44px!important;min-width:78px;padding:0 10px!important;box-sizing:border-box}',
            'body.mobileview-active #column_l{width:100%!important;min-width:0!important;max-width:100%!important;padding:0 8px 72px!important;box-sizing:border-box;overflow-x:hidden!important}',
            'body.mobileview-active #p1,body.mobileview-active #p10{max-width:100%;overflow-x:auto}',
            'body.mobileview-active #p1 input,body.mobileview-active #p1 select{min-height:40px;font-size:16px}',
            '#mobileview-toggle{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));z-index:950;min-height:46px;padding:0 17px;border:0;border-radius:24px;background:#1768db;color:#fff;font:600 14px system-ui,sans-serif;box-shadow:0 4px 18px #0005;cursor:pointer}',
            'body.mobileview-active #mobileview-toggle{background:#173251}',
            '#mv-session{display:none;position:fixed;inset:0;z-index:900;pointer-events:none;font-family:system-ui,-apple-system,sans-serif;color:#f7faff}',
            'body.mv-session #mv-session{display:block}',
            'body.mv-session #mobileview-toggle{display:none}',
            '#mv-header,#mv-bar{position:absolute;left:0;right:0;display:flex;align-items:center;gap:8px;padding:8px 12px;box-sizing:border-box;background:#111c2c;pointer-events:auto}',
            '#mv-header{top:0;height:calc(58px + env(safe-area-inset-top));padding-top:calc(8px + env(safe-area-inset-top));border-bottom:1px solid #28384c}',
            '#mv-bar{bottom:0;min-height:calc(72px + env(safe-area-inset-bottom));padding-bottom:calc(8px + env(safe-area-inset-bottom));border-top:1px solid #28384c;justify-content:space-around}',
            '#mv-session button{border:1px solid transparent;color:#e8effb;background:#25364b;border-radius:12px;min-height:42px;padding:6px 12px;font:600 13px system-ui,sans-serif;cursor:pointer}',
            '#mv-session button:focus-visible{outline:2px solid #8fc5ff;outline-offset:2px}',
            '#mv-session button:disabled{opacity:.42;cursor:default}',
            '#mv-session button.mv-primary{background:#3478ed;color:#fff}',
            '#mv-session button.mv-danger{background:#a93b4d}',
            '#mv-session button.mv-tool{flex:1;min-width:0;max-width:90px;min-height:51px;background:transparent;color:#adbed4;font-size:11px;line-height:16px}',
            '#mv-session button.mv-tool span{display:block;font-size:19px;line-height:22px}',
            '#mv-session button[aria-pressed=true]{background:#263f60;color:#fff}',
            '#mv-title{min-width:0;flex:1;overflow:hidden}',
            '#mv-title strong,#mv-title small{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
            '#mv-title strong{font-size:14px}#mv-title small{font-size:11px;color:#9eb0c9;margin-top:2px}',
            '#mv-title small:before{content:"";display:inline-block;width:6px;height:6px;margin:0 6px 1px 0;border-radius:50%;background:#9aa9ba}',
            '#mv-title small.mv-connected:before{background:#52d7a0}',
            '#mv-empty{display:none;position:absolute;inset:calc(58px + env(safe-area-inset-top)) 0 calc(72px + env(safe-area-inset-bottom));padding:24px;text-align:center;color:#d9e5f5;background:#0b1625;pointer-events:none;box-sizing:border-box}',
            '#mv-empty.mv-visible{display:flex;flex-direction:column;justify-content:center;align-items:center}#mv-empty .mv-empty-icon{display:grid;place-items:center;width:64px;height:64px;margin:0 auto 18px;border:1px solid #31475f;border-radius:20px;background:#1a2b40;color:#a9cbff;font-size:28px}',
            '#mv-empty strong{display:block;font-size:17px;letter-spacing:-.02em}#mv-empty p{margin:8px auto 0;max-width:260px;font-size:13px;line-height:1.5;color:#94a9c2}',
            'body.mv-session #p11,body.mv-session #p12{position:fixed!important;display:block;left:0!important;right:0!important;top:calc(58px + env(safe-area-inset-top))!important;bottom:calc(72px + env(safe-area-inset-bottom))!important;width:100%!important;height:auto!important;min-width:0!important;margin:0!important;padding:0!important;box-sizing:border-box;background:#101820;z-index:899;overflow:auto!important}',
            'body.mv-session #p11title,body.mv-session #p12title{display:none!important}',
            'body.mv-session #deskarea0,body.mv-session #termTable{width:100%!important;min-width:0!important;margin:0!important}',
            'body.mv-session #deskarea1,body.mv-session #deskarea4,body.mv-session #termTable .areaHead,body.mv-session #termTable .areaFoot{display:none!important}',
            'body.mv-session.mv-expanded #deskarea1,body.mv-session.mv-expanded #deskarea4,body.mv-session.mv-expanded #termTable .areaHead,body.mv-session.mv-expanded #termTable .areaFoot{display:block!important;height:auto!important;min-height:44px;overflow:auto;padding:8px;box-sizing:border-box}',
            'body.mv-session.mv-expanded #deskarea1 .toright2,body.mv-session.mv-expanded #deskarea4 .toright2,body.mv-session.mv-expanded #termTable .toright2{float:none!important;display:flex;flex-wrap:wrap;gap:4px}',
            'body.mv-session.mv-expanded #p11 input[type=button],body.mv-session.mv-expanded #p12 input[type=button],body.mv-session.mv-expanded #p11 select,body.mv-session.mv-expanded #p12 select{min-height:40px;font-size:15px;margin:2px}',
            'body.mv-session #deskarea3x{width:100%!important;height:calc(100dvh - 130px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important;max-height:none!important;overflow:auto!important;background:#050b13}',
            'body.mv-session #DeskParent{max-width:100%;overflow:auto}',
            'body.mv-session #termTable table,body.mv-session #termTable tbody,body.mv-session #termTable tr{display:block;width:100%;table-layout:fixed}',
            'body.mv-session #termarea3x{display:block;width:100%!important;max-width:100%!important;box-sizing:border-box;overflow:auto!important;background:#050b13}',
            'body.mv-session #termarea3xdiv{width:100%!important;height:calc(100dvh - 130px - env(safe-area-inset-top) - env(safe-area-inset-bottom))!important;min-height:150px}',
            'body.mv-session #Term{max-width:100%;overflow:auto}',
            'body.mv-session #dialog{z-index:1100}',
            '@supports not (height:100dvh){body.mv-session #deskarea3x,body.mv-session #termarea3xdiv{height:calc(100vh - 130px)!important}}'
        ].join('\n');
        document.head.appendChild(style);
        var viewport = document.querySelector('meta[name="viewport"]');
        var originalViewport = viewport ? viewport.getAttribute('content') : null;
        var createdViewport = false;
        var toggle = document.createElement('button');
        toggle.id = 'mobileview-toggle'; toggle.type = 'button';
        document.body.appendChild(toggle);
        var overlay = document.createElement('div'); overlay.id = 'mv-session';
        overlay.innerHTML = '<div id="mv-header"><button type="button" data-action="back" aria-label="Назад">‹</button><div id="mv-title"><strong></strong><small></small></div><button type="button" data-action="connect" class="mv-primary">Подключить</button></div><div id="mv-empty" aria-hidden="true"><div class="mv-empty-icon">▣</div><strong>Всё готово к подключению</strong><p>Подключитесь, чтобы начать работу с устройством.</p></div><div id="mv-bar"><button type="button" class="mv-tool" data-action="desktop"><span>▣</span>Экран</button><button type="button" class="mv-tool" data-action="terminal"><span>▤</span>Терминал</button><button type="button" class="mv-tool" data-action="keyboard"><span>⌨</span>Клавиатура</button><button type="button" class="mv-tool" data-action="extra"><span>⋯</span>Ещё</button></div>';
        document.body.appendChild(overlay);
        function visible(el) { while (el && el.id !== 'deskarea1' && !el.classList.contains('areaHead')) { var css = getComputedStyle(el); if (css.display === 'none' || css.visibility === 'hidden') return false; el = el.parentElement; } return !!el; }
        function target(id) { return document.getElementById(id); }
        function page() {
            var d = target('p11'), t = target('p12');
            if (d && getComputedStyle(d).display !== 'none') return 'desktop';
            if (t && getComputedStyle(t).display !== 'none') return 'terminal';
            return '';
        }
        function nativeButton() {
            var ids = active === 'desktop' ? ['disconnectbutton1','connectbutton1','connectbutton1r','connectbutton1h'] : ['disconnectbutton2','connectbutton2','connectbutton2s','connectbutton2h'];
            for (var i = 0; i < ids.length; i++) { var el = target(ids[i]); if (el && visible(el.parentElement) && !el.disabled) return el; }
            return null;
        }
        function sync() {
            var next = enabled ? page() : '';
            if (next !== active) { active = next; expanded = false; document.body.classList.remove('mv-expanded'); }
            document.body.classList.toggle('mv-session', !!active);
            if (!active) return;
            var dev = target(active === 'desktop' ? 'p11deviceName' : 'p12deviceName');
            var status = target(active === 'desktop' ? 'deskstatus' : 'termstatus');
            overlay.querySelector('#mv-title strong').textContent = (dev && dev.textContent.trim()) || (active === 'desktop' ? 'Рабочий стол' : 'Терминал');
            overlay.querySelector('#mv-title small').textContent = (status && status.textContent.trim()) || (active === 'desktop' ? 'Рабочий стол' : 'Терминал');
            var connect = overlay.querySelector('[data-action=connect]'), btn = nativeButton();
            var disconnect = btn && btn.id.indexOf('disconnect') === 0;
            connect.textContent = disconnect ? 'Отключить' : 'Подключить'; connect.disabled = !btn;
            connect.className = disconnect ? 'mv-danger' : 'mv-primary';
            overlay.querySelector('#mv-title small').classList.toggle('mv-connected', !!disconnect);
            overlay.querySelector('#mv-empty').classList.toggle('mv-visible', !disconnect && !expanded);
            overlay.querySelector('#mv-empty strong').textContent = btn ? 'Всё готово к подключению' : 'Подключение недоступно';
            overlay.querySelector('#mv-empty p').textContent = btn ? 'Подключитесь, чтобы начать работу с устройством.' : 'Проверьте доступность устройства и варианты подключения в разделе «Ещё».';
            overlay.querySelector('[data-action=desktop]').setAttribute('aria-pressed', String(active === 'desktop'));
            overlay.querySelector('[data-action=terminal]').setAttribute('aria-pressed', String(active === 'terminal'));
            overlay.querySelector('[data-action=extra]').setAttribute('aria-pressed', String(expanded));
            var tab = target(active === 'desktop' ? 'MainDevTerminal' : 'MainDevDesktop');
            overlay.querySelector('[data-action=' + (active === 'desktop' ? 'terminal' : 'desktop') + ']').disabled = !tab || getComputedStyle(tab).display === 'none';
        }
        function refreshLayout() { window.dispatchEvent(new Event('resize')); }
        function setEnabled(value) {
            enabled = value; try { localStorage.setItem(storageKey, enabled ? '1' : '0'); } catch (e) {}
            document.body.classList.toggle('mobileview-active', enabled);
            toggle.textContent = enabled ? '📱 Мобильный вид: вкл' : '📱 Мобильный вид';
            toggle.setAttribute('aria-pressed', String(enabled));
            if (enabled) {
                if (!viewport) { viewport = document.createElement('meta'); viewport.name = 'viewport'; document.head.appendChild(viewport); createdViewport = true; }
                viewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
            } else if (viewport) {
                if (createdViewport) { viewport.remove(); viewport = null; createdViewport = false; }
                else if (originalViewport === null) viewport.removeAttribute('content');
                else viewport.setAttribute('content', originalViewport);
            }
            sync(); refreshLayout();
        }
        toggle.onclick = function () { setEnabled(!enabled); };
        overlay.addEventListener('click', function (event) {
            var button = event.target.closest('button[data-action]'); if (!button || button.disabled) return;
            var action = button.getAttribute('data-action'), el;
            if (action === 'back') { el = document.querySelector(active === 'desktop' ? '#p11BackButton .backButton' : '#p12BackButton .backButton'); if (el) el.click(); }
            else if (action === 'connect') { el = nativeButton(); if (el) el.click(); }
            else if (action === 'desktop' || action === 'terminal') { if (action !== active) { el = target(action === 'desktop' ? 'MainDevDesktop' : 'MainDevTerminal'); if (el) el.dispatchEvent(new MouseEvent('mouseup', {bubbles:true})); } }
            else if (action === 'keyboard') {
                if (active === 'desktop') { el = target('DeskType'); if (el && !el.disabled) el.click(); }
                else { el = document.querySelector('#termarea3x .xterm-helper-textarea, #termarea3x textarea, #Term textarea'); if (el) el.focus(); else if (typeof window.showTermPasteDialog === 'function') window.showTermPasteDialog(); }
            } else if (action === 'extra') { expanded = !expanded; document.body.classList.toggle('mv-expanded', expanded); }
            sync(); setTimeout(refreshLayout, 50);
        });
        setEnabled(enabled);
        setInterval(sync, 500);
    };
    return obj;
};
module.exports.mobileview = module.exports;
