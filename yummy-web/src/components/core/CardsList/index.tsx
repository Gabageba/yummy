import type { IPageableResponse } from '@customTypes/pageable';
import type { TypedUseQuery } from '@reduxjs/toolkit/query/react';
import { Card, Col, Pagination, Row } from 'antd';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import useCardListColumnsCount from '@hooks/useCardListColumnsCount';
import { token } from '@theme/token';
import Empty from '../Empty';
import './index.scss';

const DEFAULT_PAGE_SIZE = 8;

interface IProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuery: TypedUseQuery<IPageableResponse<T>, any, any>;
  cardRender: (item: T) => ReactNode;
  size?: number;
  columnsCount?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalParams?: { [key: string]: any };
}

interface IItem {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

function CardsList<T extends IItem>({
  useQuery,
  cardRender,
  size = DEFAULT_PAGE_SIZE,
  columnsCount: count,
  additionalParams = {},
}: IProps<T>) {
  const defaultColumnsCount = useCardListColumnsCount();

  const [page, setPage] = useState<number>(1);

  const { data, isFetching } = useQuery({ page, size, ...additionalParams });

  const columnsCount = useMemo(() => count ?? defaultColumnsCount, [count, defaultColumnsCount]);
  const span = useMemo(() => 24 / columnsCount, [columnsCount]);

  if (isFetching) {
    return (
      <Row gutter={[token.margin, token.margin]} className="cards-list__content">
        {Array.from({ length: columnsCount }, (_, i) => (
          <Col span={span} key={i}>
            <Card loading={isFetching} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <>
      <Row gutter={[token.margin, token.margin]} className="cards-list__content">
        {data && data.results.length > 0 ? (
          data.results.map((item, index) => (
            <Col
              span={span}
              key={item.id}
              className="cards-list__item"
              style={{ '--card-index': index } as React.CSSProperties}
            >
              {cardRender(item)}
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Empty />
          </Col>
        )}
      </Row>
      <Pagination
        hideOnSinglePage
        align="center"
        current={page}
        onChange={setPage}
        total={data?.total}
        pageSize={size}
      />
    </>
  );
}

export default CardsList;
