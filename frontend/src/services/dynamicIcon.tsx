import loadable from "@loadable/component";

type DynamicIconProps = {
  type: string
}

const DynamicIcon = loadable(({ type }: DynamicIconProps) => 
import(`@ant-design/icons/es/icons/${type}.js`)
// @ts-ignore
.catch(err => import(`@ant-design/icons/es/icons/WarningOutlined.js`)))

export default DynamicIcon;