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
            'body.mobileview-active #xdevices{position:relative}',
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
            sync(); refreshLayout(); if (typeof renderDash === 'function') renderDash();
        }
        toggle.onclick = function () { forceDesktop = false; try { localStorage.removeItem('mobileview-desktop'); } catch(e) {} setEnabled(!enabled); };
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
        // Mobile device dashboard uses the server's already-authorized device list.
        var mq = window.matchMedia('(max-width: 700px)');
        var forceDesktop = false;
        try { forceDesktop = localStorage.getItem('mobileview-desktop') === '1'; } catch (e) {}
        if (mq.matches && !forceDesktop) enabled = true;
        var mobileCss = document.createElement('style');
        mobileCss.textContent = [
            'body.mobileview-active #mobileview-toggle{display:none}',
            'body.mv-home #container,body.mv-native-action #container{visibility:hidden}',
            'body.mv-home #dialog,body.mv-home #dialog *,body.mv-native-action #dialog,body.mv-native-action #dialog *{visibility:visible}',
            'body.mobileview-active #dialog{position:fixed!important;top:auto!important;bottom:0!important;left:0!important;width:100%!important;max-width:100%!important;max-height:85vh!important;overflow:auto!important;border-radius:20px 20px 0 0!important;box-sizing:border-box;z-index:1200!important;padding-bottom:env(safe-area-inset-bottom)}',
            'body.mobileview-active #dialog input[type=button],body.mobileview-active #dialog button,body.mobileview-active #dialog select{min-height:44px;max-width:100%;font-size:16px}',
            'body.mobileview-active #dialog input[type=text],body.mobileview-active #dialog input[type=password],body.mobileview-active #dialog textarea{max-width:100%;box-sizing:border-box;font-size:16px}',
            '#mv-app{display:none;position:fixed;inset:0;z-index:800;background:#f5f7fb;color:#172339;font:15px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;overflow:hidden}',
            'body.mv-home #mv-app{display:flex;flex-direction:column}',
            'body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app{display:block;background:transparent;pointer-events:none}',
            'body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app>.mv-appbar,body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app>.mv-scroll,body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app>.mv-bulk{display:none!important}',
            'body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app>.mv-nav{position:absolute;bottom:0;left:0;right:0;pointer-events:auto}',
            'body.mobileview-active:not(.mv-home):not(.mv-session) #mv-sheet-backdrop.open{pointer-events:auto}',
            '@media(min-width:701px){body.mobileview-active:not(.mv-home):not(.mv-session) #mv-app{display:none}}',
            '#mv-app *{box-sizing:border-box}#mv-app button,#mv-app input,#mv-app select{font:inherit}#mv-app button{cursor:pointer}',
            '#mv-app button:focus-visible,#mv-app input:focus-visible,#mv-app select:focus-visible{outline:3px solid #4790ff;outline-offset:2px}',
            '.mv-appbar{flex:none;display:flex;align-items:center;gap:12px;min-height:calc(64px + env(safe-area-inset-top));padding:calc(8px + env(safe-area-inset-top)) 16px 8px;background:#fff;border-bottom:1px solid #e1e7ef}',
            '.mv-brand{flex:1;min-width:0}.mv-brand strong,.mv-brand small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.mv-brand strong{font-size:16px;letter-spacing:-.02em}.mv-brand small{margin-top:3px;color:#52647b;font-size:12px}.mv-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:6px;background:#718096}.mv-dot.online{background:#168351}',
            '.mv-avatar,.mv-iconbtn{border:1px solid #d9e2ed;background:#fff;color:#203653;border-radius:14px;min-width:48px;height:48px}.mv-avatar{background:#e5efff;color:#174c9a;font-weight:700}',
            '.mv-scroll{flex:1;min-height:0;overflow-y:auto;overscroll-behavior-y:contain;padding:20px 16px 24px}',
            '.mv-heading{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:16px}.mv-heading h1{margin:0;font-size:25px;line-height:1.2;letter-spacing:-.04em}.mv-heading p{margin:5px 0 0;color:#52647b;font-size:13px}',
            '.mv-secondary{min-height:48px;border:1px solid #d9e2ed;border-radius:13px;background:#fff;color:#274360;padding:0 14px;font-weight:600}',
            '.mv-searchrow{display:flex;gap:8px}.mv-search{display:flex;align-items:center;gap:10px;flex:1;min-width:0;height:52px;padding:0 12px;border:1px solid #d7e0eb;border-radius:14px;background:#fff;color:#50647f}.mv-search input{border:0;outline:0;width:100%;min-width:0;background:transparent;color:#172339;font-size:16px}.mv-search button{border:0;background:transparent;color:#435873;min-width:44px;height:44px;font-size:20px}',
            '.mv-chips{display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;margin:14px -16px 20px;padding:0 16px}.mv-chips::-webkit-scrollbar{display:none}.mv-chip{flex:none;min-height:44px;border:1px solid #d5dfeb;border-radius:23px;background:#fff;color:#354b66;padding:0 16px}.mv-chip[aria-pressed=true]{border-color:#2468cf;background:#e6f0ff;color:#164ca1;font-weight:700}',
            '.mv-group{margin:0 0 20px}.mv-grouphead{display:flex;align-items:center;gap:8px;margin-bottom:10px}.mv-grouphead button{border:0;background:transparent;color:inherit}.mv-groupname{flex:1;min-width:0;text-align:left;font-weight:700;min-height:48px;padding:0 4px}.mv-count{font-weight:500;color:#52647b;font-size:12px;margin-left:6px}.mv-more{min-width:48px;min-height:48px;font-size:22px;border-radius:12px}',
            '.mv-card{display:flex;align-items:center;gap:12px;min-height:92px;margin:8px 0;padding:12px;border:1px solid #dce4ee;border-radius:16px;background:#fff;box-shadow:0 2px 8px #152b440a}.mv-card.selected{border-color:#3478ed;background:#f0f6ff}.mv-device-icon{position:relative;flex:none;display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:#e9f1fd;color:#2864b7;font-size:23px}.mv-device-icon .mv-dot{position:absolute;right:-3px;bottom:-3px;border:2px solid #fff;width:13px;height:13px;margin:0}.mv-card-main{flex:1;min-width:0;border:0;background:transparent;color:inherit;padding:4px 0;text-align:left;min-height:60px}.mv-card-main strong{display:block;overflow-wrap:anywhere;line-height:1.35;font-size:15px}.mv-card-main small{display:block;margin-top:6px;color:#52647b;line-height:1.4;font-size:12px;overflow-wrap:anywhere}.mv-card-action{flex:none;width:48px;height:48px;border:0;border-radius:14px;background:#eaf2ff;color:#245db1;font-size:21px}.mv-check{width:44px;height:44px;accent-color:#2468cf;margin:0}',
            '.mv-empty{text-align:center;padding:60px 20px;color:#52647b;line-height:1.5}.mv-empty strong{display:block;color:#243a55;font-size:17px;margin-bottom:6px}',
            '.mv-nav{display:flex;flex:none;align-items:stretch;min-height:calc(72px + env(safe-area-inset-bottom));padding:6px 6px calc(6px + env(safe-area-inset-bottom));border-top:1px solid #e0e7ef;background:#fff}.mv-nav button{flex:1;min-width:0;min-height:56px;border:0;background:transparent;color:#52647b;border-radius:14px;padding:4px 1px;font-size:10px}.mv-nav button[aria-current=page]{color:#1657b7;background:#eaf2ff;font-weight:700}.mv-nav svg{display:block;margin:0 auto 4px;width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}',
            '#mv-sheet-backdrop{display:none;position:absolute;inset:0;z-index:2;background:#07162a88;align-items:flex-end}#mv-sheet-backdrop.open{display:flex}.mv-sheet{width:100%;max-height:85%;overflow:auto;border-radius:22px 22px 0 0;background:#fff;padding:12px 20px calc(20px + env(safe-area-inset-bottom));box-shadow:0 -8px 32px #0e213c33}.mv-sheet h2{font-size:19px;margin:12px 0}.mv-sheet label{display:block;margin:14px 0}.mv-sheet select,.mv-sheet input[type=search]{width:100%;height:48px;margin-top:6px;border:1px solid #cdd9e7;border-radius:12px;padding:0 12px;background:#fff;color:#172339}.mv-sheet button{min-height:48px;border:0;border-radius:12px;padding:0 16px;margin:4px 4px 4px 0;background:#eaf1fb;color:#194578;font-weight:600}.mv-sheet button.primary{background:#2468cf;color:#fff}.mv-sheet input[type=checkbox]{width:24px;height:24px;vertical-align:middle;margin-right:10px;accent-color:#2468cf}',
            '.mv-bulk{display:flex;align-items:center;flex-wrap:wrap;gap:8px;padding:8px;background:#fff;border-top:1px solid #dce4ee}.mv-bulk strong{white-space:nowrap}.mv-bulk button{white-space:nowrap;font-size:12px;min-height:44px}',
            '.mv-sheet label:has(input[type=checkbox]){display:flex;align-items:center;min-height:48px}',
            '@media(prefers-color-scheme:dark){#mv-app{background:#0d1725;color:#edf3fc}.mv-appbar,.mv-nav,.mv-card,.mv-search,.mv-secondary,.mv-iconbtn,.mv-chip,.mv-sheet,.mv-bulk{background:#182639;color:#edf3fc;border-color:#33465f}.mv-card.selected,.mv-nav button[aria-current=page],.mv-chip[aria-pressed=true]{background:#223d60;color:#fff}.mv-search input,.mv-sheet select,.mv-sheet input[type=search]{color:#edf3fc;background:#182639}.mv-brand small,.mv-heading p,.mv-card-main small,.mv-count,.mv-empty,.mv-nav button{color:#b2c1d4}.mv-empty strong{color:#edf3fc}.mv-sheet button{background:#2a405b;color:#edf3fc}}'
        ].join('\n');
        document.head.appendChild(mobileCss);
        var app = document.createElement('div'); app.id = 'mv-app';
        app.innerHTML = '<header class="mv-appbar"><div class="mv-brand"><strong>MeshCentral KZVS</strong><small id="mv-server-status"></small></div><button class="mv-avatar" type="button" aria-label="Профиль"></button></header><main class="mv-scroll"><div class="mv-heading"><div><h1>Устройства</h1><p id="mv-total"></p></div><button type="button" class="mv-secondary" id="mv-select">Выбрать</button></div><div class="mv-searchrow"><label class="mv-search"><span aria-hidden="true">⌕</span><input type="search" id="mv-search" placeholder="Поиск по имени, IP, группе..." aria-label="Поиск устройств"><button type="button" id="mv-clear" aria-label="Очистить поиск">×</button></label><button type="button" id="mv-filters" class="mv-iconbtn" aria-label="Расширенные фильтры">☷</button></div><div class="mv-chips" role="group" aria-label="Быстрые фильтры"><button class="mv-chip" data-filter="all">Все</button><button class="mv-chip" data-filter="online">В сети</button><button class="mv-chip" data-filter="offline">Не в сети</button></div><div id="mv-groups"></div></main><div class="mv-bulk" hidden><strong id="mv-selected-count"></strong><button class="mv-secondary" data-bulk="all">Выбрать все</button><button class="mv-secondary" data-bulk="upload">Файлы</button><button class="mv-secondary" data-bulk="reset">Перезагрузка</button><button class="mv-secondary" data-bulk="command">Команда</button><button class="mv-secondary" data-bulk="actions">Ещё</button><button class="mv-secondary" data-bulk="cancel">Отмена</button></div><nav class="mv-nav" aria-label="Основная навигация"><button data-nav="devices" aria-current="page"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>Устройства</button><button data-nav="groups"><svg viewBox="0 0 24 24"><path d="M3 6h7l2 2h9v10H3z"/><path d="M3 10h18"/></svg>Группы</button><button data-nav="tasks"><svg viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="m7 9 2 2 3-3M13 10h4M8 16h9"/></svg>Задачи</button><button data-nav="events"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>События</button><button data-nav="settings"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M4.9 4.9 7 7m10 10 2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/></svg>Настройки</button></nav><div id="mv-sheet-backdrop"><section class="mv-sheet" role="dialog" aria-modal="true" aria-label="Настройки"><div id="mv-sheet-content"></div><button type="button" id="mv-sheet-close">Закрыть</button></section></div>';
        document.body.appendChild(app);
        var dash = {filter:'all',query:'',group:'',os:[],selection:false,selected:{},collapsed:{},last:'',timer:null};
        var esc = function (v) { return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
        function nodeList() { return (typeof nodes !== 'undefined' && Array.isArray(nodes)) ? nodes.filter(function(n){return n && n.v !== false;}) : []; }
        function groupName(n) { return (typeof meshes !== 'undefined' && meshes[n.meshid] && meshes[n.meshid].name) || 'Устройства'; }
        function osName(n) { var id = n.agent && n.agent.id; return [1,2,3,4,21,22].indexOf(id) >= 0 ? 'Windows' : ([5,6,25,26].indexOf(id) >= 0 ? 'macOS' : (id ? 'Linux' : '')); }
        function showSheet(html) { var content=app.querySelector('#mv-sheet-content'); content.innerHTML=html; app.querySelector('#mv-sheet-backdrop').classList.add('open'); app.querySelector('#mv-sheet-close').focus(); }
        function hideSheet() { app.querySelector('#mv-sheet-backdrop').classList.remove('open'); }
        function renderDash() {
            if (!enabled || typeof xxcurrentView === 'undefined' || xxcurrentView !== 1 || !mq.matches) { document.body.classList.remove('mv-home'); return; }
            document.body.classList.add('mv-home');
            var all=nodeList(), q=dash.query.trim().toLocaleLowerCase();
            var filtered=all.filter(function(n) { var on=!!n.conn; var hay=[n.name,n.host,n.ip,groupName(n),osName(n)].join(' ').toLocaleLowerCase(); return (!q||hay.indexOf(q)>=0) && (dash.filter==='all'||(dash.filter==='online'&&on)||(dash.filter==='offline'&&!on)) && (!dash.group||n.meshid===dash.group) && (!dash.os.length||dash.os.indexOf(osName(n))>=0); });
            var selectedCount=Object.keys(dash.selected).length;
            var deviceWord = all.length % 10 === 1 && all.length % 100 !== 11 ? 'устройство' : (all.length % 10 >= 2 && all.length % 10 <= 4 && (all.length % 100 < 12 || all.length % 100 > 14) ? 'устройства' : 'устройств');
            app.querySelector('#mv-total').textContent=all.length+' '+deviceWord+' · '+all.filter(function(n){return !!n.conn}).length+' в сети';
            var status=app.querySelector('#mv-server-status'); var connected=typeof meshserver !== 'undefined' && (meshserver.State===2 || meshserver.State===3); status.innerHTML='<span class="mv-dot'+(connected?' online':'')+'"></span>'+(connected?'Подключено к серверу':'Соединение потеряно. Повторная попытка…');
            var name=(typeof userinfo !== 'undefined' && userinfo.name) || 'Профиль'; app.querySelector('.mv-avatar').textContent=name.slice(0,1).toLocaleUpperCase();
            app.querySelectorAll('.mv-chip').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.filter===dash.filter));});
            app.querySelector('#mv-select').textContent=dash.selection?'Готово':'Выбрать';
            var bulk=app.querySelector('.mv-bulk'); bulk.hidden=!dash.selection; bulk.style.display=dash.selection?'flex':'none'; app.querySelector('#mv-selected-count').textContent='Выбрано: '+selectedCount;
            var groups={}; filtered.forEach(function(n){var id=n.meshid||''; if(!groups[id])groups[id]={name:groupName(n),nodes:[]};groups[id].nodes.push(n);});
            var html=''; Object.keys(groups).sort(function(a,b){return groups[a].name.localeCompare(groups[b].name);}).forEach(function(id){var g=groups[id], online=g.nodes.filter(function(n){return !!n.conn}).length; html+='<section class="mv-group"><div class="mv-grouphead"><button class="mv-groupname" data-group-toggle="'+esc(id)+'" aria-expanded="'+String(!dash.collapsed[id])+'">'+(dash.collapsed[id]?'▸':'▾')+' '+esc(g.name)+' <span class="mv-count">'+online+'/'+g.nodes.length+' в сети</span></button><button class="mv-more" data-group-menu="'+esc(id)+'" aria-label="Действия группы">⋯</button></div>'; if(!dash.collapsed[id])g.nodes.forEach(function(n){var online=!!n.conn,checked=!!dash.selected[n._id];html+='<article class="mv-card'+(checked?' selected':'')+'">'+(dash.selection?'<input class="mv-check" type="checkbox" data-check="'+esc(n._id)+'" aria-label="Выбрать '+esc(n.name)+'" '+(checked?'checked':'')+'>':'')+'<div class="mv-device-icon" aria-hidden="true">▣<span class="mv-dot'+(online?' online':'')+'"></span></div><button class="mv-card-main" data-device="'+esc(n._id)+'"><strong>'+esc(n.name||n._id)+'</strong><small>'+esc([n.ip||n.host,osName(n),online?'В сети':'Не в сети'].filter(Boolean).join(' · '))+'</small></button><button class="mv-card-action" data-device-menu="'+esc(n._id)+'" aria-label="Действия устройства">⋯</button></article>';});html+='</section>';});
            app.querySelector('#mv-groups').innerHTML=html || '<div class="mv-empty"><strong>Устройства не найдены</strong>Попробуйте изменить параметры поиска или фильтры.</div>';
        }
        function rerender() { dash.last=''; renderDash(); }
        function openDevice(id,panel) { hideSheet(); if(typeof gotoDevice==='function') gotoDevice(id,panel||10); sync(); }
        function openDesktop(id) {
            hideSheet();
            if (typeof gotoDevice !== 'function') return;
            gotoDevice(id,10);
            if (typeof xxcurrentView === 'undefined' || xxcurrentView !== 10 || typeof currentNode === 'undefined' || !currentNode || currentNode._id !== id) return;
            // Let MeshCentral establish the device and its rights before using its own tab.
            var tab=target('MainDevDesktop');
            if (tab && getComputedStyle(tab).display !== 'none') {
                tab.dispatchEvent(new MouseEvent('mouseup',{bubbles:true}));
                sync();
            } else if (typeof xxcurrentView !== 'undefined' && xxcurrentView === 10) {
                if (typeof go === 'function') go(1);
                dash.last=''; renderDash();
                showSheet('<h2>Рабочий стол недоступен</h2><p>Для этого устройства нет доступа к рабочему столу или такой способ подключения не поддерживается.</p>');
            }
        }
        function nativeSelection() {
            if (typeof updateDevices === 'function') updateDevices();
            if (typeof onDevicesScrollEx === 'function') onDevicesScrollEx();
            document.querySelectorAll('#p1 .DeviceCheckbox').forEach(function(c){ var id=c.value.replace(/^devid_/, ''); var should=!!dash.selected[id]; if(c.checked!==should){c.checked=should;c.dispatchEvent(new Event('change',{bubbles:true}));} });
            return Object.keys(dash.selected).every(function(id){return Array.from(document.querySelectorAll('#p1 .DeviceCheckbox')).some(function(c){return c.value==='devid_'+id && c.checked;});});
        }
        app.addEventListener('click',function(e){
            var b=e.target.closest('button'); if(!b)return;
            if(b.id==='mv-clear'){app.querySelector('#mv-search').value='';dash.query='';rerender();}
            else if(b.dataset.filter){dash.filter=b.dataset.filter;rerender();}
            else if(b.id==='mv-select'){dash.selection=!dash.selection;if(!dash.selection)dash.selected={};rerender();}
            else if(b.dataset.groupToggle){dash.collapsed[b.dataset.groupToggle]=!dash.collapsed[b.dataset.groupToggle];rerender();}
            else if(b.dataset.device){if(dash.selection){dash.selected[b.dataset.device]=!dash.selected[b.dataset.device];if(!dash.selected[b.dataset.device])delete dash.selected[b.dataset.device];rerender();}else openDesktop(b.dataset.device);}
            else if(b.dataset.deviceMenu){var n=nodeList().find(function(x){return x._id===b.dataset.deviceMenu;});if(n)showSheet('<h2>'+esc(n.name)+'</h2><button data-open="'+esc(n._id)+'" data-panel="11">Рабочий стол</button><button data-open="'+esc(n._id)+'" data-panel="12">Терминал</button><button data-open="'+esc(n._id)+'" data-panel="10">Сведения</button>');}
            else if(b.dataset.open){openDevice(b.dataset.open,Number(b.dataset.panel));}
            else if(b.dataset.groupMenu){var id=b.dataset.groupMenu, mesh=typeof meshes!=='undefined'&&meshes[id];var mayAdd=mesh && mesh.mtype===2 && typeof GetMeshRights==='function' && (GetMeshRights(mesh)&4) && typeof addAgentToMesh==='function';var actions=mayAdd?'<button data-group-action="agent" data-group-id="'+esc(id)+'">Добавить агента</button>':'';if(mayAdd && typeof inviteAgentToMesh==='function' && typeof features!=='undefined' && !(features&2))actions+='<button data-group-action="invite" data-group-id="'+esc(id)+'">Пригласить</button>';showSheet('<h2>'+esc((mesh&&mesh.name)||'Группа')+'</h2>'+actions+'<button data-manage="'+esc(id)+'">Управление группой</button>');}
            else if(b.dataset.groupAction){var gid=b.dataset.groupId;hideSheet();if(b.dataset.groupAction==='agent' && typeof addAgentToMesh==='function')addAgentToMesh(gid);else if(b.dataset.groupAction==='invite' && typeof inviteAgentToMesh==='function')inviteAgentToMesh(gid);}
            else if(b.dataset.manage){hideSheet();if(typeof gotoMesh==='function')gotoMesh(b.dataset.manage);sync();}
            else if(b.id==='mv-filters'){var groups={};nodeList().forEach(function(n){groups[n.meshid]=groupName(n)});var options='<option value="">Все группы</option>';Object.keys(groups).forEach(function(id){options+='<option value="'+esc(id)+'" '+(dash.group===id?'selected':'')+'>'+esc(groups[id])+'</option>';});showSheet('<h2>Фильтры</h2><label>Поиск группы<input type="search" id="mv-group-search" placeholder="Название группы"></label><label>Группа<select id="mv-filter-group">'+options+'</select></label><strong>Операционная система</strong>'+['Windows','Linux','macOS'].map(function(os){return '<label><input type="checkbox" data-os="'+os+'" '+(dash.os.indexOf(os)>=0?'checked':'')+'>'+os+'</label>';}).join('')+'<button data-apply="yes" class="primary">Применить</button><button data-apply="reset">Сбросить</button>');}
            else if(b.dataset.apply){dash.group=b.dataset.apply==='reset'?'':app.querySelector('#mv-filter-group').value;dash.os=b.dataset.apply==='reset'?[]:Array.from(app.querySelectorAll('[data-os]:checked')).map(function(c){return c.dataset.os});hideSheet();rerender();}
            else if(b.classList.contains('mv-avatar') || b.dataset.nav==='settings'){var n=(typeof userinfo!=='undefined'&&userinfo.name)||'Пользователь';var role=(typeof userinfo!=='undefined'&&(userinfo.siteadmin===4294967295||userinfo.siteadmin===-1))?'Администратор':'Пользователь';showSheet('<h2>'+esc(n)+'</h2><p>'+role+'</p><button data-profile="account">Мой профиль</button><button data-profile="desktop">Компьютерный вид</button><button data-profile="logout">Выйти</button><p><a href="terms" style="display:inline-flex;align-items:center;min-height:48px">Условия и конфиденциальность</a></p>');}
            else if(b.dataset.profile==='account'){hideSheet();if(typeof go==='function')go(2);sync();}
            else if(b.dataset.profile==='desktop'){hideSheet();forceDesktop=true; try{localStorage.setItem('mobileview-desktop','1')}catch(ex){} setEnabled(false);}
            else if(b.dataset.profile==='logout'){var link=document.querySelector('#logoutControlSpan a, #logoutControlSpan2 a');if(link)link.click();}
            else if(b.dataset.nav==='devices'){hideSheet();if(typeof go==='function')go(1);dash.last='';renderDash();}
            else if(b.dataset.nav==='events'){if(typeof go==='function')go(3);sync();}
            else if(b.dataset.nav==='groups'){showSheet('<h2>Группы</h2>'+Object.keys(typeof meshes==='object'?meshes:{}).map(function(id){return '<button data-manage="'+esc(id)+'">'+esc(meshes[id].name)+'</button>';}).join(''));}
            else if(b.dataset.nav==='tasks'){showSheet('<h2>Задачи и скрипты</h2><p>Откройте устройство и выберите терминал или штатные действия MeshCentral.</p>');}
            else if(b.dataset.bulk==='cancel'){dash.selection=false;dash.selected={};rerender();}
            else if(b.dataset.bulk==='all'){nodeList().forEach(function(n){dash.selected[n._id]=true});rerender();}
            else if(['actions','upload','reset','command'].indexOf(b.dataset.bulk)>=0){if(!Object.keys(dash.selected).length){showSheet('<h2>Выберите устройства</h2><p>Отметьте устройства, затем откройте действия.</p>');}else if(nativeSelection()){document.body.classList.remove('mv-home');document.body.classList.add('mv-native-action');var groupButton=target('GroupActionButton');if(groupButton && !groupButton.disabled){groupButton.click();var labels={upload:'Upload files',reset:'Reset devices',command:'Run commands'},wanted=labels[b.dataset.bulk],select=target('dialog') && target('dialog').querySelector('select');if(wanted && select){var option=Array.from(select.options).find(function(o){return o.textContent.trim()===wanted;});if(option){select.value=option.value;select.dispatchEvent(new Event('change',{bubbles:true}));}}}}else showSheet('<h2>Действия недоступны</h2><p>Для этого набора используйте штатный список устройств.</p>');}
            else if(b.id==='mv-sheet-close')hideSheet();
        });
        app.addEventListener('input',function(e){if(e.target.id==='mv-group-search'){var q=e.target.value.toLocaleLowerCase();Array.from(app.querySelectorAll('#mv-filter-group option')).forEach(function(o){o.hidden=!!o.value && o.textContent.toLocaleLowerCase().indexOf(q)<0;});}});
        app.addEventListener('change',function(e){if(e.target.dataset.check){if(e.target.checked)dash.selected[e.target.dataset.check]=true;else delete dash.selected[e.target.dataset.check];rerender();}});
        var pressTimer=null, pressId=null, pressHeld=false, pressX=0, pressY=0;
        app.addEventListener('touchstart',function(e){var b=e.target.closest('[data-device]');if(!b||e.touches.length!==1)return;pressId=b.dataset.device;pressHeld=false;pressX=e.touches[0].clientX;pressY=e.touches[0].clientY;clearTimeout(pressTimer);pressTimer=setTimeout(function(){pressHeld=true;},550);},{passive:true});
        app.addEventListener('touchmove',function(e){if(!pressId||!e.touches.length)return;if(Math.abs(e.touches[0].clientX-pressX)>12||Math.abs(e.touches[0].clientY-pressY)>12){clearTimeout(pressTimer);pressId=null;}},{passive:true});
        app.addEventListener('touchend',function(e){clearTimeout(pressTimer);if(pressId&&pressHeld){e.preventDefault();dash.selection=true;dash.selected[pressId]=true;rerender();}pressId=null;pressHeld=false;},{passive:false});
        app.addEventListener('touchcancel',function(){clearTimeout(pressTimer);pressId=null;pressHeld=false;},{passive:true});
        app.querySelector('#mv-sheet-backdrop').addEventListener('click',function(e){if(e.target===this)hideSheet();});
        app.querySelector('#mv-search').addEventListener('input',function(){var v=this.value;clearTimeout(dash.timer);dash.timer=setTimeout(function(){dash.query=v;rerender();},300);});
        app.addEventListener('keydown',function(e){if(e.key==='Escape')hideSheet();});
        var pullStart=null, scroller=app.querySelector('.mv-scroll');
        scroller.addEventListener('touchstart',function(e){pullStart=(scroller.scrollTop===0 && e.touches.length===1)?e.touches[0].clientY:null;},{passive:true});
        scroller.addEventListener('touchend',function(e){if(pullStart!==null && e.changedTouches.length===1 && e.changedTouches[0].clientY-pullStart>100 && typeof meshserver!=='undefined' && meshserver.State===2){meshserver.send({action:'meshes'});meshserver.send({action:'nodes',skip:0});}pullStart=null;},{passive:true});
        var renderInterval=setInterval(function(){if(!enabled || !mq.matches)return;if(document.body.classList.contains('mv-native-action')){var dialog=target('dialog');if(dialog && getComputedStyle(dialog).display!=='none')return;document.body.classList.remove('mv-native-action');dash.last='';}var list=nodeList();var signature=JSON.stringify([typeof xxcurrentView!=='undefined'?xxcurrentView:0,list.map(function(n){return [n._id,n.name,n.conn,n.ip,n.host,n.v]}),typeof meshserver!=='undefined'?meshserver.State:null]);if(signature!==dash.last){dash.last=signature;renderDash();}},700);
        if (mq.addEventListener) mq.addEventListener('change',function(e){if(e.matches&&!forceDesktop)setEnabled(true);else if(!e.matches){document.body.classList.remove('mv-home');}});

        setEnabled(enabled);
        setInterval(sync, 500);
    };
    return obj;
};
module.exports.mobileview = module.exports;
