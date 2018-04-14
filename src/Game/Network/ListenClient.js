var countConnect = 3;

var GameListener = cc.Class.extend(
    {
        ctor: function () {
            this.isLoggined = false;
            this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
        },
        onFinishConnect: function (isSuccess) {
             cc.log("Connect Socket " + isSuccess);
            conectSocketClient = isSuccess;
            if (isSuccess) {
                conectsocket.clearReconnectSocket();
                this.gameWsState = CLIENT_STATE.CONNECTED;
            } else {
                this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
                showAlam(0, "Kh�ng th? k?t n?i m�y ch?. Vui l�ng th? l?i sau!", null);

            }
        },
        onDisconnected: function () {
             cc.log(" Disconnect connect socket" );
            conectSocketClient = false;

            this.gameWsState = CLIENT_STATE.NOT_CONNECTED;
            //popup.openCountdownAlert(15000, Minigame.reconnectSocket, Minigame);
        },

        onReceived: function (data) {
            cc.log("Received cmd = " + data);
            var jsonData = JSON.parse(data);
            switch (jsonData["c"]) {
                case CMD_LOGIN:
                    loginscene.LoginSuccess(jsonData["d"], jsonData["m"]);
                    break;
                case CMD_REGISTER:
                    loginscene.signUp.RegisterSuccess(jsonData["d"], jsonData["m"]);
                    break;
                case CMD_CAPTCHA:
                    captcha_base.showCaptcha(jsonData["d"], jsonData["m"]);
                    break;
                case CMD_CHANGE_PASSWORD:
                    playerInfo.hscn.changePass.changePassSuccess(jsonData["d"], jsonData["m"]);
                    break;
            }

            return;
        }
    }
);
