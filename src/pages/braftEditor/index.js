import BraftEditor from "braft-editor";
import Table from "braft-extensions/dist/table";
import { useEffect, useState } from "react";
import { useKeyPress } from "react-use";
import { tw } from "twind";

const options = {
  defaultColumns: 3, // 默认列数
  defaultRows: 3, // 默认行数
  withDropdown: false, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'style="border-collapse: collapse;border:1px"', // 指定输出HTML时附加到table标签上的属性字符串
  includeEditors: ["editor-1"], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  excludeEditors: [], // 指定该模块对哪些BraftEditor无效
};

BraftEditor.use(Table(options));

const BraftEditorT = () => {
  useKeyPress(async (key) => {
    await setKey(key);
  });

  // 使用BraftEditor.createEditorState创建编辑器数据
  const [editorValue, setEditorValue] = useState(
    BraftEditor.createEditorState(null)
  );

  const uploadFunc = ({
    file,
    progress,
    libraryId,
    success,
    // : (
    //   res: {
    //     url: string;
    //     meta: {
    //       id: string;
    //       title: string;
    //       alt: string;
    //       loop: boolean;
    //       autoPlay: boolean;
    //       controls: boolean;
    //       poster: string;
    //     };
    //   }
    // ) => void;
    error,
    //  (
    //   err: {
    //     msg: string;
    //   }
    // ) => void;
  }) => {
    const serverURL =
      "https://biz-qa.uma.plsbd.com/api/shopSaas/v1/uploadGoodsImage";
    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    const successFn = (response) => {
      // 假设服务端直接返回文件上传后的地址
      // 上传成功后调用param.success并传入上传后的文件地址
      success({
        url: xhr.responseText,
        meta: {
          id: "xxx",
          title: "xxx",
          alt: "xxx",
          loop: true, // 指定音视频是否循环播放
          autoPlay: true, // 指定音视频是否自动播放
          controls: true, // 指定音视频是否显示控制栏
          poster: "http://xxx/xx.png", // 指定视频播放器的封面
        },
      });
    };

    const progressFn = (event) => {
      // 上传进度发生变化时调用param.progress
      progress((event.loaded / event.total) * 100);
    };

    const errorFn = (response) => {
      // 上传发生错误时调用param.error
      error({
        msg: "unable to upload.",
      });
    };

    xhr.upload.addEventListener("progress", progressFn, false);
    xhr.addEventListener("load", successFn, false);
    xhr.addEventListener("error", errorFn, false);
    xhr.addEventListener("abort", errorFn, false);

    fd.append("file", file);
    xhr.open("POST", serverURL, true);
    xhr.send(fd);
  };
  const [key, setKey] = useState();
  useEffect(() => {
    // console.log(editorValue.toHTML());
  }, [editorValue]);

  // 将数据传入编辑器
  return (
    <>
      {/* <Link to="/">去看uEditor</Link> */}
      <div className={tw`grid grid-cols-2`}>
        <div className={tw``}>
          <BraftEditor
            onChange={(editorValue) => {
              if (key?.code === "Delete") return;
              setEditorValue(editorValue);
            }}
            value={editorValue}
            // media={{
            //   uploadFn: uploadFunc,
            //   accepts: {
            //     image:
            //       "image/png,image/jpeg,image/gif,image/webp,image/apng,image/svg",
            //     video: true,
            //   },
            //   externals: {
            //     image: true,
            //     video: true,
            //   },
            // }}
            id="editor-1"
          />
          <button>one</button>
          <button>two</button>
        </div>
        <div
          className={tw`py-4 mx-auto h-screen w-1/2 p-2 rounded overflow-auto  bg-gray-100 bf-editor-body text-center`}
          dangerouslySetInnerHTML={{ __html: editorValue.toHTML() }}
        ></div>
      </div>
    </>
  );
};

export default BraftEditorT;
