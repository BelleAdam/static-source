window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","LKQ":"resource/eui_skins/LKQ.exml","KQ":"resource/eui_skins/KQ.exml","Hand":"resource/eui_skins/Hand.exml","ModalDialog":"resource/eui_skins/ModalDialog.exml"}
generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text")
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/KQ.exml'] = window.KQSkin = (function (_super) {
	__extends(KQSkin, _super);
	function KQSkin() {
		_super.call(this);
		this.skinParts = ["kq1","kq2","kq3","kq4","kq5","kq6","kq7","kq8","kq9","kq10","kq11"];
		
		this.height = 603;
		this.width = 1058;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = KQSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 603;
		t.width = 1058;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.kq1_i(),this.kq2_i(),this.kq3_i(),this.kq4_i(),this.kq5_i(),this.kq6_i(),this.kq7_i(),this.kq8_i(),this.kq9_i(),this.kq10_i(),this.kq11_i()];
		return t;
	};
	_proto.kq1_i = function () {
		var t = new eui.Image();
		this.kq1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 603;
		t.width = 1058;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.kq2_i = function () {
		var t = new eui.Image();
		this.kq2 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq3_i = function () {
		var t = new eui.Image();
		this.kq3 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq4_i = function () {
		var t = new eui.Image();
		this.kq4 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq5_i = function () {
		var t = new eui.Image();
		this.kq5 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq6_i = function () {
		var t = new eui.Image();
		this.kq6 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq7_i = function () {
		var t = new eui.Image();
		this.kq7 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq8_i = function () {
		var t = new eui.Image();
		this.kq8 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq9_i = function () {
		var t = new eui.Image();
		this.kq9 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq10_i = function () {
		var t = new eui.Image();
		this.kq10 = t;
		t.anchorOffsetX = 272;
		t.anchorOffsetY = 261;
		t.height = 267;
		t.rotation = 40;
		t.width = 320;
		t.x = 917;
		t.y = 261;
		return t;
	};
	_proto.kq11_i = function () {
		var t = new eui.Image();
		this.kq11 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 211;
		t.width = 160;
		t.x = 836;
		t.y = 187;
		return t;
	};
	return KQSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/LKQ.exml'] = window.LKQSkin = (function (_super) {
	__extends(LKQSkin, _super);
	function LKQSkin() {
		_super.call(this);
		this.skinParts = ["lkq1","lkq2"];
		
		this.height = 360;
		this.width = 448;
		this.elementsContent = [];
		this.lkq1_i();
		
		this.lkq2_i();
		
		this.states = [
			new eui.State ("left",
				[
					new eui.AddItems("lkq1","",1,"")
				])
			,
			new eui.State ("right",
				[
					new eui.AddItems("lkq2","",1,"")
				])
		];
	}
	var _proto = LKQSkin.prototype;

	_proto.lkq1_i = function () {
		var t = new eui.Image();
		this.lkq1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 360;
		t.source = "";
		t.width = 448;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lkq2_i = function () {
		var t = new eui.Image();
		this.lkq2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.height = 356;
		t.source = "";
		t.width = 448;
		t.x = 0;
		t.y = 4;
		return t;
	};
	return LKQSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ModalDialog.exml'] = window.ModalDialogSkin = (function (_super) {
	__extends(ModalDialogSkin, _super);
	function ModalDialogSkin() {
		_super.call(this);
		this.skinParts = ["mdBg","mdMainBg","closeBtn","questionIcon","questionHeaderBg","questionHeaderTxt","questionHeader","questionTxtBg","questionTxt","questionGroup","rect1","rect2","rect3","lkqMusicTxt","musicIconPlay","musicIconPause","lkqMusicIcon","lkqMusic","answerIcon","answerHeaderBg","answerHeaderTxt","answerHeader","answerTxtBg","answerTxt","answerGroup","dialogGroup","dialogScroller","mdMain"];
		
		this.currentState = "pause";
		this.elementsContent = [this.mdBg_i(),this.mdMain_i()];
		this.musicIconPlay_i();
		
		this.musicIconPause_i();
		
		this.states = [
			new eui.State ("pause",
				[
					new eui.AddItems("musicIconPlay","_Group2",0,"")
				])
			,
			new eui.State ("play",
				[
					new eui.AddItems("musicIconPause","_Group2",1,"")
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.text1"],[0],this.questionTxt,"text")
	}
	var _proto = ModalDialogSkin.prototype;

	_proto.mdBg_i = function () {
		var t = new eui.Rect();
		this.mdBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillAlpha = 0.75;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.mdMain_i = function () {
		var t = new eui.Group();
		this.mdMain = t;
		t.height = 991;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 637;
		t.x = 20.5;
		t.y = 107.5;
		t.elementsContent = [this.mdMainBg_i(),this.closeBtn_i(),this.dialogScroller_i()];
		return t;
	};
	_proto.mdMainBg_i = function () {
		var t = new eui.Image();
		this.mdMainBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 991;
		t.width = 637;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Rect();
		this.closeBtn = t;
		t.alpha = 0.01;
		t.height = 40;
		t.width = 80;
		t.x = 500;
		t.y = 5;
		return t;
	};
	_proto.dialogScroller_i = function () {
		var t = new eui.Scroller();
		this.dialogScroller = t;
		t.height = 940;
		t.width = 600;
		t.x = 35;
		t.y = 48;
		t.viewport = this._Group5_i();
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.height = 940;
		t.width = 600;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.dialogGroup_i()];
		return t;
	};
	_proto.dialogGroup_i = function () {
		var t = new eui.Group();
		this.dialogGroup = t;
		t.width = 562;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.width = 562;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.questionIcon_i(),this.questionHeader_i(),this.questionGroup_i(),this.lkqMusic_i()];
		return t;
	};
	_proto.questionIcon_i = function () {
		var t = new eui.Image();
		this.questionIcon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 59;
		t.width = 50;
		t.x = 15;
		t.y = 0;
		return t;
	};
	_proto.questionHeader_i = function () {
		var t = new eui.Group();
		this.questionHeader = t;
		t.width = 380;
		t.x = 80;
		t.y = 30;
		t.elementsContent = [this.questionHeaderBg_i(),this.questionHeaderTxt_i()];
		return t;
	};
	_proto.questionHeaderBg_i = function () {
		var t = new eui.Image();
		this.questionHeaderBg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 33;
		t.width = 380;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.questionHeaderTxt_i = function () {
		var t = new eui.Label();
		this.questionHeaderTxt = t;
		t.height = 30;
		t.text = "中央人民广播电台记者";
		t.width = 300;
		t.x = 30;
		t.y = -10;
		return t;
	};
	_proto.questionGroup_i = function () {
		var t = new eui.Group();
		this.questionGroup = t;
		t.width = 548;
		t.x = 0;
		t.y = 80;
		t.elementsContent = [this.questionTxtBg_i(),this.questionTxt_i()];
		return t;
	};
	_proto.questionTxtBg_i = function () {
		var t = new eui.Image();
		this.questionTxtBg = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.questionTxt_i = function () {
		var t = new eui.Label();
		this.questionTxt = t;
		t.bottom = 25;
		t.textColor = 0xc27b54;
		t.top = 25;
		t.width = 512;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.lkqMusic_i = function () {
		var t = new eui.Group();
		this.lkqMusic = t;
		t.height = 57;
		t.width = 232;
		t.x = 330;
		t.y = -60;
		t.elementsContent = [this._Group1_i(),this.lkqMusicTxt_i(),this.lkqMusicIcon_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 25;
		t.width = 24;
		t.x = 5;
		t.y = 21;
		t.elementsContent = [this.rect1_i(),this.rect2_i(),this.rect3_i()];
		return t;
	};
	_proto.rect1_i = function () {
		var t = new eui.Rect();
		this.rect1 = t;
		t.fillColor = 0x946a4a;
		t.height = 12;
		t.width = 4;
		t.x = 0;
		t.y = 13;
		return t;
	};
	_proto.rect2_i = function () {
		var t = new eui.Rect();
		this.rect2 = t;
		t.fillColor = 0x946a4a;
		t.height = 25;
		t.width = 4;
		t.x = 10;
		t.y = 0;
		return t;
	};
	_proto.rect3_i = function () {
		var t = new eui.Rect();
		this.rect3 = t;
		t.fillColor = 0x946a4a;
		t.height = 18;
		t.width = 4;
		t.x = 20;
		t.y = 7;
		return t;
	};
	_proto.lkqMusicTxt_i = function () {
		var t = new eui.Image();
		this.lkqMusicTxt = t;
		t.height = 34;
		t.width = 121;
		t.x = 40;
		t.y = 12;
		return t;
	};
	_proto.lkqMusicIcon_i = function () {
		var t = new eui.Group();
		this.lkqMusicIcon = t;
		t.height = 57;
		t.width = 57;
		t.elementsContent = [this._Group2_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.x = 175;
		t.y = 0;
		t.elementsContent = [];
		return t;
	};
	_proto.musicIconPlay_i = function () {
		var t = new eui.Image();
		this.musicIconPlay = t;
		t.height = 57;
		t.width = 57;
		return t;
	};
	_proto.musicIconPause_i = function () {
		var t = new eui.Image();
		this.musicIconPause = t;
		t.height = 57;
		t.width = 57;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.width = 562;
		t.elementsContent = [this.answerIcon_i(),this.answerHeader_i(),this.answerGroup_i()];
		return t;
	};
	_proto.answerIcon_i = function () {
		var t = new eui.Image();
		this.answerIcon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 260;
		t.width = 205;
		t.x = -10;
		t.y = -16;
		return t;
	};
	_proto.answerHeader_i = function () {
		var t = new eui.Group();
		this.answerHeader = t;
		t.height = 33;
		t.width = 230;
		t.x = 210;
		t.y = 60;
		t.elementsContent = [this.answerHeaderBg_i(),this.answerHeaderTxt_i()];
		return t;
	};
	_proto.answerHeaderBg_i = function () {
		var t = new eui.Image();
		this.answerHeaderBg = t;
		t.height = 33;
		t.width = 230;
		return t;
	};
	_proto.answerHeaderTxt_i = function () {
		var t = new eui.Label();
		this.answerHeaderTxt = t;
		t.text = "李克强总理";
		t.textColor = 0xc27b54;
		t.x = 30;
		t.y = -10;
		return t;
	};
	_proto.answerGroup_i = function () {
		var t = new eui.Group();
		this.answerGroup = t;
		t.width = 548;
		t.x = 0;
		t.y = 115;
		t.elementsContent = [this.answerTxtBg_i(),this.answerTxt_i()];
		return t;
	};
	_proto.answerTxtBg_i = function () {
		var t = new eui.Image();
		this.answerTxtBg = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.answerTxt_i = function () {
		var t = new eui.Label();
		this.answerTxt = t;
		t.bottom = 25;
		t.text = "中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者中央人民广播电台记者";
		t.textColor = 0xc27b54;
		t.top = 25;
		t.width = 512;
		t.x = 20;
		t.y = 20;
		return t;
	};
	return ModalDialogSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this._Image1_i(),this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.source = "sprite_sheet_json#dialog-scroll-bg_png";
		t.top = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 184;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,0,20,164);
		t.source = "sprite_sheet_json#dialog-scroll-bar_png";
		t.width = 26;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);