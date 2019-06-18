class Main extends eui.UILayer {

    private backScroller: eui.Scroller;
    private frontScroller: eui.Scroller;
    private mainPeopleImg: eui.Image;
    private lkq: LKQ;
    private frontGroupWidth;
    private backGroupWidth;
    private frontGroup: eui.Group;
    private backGroup: eui.Group;
    private scrollFactor;
    private hand1: eui.Group;
    private keword1: eui.Group;
    private activedHand1: boolean;
    private activedKeword1: boolean;

    private modalDialog: ModalDialog;

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

        this.runGame().catch(e => {
            console.log(e);
        })

        this.frontGroupWidth = 1798 * 8;
        this.backGroupWidth = 1954 * 4;
        this.scrollFactor = (this.backGroupWidth - this.stage.stageWidth) / (this.frontGroupWidth - this.stage.stageWidth);
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
    private initBackGroup(): void {
        let backGroup = new eui.Group();
        this.backGroup = backGroup;
        let backImg = new eui.Image();
        backImg.source = 'resource/assets/Bg/back-1.png';
        backImg.x = 0;
        backGroup.addChild(backImg);
        let backImg2 = new eui.Image();
        backImg2.source = 'resource/assets/Bg/back-2.png';
        backImg2.x = 1954;
        backGroup.addChild(backImg2);
        let backImg3 = new eui.Image();
        backImg3.source = 'resource/assets/Bg/back-3.png';
        backImg3.x = 1954 * 2;
        backGroup.addChild(backImg3);
        let backImg4 = new eui.Image();
        backImg4.source = 'resource/assets/Bg/back-4.png';
        backImg4.x = 1954 * 3;
        backGroup.addChild(backImg4);

        let backScroller = new eui.Scroller();
        backScroller.width = this.stage.stageWidth;
        backScroller.height = this.stage.stageHeight;
        backScroller.viewport = backGroup;
        this.addChild(backScroller);
        backScroller.verticalScrollBar.autoVisibility = false;
        backScroller.horizontalScrollBar.autoVisibility = false;
        backScroller.verticalScrollBar.visible = false;
        backScroller.horizontalScrollBar.visible = false;
        this.backScroller = backScroller;

        let lkq = new LKQ();
        lkq.skinName = 'resource/eui_skins/LKQ.exml';
        lkq.x = 3650;
        lkq.y = 416;
        lkq.currentState = 'left';
        backGroup.addChild(lkq);
        this.lkq = lkq;

        let kq = new KQ();
        kq.skinName = 'resource/eui_skins/KQ.exml';
        kq.x = 875;
        kq.y = 0;
        backGroup.addChild(kq);
    }
    private initFrontGroup(): void {
        let frontGroup = new eui.Group();
        this.frontGroup = frontGroup;
        let frontImg = new eui.Image();
        frontImg.source = 'resource/assets/Bg/front-1.png';
        frontImg.x = 0;
        frontGroup.addChild(frontImg);
        let frontImg2 = new eui.Image();
        frontImg2.source = 'resource/assets/Bg/front-2.png';
        frontImg2.x = 1798;
        frontGroup.addChild(frontImg2);
        let frontImg3 = new eui.Image();
        frontImg3.source = 'resource/assets/Bg/front-3.png';
        frontImg3.x = 1798 * 2;
        frontGroup.addChild(frontImg3);
        let frontImg4 = new eui.Image();
        frontImg4.source = 'resource/assets/Bg/front-4.png';
        frontImg4.x = 1798 * 3;
        frontGroup.addChild(frontImg4);
        let frontImg5 = new eui.Image();
        frontImg5.source = 'resource/assets/Bg/front-5.png';
        frontImg5.x = 1798 * 4;
        frontGroup.addChild(frontImg5);
        let frontImg6 = new eui.Image();
        frontImg6.source = 'resource/assets/Bg/front-6.png';
        frontImg6.x = 1798 * 5;
        frontGroup.addChild(frontImg6);
        let frontImg7 = new eui.Image();
        frontImg7.source = 'resource/assets/Bg/front-7.png';
        frontImg7.x = 1798 * 6;
        frontGroup.addChild(frontImg7);
        let frontImg8 = new eui.Image();
        frontImg8.source = 'resource/assets/Bg/front-8.png';
        frontImg8.x = 1798 * 7;
        frontGroup.addChild(frontImg8);

        let frontScroller = new eui.Scroller();
        frontScroller.width = this.stage.stageWidth;
        frontScroller.height = this.stage.stageHeight;
        frontScroller.viewport = frontGroup;
        this.addChild(frontScroller);
        this.frontScroller = frontScroller;
        frontScroller.verticalScrollBar.autoVisibility = false;
        frontScroller.horizontalScrollBar.autoVisibility = false;
        frontScroller.verticalScrollBar.visible = false;
        frontScroller.horizontalScrollBar.visible = false;

        this.frontScroller.addEventListener(eui.UIEvent.CHANGE, function() {
            this.backScroller.viewport.scrollH = this.frontScroller.viewport.scrollH * this.scrollFactor;
            this.switchMainPeople();
            this.activeHand(this.frontScroller.viewport.scrollH);
        }, this);
        this.frontScroller.viewport.scrollH = (this.frontGroupWidth - this.stage.stageWidth) / 2;
        this.backScroller.viewport.scrollH = (this.backGroupWidth - this.stage.stageWidth) / 2;
    }
    private switchMainPeople(): void {
        if (this.backScroller.viewport.scrollH > (this.backGroupWidth - this.stage.stageWidth) / 2 + 50) {
            this.lkq.currentState = 'left';
        } else {
            this.lkq.currentState = 'right';
        }
    }
    private activeHand(scrollH): void {
        if (scrollH > 6420 && scrollH < 7200) {
            this.startAni4Hand1();
            this.startAni4Keword1();
        } else {
            this.stopAni4Hand1();
            this.stopAni4Keword();
        }
    };
    private initHand():void {
        this.hand1 = new eui.Group();
        this.hand1.x = 7133;
        this.hand1.y = 1040;
        this.hand1.anchorOffsetX = 44;
        this.hand1.anchorOffsetY = 380;
        this.hand1.width = 104;
        this.hand1.height = 394;
        this.hand1.currentState = 'disabled';
        this.frontGroup.addChild(this.hand1);

        let spriteSheet:egret.SpriteSheet = RES.getRes("hand_s_json");
        let texture = spriteSheet.getTexture("hand-7_png");
        let handImg1 = new eui.Image();
        handImg1.source = texture;
        this.hand1.addChild(handImg1);

        this.keword1 = new eui.Group();
        this.keword1.width = 103;
        this.keword1.height = 343;
        this.keword1.x = 6986;
        this.keword1.y = 452;
        this.keword1.alpha = 0;
        let kewordImg1 = new eui.Image();
        let sSheet1:egret.SpriteSheet = RES.getRes("keword_s_json");
        let tture1 = sSheet1.getTexture("keyword-7_png");
        kewordImg1.source = tture1;
        this.keword1.addChild(kewordImg1);
        this.keword1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showModal, this);
        this.frontGroup.addChild(this.keword1);

    };
    private showModal():void {
        this.modalDialog.show();
    };
    private startAni4Hand1():void {
        if (this.hand1.currentState === 'disabled') {
            this.hand1.currentState = 'enabled';
            let tw4hand1 = egret.Tween.get(this.hand1);
            tw4hand1.to({rotation: 8}, 165).to({rotation: -8}, 350).to({rotation: 8}, 350).to({rotation: -8}, 350).to({rotation: 0}, 165);
        }
    };
    private stopAni4Hand1():void {
        this.hand1.currentState = 'disabled';
    };
    private startAni4Keword1(): void {
        let tw4keword1 = egret.Tween.get(this.keword1);
        tw4keword1.to({alpha: 1, y: 512}, 300);
    };
    private stopAni4Keword(): void {
        this.keword1.alpha = 0;
        this.keword1.y = 452;
    };
    private initModalDialog(): void {
        this.modalDialog = new ModalDialog();
        this.modalDialog.x = 0;
        this.modalDialog.y = 0;
        this.addChild(this.modalDialog);
    };
    protected createGameScene(): void {
        this.initBackGroup();
        this.initFrontGroup();
        this.initHand();
        this.initModalDialog();
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }
}
