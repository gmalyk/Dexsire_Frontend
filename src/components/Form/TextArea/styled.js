import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";

export const TextArea = styled.textarea.attrs((props) => ({
  maxLength: 820,
}))`
  width: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  font-family: Inter;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
  border-color: ${({ theme }) => theme.palette.colors.black};
  color: ${({ theme }) => theme.palette.colors.white};
  resize: none;
  min-height: 344px;
  &:focus {
    outline: none;
  }
`;

