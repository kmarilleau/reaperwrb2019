export const htmlTemplate = { html: (json) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <base href="/" />
    <title>ReaperWRB</title>

    <meta name="viewport" content="width=device-width,initial-scale=1">
    
    <link rel="manifest" href="reaperwrb_2/manifest.json"/>
    
    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="Pragma" content="no-cache" />

    <link rel="icon" type="image/png" sizes="32x32" href="/reaperwrb_2/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/reaperwrb_2/icons/favicon-16x16.png">
    <link rel="shortcut icon" href="/reaperwrb_2/icons/favicon.ico">
      
    <meta name="theme-color" content="#0f0f0f">
    <meta name="msapplication-TileColor" content="#f0f0f0">
    <meta name="msapplication-config" content="/reaperwrb_2/browserconfig.xml">
      
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="mask-icon" href="/reaperwrb_2/icons/safari-pinned-tab.svg" color="#0f0f0f">
      
    <link rel="apple-touch-icon" sizes="57x57" href="/reaperwrb_2/icons/icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/reaperwrb_2/icons/icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/reaperwrb_2/icons/icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/reaperwrb_2/icons/icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/reaperwrb_2/icons/icon-114x114.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/reaperwrb_2/icons/icon-144x144.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/reaperwrb_2/icons/icon-120x120.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/reaperwrb_2/icons/icon-152x152.png">
    <link rel="apple-touch-icon" sizes="167x167" href="/reaperwrb_2/icons/icon-167x167.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/reaperwrb_2/icons/icon-180x180.png">

    <link href="/reaperwrb_2/css/loader.css" rel="stylesheet">
    <link href="/reaperwrb_2/css/app.css" rel="stylesheet">
  </head>
  <body>
    <div id="reaperwrb-json">${ json }</div>
    <div id="loader">
    <div style="margin: auto;text-align: center;">
      <div style="margin: auto;"><img style="width: 10vw; height: 10vw;" src="/reaperwrb_2/icons/icon-180x180.png" /></div>
        <div class="lds-ellipsis" style="margin: auto;"><div></div><div></div><div></div><div></div></div>
      </div>
    </div>
    <script type="text/javascript" src="main.js"></script>
    <script type="text/javascript" src="/reaperwrb_2/config.js"></script>
    <div id="app"></div>
    <script type="text/javascript" src="/reaperwrb_2/js/manifest.js"></script>
    <script type="text/javascript" src="/reaperwrb_2/js/vendor.js"></script>
    <script type="text/javascript" src="/reaperwrb_2/js/app.js"></script>
  </body>
  </html>`
}

export default htmlTemplate