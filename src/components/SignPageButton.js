import React from 'react';
import styled from 'styled-components/native'

const SignPageButton = ({normalText, boldText, onPress}) => {
  return (
      <SignButton onPress={onPress}>
          <SignButtonTextNormal>{normalText}</SignButtonTextNormal>
          <SignButtonTextBold>{boldText}</SignButtonTextBold>
      </SignButton>
  )
}

export const SignButton = styled.TouchableOpacity`
    flex-direction: row;
    width: 98%;
    justify-content: center;
    align-items: center;
    margin-bottom: 6%;
`;

export const SignButtonTextNormal = styled.Text`
    font-size: 14px;
`;

export const SignButtonTextBold = styled.Text`
    font-size: 14px;
    font-weight: bold;
`;

export default SignPageButton;