import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import type { IIconProps } from './Icon';
import Icon from './Icon';

/**
 * Иконка «папка с минусом» в стиле Ant Design (outlined).
 * Соответствует FolderAddOutlined, но с минусом вместо плюса — для действия «убрать из коллекции».
 */
function InternalIcon(props: CustomIconComponentProps | React.SVGProps<SVGSVGElement>) {
  const { width = '1em', height = '1em', ...rest } = props;
  return (
    <svg
      width={width}
      height={height}
      viewBox="64 64 896 896"
      focusable="false"
      fill="currentColor"
      {...rest}
    >
      {/* Папка (тот же контур, что у FolderOutlined / FolderAddOutlined) */}
      <path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" />
      {/* Минус: длина как у вертикальной перекладины плюса (~170), центр и высота как у горизонтальной перекладины плюса */}
      <path d="M480 528h170v49H378V528z" />
    </svg>
  );
}

interface IProps extends IIconProps {}

function FolderRemoveOutlined(props: IProps) {
  return <Icon component={InternalIcon} {...props} />;
}

export default FolderRemoveOutlined;
