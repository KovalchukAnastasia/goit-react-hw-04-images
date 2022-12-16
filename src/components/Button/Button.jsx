import React from 'react';
import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

function Button({ onClick }) {
  return <LoadMoreBtn onClick={onClick}>Load More</LoadMoreBtn>;
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
