class LKQ extends eui.Component implements  eui.UIComponent {

	public constructor() {
		super();
	}

	public lkq1:eui.Image;
	public lkq2:eui.Image;

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
		if (partName === 'lkq1') {
			let spriteSheet:egret.SpriteSheet = RES.getRes("sprite_sheet_json");
			let texture = spriteSheet.getTexture("lkq-1_png");
			this.lkq1.source = texture;
		}
		if (partName === 'lkq2') {
			let spriteSheet:egret.SpriteSheet = RES.getRes("sprite_sheet_json");
			let texture = spriteSheet.getTexture("lkq-2_png");
			this.lkq2.source = texture;
		}
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	
}