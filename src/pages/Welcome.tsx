import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Card } from 'antd';
import React from 'react';

interface InfoCardProps {
  title: string;
  index: number;
  desc: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, index, desc, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={title}>
    <Card hoverable size="small">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#1677ff] text-base font-bold text-white">
          {index}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="mb-1 mt-0 text-sm font-semibold">{title}</h4>
          <p className="mb-0 line-clamp-2 text-xs text-zinc-500">{desc}</p>
        </div>
      </div>
    </Card>
  </a>
);

const infoCards = [
  {
    index: 1,
    href: 'https://umijs.org/docs/introduce/introduce',
    title: 'Learn umi',
    desc: 'umi is an extensible enterprise-level frontend framework based on routing, supporting both config-based and convention-based routes.',
  },
  {
    index: 2,
    href: 'https://ant.design',
    title: 'Learn Ant Design',
    desc: 'antd is a React UI component library based on the Ant Design system, mainly for enterprise-level mid-end products.',
  },
  {
    index: 3,
    href: 'https://procomponents.ant.design',
    title: 'Learn Pro Components',
    desc: 'ProComponents provides higher-abstraction template components on top of Ant Design, with one-component-one-page philosophy.',
  },
] as const;

const Welcome: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const isDark = initialState?.settings?.navTheme === 'realDark';

  return (
    <PageContainer title="Welcome 🎉">
      <div
        data-theme={isDark ? 'dark' : 'light'}
        className="flex flex-col gap-6 md:flex-row"
      >
        <div className="min-w-0 md:flex-[2]">
          <Card>
            <p>
              Welcome to the project! This template is built on Ant Design Pro
              and provides enterprise-ready pages and components to help you
              quickly build your application.
            </p>
          </Card>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          {infoCards.map((card) => (
            <InfoCard
              key={card.href}
              index={card.index}
              href={card.href}
              title={card.title}
              desc={card.desc}
            />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default Welcome;
