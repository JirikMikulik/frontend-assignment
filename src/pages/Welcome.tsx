import {Center, HStack, Spacer, Text, VStack} from '@chakra-ui/react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {ReactComponent as IconDesigner} from '../assets/icons/icon-designer.svg';
import {ReactComponent as IconSlack} from '../assets/icons/icon-slack.svg';
import {ReactComponent as IconVersion} from '../assets/icons/icon-version.svg';
import {ReactComponent as Separator} from '../assets/icons/separator.svg';
import Zentask from '../components/Zentask';

export function Welcome() {
  const {t} = useTranslation();

  return (
    <Center height="100vh" width="100wv" padding="10">
      <VStack>
        <HStack width="full">
          <Spacer />
          <Link to="login">Login</Link>
        </HStack>
        <VStack h="90vh" justifyContent="space-between">
          <HStack>
            <Zentask size={76} fontSize="5xl" fontWeight={510} />
          </HStack>
          <Text fontSize={96} color="blue.900">
            {t('welcome.message')}
          </Text>
          <HStack spacing={5}>
            <HStack>
              <IconVersion width={32} height={32} />
              <Text fontSize="3xl">2.0.0</Text>
            </HStack>
            <Separator />
            <HStack>
              <IconDesigner width={32} height={32} />
              <Text fontSize="3xl">Omnetic Team</Text>
            </HStack>
            <Separator />
            <HStack>
              <IconSlack width={32} height={32} />
              <Text fontSize="3xl">#omnetic-front-end-devs</Text>
            </HStack>
          </HStack>
          <Text width={766} fontSize={16} color="#7A869A" fontWeight={400} textAlign="center">
            {t('welcome.copyright')}
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
}
