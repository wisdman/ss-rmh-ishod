start /D "C:\ss-rmh-ishod" /MIN "Server" "C:\ss-rmh-ishod\node-js\node.exe" "server.js"
cd "C:\ss-rmh-ishod\chrome-bin"
.\chrome.exe --disable-gesture-requirement-for-presentation --disable-pinch --overscroll-history-navigation=0 --autoplay-policy=no-user-gesture-required --kiosk http://localhost:8080/ss-1