import ajax from 'common/ajax';
const defaultPic = '//chuantu.xyz/t6/702/1560165444x992245975.png';
let fileName = '成本图_';
let y_index = 1;
// 图层
let z_index = 0;
export default {
    cover: '',
    init: function() {
        // 设置背景色
        document.body.style.backgroundColor = '#262c33';
        this.modlueSwitch(); //绑定模板切换事件
        this.prevchangeFun(); //绑定关闭-更换图片事件
        this.bindEvents();
        this.keyBoardModlueSwitch();
    },
    bindEvents: function() {
        let that = this;
        $('#excel-file')[0] &&
            $('#excel-file').change(function(e) {
                var files = e.target.files;
                var fileReader = new FileReader();
                fileReader.onload = function(ev) {
                    try {
                        var data = ev.target.result,
                            workbook = XLSX.read(data, {
                                type: 'binary',
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        alert('文件类型不正确');
                        return;
                    }
                    // 表格的表格范围，可用于判断表头是否数量是否正确
                    let fromTo = '';
                    // 遍历每张表读取
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                            that.y_index_Max = persons.length;
                            //发现json格式不是你想要的你可以
                            //XLSX.utils.sheet_to_json(workbook.Sheets[sheet],{raw:true, header:1})
                            // 如果只取第一张表，就取消注释这行
                            $('#hiddata').val(JSON.stringify(persons));
                            console.log(`一共有${persons.length}列数据,每列有${Object.getOwnPropertyNames(persons[0]).length}个属性`);
                            that.modlueData = persons;
                            that.setDCcode(persons[0]);
                            var shtml = '';
                            var attribute = JSON.parse($('#hiddattribute').val());
                            var widgets = attribute.widgets;
                            for (var i = 0; i < persons.length; i++) {
                                var imgUrl = persons[i].cover ? persons[i].cover : defaultPic;
                                shtml += '<div id = "goodsID' + (i + 1) +
                                    '" class="goods-icon1 img-container" data-modlueName="modlue' +
                                    (i + 1) + ' saveNone" ><img id="modlue' + persons[i].id + '_cover" src="' + imgUrl + '"></div>';
                            }
                            $('#modlue-type').html(shtml);
                            for (var i = 0; i < persons.length; i++) {
                                var goodsCover = $('#goodsID' + (i + 1)).find('img')[0];
                            }
                            break; // 如果只取第一张表，就取消注释这行
                        }
                    }
                };
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files[0]);
                $('#modlue-type').fadeIn();
            });
    },
    uploadPicCon: $('#uploadPic-con'),
    modlueList: $('#modlue-type .modlue-select'), //模板列表
    modlueName: $('#modlue-type .active').attr('data-modluename'), //模板编号
    save: $('#save'), //裁剪按钮
    outputPicCon: $('#outputPic-con'), //合成显示img
    TypeNum: 0,
    modlueData: [],
    y_index_Max: 0,
    loadScript(url, fn) {
        var s = document.createElement('script');
        s.src = url;
        s.onload = function() {
            fn && fn();
        };
        document.body.appendChild(s);
    },
    boxSave: function() {
        /*获取背景图url*/
        var that = this;
        $('#template').each(function(i, m) {
            var _this = $(this),
                _class = _this.attr('class'),
                bgUrl = _this.css('backgroundImage').replace('url(', '').replace(')', '');
            if (bgUrl && bgUrl != 'none') {
                if (_class.indexOf('template') > -1) {
                    /*背景图片*/
                    that.setIconPic(_this, bgUrl, 'bg');
                } else {
                    that.setIconPic(_this, bgUrl);
                }
            }
        });
        that.outputPic('template');
    },
    outputPic: function(id) {
        /*图片合成*/
        var that = this;
        var shareContent = document.getElementById(id); //需要截图的包裹的（原生的）DOM 对象
        var width = shareContent.offsetWidth;
        var height = shareContent.offsetHeight;
        var canvas = document.createElement('canvas');
        var scale = 1; //定义任意放大倍数 支持小数
        if (that.modlueName.indexOf('scale') > -1) {
            var a = that.modlueName.split(' ');
            var s;
            for (var i = 0; i < a.length; i++) {
                if (a[i].indexOf('scale')) {}
                s = a[i].replace(/[^0-9]/gi, '');
            }
            scale = s;
        }
        canvas.width = width * scale;
        canvas.height = height * scale;
        canvas.getContext('2d').scale(scale, scale);
        var opts = {
            scale: scale, // 添加的scale 参数
            canvas: canvas,
            logging: false, //日志开关
            width: width,
            height: height,
        };
        html2canvas(shareContent, opts).then(function(canvas) {
            var url = Canvas2Image.convertToImage(canvas, canvas.width, canvas.height, 'jpeg').src;
            $('#template').attr('src', url);
            let a = document.createElement('a');
            let event = new MouseEvent('click');
            // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
            a.download = fileName + that.TypeNum;
            a.href = url; // base64
            // 触发a的单击事件
            a.dispatchEvent(event);
        });
    },
    allPutOut: function() {
        var that = this;
        if (y_index <= that.y_index_Max) {
            $('#goodsID' + y_index).click();
            setTimeout(() => {
                that.boxSave();
                y_index++;
                setTimeout(() => {
                    that.allPutOut();
                }, 1000);
            }, 1000);
        }
    },
    setIconPic: function(obj, url, t) {
        /*背景图转换为img -- 防止背景图模糊 obj:背景图对象，url背景图链接，t类型--*/
        url = url.replace(/\"/g, '');
        var p = obj.position();
        var w = obj.width();
        var h = obj.height();
        if (t == 'bg') {
            var bgImg = $('<img>').attr('src', url).addClass('modluebg');
            $('#file-btn').after(bgImg);
        } else {
            var img = $('<img>').attr('src', url).css({
                width: w,
                height: h,
                left: p.left,
                top: p.top,
            }).addClass('iconPic');
        }
    },
    GetQueryString: function(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    },
    prevModlue: function() {
        /*重选模板*/
        $('#file-btn,#modlue-type').fadeIn();
        $('#modlue-type .active').click();
    },
    modlueSwitch: function() {
        if (!$('#template')[0]) return;
        /*模板切换*/
        var that = this,
            c = $('#template');
        document.body.style.backgroundColor = '';
        $('#modlue-type .goods-icon1').removeClass('active');
        $('#modlue-type .goods-icon1').eq(0).addClass('active');
        $('.goods').on('click', '.goods-icon1', function() {
            var _this = $(this);
            that.modlueName = _this.attr('data-modlueName');
            that.modlueName = that.modlueName.split(' ')[0];
            that.TypeNum = that.modlueName.substring(6);
            if (that.modlueData.length > 0) {
                that.setDCcode(that.modlueData[that.TypeNum - 1]);
            }
            c.attr('class', 'template');
            c.addClass('template');
            var coverImgURL = 'images/cover' + that.modlueName.split(' ')[0].replace(/[^0-9]/gi, '') + '.jpg';
            $('.cover-pic').attr('class', 'cover-pic').addClass('cover-pic-' + that.modlueName.split(' ')[0]).fadeIn();
            _this.addClass('active').siblings().removeClass('active');
            $('body').addClass('sale-head-show');
        });
        $('.active').click();
    },
    keyBoardModlueSwitch: function() {
        var that = this;
        document.onkeydown = function(e) {
            var k = e.keyCode;
            switch (k) {
                case 37: // left
                    $('goodsID' + that.TypeNum - 1).click();
                    break;
                case 39: // right
                    $('goodsID' + that.TypeNum + 1).click();
                    break;
            }
        };
    },
    setDCcode(data) {
        $('body').addClass('modluebtnShow');
        this.setzdTxt(data);
    },
    // 设置内容
    setzdTxt: function(data) {
        var that = this;
        // 设置文件名
        fileName = data.title;
        // 模板内容
        ajax.get(`/api/v1/html-modlue/?title__eq=${data.title}&status__eq=0`).then(res => {
            if (res.data.data[0]) {
                // 模板渲染
                $('#template').html(res.data.data[0].content);
                // 删除page design的污染
                $('#ref-line').html('');
                // 属性替换
                let attribute = JSON.parse(res.data.data[0].attribute);
                let list = attribute && attribute.widgets;
                if (!list) {
                    alert('文件内容为空');
                }
                list.forEach((element, index) => {
                    // 模板
                    let name = element.name;
                    switch (name) {
                        // 设置背景图片
                        case 'cover':
                            that.getBase64(element.imgUrl).then(
                                base64 => {
                                    $(`[data-uuid=${element.uuid}]`)[0].src = base64;
                                    $('.template').css('width', element.record.width);
                                    $('.template').css('height', element.record.height);
                                },
                                err => {
                                    console.error(err); //打印异常信息
                                }
                            );
                            break;
                        default:
                            break;
                    }
                    if (data[name]) {
                        let type = element.type;
                        switch (type) {
                            case 'w-image':
                                that.getBase64(data[name]).then(
                                    base64 => {
                                        $('[data-uuid=' + element.uuid + ']')[0].src = base64;
                                        // 保证不超出
                                        $('[data-uuid=' + element.uuid + ']').css('height', element.record.height);
                                        // 选择图层
                                    },
                                    err => {
                                        console.error(err); //打印异常信息
                                    }
                                );
                                break;
                            case 'w-text':
                                $('[data-uuid=' + element.uuid + ']')[0].innerHTML = data[name];
                                // 文案调整
                                that.textMove(element.uuid);
                                break;
                            default:
                                break;
                        }
                    }
                });
            } else {
                alert(`找不到该<${data.title}>模板`);
            }
        }).catch(err => {
            alert(`异常:${err}`);
        });
    },
    getSize: function(s) {
        var t;
        t = (s / 100).toFixed(2);
        return t;
    },
    btnEventClick: function() {
        $('body').removeClass('modluebtnShow');
        $('body').addClass('saveShow');
    },
    closeFun: function() {
        /*关闭事件*/
        $('body').removeClass('saveShow');
        $('#outputPic-con').attr('src', '');
        $('#save-success-link,#imgCrop,#save-links').fadeOut();
    },
    clearIconPic: function() {
        /*删除添加的img*/
        $('.iconPic,.modluebg').remove();
    },
    // //传入图片路径，返回base64
    getBase64: function(img) {
        var that = this;
        var image = new Image();
        image.crossOrigin = '';
        image.src = img;
        var deferred = $.Deferred();
        if (img) {
            image.onload = function() {
                deferred.resolve(that.getBase64Image(image)); //将base64传给done上传处理
            };
            return deferred.promise(); //问题要让onload完成后再return sessionStorage['imgTest']
        }
    },
    getBase64Image: function(img, width, height) {
        //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 将canvas扩大相应的倍数，css中设置正确的canvas高宽值就可以解决
        var ratio = this.getPixelRatio(ctx);
        canvas.width = (width ? width : img.width) * ratio;
        canvas.height = (height ? height : img.height) * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var dataURL = canvas.toDataURL();
        return dataURL;
    },
    getPixelRatio: function(context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    },
    // 确认按钮
    prevchangeFun() {
        var that = this;
        $('.prev-btn')[0] &&
            $('.prev-btn').click(function() {
                that.prevModlue();
            });
        $('.btn-select .submitBtn')[0] &&
            $('.btn-select .submitBtn').click(function() {
                that.btnEventClick();
                that.boxSave();
            });
        $('.btn-select .all-submitBtn')[0] &&
            $('.btn-select .all-submitBtn').click(function() {
                that.btnEventClick();
                y_index = 1;
                that.allPutOut();
            });
        // 关闭
        $('.close-btn')[0] &&
            $('.close-btn').click(function() {
                that.closeFun();
                that.clearIconPic();
                // that.setPhotoClip();
                $('body').addClass('modluebtnShow');
            });
        // 选择图片
        $('.upBtn')[0] &&
            $('.upBtn').click(function() {
                $('#excel-file').click();
            });
    },
    // 模板商品图图层调整
    selectLayer(id) {
        var tips = '';
        var goodsDiv = $('[data-uuid=' + id + ']')[0];
        var that = this;
        window.oncontextmenu = function(e) {
            //取消默认的浏览器自带右键
            e.preventDefault();
            var menu = document.querySelector('#menu');
            var upLayer = document.getElementById('upLayer');
            var downLayer = document.getElementById('downLayer');
            menu.style.left = e.clientX + 'px';
            menu.style.top = e.clientY + 'px';
            menu.style.width = '125px';
        };
        window.onclick = function(e) {
            document.querySelector('#menu').style.width = 0;
        };
        //鼠标悬停事件
        upLayer.onmouseover = function() {
            upLayer.style.backgroundColor = 'rgb(160,154,154)';
            upLayer.style.cursor = 'pointer';
        };
        upLayer.onmouseout = function() {
            upLayer.style.backgroundColor = '';
            upLayer.style.cursor = 'default';
        };
        downLayer.onmouseover = function() {
            downLayer.style.backgroundColor = 'rgb(160,154,154)';
            downLayer.style.cursor = 'pointer';
        };
        downLayer.onmouseout = function() {
            downLayer.style.backgroundColor = '';
            downLayer.style.cursor = 'default';
        };
        // 鼠标点击事件
        upLayer.onclick = function(e) {
            z_index++;
            $('[data-uuid=' + id + ']').css('zIndex', z_index);
            $('[data-uuid=' + id + ']').css('border', '1px dashed black');
            if (goodsDiv.style.border === '1px dashed black') {
                // 键盘事件
                that.keyEvent(goodsDiv);
                goodsDiv.style.cursor = 'pointer';
                // 尺寸提示
                if ($('#tips')[0]) {
                    $('#tips').show();
                } else {
                    $('<div id= "tips" style="position: absolute; left: ' + goodsDiv.style.left +
                        '; top: ' +
                        (parseInt(goodsDiv.style.top.split('p')[0]) + parseInt(goodsDiv.style.height.split('p')[0]) + 1) +
                        'px; width: auto; font-size: 10px; color: rgb(33, 37, 228); font-style: normal; opacity: 1; height: auto">' +
                        goodsDiv.offsetWidth + 'x' +
                        goodsDiv.offsetHeight + '</div>'
                    ).insertAfter($('[data-uuid=' + id + ']'));
                    tips = $('#tips')[0];
                }
                that.tips(goodsDiv, tips);
            }
            // 商品图调整
            that.goodsMove(goodsDiv, id);
        };
        downLayer.onclick = function(e) {
            z_index--;
            $('[data-uuid=' + id + ']').css('zIndex', z_index);
            goodsDiv.style.border = '';
            // 取消提示
            if ($('#tips')) {
                $('#tips').hide();
            }
        };
    },
    // 模板商品图移动调整
    goodsMove(goodsDiv, id) {
        var that = this;
        var templateDiv = $('[data-uuid=' + id + ']').parent()[0];
        goodsDiv.onclick = function() {
            if (goodsDiv.style.border === '1px dashed black') {
                if ($('#tips')) {
                    $('#tips').hide();
                }
                goodsDiv.style.border = '';
                // 取消键盘监控
                document.onkeydown = function(e) {
                    e.preventDefault();
                };
                goodsDiv.style.cursor = 'default';
            } else if (goodsDiv.style.border === '') {
                goodsDiv.style.border = '1px dashed black';
                $('#tips').show();
                // 键盘事件
                that.keyEvent(goodsDiv);
                goodsDiv.style.cursor = 'pointer';
            }
        };
        goodsDiv.onmousedown = function(e) {
            var firstX = e.clientX;
            var firstY = e.clientY;
            var firstLeft = goodsDiv.offsetLeft;
            var firstTop = goodsDiv.offsetTop;
            var firstWidth = goodsDiv.offsetWidth;
            var firstHeight = goodsDiv.offsetHeight;
            var centerX = firstLeft + firstWidth / 2;
            var centerY = firstTop + firstHeight / 2;
            var position = '';
            if (firstX - templateDiv.offsetLeft < goodsDiv.offsetLeft + 10 && firstY < goodsDiv.offsetTop + 10) {
                position = 'TL';
            }
            if (
                firstX - templateDiv.offsetLeft > goodsDiv.offsetLeft + goodsDiv.offsetWidth - 10 &&
                firstY < goodsDiv.offsetTop + 10
            ) {
                position = 'TR';
            }
            if (
                firstX - templateDiv.offsetLeft < goodsDiv.offsetLeft + 10 &&
                firstY > goodsDiv.offsetTop + goodsDiv.offsetHeight - 10
            ) {
                position = 'DL';
            }
            if (
                firstX - templateDiv.offsetLeft > goodsDiv.offsetLeft + goodsDiv.offsetWidth - 10 &&
                firstY > goodsDiv.offsetTop + goodsDiv.offsetHeight - 10
            ) {
                position = 'DR';
            }
            document.onmousemove = function(e) {
                var lastX = e.clientX;
                var lastY = e.clientY;
                if (position === 'TL') {
                    if (Math.max(firstX - lastX, firstY - lastY) === firstX - lastX) {
                        goodsDiv.style.width = firstWidth + firstX - lastX + 'px';
                        goodsDiv.style.height = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                    } else if (Math.max(firstX - lastX, firstY - lastY) === firstY - lastY) {
                        goodsDiv.style.width = firstWidth + (firstWidth / firstHeight) * (firstY - lastY) + 'px';
                        goodsDiv.style.height = firstHeight + firstY - lastY + 'px';
                    }
                    goodsDiv.style.left = centerX - goodsDiv.offsetWidth / 2 + 'px';
                    goodsDiv.style.top = centerY - goodsDiv.offsetHeight / 2 + 'px';
                    that.tips(goodsDiv, tips);
                } else if (position === 'TR') {
                    if (Math.max(lastX - firstX, firstY - lastY) === lastX - firstX) {
                        goodsDiv.style.width = firstWidth + lastX - firstX + 'px';
                        goodsDiv.style.height = firstHeight + (firstHeight / firstWidth) * (lastX - firstX) + 'px';
                    } else if (Math.max(lastX - firstX, firstY - lastY) === firstY - lastY) {
                        goodsDiv.style.width = firstWidth + (firstWidth / firstHeight) * (firstY - lastY) + 'px';
                        goodsDiv.style.height = firstHeight + firstY - lastY + 'px';
                    }
                    goodsDiv.style.left = centerX - goodsDiv.offsetWidth / 2 + 'px';
                    goodsDiv.style.top = centerY - goodsDiv.offsetHeight / 2 + 'px';
                    that.tips(goodsDiv, tips);
                } else if (position === 'DL') {
                    if (Math.max(firstX - lastX, lastY - firstY) === firstX - lastX) {
                        goodsDiv.style.width = firstWidth + firstX - lastX + 'px';
                        goodsDiv.style.height = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                    } else if (Math.max(firstX - lastX, lastY - firstY) === lastY - firstY) {
                        goodsDiv.style.width = firstWidth + (firstWidth / firstHeight) * (lastY - firstY) + 'px';
                        goodsDiv.style.height = firstHeight + lastY - firstY + 'px';
                    }
                    goodsDiv.style.left = centerX - goodsDiv.offsetWidth / 2 + 'px';
                    goodsDiv.style.top = centerY - goodsDiv.offsetHeight / 2 + 'px';
                    that.tips(goodsDiv, tips);
                } else if (position === 'DR') {
                    if (Math.max(lastX - firstX, lastY - firstY) === lastX - firstX) {
                        goodsDiv.style.width = firstWidth + lastX - firstX + 'px';
                        goodsDiv.style.height = firstHeight + (firstHeight / firstWidth) * (lastX - firstX) + 'px';
                    } else if (Math.max(lastX - firstX, lastY - firstY) === lastY - firstY) {
                        goodsDiv.style.width = firstWidth + (firstWidth / firstHeight) * (lastY - firstY) + 'px';
                        goodsDiv.style.height = firstHeight + lastY - firstY + 'px';
                    }
                    goodsDiv.style.left = centerX - goodsDiv.offsetWidth / 2 + 'px';
                    goodsDiv.style.top = centerY - goodsDiv.offsetHeight / 2 + 'px';
                    that.tips(goodsDiv, tips);
                } else {
                    goodsDiv.style.left = firstLeft + lastX - firstX + 'px';
                    goodsDiv.style.top = firstTop + lastY - firstY + 'px';
                    that.tips(goodsDiv, tips);
                }
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
    // 模板文案移动调整
    textMove(id) {
        var backgroundColor = '';
        var that = this;
        var textTips = '';
        var leftPoint = '<div id= "left-point" style="background-color: rgb(255, 255, 255); border: 1px solid black;width: 9px; height: 9px;position: absolute;left: -5px;top: 0;bottom: 0;margin: auto;cursor: e-resize; z-index: 9999;"></div>';
        var rightPoint = '<div id= "right-point" style="background-color: rgb(255, 255, 255); border: 1px solid black;width: 9px; height: 9px;position: absolute;right: -5px;top: 0;bottom: 0;margin: auto;cursor: e-resize; z-index: 9999;"></div>';
        var topPoint = '<div id= "top-point" style="background-color: rgb(255, 255, 255); border: 1px solid black;width: 9px; height: 9px;position: absolute;right: 0px;top: -5px;left: 0;margin: auto;cursor: n-resize; z-index: 9999;"></div>';
        var bottomPoint = '<div id= "bottom-point" style="background-color: rgb(255, 255, 255); border: 1px solid black;width: 9px; height: 9px;position: absolute;right: 0px;left: 0;bottom: -5px;margin: auto;cursor: s-resize; z-index: 9999;"></div>';
        var textDiv = $('[data-uuid=' + id + ']')[0];
        var templateDiv = $('[data-uuid=' + id + ']').parent()[0];
        textDiv.onclick = function(e) {
            if ($('#text-tips')[0]) {
                $('#text-tips').show();
                textTips = $('#text-tips')[0];
            } else {
                $('<div id= "text-tips" style="position: absolute; left: ' +
                    textDiv.style.left +
                    '; top: ' +
                    (parseInt(textDiv.style.top.split('p')[0]) + parseInt(textDiv.style.height.split('p')[0]) + 1) +
                    'px; width: auto; font-size: 10px; color: rgb(33, 37, 228); font-style: normal; opacity: 1; height: auto">' +
                    textDiv.offsetWidth +
                    'x' +
                    textDiv.offsetHeight +
                    '</div>'
                ).insertAfter($('[data-uuid=' + id + ']'));
                textTips = $('#text-tips')[0];
            }
            // 左右上下移动提示框
            if ($('[data-uuid=' + id + ']').find('div[id^="left-point"]')[0]) {
                $('[data-uuid=' + id + ']').find('div[id^="left-point"]').show();
            } else {
                $('[data-uuid=' + id + ']').append(leftPoint);
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="right-point"]')[0]) {
                $('[data-uuid=' + id + ']').find('div[id^="right-point"]').show();
            } else {
                $('[data-uuid=' + id + ']').append(rightPoint)
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="top-point"]')[0]) {
                $('[data-uuid=' + id + ']').find('div[id^="top-point"]').show();
            } else {
                $('[data-uuid=' + id + ']').append(topPoint);
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="bottom-point"]')[0]) {
                $('[data-uuid=' + id + ']').find('div[id^="bottom-point"]').show();
            } else {
                $('[data-uuid=' + id + ']').append(bottomPoint);
            }
            if (textDiv.style.backgroundColor != 'rgb(58, 185, 230)') {
                backgroundColor = textDiv.style.backgroundColor;
                if (textDiv.style.height == '') {
                    textDiv.style.height = textDiv.style.minHeight;
                }
                $('[data-uuid=' + id + ']').css('background-color', 'rgb(58, 185, 230)');
                // 键盘事件
                that.keyEvent(textDiv);
                textDiv.style.cursor = 'pointer';
                // 字体尺寸提示
                $('#text-tips').show();
                $('[data-uuid=' + id + ']').find('div[id^="left-point"]').show();
                $('[data-uuid=' + id + ']').find('div[id^="right-point"]').show();
                $('[data-uuid=' + id + ']').find('div[id^="top-point"]').show();
                $('[data-uuid=' + id + ']').find('div[id^="bottom-point"]').show();
                that.tips(textDiv, textTips);
            } else if (textDiv.style.backgroundColor == 'rgb(58, 185, 230)') {
                textDiv.style.backgroundColor = backgroundColor;
                // 取消监控键盘事件
                document.onkeydown = function(e) {
                    e.preventDefault();
                };
                textDiv.style.cursor = 'default';
                $('#text-tips').hide();
                $('[data-uuid=' + id + ']').find('div[id^="left-point"]').hide();
                $('[data-uuid=' + id + ']').find('div[id^="right-point"]').hide();
                $('[data-uuid=' + id + ']').find('div[id^="top-point"]').hide();
                $('[data-uuid=' + id + ']').find('div[id^="bottom-point"]').hide();
            }
        };
        textDiv.onmousedown = function(e) {
            var firstX = e.clientX;
            var firstY = e.clientY;
            var firstLeft = textDiv.offsetLeft;
            var firstTop = textDiv.offsetTop;
            var firstWidth = textDiv.offsetWidth;
            var firstHeight = textDiv.offsetHeight;
            var centerX = firstLeft + firstWidth / 2;
            var centerY = firstTop + firstHeight / 2;
            var fontSize = parseInt(textDiv.style.fontSize.split('p')[0]);
            var position = '';
            if ($('#text-tips')[0]) {} else {
                $(
                    '<div id= "text-tips" style="position: absolute; left: ' +
                    textDiv.style.left +
                    '; top: ' +
                    (parseInt(textDiv.style.top.split('p')[0]) + parseInt(textDiv.style.height.split('p')[0]) + 1) +
                    'px; width: auto; font-size: 10px; color: rgb(33, 37, 228); font-style: normal; opacity: 1; height: auto">' +
                    textDiv.offsetWidth +
                    'x' +
                    textDiv.offsetHeight +
                    '</div>'
                ).insertAfter($('[data-uuid=' + id + ']'));
                textTips = $('#text-tips')[0];
                $('#text-tips').hide();
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="left-point"]')[0]) {} else {
                $('[data-uuid=' + id + ']').append(leftPoint);
                $('[data-uuid=' + id + ']').find('div[id^="left-point"]').hide();
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="right-point"]')[0]) {} else {
                $('[data-uuid=' + id + ']').append(rightPoint);
                $('[data-uuid=' + id + ']').find('div[id^="right-point"]').hide();
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="top-point"]')[0]) {} else {
                $('[data-uuid=' + id + ']').append(topPoint);
                $('[data-uuid=' + id + ']').find('div[id^="top-point"]').hide();
            }
            if ($('[data-uuid=' + id + ']').find('div[id^="bottom-point"]')[0]) {} else {
                $('[data-uuid=' + id + ']').append(bottomPoint);
                $('[data-uuid=' + id + ']').find('div[id^="bottom-point"]').hide();
            }
            if (firstX - templateDiv.offsetLeft < parseInt(textDiv.style.left.split('p')[0]) + 5 && firstY < parseInt(textDiv.style.top.split('p')[0]) + parseInt(textDiv.style.height.split('p')[0]) / 2 + 5) {
                position = 'L';
            }
            if (firstX - templateDiv.offsetLeft > parseInt(textDiv.style.left.split('p')[0]) + parseInt(textDiv.style.width.split('p')[0]) - 5 && firstY < parseInt(textDiv.style.top.split('p')[0]) + parseInt(textDiv.style.height.split('p')[0]) / 2 + 5) {
                position = 'R';
            }
            if (firstX - templateDiv.offsetLeft < parseInt(textDiv.style.left.split('p')[0]) + parseInt(textDiv.style.width.split('p')[0]) / 2 + 5 && firstX - templateDiv.offsetLeft > parseInt(textDiv.style.left.split('p')[0]) + parseInt(textDiv.style.width.split('p')[0]) / 2 - 5 && firstY < parseInt(textDiv.style.top.split('p')[0]) + 5) {
                position = 'T';
            }
            if (firstX - templateDiv.offsetLeft < parseInt(textDiv.style.left.split('p')[0]) + parseInt(textDiv.style.width.split('p')[0]) / 2 + 5 && firstX - templateDiv.offsetLeft > parseInt(textDiv.style.left.split('p')[0]) + parseInt(textDiv.style.width.split('p')[0]) / 2 - 5 && firstY > parseInt(textDiv.style.top.split('p')[0]) + parseInt(textDiv.style.height.split('p')[0]) - 5) {
                position = 'D';
            }
            if (firstX - templateDiv.offsetLeft < textDiv.offsetLeft + 10 && firstY < textDiv.offsetTop + 10) {
                position = 'TL';
            }
            if (
                firstX - templateDiv.offsetLeft > textDiv.offsetLeft + textDiv.offsetWidth - 10 &&
                firstY < textDiv.offsetTop + 10
            ) {
                position = 'TR';
            }
            if (
                firstX - templateDiv.offsetLeft < textDiv.offsetLeft + 10 &&
                firstY > textDiv.offsetTop + textDiv.offsetHeight - 10
            ) {
                position = 'DL';
            }
            if (
                firstX - templateDiv.offsetLeft > textDiv.offsetLeft + textDiv.offsetWidth - 10 &&
                firstY > textDiv.offsetTop + textDiv.offsetHeight - 10
            ) {
                position = 'DR';
            }
            document.onmousemove = function(e) {
                var lastX = e.clientX;
                var lastY = e.clientY;
                if (position === 'L') {
                    textDiv.style.width = firstWidth + firstX - lastX + 'px';
                    textDiv.style.left = lastX - templateDiv.offsetLeft + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'R') {
                    textDiv.style.width = firstWidth + lastX - firstX + 'px';
                    textDiv.style.left = firstLeft + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'T') {
                    textDiv.style.height = firstHeight + firstY - lastY + 'px';
                    textDiv.style.lineHeight = firstHeight + firstY - lastY + 'px';
                    textDiv.style.top = lastY + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'D') {
                    textDiv.style.height = firstHeight + lastY - firstY + 'px';
                    textDiv.style.lineHeight = firstHeight + lastY - firstY + 'px'
                    textDiv.style.top = firstTop + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'TL') {
                    if (Math.max(firstX - lastX, firstY - lastY) === firstX - lastX) {
                        textDiv.style.width = firstWidth + firstX - lastX + 'px';
                        textDiv.style.height = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                        textDiv.style.lineHeight = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                        textDiv.style.fontSize = fontSize + (firstX - lastX) / 6 + 'px';
                    } else if (Math.max(firstX - lastX, firstY - lastY) === firstY - lastY) {
                        textDiv.style.width = firstWidth + (firstWidth / firstHeight) * (firstY - lastY) + 'px';
                        textDiv.style.height = firstHeight + firstY - lastY + 'px';
                        textDiv.style.lineHeight = firstHeight + firstY - lastY + 'px';
                        textDiv.style.fontSize = fontSize + (firstY - lastY) / 6 + 'px';
                    }
                    textDiv.style.left = centerX - textDiv.offsetWidth / 2 + 'px';
                    textDiv.style.top = centerY - textDiv.offsetHeight / 2 + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'TR') {
                    if (Math.max(lastX - firstX, firstY - lastY) === lastX - firstX) {
                        textDiv.style.width = firstWidth + lastX - firstX + 'px';
                        textDiv.style.height = firstHeight + (firstHeight / firstWidth) * (lastX - firstX) + 'px';
                        textDiv.style.lineHeight = firstHeight + (firstHeight / firstWidth) * (lastX - firstX) + 'px';
                        textDiv.style.fontSize = fontSize + (lastX - firstX) / 6 + 'px';
                    } else if (Math.max(lastX - firstX, firstY - lastY) === firstY - lastY) {
                        textDiv.style.width = firstWidth + (firstWidth / firstHeight) * (firstY - lastY) + 'px';
                        textDiv.style.height = firstHeight + firstY - lastY + 'px';
                        textDiv.style.lineHeight = firstHeight + firstY - lastY + 'px';
                        textDiv.style.fontSize = fontSize + (firstY - lastY) / 6 + 'px';
                    }
                    textDiv.style.left = centerX - textDiv.offsetWidth / 2 + 'px';
                    textDiv.style.top = centerY - textDiv.offsetHeight / 2 + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'DL') {
                    if (Math.max(firstX - lastX, lastY - firstY) === firstX - lastX) {
                        textDiv.style.width = firstWidth + firstX - lastX + 'px';
                        textDiv.style.height = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                        textDiv.style.lineHeight = firstHeight + (firstHeight / firstWidth) * (firstX - lastX) + 'px';
                        textDiv.style.fontSize = fontSize + (firstX - lastX) / 6 + 'px';
                    } else if (Math.max(firstX - lastX, lastY - firstY) === lastY - firstY) {
                        textDiv.style.width = firstWidth + (firstWidth / firstHeight) * (lastY - firstY) + 'px';
                        textDiv.style.height = firstHeight + lastY - firstY + 'px';
                        textDiv.style.lineHeight = firstHeight + lastY - firstY + 'px';
                        textDiv.style.fontSize = fontSize + (lastY - firstY) / 6 + 'px';
                    }
                    textDiv.style.left = centerX - textDiv.offsetWidth / 2 + 'px';
                    textDiv.style.top = centerY - textDiv.offsetHeight / 2 + 'px';
                    that.tips(textDiv, textTips);
                } else if (position === 'DR') {
                    if (Math.max(lastX - firstX, lastY - firstY) === lastX - firstX) {
                        textDiv.style.width = firstWidth + lastX - firstX + 'px';
                        textDiv.style.height = firstHeight + (firstHeight / firstWidth) * (lastX - firstX) + 'px';
                        textDiv.style.fontSize = fontSize + (lastX - firstX) / 6 + 'px';
                    } else if (Math.max(lastX - firstX, lastY - firstY) === lastY - firstY) {
                        textDiv.style.width = firstWidth + (firstWidth / firstHeight) * (lastY - firstY) + 'px';
                        textDiv.style.height = firstHeight + lastY - firstY + 'px';
                        textDiv.style.lineHeight = firstHeight + lastY - firstY + 'px';
                        textDiv.style.fontSize = fontSize + (lastY - firstY) / 6 + 'px';
                    }
                    textDiv.style.left = centerX - textDiv.offsetWidth / 2 + 'px';
                    textDiv.style.top = centerY - textDiv.offsetHeight / 2 + 'px';
                    that.tips(textDiv, textTips);
                } else {
                    textDiv.style.left = firstLeft + lastX - firstX + 'px';
                    textDiv.style.top = firstTop + lastY - firstY + 'px';
                    that.tips(textDiv, textTips);
                }
            };
            document.onmouseup = function() {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        };
    },
    // 键盘事件
    keyEvent(obj) {
        var that = this;
        document.onkeydown = function(e) {
            var k = e.keyCode;
            switch (k) {
                case 37: // left
                    obj.style.left = obj.offsetLeft - 1 + 'px';
                    if (obj.id === 'w-image') {
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
                case 38: // up
                    obj.style.top = obj.offsetTop - 1 + 'px';
                    if (obj.id === 'w-image') {
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
                case 39: // right
                    obj.style.left = obj.offsetLeft + 1 + 'px';
                    if (obj.id === 'w-image') {
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
                case 40: // down
                    obj.style.top = obj.offsetTop + 1 + 'px';
                    if (obj.id === 'w-image') {
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
                case 187: // +
                    var value = obj.offsetHeight / obj.offsetWidth;
                    if (obj.id === 'w-image') {
                        obj.style.width = parseInt(obj.style.width.split('p')[0]) + 1 + 'px';
                        obj.style.height = parseInt(obj.style.height.split('p')[0]) + value + 'px';
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        obj.style.fontSize = parseInt(obj.style.fontSize.split('p')[0]) + 1 + 'px';
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
                case 189: // -
                    var value = obj.offsetHeight / obj.offsetWidth;
                    if (obj.id === 'w-image') {
                        obj.style.width = parseInt(obj.style.width.split('p')[0]) - 1 + 'px';
                        obj.style.height = parseInt(obj.style.height.split('p')[0]) - value + 'px';
                        var tips = $('#tips')[0];
                        that.tips(obj, tips);
                    }
                    if (obj.id === 'w-text') {
                        obj.style.fontSize = parseInt(obj.style.fontSize.split('p')[0]) - 1 + 'px';
                        var textTips = $('#text-tips')[0];
                        that.tips(obj, textTips);
                    }
                    break;
            }
        };
    },
    // 尺寸提示
    tips(obj, tips) {
        if (tips.id === 'tips') {
            tips.style.left = obj.style.left;
            tips.style.top = parseInt(obj.style.top.split('p')[0]) + parseInt(obj.style.height.split('p')[0]) + 3 + 'px';
            tips.innerHTML = parseInt(obj.style.width.split('p')[0]) + 'x' + parseInt(obj.style.height.split('p')[0]);
        }
        if (tips.id === 'text-tips') {
            tips.style.left = obj.style.left;
            if (parseInt(obj.style.height.split('p')[0]) >= parseInt(obj.style.minHeight.split('p')[0])) {
                tips.style.top = parseInt(obj.style.top.split('p')[0]) + parseInt(obj.style.height.split('p')[0]) + 1 + 'px';
            } else {
                tips.style.top = parseInt(obj.style.top.split('p')[0]) + parseInt(obj.style.minHeight.split('p')[0]) + 'px';
            }
            tips.innerHTML = obj.style.fontSize;
        }
    },
};