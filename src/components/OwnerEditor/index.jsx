import { Button, message, Upload } from "antd";
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { tw } from "twind";
import { getTextAreaCursorPositionIndex } from "./utils";
import style from "./index.module.scss";

const OwnerEditor = forwardRef(({ changeCtx }, ref) => {
  const textAreaRef = useRef(null);
  const [content, setContent] = useState("");

  useImperativeHandle(ref, () => ({
    content,
  }));

  const doOperation = useCallback(
    async (type) => {
      let index = getTextAreaCursorPositionIndex("txtId");
      switch (type) {
        case "titleOne":
          await setContent(
            (content) =>
              `${content.slice(0, index)}${
                index === 0 ? "" : "\n"
              }# 一级标题${content.slice(index)}`
          );
          break;
        case "titleTwo":
          await setContent(
            (content) =>
              `${content.slice(0, index)}${
                index === 0 ? "" : "\n"
              }## 二级标题${content.slice(index)}`
          );
          break;
        case "titleThree":
          await setContent(
            (content) =>
              `${content.slice(0, index)}${
                index === 0 ? "" : "\n"
              }### 三级标题${content.slice(index)}`
          );
          break;
        case "upImg":
          await setContent(
            (content) =>
              `${content.slice(0, index)}${
                index === 0 ? "" : "\n"
              }![图片名称](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9hdmF0YXIuY3Nkbi5uZXQvNy83L0IvMV9yYWxmX2h4MTYzY29tLmpwZw)${content.slice(
                index
              )}`
          );
          break;
        case "insertTable":
          await setContent(
            (content) =>
              `${content.slice(0, index)}${
                index === 0 ? "" : "\n"
              }| a | b  |  c |  d  |\n| - | :- | -: | :-: |\n| a | b  |  c |  d  |${content.slice(
                index
              )}`
          );
          break;
        default:
          break;
      }
      await textAreaRef.current.focus();
      await changeCtx();
    },
    [changeCtx]
  );

  const uploadConfig = useMemo(
    () => ({
      name: "file",
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
          doOperation("upImg");
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    }),
    [doOperation]
  );

  return (
    <>
      <div className={tw`border w-1/4 relative rounded`}>
        <div
          className={tw`h-9 w-full sticky top-0 bg-gray-100 z-10 flex items-center rounded justify-center shadow-md`}
        >
          <button
            className={tw`h-8 w-20 bg-gray-100 text-xs relative rounded hover:(bg-gray-200 )  active:(border-none bg-gray-200) focus:(outline-none) ml-4 group`}
          >
            标题
            <div
              className={tw`h-auto w-20 mt-5 bg-gray-100 rounded absolute opacity-0 transition-all ease-linear duration-200 invisible group-hover:(opacity-100 mt-3 visible) overflow-hidden`}
            >
              <button
                className={tw`h-8 w-20 bg-gray-100 text-xs rounded hover:(bg-gray-200) active:(border-none bg-gray-200) focus:(outline-none)`}
                onClick={() => doOperation("titleOne")}
              >
                标题一
              </button>
              <button
                className={tw`h-8 w-20 bg-gray-100 text-xs rounded  hover:(bg-gray-200)  active:(border-none bg-gray-200) focus:(outline-none)`}
                onClick={() => doOperation("titleTwo")}
              >
                标题二
              </button>
              <button
                className={tw`h-8 w-20 bg-gray-100 text-xs rounded  hover:(bg-gray-200)  active:(border-none bg-gray-200) focus:(outline-none)`}
                onClick={() => doOperation("titleThree")}
              >
                标题三
              </button>
            </div>
          </button>
          <Upload {...uploadConfig} className={style.upload}>
            <Button
              className={tw`h-8 w-20 bg-gray-100 text-xs rounded active:(border-none bg-gray-200) focus:(outline-none) hover:(bg-gray-200 text-black) border-none`}
            >
              插入图片
            </Button>
          </Upload>
          <button
            className={tw`h-8 w-20 bg-gray-100 text-xs rounded active:(border-none bg-gray-200) focus:(outline-none) ml-4 hover:(bg-gray-200  ) `}
            onClick={() => doOperation("insertTable")}
          >
            插入表格
          </button>
        </div>
        <textarea
          spellCheck="false"
          id="txtId"
          ref={textAreaRef}
          className={tw`w-full h-full -mt-9 px-1 pb-1 pt-10 focus:(outline-none)`}
          value={content}
          onChange={async (e) => {
            await setContent(e.target.value);
            changeCtx();
          }}
          onClick={() => getTextAreaCursorPositionIndex("txtId")}
        />
      </div>
    </>
  );
});
export default OwnerEditor;
