import React from 'react';
import {Layout} from 'antd';

export const Header = ({headerTitle}) => (
  <Layout.Header>
    {headerTitle}
  </Layout.Header>
);