rpc.exports = {
    init: function (stage, parameters) {
        function ShowToast(message) {
            if (Java.available) {
                var context = Java.use('android.app.ActivityThread').currentApplication().getApplicationContext();

                Java.scheduleOnMainThread(function () {
                    var toast = Java.use("android.widget.Toast");
                    toast.makeText(context, Java.use("java.lang.String").$new(message), 1).show();
                });
            }
        }
        return new Promise(resolve => {
            var pollForJava = setInterval(() => {
                if (Java.available) {
                    clearInterval(pollForJava);
                    Java.perform(function () {
                        console.log("Java perform..");

                        var Log = Java.use("android.util.Log");

                        var TAG_L = "[ANX]";

                        Log.v(TAG_L, "is Online");

                        Java.use('com.android.camera.module.Camera2Module').isParallelSessionEnable.implementation = function () {
                            Log.v(TAG_L, "Camera2Module.isParallelSessionEnable==>false");
                            return false;
                        }
                        Java.use('com.android.camera.external.mivi.MIVIHelper').requestCloudDataAsync.implementation = function () {
                            Log.v(TAG_L, "MIVIHelper.requestCloudDataAsync==>NOOP");
                        }
                        Java.use('com.android.camera.external.mivi.MIVIHelper').setMiViInfo.implementation = function (str) {
                            Log.v(TAG_L, "MIVIHelper.setMiViInfo==>NOOP");
                        }
                        Java.use('com.android.camera.aftersales.AftersalesManager').checkSelf.implementation = function () {
                            Log.v(TAG_L, "AftersalesManager.checkSelf==>NOOP");
                        }

                        //c_27810_0x0001 IS_FORCE_USING_NORMAL_OPERATION_MODE, Originally false for Karna
                        Java.use('com.mi.device.Karna').o000O0Oo.implementation = function () {
                            Log.v(TAG_L, "com.mi.device.Karna.o000O0Oo==>true");
                            return true;
                        }

                        //isFrontPopCamera needs to be false to use aosp popup impl
                        var popupDevices = [
                            "Cezanne",
                            "Davinciin",
                            "Davinci",
                            "Lmi",
                            "Raphaelin",
                            "Raphael"
                        ];
                        for (let i = 0; i < popupDevices.length; i++) {
                            const device = popupDevices[i];
                            Java.use('com.mi.device.' + device).o000o00O.implementation = function () {
                                Log.v(TAG_L, "com.mi.device." + device + ".o000o00O==>false");
                                return false;
                            }
                        }

                        Java.use('org.json.JSONObject').toString.implementation = function () {
                            var str = this.toString();
                            Log.v(TAG_L, "org.json.JSONObject.toString==>" + str);
                            return str;
                        }
                        
                        //#region Add your customization below:






                        //#endregion Add your customization above!
                    });
                    resolve();
                }
            }, 1);
        });

    },
    dispose: function () {
        console.log('[dispose]');
    }
};