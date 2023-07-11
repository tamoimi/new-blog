import React, { useEffect } from "react";
export const Comments = () => {
  const commentsInjectionRoot: React.RefObject<HTMLDivElement> =
    React.createRef();

  useEffect(() => {
    if (commentsInjectionRoot.current?.children.length === 0) {
      const scriptEl = document.createElement("script");
      scriptEl.setAttribute("src", "https://utteranc.es/client.js");
      scriptEl.setAttribute("crossorigin", "anonymous");
      scriptEl.setAttribute("async", "true");
      scriptEl.setAttribute(
        "repo",
        "tamoimi/new-blog",
      );
      scriptEl.setAttribute("issue-term", "pathname");
      scriptEl.setAttribute("theme", "github-light");
      commentsInjectionRoot.current?.appendChild(scriptEl);
    }
  }, []);

  return (
    <div>
      <div ref={commentsInjectionRoot} />
    </div>
  );
};
