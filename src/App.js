/* eslint-disable no-dupe-keys */
import MDX from "@mdx-js/runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { tw } from "twind";
import "./App.css";
import appStyle from "./App.module.scss";
import OwnerEditor from "./components/OwnerEditor";
import UEditor from "./components/UEditor";
function App() {
  const ownerEditorRef = useRef(null);
  const [content, setContent] = useState(null);
  const [contentJsx, setContentJsx] = useState("");

  const defaultStyle = useMemo(
    () => ({
      h1: (props) => (
        <h1
          style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          {...props}
        >
          {props.children}
        </h1>
      ),
      h2: (props) => (
        <h2 style={{ fontSize: 20, fontWeight: "bold" }} {...props}>
          {props.children}
        </h2>
      ),
      h3: (props) => (
        <h3 style={{ fontSize: 18, fontWeight: "bold" }} {...props}>
          {props.children}
        </h3>
      ),
      table: (props) => (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            border: "1px solid #ddd",
            textAlign: "center",
          }}
          {...props}
        >
          {props.children}
        </table>
      ),
      th: (props) => (
        <th
          style={{
            textAlign: "left",
            padding: 8,
            border: "1px solid #ddd",
            textAlign: "center",
            backgroundColor: "#f2f2f2",
          }}
          {...props}
        >
          {props.children}
        </th>
      ),
      td: (props) => (
        <td
          style={{
            textAlign: "left",
            padding: 8,
            border: "1px solid #ddd",
            textAlign: "center",
            ...props.style,
          }}
          {...props}
        >
          {props.children}
        </td>
      ),
      tr: (props) => (
        <tr
          className={appStyle.trClass}
          style={{ textAlign: "left", padding: 8 }}
          {...props}
        >
          {props.children}
        </tr>
      ),
    }),
    []
  );

  useEffect(() => {
    console.log(content);
  }, [content, ownerEditorRef]);

  const changeCtx = useCallback(async () => {
    setContentJsx(ownerEditorRef.current.content);
  }, []);

  return (
    <div className={tw`flex justify-evenly`}>
      <Link to="braftEditorT"> 去看braftEditor</Link>
      <UEditor
        id="text"
        value={content}
        callback={setContent}
        width="30%"
        height={500}
      />
      <OwnerEditor ref={ownerEditorRef} changeCtx={changeCtx} />
      <div
        className={tw`w-1/4 border  overflow-auto bf-editor-body `}
        style={{ height: 559 }}
      >
        <MDX
        // components={{
        //   ...defaultStyle,
        // }}
        >
          {contentJsx}
        </MDX>
      </div>
    </div>
  );
}

export default App;
