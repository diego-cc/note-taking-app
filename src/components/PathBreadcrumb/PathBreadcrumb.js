import React from 'react';
import {Breadcrumb} from 'antd';
import {Link, withRouter} from "react-router-dom";

/**
 * Optional component (shows the current route location path - e.g. /Browse/123)
 * Not implemented yet
 */
export const PathBreadcrumb = withRouter(({paths}) => {

  return (
    <Breadcrumb style={{margin: '16px 0'}}>
      {
        paths.map((path, index) => (
          <Breadcrumb.Item key={index}>
			<Link to={`/${path.toLowerCase()}`}>
			  {path}
			</Link>
          </Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
});
