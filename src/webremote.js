const webremote = { html: (json) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>ReaperWRB</title>

    <meta name="viewport" content="width=device-width,initial-scale=1">
    
    <link rel="manifest" href="reaperwrb/manifest.json"/>
      
    <link rel="icon" type="image/png" sizes="32x32" href="/reaperwrb/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/reaperwrb/icons/favicon-16x16.png">
    <link rel="shortcut icon" href="/reaperwrb/icons/favicon.ico">
      
    <meta name="theme-color" content="#0f0f0f">
    <meta name="msapplication-TileColor" content="#f0f0f0">
    <meta name="msapplication-config" content="/reaperwrb/browserconfig.xml">
      
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="mask-icon" href="/reaperwrb/icons/safari-pinned-tab.svg" color="#0f0f0f">
      
    <link rel="apple-touch-icon" sizes="57x57" href="/reaperwrb/icons/icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/reaperwrb/icons/icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/reaperwrb/icons/icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/reaperwrb/icons/icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/reaperwrb/icons/icon-114x114.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/reaperwrb/icons/icon-144x144.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/reaperwrb/icons/icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/reaperwrb/icons/icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/reaperwrb/icons/icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/reaperwrb/icons/icon-180x180.png">

    <script src="main.js"></script>
    
    <link href="/reaperwrb/css/app.css" rel="stylesheet">
    <style type="text/css">body{padding:0;margin:0;}#loader{background:#f0f0f0!important;display:flex;justify-content:center;flex-direction:column;height:100vh;width:100vw;}.lds-ellipsis{display:inline-block;position:relative;margin:auto;width:64px;height:64px;}.lds-ellipsis div{position:absolute;top:27px;width:11px;height:11px;border-radius:50%;background:#0f0f0f;animation-timing-function:cubic-bezier(0,1,1,0);}.lds-ellipsis div:nth-child(1){left: 6px;animation:lds-ellipsis1 0.6s infinite;}.lds-ellipsis div:nth-child(2){left: 6px;animation:lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(3){left:26px;animation: lds-ellipsis2 0.6s infinite;}.lds-ellipsis div:nth-child(4){left:45px;animation:lds-ellipsis3 0.6s infinite;}@keyframes lds-ellipsis1{0%{transform:scale(0);}100%{transform:scale(1);}}@keyframes lds-ellipsis3{0%{transform: cale(1);}100%{transform:scale(0);}}@keyframes lds-ellipsis2{0%{transform:translate(0,0);}100%{transform:translate(19px,0);}}</style>
  </head>
  <body>
    <div id="reaperwrb-json">${ json }</div>
    <div id="app">
      <div id="loader">
        <div style="margin: auto;text-align: center;">
        <div style="margin: auto;"><img src="/reaperwrb/icons/icon-180x180.png" /></div>
        <div class="lds-ellipsis" style="margin: auto;"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
    </div>
    <script type="text/javascript" src="/reaperwrb/js/manifest.js"></script>
    <script type="text/javascript" src="/reaperwrb/js/vendor.js"></script>
    <script type="text/javascript" src="/reaperwrb/js/app.js"></script>
  </body>
  </html>`
}

export default webremote