import { Link } from '@umijs/max';
import { Button, Card, Result } from 'antd';
import React from 'react';

const Exception404: React.FC = () => {
  return (
    <Card variant="borderless">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link to="/" prefetch>
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Card>
  );
};

export default Exception404;
