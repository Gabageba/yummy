import type { IPageableResponse } from '@customTypes/pageable';
import type { TypedUseQuery } from '@reduxjs/toolkit/query/react';
import { Col, Pagination, Row, Spin } from 'antd';
import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import Empty from '../Empty';

const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_COLUMNS_COUNT = 3;

interface IProps<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useQuery: TypedUseQuery<IPageableResponse<T>, any, any>;
  cardRender: (item: T) => ReactNode;
  size?: number;
  columnsCount?: number;
}

interface IItem {
  id: string | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // остальные свойства
}

function CardsList<T extends IItem>({
  useQuery,
  cardRender,
  size = DEFAULT_PAGE_SIZE,
  columnsCount = DEFAULT_COLUMNS_COUNT,
}: IProps<T>) {
  const [page, setPage] = useState<number>(1);

  const { data, isFetching } = useQuery({ page, size });

  const span = useMemo(() => 24 / columnsCount, [columnsCount]);

  return (
    <Spin spinning={isFetching}>
      <Row gutter={[16, 16]}>
        {data && data.results.length > 0 ? (
          data.results.map((item) => (
            <Col span={span} key={item.id}>
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
    </Spin>
  );
}

export default CardsList;
