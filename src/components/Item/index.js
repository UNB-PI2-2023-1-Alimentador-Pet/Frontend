import React from 'react';
import {CaretRight} from 'phosphor-react-native';

import {
  ItemContainer,
  ItemImage,
  ItemIcon,
  ItemContent,
  ItemTitle,
  ItemSubtitle,
  ItemAction,
  ItemButton,
} from './styles';
import {colors} from '../../utils/colors';
import {scale} from '../../utils/scalling';

const Item = props => {
  return (
    <ItemContainer onPress={props.onPress} gray={props.gray}>
      {props.image && <ItemImage source={props.image} />}
      {props.icon && <ItemIcon>{props.icon}</ItemIcon>}

      <ItemContent>
        <ItemTitle>{props.title}</ItemTitle>
        {props.subtitle && <ItemSubtitle>{props.subtitle}</ItemSubtitle>}
      </ItemContent>

      {props.onIconPress && (
        <ItemAction>
          <ItemButton onPress={props.onIconPress}>
            <CaretRight color={colors.dark} weight="regular" size={scale(30)} />
          </ItemButton>
        </ItemAction>
      )}
    </ItemContainer>
  );
};

export default Item;
