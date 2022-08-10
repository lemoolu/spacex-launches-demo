/**
 * Rocket
 * @description Rocket display
 */
import React from 'react';
import { Tag } from 'antd';

interface RocketProps {
  data?: {
    rocket_name: string;
    rocket_type: string;
  };
}

export default function Rocket({ data }: RocketProps) {
  if (!data) {
    return null;
  }
  return (
    <Tag color="#55acee">
      {data?.rocket_type}-{data?.rocket_name}
    </Tag>
  );
}
