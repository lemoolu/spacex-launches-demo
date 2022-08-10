import styles from './index.less';
import { Descriptions } from 'antd';
import { Page } from '@/components';

export default function IndexPage() {
  return (
    <Page title="SpaceX Launches">
      <h2>Next Launches</h2>
      <Descriptions title="User Info">
        <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
        <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
        <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
        <Descriptions.Item label="Remark">empty</Descriptions.Item>
        <Descriptions.Item label="Address">
          No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
        </Descriptions.Item>
      </Descriptions>
      <h2>Past Launches</h2>
    </Page>
  );
}
