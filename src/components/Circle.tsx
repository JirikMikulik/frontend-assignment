import {ReactComponent as IconEmptyCircle} from '../assets/icons/icon-emptyCircle.svg';
import {ReactComponent as IconFilledCircle} from '../assets/icons/icon-filledCircle.svg';

export interface CircleProps {
  checked?: boolean;
}

const Circle: React.FunctionComponent<CircleProps> = ({checked = false}) =>
  checked ? <IconFilledCircle /> : <IconEmptyCircle />;

export default Circle;
