import {HStack, Text} from '@chakra-ui/react';
import {SystemProps} from '@chakra-ui/system';
import {useTranslation} from 'react-i18next';
import {ReactComponent as ZenlogoSvg} from '../assets/zenLogo.svg';

interface ZentaskProps {
  fontSize?: SystemProps['fontSize'];
  fontWeight?: SystemProps['fontWeight'];
  size?: number;
}

const Zentask: React.FC<ZentaskProps> = ({fontSize = '2xl', fontWeight = 'normal', size = 32}) => {
  const {t} = useTranslation();

  return (
    <HStack>
      <ZenlogoSvg width={size} height={size} />
      <Text fontSize={fontSize} fontWeight={fontWeight}>
        {t('common.zentext')}
      </Text>
    </HStack>
  );
};

export default Zentask;
