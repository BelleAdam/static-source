var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);i.prototype=e.prototype,t.prototype=new i},__awaiter=this&&this.__awaiter||function(t,e,i,r){return new(i||(i=Promise))(function(o,n){function s(t){try{h(r.next(t))}catch(e){n(e)}}function a(t){try{h(r["throw"](t))}catch(e){n(e)}}function h(t){t.done?o(t.value):new i(function(e){e(t.value)}).then(s,a)}h((r=r.apply(t,e||[])).next())})},__generator=this&&this.__generator||function(t,e){function i(t){return function(e){return r([t,e])}}function r(i){if(o)throw new TypeError("Generator is already executing.");for(;h;)try{if(o=1,n&&(s=n[2&i[0]?"return":i[0]?"throw":"next"])&&!(s=s.call(n,i[1])).done)return s;switch(n=0,s&&(i=[0,s.value]),i[0]){case 0:case 1:s=i;break;case 4:return h.label++,{value:i[1],done:!1};case 5:h.label++,n=i[1],i=[0];continue;case 7:i=h.ops.pop(),h.trys.pop();continue;default:if(s=h.trys,!(s=s.length>0&&s[s.length-1])&&(6===i[0]||2===i[0])){h=0;continue}if(3===i[0]&&(!s||i[1]>s[0]&&i[1]<s[3])){h.label=i[1];break}if(6===i[0]&&h.label<s[1]){h.label=s[1],s=i;break}if(s&&h.label<s[2]){h.label=s[2],h.ops.push(i);break}s[2]&&h.ops.pop(),h.trys.pop();continue}i=e.call(t,h)}catch(r){i=[6,r],n=0}finally{o=s=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}var o,n,s,a,h={label:0,sent:function(){if(1&s[0])throw s[1];return s[1]},trys:[],ops:[]};return a={next:i(0),"throw":i(1),"return":i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a},AssetAdapter=function(){function t(){}return t.prototype.getAsset=function(t,e,i){function r(r){e.call(i,r,t)}if(RES.hasRes(t)){var o=RES.getRes(t);o?r(o):RES.getResAsync(t,r,this)}else RES.getResByUrl(t,r,this,RES.ResourceItem.TYPE_IMAGE)},t}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var KQ=function(t){function e(){var e=t.call(this)||this;return e.addEventListener(egret.Event.COMPLETE,e.init,e),e}return __extends(e,t),e.prototype.partAdded=function(e,i){t.prototype.partAdded.call(this,e,i)},e.prototype.init=function(){var t=this,e=RES.getRes("painting_s_json"),i=e.getTexture("kq-1_png");this.kq1.source=i;var r=RES.getRes("painting_s_json"),o=r.getTexture("kq-2_png");this.kq2.source=o,this.kq3.source=o,this.kq4.source=o,this.kq5.source=o,this.kq6.source=o,this.kq7.source=o,this.kq8.source=o,this.kq9.source=o,this.kq10.source=o;var n=RES.getRes("painting_s_json"),s=n.getTexture("kq-3_png");this.kq11.source=s,setTimeout(function(){t.startAni()},3e3)},e.prototype.startAni=function(){var t=egret.Tween.get(this.kq5,{loop:!0});t.to({rotation:20},1e3).wait(9e3).to({rotation:40},1e3).wait(3e3);var e=egret.Tween.get(this.kq4,{loop:!0});e.to({rotation:0},2e3).wait(7e3).to({rotation:40},2e3).wait(3e3);var i=egret.Tween.get(this.kq3,{loop:!0});i.to({rotation:-20},3e3).wait(5e3).to({rotation:40},3e3).wait(3e3);var r=egret.Tween.get(this.kq2,{loop:!0});r.to({rotation:-40},4e3).wait(3e3).to({rotation:40},4e3).wait(3e3);var o=egret.Tween.get(this.kq7,{loop:!0});o.to({rotation:60},1e3).wait(9e3).to({rotation:40},1e3).wait(3e3);var n=egret.Tween.get(this.kq8,{loop:!0});n.to({rotation:80},2e3).wait(7e3).to({rotation:40},2e3).wait(3e3);var s=egret.Tween.get(this.kq9,{loop:!0});s.to({rotation:100},3e3).wait(5e3).to({rotation:40},3e3).wait(3e3);var a=egret.Tween.get(this.kq10,{loop:!0});a.to({rotation:120},4e3).wait(3e3).to({rotation:40},4e3).wait(3e3)},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(KQ.prototype,"KQ",["eui.UIComponent","egret.DisplayObject"]);var LKQ=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.partAdded=function(e,i){if(t.prototype.partAdded.call(this,e,i),"lkq1"===e){var r=RES.getRes("sprite_sheet_json"),o=r.getTexture("lkq-1_png");this.lkq1.source=o}if("lkq2"===e){var r=RES.getRes("sprite_sheet_json"),o=r.getTexture("lkq-2_png");this.lkq2.source=o}},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e}(eui.Component);__reflect(LKQ.prototype,"LKQ",["eui.UIComponent","egret.DisplayObject"]);var LoadingUI=function(t){function e(){var e=t.call(this)||this;return e.createView(),e}return __extends(e,t),e.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},e.prototype.onProgress=function(t,e){this.textField.text="Loading..."+t+"/"+e},e}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return __extends(e,t),e.prototype.createChildren=function(){t.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(t){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var e=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",e),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(t){console.log(t)}),this.frontGroupWidth=14384,this.backGroupWidth=7816,this.scrollFactor=(this.backGroupWidth-this.stage.stageWidth)/(this.frontGroupWidth-this.stage.stageWidth)},e.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return[4,this.loadResource()];case 1:return i.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return t=i.sent(),[4,platform.login()];case 3:return i.sent(),[4,platform.getUserInfo()];case 4:return e=i.sent(),console.log(e),[2]}})})},e.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var t,e;return __generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,4,,5]),t=new LoadingUI,this.stage.addChild(t),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return i.sent(),[4,this.loadTheme()];case 2:return i.sent(),[4,RES.loadGroup("preload",0,t)];case 3:return i.sent(),this.stage.removeChild(t),[3,5];case 4:return e=i.sent(),console.error(e),[3,5];case 5:return[2]}})})},e.prototype.loadTheme=function(){var t=this;return new Promise(function(e,i){var r=new eui.Theme("resource/default.thm.json",t.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){e()},t)})},e.prototype.initBackGroup=function(){var t=new eui.Group;this.backGroup=t;var e=new eui.Image;e.source="resource/assets/Bg/back-1.png",e.x=0,t.addChild(e);var i=new eui.Image;i.source="resource/assets/Bg/back-2.png",i.x=1954,t.addChild(i);var r=new eui.Image;r.source="resource/assets/Bg/back-3.png",r.x=3908,t.addChild(r);var o=new eui.Image;o.source="resource/assets/Bg/back-4.png",o.x=5862,t.addChild(o);var n=new eui.Scroller;n.width=this.stage.stageWidth,n.height=this.stage.stageHeight,n.viewport=t,this.addChild(n),n.verticalScrollBar.autoVisibility=!1,n.horizontalScrollBar.autoVisibility=!1,n.verticalScrollBar.visible=!1,n.horizontalScrollBar.visible=!1,this.backScroller=n;var s=new LKQ;s.skinName="resource/eui_skins/LKQ.exml",s.x=3650,s.y=416,s.currentState="left",t.addChild(s),this.lkq=s;var a=new KQ;a.skinName="resource/eui_skins/KQ.exml",a.x=875,a.y=0,t.addChild(a)},e.prototype.initFrontGroup=function(){var t=new eui.Group;this.frontGroup=t;var e=new eui.Image;e.source="resource/assets/Bg/front-1.png",e.x=0,t.addChild(e);var i=new eui.Image;i.source="resource/assets/Bg/front-2.png",i.x=1798,t.addChild(i);var r=new eui.Image;r.source="resource/assets/Bg/front-3.png",r.x=3596,t.addChild(r);var o=new eui.Image;o.source="resource/assets/Bg/front-4.png",o.x=5394,t.addChild(o);var n=new eui.Image;n.source="resource/assets/Bg/front-5.png",n.x=7192,t.addChild(n);var s=new eui.Image;s.source="resource/assets/Bg/front-6.png",s.x=8990,t.addChild(s);var a=new eui.Image;a.source="resource/assets/Bg/front-7.png",a.x=10788,t.addChild(a);var h=new eui.Image;h.source="resource/assets/Bg/front-8.png",h.x=12586,t.addChild(h);var c=new eui.Scroller;c.width=this.stage.stageWidth,c.height=this.stage.stageHeight,c.viewport=t,this.addChild(c),this.frontScroller=c,c.verticalScrollBar.autoVisibility=!1,c.horizontalScrollBar.autoVisibility=!1,c.verticalScrollBar.visible=!1,c.horizontalScrollBar.visible=!1,this.frontScroller.addEventListener(eui.UIEvent.CHANGE,function(){this.backScroller.viewport.scrollH=this.frontScroller.viewport.scrollH*this.scrollFactor,this.switchMainPeople(),this.activeHand(this.frontScroller.viewport.scrollH)},this),this.frontScroller.viewport.scrollH=(this.frontGroupWidth-this.stage.stageWidth)/2,this.backScroller.viewport.scrollH=(this.backGroupWidth-this.stage.stageWidth)/2},e.prototype.switchMainPeople=function(){this.backScroller.viewport.scrollH>(this.backGroupWidth-this.stage.stageWidth)/2+50?this.lkq.currentState="left":this.lkq.currentState="right"},e.prototype.activeHand=function(t){t>6420&&7200>t?(this.startAni4Hand1(),this.startAni4Keword1()):(this.stopAni4Hand1(),this.stopAni4Keword())},e.prototype.initHand=function(){this.hand1=new eui.Group,this.hand1.x=7133,this.hand1.y=1040,this.hand1.anchorOffsetX=44,this.hand1.anchorOffsetY=380,this.hand1.width=104,this.hand1.height=394,this.hand1.currentState="disabled",this.frontGroup.addChild(this.hand1);var t=RES.getRes("hand_s_json"),e=t.getTexture("hand-7_png"),i=new eui.Image;i.source=e,this.hand1.addChild(i),this.keword1=new eui.Group,this.keword1.width=103,this.keword1.height=343,this.keword1.x=6986,this.keword1.y=452,this.keword1.alpha=0;var r=new eui.Image,o=RES.getRes("keword_s_json"),n=o.getTexture("keyword-7_png");r.source=n,this.keword1.addChild(r),this.keword1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.showModal,this),this.frontGroup.addChild(this.keword1)},e.prototype.showModal=function(){this.modalDialog.show()},e.prototype.startAni4Hand1=function(){if("disabled"===this.hand1.currentState){this.hand1.currentState="enabled";var t=egret.Tween.get(this.hand1);t.to({rotation:8},165).to({rotation:-8},350).to({rotation:8},350).to({rotation:-8},350).to({rotation:0},165)}},e.prototype.stopAni4Hand1=function(){this.hand1.currentState="disabled"},e.prototype.startAni4Keword1=function(){var t=egret.Tween.get(this.keword1);t.to({alpha:1,y:512},300)},e.prototype.stopAni4Keword=function(){this.keword1.alpha=0,this.keword1.y=452},e.prototype.initModalDialog=function(){this.modalDialog=new ModalDialog,this.modalDialog.x=0,this.modalDialog.y=0,this.addChild(this.modalDialog)},e.prototype.createGameScene=function(){this.initBackGroup(),this.initFrontGroup(),this.initHand(),this.initModalDialog()},e.prototype.startAnimation=function(t){var e=this,i=new egret.HtmlTextParser,r=t.map(function(t){return i.parse(t)}),o=this.textfield,n=-1,s=function(){n++,n>=r.length&&(n=0);var t=r[n];o.textFlow=t;var i=egret.Tween.get(o);i.to({alpha:1},200),i.wait(2e3),i.to({alpha:0},200),i.call(s,e)};s()},e}(eui.UILayer);__reflect(Main.prototype,"Main");var ModalDialog=function(t){function e(){var e=t.call(this)||this;return e.musicURL="resource/assets/Audio/7.mp3",e.visible=!0,e.text1="text2中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者",e.addEventListener(egret.Event.COMPLETE,e.init,e),e}return __extends(e,t),e.prototype.partAdded=function(e,i){t.prototype.partAdded.call(this,e,i)},e.prototype.init=function(){var t=new eui.VerticalLayout;t.gap=50,t.paddingTop=80,t.paddingBottom=60,t.horizontalAlign=egret.HorizontalAlign.CENTER,this.dialogGroup.layout=t,this.mdBg.width=this.width=this.stage.stageWidth,this.mdBg.height=this.height=this.stage.stageHeight,this.dialogScroller.verticalScrollBar.autoVisibility=!1,this.dialogScroller.verticalScrollBar.visible=!0,this.dialogScroller.verticalScrollBar.top=50,this.dialogScroller.verticalScrollBar.bottom=50;var e=RES.getRes("sprite_sheet_json"),i=e.getTexture("dialog-bg_png");this.mdMainBg.source=i;var r=e.getTexture("dialog-mic_png");this.questionIcon.source=r;var o=e.getTexture("dialog-name-bg_png"),n=new egret.Rectangle(32,4,155,25);this.questionHeaderBg.scale9Grid=n,this.questionHeaderBg.source=o;var s=e.getTexture("dialog-frame_png"),a=new egret.Rectangle(10,10,528,12);this.questionTxtBg.scale9Grid=a,this.questionTxtBg.source=s;var h=e.getTexture("dialog-lkq_png");this.answerIcon.source=h,this.answerHeaderBg.source=o,this.answerTxtBg.scale9Grid=n,this.answerTxtBg.source=s;var c=e.getTexture("audio-btn-text_png");this.lkqMusicTxt.source=c;var u=e.getTexture("audio-btn-play_png");this.musicIconPlay.source=u;var l=e.getTexture("audio-btn-pause_png");this.musicIconPause.source=l,this.lkqMusicIcon.currentState="play",this.musicIconPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playMusic,this),this.musicIconPause.addEventListener(egret.TouchEvent.TOUCH_TAP,this.pauseMusic,this),this.sound||(this.sound=new egret.Sound,this.sound.load(this.musicURL)),this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)},e.prototype.close=function(){this.visible=!1,this.pauseMusic()},e.prototype.show=function(){this.alpha=0,this.y=-30,this.visible=!0,egret.Tween.get(this).to({alpha:1,y:0},300)},e.prototype.playMusic=function(){var t=this;this.currentState="play",this.soundChannel=this.sound.play(0,1),this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE,function(){t.pauseMusic()},this),this.startAni()},e.prototype.pauseMusic=function(){this.currentState="pause",this.soundChannel&&this.soundChannel.stop(),this.stopAni()},e.prototype.startAni=function(){this.tw4Rect1=egret.Tween.get(this.rect1,{loop:!0}),this.tw4Rect1.to({height:25,y:0},260).to({height:5,y:20},400).to({height:12,y:13},140),this.tw4Rect2=egret.Tween.get(this.rect2,{loop:!0}),this.tw4Rect2.to({height:5,y:20},400).to({height:25,y:0},400),this.tw4Rect3=egret.Tween.get(this.rect3,{loop:!0}),this.tw4Rect3.to({height:25,y:0},140).to({height:5,y:20},400).to({height:18,y:7},260)},e.prototype.stopAni=function(){this.rect1.height=12,this.rect1.y=13,this.rect2.height=25,this.rect2.y=0,this.rect3.height=18,this.rect3.y=7,this.tw4Rect1&&(this.tw4Rect1.setPaused(!0),this.tw4Rect1.pause()),this.tw4Rect2&&(this.tw4Rect2.setPaused(!0),this.tw4Rect2.pause()),this.tw4Rect3&&(this.tw4Rect3.setPaused(!0),this.tw4Rect3.pause())},e.prototype.childrenCreated=function(){t.prototype.childrenCreated.call(this)},e.prototype.resize=function(){this.width=this.stage.width,this.height=this.stage.height},e}(eui.Component);__reflect(ModalDialog.prototype,"ModalDialog",["eui.UIComponent","egret.DisplayObject"]);var DebugPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]);var TestPlatform=function(){function t(){}return t.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2,{nickName:"username"}]})})},t.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(t){return[2]})})},t}();__reflect(TestPlatform.prototype,"TestPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function t(){}return t.prototype.getTheme=function(t,e,i,r){function o(t){e.call(r,t)}function n(e){e.resItem.url==t&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),i.call(r))}"undefined"!=typeof generateEUI?egret.callLater(function(){e.call(r,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,n,null),RES.getResByUrl(t,o,this,RES.ResourceItem.TYPE_TEXT))},t}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);