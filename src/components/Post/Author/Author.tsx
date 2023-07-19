import React from "react";

import { useSiteMetadata } from "@/hooks";
import { getContactHref } from "@/utils";

import * as styles from "./Author.module.scss";

const Author = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles.author}>
      <p className={styles.bio}>
        {author.bio}
        <a
          className={styles.twitter}
          href={getContactHref("github", author.contacts.github)}
          rel="noopener noreferrer"
          target="https://github.com/tamoimi"
        >
          <strong>{author.name}</strong> on github
        </a>
      </p>
    </div>
  );
};

export default Author;
