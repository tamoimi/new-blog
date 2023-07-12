import React, { useEffect } from "react";

interface Props {
  utterancesConfig: any;
}

const Utterances: React.FC<Props> = ({ utterancesConfig }: Props) => {
  const COMMENTS_ID = "comments-container";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", utterancesConfig.repo);
    script.setAttribute("issue-term", utterancesConfig["issue-term"]);
    script.setAttribute("theme", utterancesConfig.theme);
    script.setAttribute("crossorigin", utterancesConfig.crossorigin);
    script.async = true;
    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      if (comments) comments.innerHTML = "";
    };
  }, [utterancesConfig]);

  return <div id={COMMENTS_ID} />;
};

export default Utterances;
