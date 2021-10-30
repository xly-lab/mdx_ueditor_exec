/**
 *  获取光标位置
 * @param {String} id
 * @returns {Number} cursorPosition
 */
export const getTextAreaCursorPositionIndex = (id) => {
  var oTxt1 = document.getElementById(id);
  var cursorPosition = -1;
  if (oTxt1.selectionStart) {
    //非IE浏览器
    cursorPosition = oTxt1.selectionStart;
  } else {
    //IE
    var range = document.selection?.createRange();
    range?.moveStart("character", -oTxt1.value.length);
    cursorPosition = range?.text?.length || 0;
  }
  return cursorPosition;
};
