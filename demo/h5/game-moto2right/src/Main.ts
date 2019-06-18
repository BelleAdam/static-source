//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private bgArr:eui.Image[];
    private manImg:eui.Image;
    private wangmuImg:eui.Image;
    private tw4ManImg:egret.Tween;
    private isRunning: boolean;
    private isLooking: boolean;
    private speed;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        this.bgArr = [];
        this.speed = 5;

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let bg1 = new eui.Image();
        bg1.source = RES.getRes('bj1_jpg');
        bg1.x = 0;
        bg1.y = 0;
        bg1.width = 3737;
        bg1.height = 1136;
        this.addChild(bg1);
        let bg2 = new eui.Image();
        bg2.source = RES.getRes('bj1_jpg');
        bg2.x = 3737;
        bg2.y = 0;
        bg2.width = 3737;
        bg2.height = 1136;
        this.addChild(bg2);
        this.bgArr.push(bg1)
        this.bgArr.push(bg2);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.start, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.stop, this);

        this.manImg = new eui.Image();
        this.manImg.x = 100;
        this.manImg.y = 850;
        this.manImg.anchorOffsetX = 0;
        this.manImg.anchorOffsetY = 363;
        this.manImg.source = RES.getRes('man-sheet_json#man-1_png');
        this.addChild(this.manImg);

        this.wangmuImg = new eui.Image();
        this.wangmuImg.source = RES.getRes('wangmu-sheet_json#wangmu-1_png');
        this.wangmuImg.x = 640;
        this.wangmuImg.y = 0;
        this.wangmuImg.anchorOffsetX = 537;
        this.wangmuImg.anchorOffsetY = 0;
        this.addChild(this.wangmuImg);

        this.trafficLight();
    }
    private start():void {
        if (this.isLooking) {
            alert('fail');
            return;
        }
        this.addEventListener(egret.Event.ENTER_FRAME, this.forward, this);
        this.tw4ManImg = egret.Tween.get(this.manImg, {loop: true});
        this.tw4ManImg.to({y: 845}, 250).to({y: 850}, 250);
        this.isRunning = true;
    };
    private trafficLight():void {
        setTimeout(() => {
            this.wangmuImg.source = RES.getRes('wangmu-sheet_json#wangmu-2_png');
            setTimeout(() => {
                this.wangmuImg.source = RES.getRes('wangmu-sheet_json#wangmu-3_png');
                this.isLooking = true;
                if (this.isRunning) {
                    alert('fail');
                }
                setTimeout(() => {
                    this.isLooking = false;
                    this.wangmuImg.source = RES.getRes('wangmu-sheet_json#wangmu-1_png');
                    this.trafficLight();
                }, 1000);
            }, 1000);
        }, 2500);
    };
    private forward():void {
        if (this.speed < 20) {
            this.speed = this.speed + 0.2;
            this.manImg.source = RES.getRes('man-sheet_json#man-2_png');
        } else if (this.speed < 35) {
            this.speed = this.speed + 0.4;
            this.manImg.source = RES.getRes('man-sheet_json#man-3_png');
        } else if (this.speed <= 50) {
            this.speed = 50;
        }

        let bgArrLength = this.bgArr.length;
        for (let i = 0; i < bgArrLength; i ++) {
            let bg = this.bgArr[i];
            if ((-bg.x) > bg.width) {
                bg.x = this.bgArr[1].width - ((-bg.x) - bg.width);
                bg.x -= this.speed;
                this.bgArr[1].x -= this.speed;
                this.bgArr.shift();
                this.bgArr.push(bg);
                break;
            }
            bg.x -= this.speed;
        }
    };
    private stop():void {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.forward, this);
        this.manImg.source = RES.getRes('man-sheet_json#man-1_png');
        this.manImg.y = 850;
        this.speed = 5;
        this.tw4ManImg.pause();
        this.isRunning = false;
    };
}
