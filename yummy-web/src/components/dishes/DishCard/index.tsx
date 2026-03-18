import type { IDish } from '@pages/dishes/models';
import type { CardProps } from 'antd';
import { Card, Flex, Space, Tag, Typography } from 'antd';
import './index.scss';
import PrimaryTag from '@components/core/PrimaryTag';
import DifficultyLabel from '@components/DifficultyLabel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import CoverIcon from '@components/CoverIcon';
import { CoverIconEnum } from '@components/CoverIcon/models';
import { token } from '@theme/token';

interface IProps {
  dish: IDish;
  actions?: CardProps['actions'];
}

function DishCard({ dish, actions }: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as Node;
    if (
      target instanceof Element &&
      (target.closest('.ant-card-actions') ||
        target.closest('.ant-modal-wrap') ||
        target.closest('.ant-modal-content'))
    ) {
      return;
    }
    navigate(RoutePath.DISH_DETAIL.replace(':id', dish.id));
  };

  return (
    <>
      <Card
        className="dish-card card"
        cover={<CoverIcon icon={CoverIconEnum.QUESTION} />}
        onClick={handleCardClick}
        actions={actions}
      >
        <Card.Meta
          title={
            <Flex vertical className="dish-card__title" gap={token.marginXXS}>
              <Typography.Title level={4} ellipsis={{ rows: 1, tooltip: true }}>
                {dish.name}
              </Typography.Title>
              <Space>
                {dish.tags?.map((tag) => (
                  <PrimaryTag variant="filled" key={tag} icon="#">
                    {tag}
                  </PrimaryTag>
                ))}
              </Space>
            </Flex>
          }
          description={
            <Flex vertical gap={token.marginSM}>
              {dish.description && (
                <Typography.Paragraph
                  ellipsis={{ rows: 4, tooltip: true }}
                  className="dish-card__description"
                >
                  {dish.description}
                </Typography.Paragraph>
              )}
              <Flex vertical gap={token.marginXS}>
                <DifficultyLabel difficulty={dish.difficulty} />
                <Flex vertical className="dish-card__main-ingredients" gap={token.marginXXS}>
                  <Typography.Text type="secondary">
                    {t('mainIngredients').toUpperCase()}
                  </Typography.Text>
                  <Space>
                    {dish.mainIngredients?.map((ingredient) => (
                      <Tag key={ingredient} variant="filled" color="gold">
                        {ingredient}
                      </Tag>
                    ))}
                  </Space>
                </Flex>
              </Flex>
            </Flex>
          }
        />
      </Card>
    </>
  );
}

export default DishCard;
