import {Text} from 'react-native';
import styled from 'styled-components';

export const Item = styled.View``;

export const Label = styled(Text)``;

export const ErrorMessage = styled(Text)`
  color: ${({theme}) => theme.colors.danger};
`;
