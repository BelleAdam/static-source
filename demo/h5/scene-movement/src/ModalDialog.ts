class ModalDialog extends eui.Component implements  eui.UIComponent {
	public mdMain: eui.Group;
	public mdMainBg: eui.Image;

	public dialogGroup: eui.Group;

	public dialogScroller: eui.Scroller;

	public questionIcon: eui.Image;
	public questionHeaderBg: eui.Image;
	public questionTxtBg: eui.Image;

	public answerIcon: eui.Image;
	public answerHeaderBg: eui.Image;
	public answerTxtBg: eui.Image;

	public lkqMusicIcon: eui.Group;
	public lkqMusicTxt: eui.Image;
	public musicIconPlay: eui.Image;
	public musicIconPause: eui.Image;

	public musicURL = 'resource/assets/Audio/7.mp3';
	public sound: egret.Sound;
	public soundChannel: egret.SoundChannel;

	public rect1: eui.Rect;
	public rect2: eui.Rect;
	public rect3: eui.Rect;

	public tw4Rect1: egret.Tween;
	public tw4Rect2: egret.Tween;
	public tw4Rect3: egret.Tween;

	public closeBtn: eui.Rect;

	public text1: string;

	public mdBg: eui.Image;

	public constructor() {
		super();
		this.visible = true;
		this.text1 = 'text2中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者';
		this.addEventListener(egret.Event.COMPLETE, this.init, this);
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private init():void {
		let vLayout:eui.VerticalLayout = new eui.VerticalLayout();
		vLayout.gap = 50;
		vLayout.paddingTop = 80;
		vLayout.paddingBottom = 60;
		vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
		this.dialogGroup.layout = vLayout;

		this.mdBg.width = this.width = this.stage.stageWidth;
		this.mdBg.height = this.height = this.stage.stageHeight;

		this.dialogScroller.verticalScrollBar.autoVisibility = false;
		this.dialogScroller.verticalScrollBar.visible = true;
		this.dialogScroller.verticalScrollBar.top = 50;
		this.dialogScroller.verticalScrollBar.bottom = 50;

		let sSheet:egret.SpriteSheet = RES.getRes("sprite_sheet_json");

		let texture = sSheet.getTexture('dialog-bg_png');
		this.mdMainBg.source = texture;

		let textureQIcon = sSheet.getTexture('dialog-mic_png');
		this.questionIcon.source = textureQIcon;

		let textureQHeaderBg = sSheet.getTexture('dialog-name-bg_png');
		let rect:egret.Rectangle = new egret.Rectangle(32, 4, 155, 25);
		this.questionHeaderBg.scale9Grid = rect;
		this.questionHeaderBg.source = textureQHeaderBg;

		let textureQTxtBg = sSheet.getTexture('dialog-frame_png');
		let rectQTxtBg:egret.Rectangle = new egret.Rectangle(10, 10, 528, 12);
		this.questionTxtBg.scale9Grid = rectQTxtBg;
		this.questionTxtBg.source = textureQTxtBg;

		let textureAIcon = sSheet.getTexture('dialog-lkq_png');
		this.answerIcon.source = textureAIcon;
		this.answerHeaderBg.source = textureQHeaderBg;
		this.answerTxtBg.scale9Grid = rect;
		this.answerTxtBg.source = textureQTxtBg;

		let textureMusicTxt = sSheet.getTexture('audio-btn-text_png');
		this.lkqMusicTxt.source = textureMusicTxt;

		let textureMusicIconPlay = sSheet.getTexture('audio-btn-play_png');
		this.musicIconPlay.source = textureMusicIconPlay;
		let textureMusicIconPause = sSheet.getTexture('audio-btn-pause_png');
		this.musicIconPause.source = textureMusicIconPause;

		this.lkqMusicIcon.currentState = 'play';

		this.musicIconPlay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playMusic, this);
		this.musicIconPause.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseMusic, this);

		if (!this.sound) {
			this.sound = new egret.Sound();
			this.sound.load(this.musicURL);
		}

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
	};

	public close():void {
		this.visible = false;
		this.pauseMusic();
	};

	public show():void {
		this.alpha = 0;
		this.y = -30;
		this.visible = true;
		egret.Tween.get(this).to({alpha: 1, y: 0}, 300);
	};

	private playMusic():void {
		this.currentState = 'play';
		this.soundChannel = this.sound.play(0, 1);
		this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, () => {
			this.pauseMusic();
		}, this);
		this.startAni();
	};

	private pauseMusic():void {
		this.currentState = 'pause';
		this.soundChannel && this.soundChannel.stop();
		this.stopAni();
	};

	private startAni():void {
		this.tw4Rect1 = egret.Tween.get(this.rect1, {loop: true});
		this.tw4Rect1.to({height: 25, y: 0}, 260).to({height: 5, y: 20}, 400).to({height: 12, y: 13}, 140);

		this.tw4Rect2 = egret.Tween.get(this.rect2, {loop: true});
		this.tw4Rect2.to({height: 5, y: 20}, 400).to({height: 25, y: 0}, 400);

		this.tw4Rect3 = egret.Tween.get(this.rect3, {loop: true});
		this.tw4Rect3.to({height: 25, y: 0}, 140).to({height: 5, y: 20}, 400).to({height: 18, y: 7}, 260);
	};

	private stopAni():void {
		this.rect1.height = 12;
		this.rect1.y = 13;
		this.rect2.height = 25;
		this.rect2.y = 0;
		this.rect3.height = 18;
		this.rect3.y = 7;
		if (this.tw4Rect1) {
			this.tw4Rect1.setPaused(true);
			this.tw4Rect1.pause();
		}
		if (this.tw4Rect2) {
			this.tw4Rect2.setPaused(true);
			this.tw4Rect2.pause();
		}
		if (this.tw4Rect3) {
			this.tw4Rect3.setPaused(true);
			this.tw4Rect3.pause();
		}
	};

	protected childrenCreated():void
	{
		super.childrenCreated();
	}

	public resize(): void {
		this.width = this.stage.width;
		this.height = this.stage.height;
	};
	
}