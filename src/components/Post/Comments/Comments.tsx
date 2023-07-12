import React from "react";

import { DiscussionEmbed } from "disqus-react";

import { useSiteMetadata } from "@/hooks";
import Utterances from "./Utterances";

interface Props {
  postTitle: string;
  postSlug: string;
}

const Comments: React.FC<Props> = ({ postTitle, postSlug }: Props) => {
  const { url, disqusShortname, utterancesConfig } = useSiteMetadata();

  if (utterancesConfig) {
    return <Utterances utterancesConfig={utterancesConfig} />;
  }

  if (!disqusShortname) {
    return null;
  }

  return (
    <DiscussionEmbed
      shortname={disqusShortname}
      config={{
        url: url + postSlug,
        identifier: postTitle,
        title: postTitle,
      }}
    />
  );
};

export default Comments;
