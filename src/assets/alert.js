window._alert = function (msg1, msg2, msg3, msg4, callback) {
  var div = document.createElement("div");
  div.innerHTML =
    '<style type="text/css">' +
    ".alrMask { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); }                                                                                                                                                                       " +
    ".alrMaskTransparent { position: fixed; z-index: 1000; top: 0; right: 0; left: 0; bottom: 0; }                                                                                                                                                                                            " +
    ".alrDialog { position: fixed; z-index: 5000; width: 80%; max-width: 380px; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); background-color: #fff; text-align: center; border-radius: 8px; overflow: hidden; opacity: 1; color: white; }" +
    ".alrDialog .alrDialogHd { padding: .2rem .27rem .08rem .27rem; }                                                                                                                                                                                                                         " +
    ".alrDialog .alrDialogHd .alrDialogTitle { font-size: 17px; font-weight: 400; }                                                                                                                                                                                                           " +
    ".alrDialog .alrDialogBT { padding: 0 .27rem; font-size: 18px; line-height: 1.3; word-wrap: break-word; word-break: break-all; color: #000000; }                                                                                                                                          " +
    ".alrDialog .alrDialogNR { padding: 0 .27rem; font-size: 15px; line-height: 1.3; word-wrap: break-word; word-break: break-all; color: #000000; }                                                                                                                                          " +
    ".alrDialog .alrDialogFt { position: relative; line-height: 48px; font-size: 17px; display: -webkit-box; display: -webkit-flex; display: flex; }                                                                                                                                          " +
    '.alrDialog .alrDialogFt:after { content: " "; position: absolute; left: 0; top: 0; right: 0; height: 1px; border-top: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleY(0.5); transform: scaleY(0.5); }               ' +
    ".alrDialog .alrDialogBtn { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; color: #0183FC; text-decoration: none; -webkit-tap-highlight-color: transparent; position: relative; margin-bottom: 0; }                                                                       " +
    '.alrDialog .alrDialogBtn:after { content: " "; position: absolute; left: 0; top: 0; width: 1px; bottom: 0; border-left: 1px solid #e6e6e6; color: #e6e6e6; -webkit-transform-origin: 0 0; transform-origin: 0 0; -webkit-transform: scaleX(0.5); transform: scaleX(0.5); }             ' +
    ".alrDialog a { text-decoration: none; -webkit-tap-highlight-color: transparent; }" +
    "</style>" +
    '<div id="dialogs2" style="display: none">' +
    '<div class="alrMask"></div>' +
    '<div class="alrDialog">' +
    '    <div class="alrDialogHd">' +
    '        <strong class="alrDialogTitle"></strong>' +
    "    </div>" +
    '    <div class="alrDialogBT" id="dialog_msg1" style="text-align: center;height: 50px;">弹窗标题</div>' +
    '    <div class="alrDialogHd">' +
    '    <div class="alrDialogHd">' +
    '        <strong class="alrDialogTitle"></strong>' +
    "    </div>" +
    '    <div class="alrDialogNR" id="dialog_msg2" style="text-align: left;height: 30px;">弹窗内容，告知当前状态、信息和解决方法，描述文字</div>' +
    '    <div class="alrDialogHd">' +
    '        <strong class="alrDialogTitle"></strong>' +
    "    </div>" +
    '    <div class="alrDialogNR" id="dialog_msg3" style="text-align: left;height: 30px;">弹窗内容，告知当前状态、信息和解决方法，描述文字</div>' +
    '    <div class="alrDialogHd">' +
    '        <strong class="alrDialogTitle"></strong>' +
    "    </div>" +
    '    <div class="alrDialogNR" id="dialog_msg4" style="text-align: left;height: 50px;">弹窗内容，告知当前状态、信息和解决方法，描述文字</div>' +
    '    <div class="alrDialogHd">' +
    '        <strong class="alrDialogTitle"></strong>' +
    "    </div>" +
    '    <div class="alrDialogFt">' +
    '        <a href="javascript:;" class="alrDialogBtn alrDialogBtnPrimary" id="dialog_ok2" style=\'background-color: lavender\'>确定</a>' +
    "    </div></div></div>";
  document.body.appendChild(div);

  var dialogs2 = document.getElementById("dialogs2");
  dialogs2.style.display = "block";

  var dialog_msg1 = document.getElementById("dialog_msg1");
  dialog_msg1.innerHTML = msg1;
  var dialog_msg2 = document.getElementById("dialog_msg2");
  dialog_msg2.innerHTML = msg2;
  var dialog_msg3 = document.getElementById("dialog_msg3");
  dialog_msg3.innerHTML = msg3;
  var dialog_msg4 = document.getElementById("dialog_msg4");
  dialog_msg4.innerHTML = msg4;
  var dialog_ok2 = document.getElementById("dialog_ok2");
  dialog_ok2.onclick = function () {
    dialogs2.style.display = "none";
    callback();
  };
};

window.alert = function (name) {
  const iframe = document.createElement("IFRAME");
  iframe.style.display = "none";
  iframe.setAttribute("src", "data:text/plain,");
  document.documentElement.appendChild(iframe);
  window.frames[0].window.alert(name);
  iframe.parentNode.removeChild(iframe);
};
