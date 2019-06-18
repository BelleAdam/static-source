class KQ extends eui.Component implements  eui.UIComponent {
	public constructor() {
		super();
		this.addEventListener(egret.Event.COMPLETE, this.init, this);
	}

	public kq1:eui.Image;
	public kq2:eui.Image;
	public kq3:eui.Image;
	public kq4:eui.Image;
	public kq5:eui.Image;
	public kq6:eui.Image;
	public kq7:eui.Image;
	public kq8:eui.Image;
	public kq9:eui.Image;
	public kq10:eui.Image;
	public kq11:eui.Image;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}

	private init():void {
		let spriteSheet1:egret.SpriteSheet = RES.getRes("painting_s_json");
		let texture1 = spriteSheet1.getTexture("kq-1_png");
		this.kq1.source = texture1;

		let spriteSheet2:egret.SpriteSheet = RES.getRes("painting_s_json");
		let texture2 = spriteSheet2.getTexture("kq-2_png");
		this.kq2.source = texture2;
		this.kq3.source = texture2;
		this.kq4.source = texture2;
		this.kq5.source = texture2;
		this.kq6.source = texture2;
		this.kq7.source = texture2;
		this.kq8.source = texture2;
		this.kq9.source = texture2;
		this.kq10.source = texture2;

		let spriteSheet11:egret.SpriteSheet = RES.getRes("painting_s_json");
		let texture11 = spriteSheet11.getTexture("kq-3_png");
		this.kq11.source = texture11;

		setTimeout(() => {
			this.startAni();
		}, 3000);
	};

	private startAni():void {
		let tw4kq5 = egret.Tween.get(this.kq5, {loop: true});
		tw4kq5.to({rotation: 20}, 1000).wait(9000).to({rotation: 40}, 1000).wait(3000);
		let tw4kq4 = egret.Tween.get(this.kq4, {loop: true});
		tw4kq4.to({rotation: 0}, 2000).wait(7000).to({rotation: 40}, 2000).wait(3000);
		let tw4kq3 = egret.Tween.get(this.kq3, {loop: true});
		tw4kq3.to({rotation: -20}, 3000).wait(5000).to({rotation: 40}, 3000).wait(3000);
		let tw4kq2 = egret.Tween.get(this.kq2, {loop: true});
		tw4kq2.to({rotation: -40}, 4000).wait(3000).to({rotation: 40}, 4000).wait(3000);

		let tw4kq7 = egret.Tween.get(this.kq7, {loop: true});
		tw4kq7.to({rotation: 60}, 1000).wait(9000).to({rotation: 40}, 1000).wait(3000);
		let tw4kq8 = egret.Tween.get(this.kq8, {loop: true});
		tw4kq8.to({rotation: 80}, 2000).wait(7000).to({rotation: 40}, 2000).wait(3000);
		let tw4kq9 = egret.Tween.get(this.kq9, {loop: true});
		tw4kq9.to({rotation: 100}, 3000).wait(5000).to({rotation: 40}, 3000).wait(3000);
		let tw4kq10 = egret.Tween.get(this.kq10, {loop: true});
		tw4kq10.to({rotation: 120}, 4000).wait(3000).to({rotation: 40}, 4000).wait(3000);
	};

	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}