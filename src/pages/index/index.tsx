import { Descriptions, Table, Space, Drawer } from 'antd';
import { Page, LaunchSuccess, Rocket } from '@/components';
import { useEffect, useState } from 'react';
import {
  getLaunchesPast,
  getLaunchesPastResult,
  getLaunchsNext,
  ILaunch,
} from '@/services/launche';
import youtubeUrlParse from '@/utils/youtubeUrlParse';

export default function IndexPage() {
  const [launchesPast, setLaunchesPast] = useState<ILaunch[]>([]);
  const [launchesPastLoading, setLaunchesPastLoading] =
    useState<boolean>(false);
  const [launchesPagination, setLaunchesPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
  });
  const [launchesNext, setLaunchesNext] = useState<ILaunch>();

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [launchDetail, setLaunchDetail] = useState<ILaunch>();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const handleGetLaunchesPast = (pagination) => {
    setLaunchesPastLoading(true);
    getLaunchesPast({
      pageSize: pagination.pageSize,
      current: pagination.current,
    }).then((res) => {
      console.log(res);
      setLaunchesPastLoading(false);
      setLaunchesPagination({
        ...launchesPagination,
        current: res.pagination.current,
        pageSize: res.pagination.pageSize,
      });
      setLaunchesPast(res.launchesPast);
    });
  };

  const handleTableChange = (pagination) => {
    handleGetLaunchesPast(pagination);
  };

  const setDetailSel = (record: ILaunch) => {
    setLaunchDetail(record);
    showDrawer();
  };

  /**
   * Initialize data
   */
  useEffect(() => {
    handleGetLaunchesPast({
      current: 1,
      pageSize: 10,
    });

    // TODO This request is very slow and is only fetched once, which may cause real-time data delays
    getLaunchesPastResult().then((res) => {
      setLaunchesPagination({
        ...launchesPagination,
        total: res?.launchesPastResult?.result?.totalCount,
      });
    });

    getLaunchsNext().then((res) => {
      console.log(res);
      setLaunchesNext(res.launchNext);
    });
  }, []);

  return (
    <Page title="SpaceX Launches">
      <h2>Next Launches</h2>
      <Descriptions>
        <Descriptions.Item label="ID">{launchesNext?.id}</Descriptions.Item>
        <Descriptions.Item label="Mission Name">
          {launchesNext?.mission_name}
        </Descriptions.Item>
        <Descriptions.Item label="Launch Date Local">
          {launchesNext?.launch_date_local}
        </Descriptions.Item>
        <Descriptions.Item label="Rocket">
          <Rocket data={launchesNext?.rocket} />
        </Descriptions.Item>
        <Descriptions.Item label="Launch Site">
          {launchesNext?.launch_site?.site_name_long}
        </Descriptions.Item>
        {/* <Descriptions.Item label="details" span={3}>{launchesNext?.details}</Descriptions.Item> */}
      </Descriptions>
      <h2>Past Launches</h2>
      <Table
        columns={[
          { title: 'ID', dataIndex: 'id' },
          { title: 'Mission Name', dataIndex: 'mission_name' },
          { title: 'Launch Date Local', dataIndex: 'launch_date_local' },
          {
            title: 'Rocket',
            dataIndex: 'rocket',
            render: (v) => <Rocket data={v} />,
          },
          {
            title: 'Launch Success',
            dataIndex: 'launch_success',
            render: (v) => <LaunchSuccess success={v} />,
          },
          {
            title: 'Action',
            dataIndex: 'id',
            render: (_, record) => (
              <Space size="middle">
                <a onClick={() => setDetailSel(record)}>Detail</a>
              </Space>
            ),
          },
        ]}
        rowKey={(record: Launch) => record.id}
        dataSource={launchesPast}
        pagination={{ ...launchesPagination, showSizeChanger: false }}
        loading={launchesPastLoading}
        onChange={handleTableChange}
      />

      <Drawer
        title="Detail"
        placement="right"
        onClose={onClose}
        visible={drawerVisible}
        size="large"
      >
        <Descriptions column={1}>
          <Descriptions.Item label="ID">{launchDetail?.id}</Descriptions.Item>
          <Descriptions.Item label="Mission Name">
            {launchDetail?.mission_name}
          </Descriptions.Item>
          <Descriptions.Item label="Launch Date Local">
            {launchDetail?.launch_date_local}
          </Descriptions.Item>
          <Descriptions.Item label="Rocket">
            <Rocket data={launchDetail?.rocket} />
          </Descriptions.Item>
          <Descriptions.Item label="Launch Site">
            {launchDetail?.launch_site?.site_name_long}
          </Descriptions.Item>
          <Descriptions.Item label="Details">
            {launchDetail?.details}
          </Descriptions.Item>
          <Descriptions.Item label="Article">
            <a href={launchDetail?.links?.article_link} target="_blank">
              {launchDetail?.links?.article_link}
            </a>
          </Descriptions.Item>
          <Descriptions.Item label="Video">
            <div>
              <iframe
                width="560"
                height="315"
                src={youtubeUrlParse(launchDetail?.links?.video_link) || ''}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Drawer>
    </Page>
  );
}
