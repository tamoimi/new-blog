import React, { useEffect } from "react";

import { DiscussionEmbed } from "disqus-react";

import { useSiteMetadata } from "@/hooks";

interface Props {
  postTitle: string;
  postSlug: string;
}

const Comments: React.FC<Props> = ({ postTitle, postSlug }: Props) => {
  const COMMENTS_ID = "comments-container";
  // const { url, disqusShortname } = useSiteMetadata();

  // if (!disqusShortname) {
  //   return null;
  // }

  // return (
  //   <DiscussionEmbed
  //     shortname={disqusShortname}
  //     config={{
  //       url: url + postSlug,
  //       identifier: postTitle,
  //       title: postTitle,
  //     }}
  //   />
  // );
  const Comments = () => {
    useEffect(() => {
      const toggleDark = document.body.classList.contains("dark");
      const script = document.createElement("script");
      script.src = "https://utteranc.es/client.js";
      // Replace with the repo on which you configured Utterances
      script.setAttribute("repo", "tamoimi/new-blog");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute("theme", toggleDark? "icy-dark": "github-light"); 
      script.setAttribute("crossorigin", "anonymous");
      script.async = true;
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.appendChild(script);
      return () => {
        const comments = document.getElementById(COMMENTS_ID);
        if (comments) comments.innerHTML = "";
      };
    }, []);
    return (
      <div id={COMMENTS_ID} />
    );

};

export default Comments;
