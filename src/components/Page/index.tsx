/**
 * Page
 * @description Common configuration for each page
 */
import React from 'react';
import styles from './index.less';

interface PageProps {
  /**
   * page title
   */
  title?: string;
  children?: React.ReactNode;
}

export default function Page({ title, children }: PageProps) {
  return (
    <div className={styles.page}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <div className={styles.pageBody}>{children}</div>
    </div>
  );
}
