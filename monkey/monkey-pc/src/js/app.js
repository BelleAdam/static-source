// import scss
import 'scss/app.scss';
// import js
import 'common/env-init';

import editor from 'page/editor';

import design from 'page/design';

$(function() {
  editor.init();
  design.init();
});
