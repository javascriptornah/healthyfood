import { useState, useRef } from "react";
import { Mde } from "fc-mde";
import Showdown from "showdown";

export default function Editor({ section, updateSection }) {
  const [selectedTab, setSelectedTab] = useState("write");
  const refTextarea = useRef(null);
  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  return (
    <section className="pane editor">
      <Mde
        text={section}
        setText={updateSection}
        refTextarea={refTextarea}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        generateMarkdownPreview={(markdown) =>
          Promise.resolve(converter.makeHtml(markdown))
        }
        minEditorHeight={30}
        heightUnits="vh"
      />
    </section>
  );
}
