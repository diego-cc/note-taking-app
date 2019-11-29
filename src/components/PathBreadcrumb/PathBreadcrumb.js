import React from 'react';
import {Breadcrumb} from 'antd';

export const PathBreadcrumb = ({paths}) => {

  return (
    <Breadcrumb style={{margin: '16px 0'}}>
      {
        paths.map((path, index) => (
          <Breadcrumb.Item key={index}>{path}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
};