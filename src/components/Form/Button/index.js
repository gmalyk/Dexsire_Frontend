import React from "react";
import PropTypes from 'prop-types';

import { ButtonGradient, ButtonTextContainer, ColorButton, Load } from "./styled";
import { ThemedComponent } from "ui/theme";
import { Icon } from "ui/styled";

export const Button = ({ children, loading, primary, secondary, outline, link, nospace, centred, onClick, small, width, leftIcon, rightIcon, start, between, end, outlineGradient, color, white }) => {

  const GButton = outlineGradient ? ButtonGradient : ColorButton
  return (
    <>
      <ThemedComponent>
        <GButton variant={link ? "text" : outline ? "outlined" : "contained"} color={secondary ? 'secondary' : primary ? 'primary' : color ? color : 'white'} width={width} small={small} nospace={nospace} centred={centred} onClick={onClick} white={white}>
          {
            loading ? <Load primary={primary} secondary={secondary} outline={outline} /> : <>
              <ButtonTextContainer start={start} between={between} end={end}>
                {!leftIcon ? null : <Icon icon={leftIcon} nomargin />}
                {children}
                {!rightIcon ? null : <Icon icon={rightIcon} nomargin />}
              </ButtonTextContainer>
            </>
          }
        </GButton>
      </ThemedComponent>
    </>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  outline: PropTypes.bool,
  link: PropTypes.bool,
  nospace: PropTypes.bool,
  centred: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  children: undefined,
  primary: false,
  secondary: false,
  outline: false,
  link: false,
  nospace: false,
  centred: false,
  loading: false,
  onClick: undefined,
};

export default Button;