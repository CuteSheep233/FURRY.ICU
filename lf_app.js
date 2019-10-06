/*
+----------------------------------------------
|  _     _____ _ _ ____    _   _ _____ _____ 
| | |   |  ___/ / |___ \  | \ | | ____|_   _|
| | |   | |_  | | | __) | |  \| |  _|   | |  
| | |___|  _| | | |/ __/ _| |\  | |___  | |  
| |_____|_|   |_|_|_____(_)_| \_|_____| |_|  
|
| Do you say now or never Or never too late?
+----------------------------------------------
| Made with love by LF112 [https://lf112.net]
| Author: LF112
| ⚡Email: lf@lf112.net / QQ: 2275203821
| ⭐️GitHUB.com/LF112 | Twitter.com/LF_Futiwolf
+----------------------------------------------
*/
window.onload = function() {
    console.clear();
    console.log(
        "\n %c \u26a1futiwolf %c https://www.futiwolf.com %c BY%c LF112  \n\n",
        "color: #ffffff; background: rgb(0, 145, 228); padding:5px 0;",
        "background:rgba(197, 197, 197, 0.89); padding:5px 0;",
        "color: #ffffff; background: rgba(49, 49, 49, 0.85); padding:5px 0;", "color: rgb(0, 145, 228); background: rgba(49, 49, 49, 0.85); padding:5px 0;"
    );
    const Load_LC_SDK = document.createElement('script');
    Load_LC_SDK.setAttribute('src', 'https://cdn1.lncld.net/static/js/av-core-mini-0.6.1.js');
    document.getElementsByTagName('body')[0].appendChild(Load_LC_SDK);
    Load_LC_SDK.onload = function() {
        AV.initialize('p1zULfnyH8jIRVaWEDwi9Cml-gzGzoHsz', 'CPlolQCbb1y7SWMsNtciyS2P');
        LiCount_On = AV.Object.extend('LiCount');
        LiCount_Main = new AV.Query(LiCount_On);

        LiCount_Main.equalTo('ID', 'LF_LikeMe');
        LiCount_Main.find({
            success: function(Results) {
                if (Results.length != 0) {
                    for (var i = 0; i < Results.length; i++) document.getElementById('LF_LikeMe_Show').innerHTML = Results[i].get('count');
                    var num = 0,
                        Star = document.getElementById('LF_LikeMe_Show').innerHTML,
                        t = setInterval(function() {
                            num++;
                            document.getElementById('LF_LikeMe_Show').innerText = num;
                            Star == num && clearInterval(t)
                        }, 50);
                } else {
                    console.log('「LiCount」' + ID + ' has no data!');
                    document.getElementById('LF_LikeMe_Show').innerHTML = 0
                }
            },
            error: function(object, error) {
                console.log('「LiCount」LeanCloud Javascript SDK Error: ' + error.code + ' ' + error.message);
            }
        });

        document.getElementById('LF_LikeMe').addEventListener('click', function() {
            if (LiCount_Lock) return;
            LiCount_Main.find({
                success: function(Results) {
                    if (Results.length > 0) {
                        var licount_ = Results[0];
                        licount_.fetchWhenSave(true);
                        licount_.increment('count');
                        licount_.save(null, {
                            success: function(ResultGet) {
                                document.getElementById('LF_LikeMe_Show').innerHTML = ResultGet.get('count');
                                LiCount_Lock = true;
                                document.getElementById('LF_LikeMe').style.background = 'rgba(152, 89, 89, 0.4)'
                            },
                            error: function(ResultGet, error) { console.log('「LiCount」LeanCloud Javascript SDK Failed to save Visitor num, with error message: ' + error.message) }
                        });
                    } else {
                        var LiCount_On_To = new LiCount_On();
                        LiCount_On_To.set('ID', 'LF_LikeMe_Show');
                        LiCount_On_To.set('count', 1);
                        LiCount_On_To.save(null, {
                            success: function(ResultGet) {
                                document.getElementById('LF_LikeMe_Show').innerHTML = ResultGet.get('count');
                            },
                            error: function(ResultGet, error) { console.log('「LiCount」LeanCloud Javascript SDK Failed to create!') }
                        });
                    }
                },
                error: function(error) {
                    console.log('「LiCount」LeanCloud Javascript SDK Error: ' + error.code + ' ' + error.message);
                }
            });
        }, false);
    }

}
var LiCount_Main, LiCount_On, LiCount_Lock = false;