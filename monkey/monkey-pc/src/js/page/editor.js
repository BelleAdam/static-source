export default {
  init: function() {
    this.editor = this.initEditor();
    if (this.editor) {
      this.bindEvents();
      this.supportVideo();
    }
  },
  bindEvents: function() {
    let that = this;
    // 加载完毕后发送通知消息
    $(document).ready(function() {
      if (window.parent !== window) {
        window.parent.postMessage(JSON.stringify({ action: 'EDITOR_LOADED' }), '*');
      }
    });

    // 监听事件消息
    window.addEventListener('message', function(event) {
      let data = JSON.parse(event.data);
      switch (data.action) {
        // 获取值
        case 'GET_VALUE':
          let value = that.editor.getValue();
          window.parent.postMessage(JSON.stringify({ action: 'GET_VALUE', data: value }), '*');
          break;
        // 设置值
        case 'SET_VALUE':
          that.editor.setValue(data.data);
          break;
        // 清空编辑器
        case 'CLEAR_VALUE':
          that.editor.setValue('');
          break;
        default:
          throw new Error(`action 参数错误`);
      }
    });
  },
  initEditor: function() {
    const Simditor = window.Simditor;
    if (!Simditor) return;
    let editor = new Simditor({
      textarea: $('#editor'),
      autosave: 'editor-content',
      toolbar: [
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'fontScale',
        'color',
        'html',
        'ol',
        'ul',
        'hr',
        'indent',
        'outdent',
        'alignment',
        'blockquote',
        'code',
        'table',
        'link',
        'image',
      ],
      allowedTags: [
        'div',
        'br',
        'span',
        'a',
        'img',
        'b',
        'strong',
        'i',
        'strike',
        'u',
        'font',
        'p',
        'ul',
        'ol',
        'li',
        'blockquote',
        'pre',
        'code',
        'h1',
        'h2',
        'h3',
        'h4',
        'hr',
        'iframe',
      ],
      allowedAttributes: {
        iframe: ['src', 'frameborder', 'allowFullScreen'],
      },
      allowedStyles: {
        iframe: ['display'],
      },
      emoji: {
        imagePath: 'images/emoji/',
      },
      upload: {
        url: `http://${window.SERVER_DATA.UPLOAD_FILE_HOST}/file/upload/?maxImageFileSize=${2 * 1024 * 1024}`,
        fileKey: 'smfile',
        param: {},
        connectionCount: 1,
        leaveConfirm: 'Uploading is in progress, are you sure to leave this page?',
      },
    });
    return editor;
  },
  // 支持视频功能
  supportVideo: function() {
    let that = this;
    // 插入视频 icon
    $('.simditor-toolbar > ul').append(
      `<li><a tabindex="-1" unselectable="on" class="toolbar-item toolbar-item-video" href="javascript:;" title="视频"><span><b>TV</b></span></a></li>`
    );

    // 输入视频内容
    $('.simditor-toolbar > ul').on('click', '.toolbar-item-video', function(e) {
      let videoContent = prompt();
      if (!videoContent) {
        return;
      }
      // 必须先 focus 编辑器，否则 document.execCommand 调用不起来
      that.editor.focus();
      document.execCommand('insertHTML', false, videoContent);
    });
  },
};
