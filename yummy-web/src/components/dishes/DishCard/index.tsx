import type { IDish } from '@pages/dishes/models';
import type { CardProps } from 'antd';
import { Card, Flex, Space, Tag, theme, Typography } from 'antd';
import './index.scss';
import PrimaryTag from '@components/core/PrimaryTag';
import DifficultyLabel from '@components/DifficultyLabel';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@routes/models';
import CoverIcon from '@components/CoverIcon';
import { CoverIconEnum } from '@components/CoverIcon/models';

interface IProps {
  dish: IDish;
  actions?: CardProps['actions'];
}

function DishCard({ dish, actions }: IProps) {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <Card
        className="dish-card card"
        cover={<CoverIcon icon={CoverIconEnum.QUESTION} />}
        onClick={() => navigate(RoutePath.DISH_DETAIL.replace(':id', dish.id))}
        actions={actions}
      >
        <Card.Meta
          title={
            <Flex vertical className="dish-card__title" gap={token.marginXXS}>
              <Typography.Title level={4}>{dish.name}</Typography.Title>
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
              {dish.description && <Typography.Text>{dish.description}</Typography.Text>}
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
