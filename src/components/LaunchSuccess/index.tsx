/**
 * LaunchSuccess
 * @description Launch success display
 */
import React from 'react';
import { Tag } from 'antd';

interface LaunchSuccessProps {
  success: boolean | undefined | null;
}

export default function LaunchSuccess({ success }: LaunchSuccessProps) {
  if (success === undefined) {
    return null;
  }
  return success ? (
    <Tag color="green">success</Tag>
  ) : (
    <Tag color="red">failure</Tag>
  );
}
