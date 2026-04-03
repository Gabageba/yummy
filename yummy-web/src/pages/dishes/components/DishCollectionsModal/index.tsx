import { useAppDispatch } from '@hooks/redux';
import { getDishCollections, useUpdateDishCollectionsMutation } from '@pages/dishes/dishesApi';
import { Checkbox, Divider, Flex, Modal, Spin, Typography } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.scss';
import type { IDishCollection } from '@pages/dishes/models';
import useToken from '@hooks/useToken';

const DEFAULT_PAGE_SIZE = 20;
const SCROLL_LOAD_THRESHOLD = 80;

interface IProps {
  dishId?: string;
  open: boolean;
  onCancel: () => void;
}

const DishCollectionsModal = ({ dishId, open, onCancel }: IProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const token = useToken();

  const [page, setPage] = useState<number>(1);
  const [collections, setCollections] = useState<IDishCollection[]>([]);
  const [checkedOrder, setCheckedOrder] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [updateDishCollections, { isLoading: isDishCollectionsUpdating }] =
    useUpdateDishCollectionsMutation();

  const toggleCollection = (id: string) => {
    const collection = collections.find((c) => c.id === id);
    if (!collection) return;
    const nextChecked = !collection.checked;
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, checked: nextChecked } : c)));
    setCheckedOrder((prev) => (nextChecked ? [...prev, id] : prev.filter((x) => x !== id)));
  };

  const checkedList = useMemo(
    () =>
      checkedOrder
        .map((id) => collections.find((c) => c.id === id))
        .filter((c): c is IDishCollection => c != null),
    [checkedOrder, collections],
  );

  const uncheckedList = useMemo(() => collections.filter((c) => !c.checked), [collections]);

  const onOk = () => {
    if (dishId) {
      updateDishCollections({ id: dishId, collections: checkedList.map(({ id }) => id) })
        .unwrap()
        .then(() => onCancel());
    }
  };

  useEffect(() => {
    if (open && dishId) {
      setPage(1);
      setCollections([]);
      setCheckedOrder([]);
      setHasMore(true);
    }
  }, [open, dishId]);

  useEffect(() => {
    if (!open || !dishId) return;
    setLoading(true);
    dispatch(
      getDishCollections.initiate({
        dishId,
        page,
        size: DEFAULT_PAGE_SIZE,
      }),
    )
      .unwrap()
      .then((res) => {
        if (page === 1) {
          setCollections(res.results);
          setCheckedOrder(res.results.filter((c) => c.checked).map((c) => c.id));
        } else {
          setCollections((prev) => [...prev, ...res.results]);
          setCheckedOrder((prev) => [
            ...prev,
            ...res.results.filter((c) => c.checked).map((c) => c.id),
          ]);
        }
        setHasMore(res.hasMore);
      })
      .finally(() => setLoading(false));
  }, [open, dishId, page, dispatch]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || !hasMore || loading) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollTop + clientHeight >= scrollHeight - SCROLL_LOAD_THRESHOLD) {
      setLoading(true);
      setPage((p) => p + 1);
    }
  }, [hasMore, loading]);

  return (
    <Modal
      getContainer={() => document.body}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title={<Typography.Title level={4}>{t('changeDishCollections')}</Typography.Title>}
      okButtonProps={{ loading: isDishCollectionsUpdating }}
    >
      <Flex
        ref={scrollRef}
        onScroll={onScroll}
        vertical
        gap={token.marginXS}
        className="dish-collections-modal__content"
      >
        {checkedList.map((collection) => (
          <Checkbox key={collection.id} checked onChange={() => toggleCollection(collection.id)}>
            {collection.name}
          </Checkbox>
        ))}
        {checkedList.length > 0 && uncheckedList.length > 0 && <Divider size="small" />}
        {uncheckedList.map((collection) => (
          <Checkbox
            key={collection.id}
            checked={false}
            onChange={() => toggleCollection(collection.id)}
          >
            {collection.name}
          </Checkbox>
        ))}
        {loading && (
          <div className="spinner">
            <Spin size="small" />
          </div>
        )}
      </Flex>
    </Modal>
  );
};

export default DishCollectionsModal;
