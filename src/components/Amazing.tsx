import {Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {ReactComponent as AmazingLogoSvg} from '../assets/amazingLogo.svg';

const Amazing = () => {
  const {t} = useTranslation();

  return (
    <VStack gap={3}>
      <AmazingLogoSvg />
      <Text fontSize={20} fontWeight={600}>
        {t('amazing.title')}
      </Text>
      <Text fontSize={16} fontWeight={400}>
        {t('amazing.text')}
      </Text>
    </VStack>
  );
};

export default Amazing;
