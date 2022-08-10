import request from '@/utils/request';

export interface ILaunch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_site: {
    site_name_long: string;
  };
  launch_success: boolean;
  links: {
    article_link: string;
    video_link: string;
  };
  rocket: {
    rocket_name: string;
    rocket_type: string;
  };
  details: string;
}

export interface ILaunchesPastResult {
  launchesPast: ILaunch[];
  pagination: {
    current: number;
    pageSize: number;
  };
}

/**
 * get launches past data，with pagination
 * @param props: getLaunchesPastProps
 * @returns Promise<>
 */
export function getLaunchesPast(props?: {
  current?: number;
  pageSize?: number;
}): Promise<ILaunchesPastResult> {
  const { current = 1, pageSize = 10 } = props || {};
  const query = `
  query LaunchesPast($limit: Int!, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      launch_date_local
      launch_site {
        site_name_long
      }
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
      details
    }
  }`;
  const variables = {
    limit: pageSize,
    offset: (current - 1) * pageSize,
  };
  console.log(variables);

  return request(query, variables).then((res) => {
    return {
      ...res,
      pagination: {
        current,
        pageSize,
      },
    };
  });
}

export interface ILaunchsNextResult {
  launchNext: ILaunch;
}

/**
 * get launchs next data
 */
export function getLaunchsNext(): Promise<ILaunchsNextResult> {
  const query = `
  {
    launchNext {
      launch_date_local
      id
      launch_site {
        site_name_long
      }
      launch_success
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
        rocket_type
      }
      details
      mission_name
    }
  }
  `;
  return request(query);
}

export function getLaunchesPastResult() {
  const query = `
  {
    launchesPastResult {
      result {
        totalCount
      }
    }
  }`;
  return request(query);
}
