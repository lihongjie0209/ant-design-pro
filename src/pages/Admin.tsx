import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Typography } from 'antd';
import React from 'react';

const Admin: React.FC = () => {
  return (
    <PageContainer content="This page can only be viewed by admin">
      <Card>
        <Alert
          title="Faster and stronger heavy-duty components have been released."
          type="success"
          showIcon
          banner
          style={{
            margin: -12,
            marginBottom: 48,
          }}
        />
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Welcome to Admin Page
        </Typography.Title>
      </Card>
    </PageContainer>
  );
};

export default Admin;
