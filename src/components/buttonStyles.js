import styled from 'styled-components';
import { Button } from '@mui/material';

export const RedButton = styled(Button)`
  && {
    background-color: #f00;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlackButton = styled(Button)`
  && {
    background-color: #000000;
    color: white;
    margin-left: 4px;
    &:hover {
      background-color: #212020;
      border-color: #212020;
      box-shadow: none;
    }
  }
`;

export const DarkRedButton = styled(Button)`  
  && {
    background-color: #650909;
    color: white;
    &:hover {
      background-color: #eb7979;
      border-color: #f26767;
      box-shadow: none;
    }
  }
`;

export const BlueButton = styled(Button)`   //done DarkBlueButton
  && {
    background-color: #080a43;
    color: #fff;
    &:hover {
      background-color: #0a1e82;
    }
  }
`;

export const DarkBlueButton = styled(Button)`  //done BlueButton -YAHA PURPLE TA
  && {
    background-color: #0a6ead;            
    color: #fff;
    &:hover {
      background-color: #0773B9; 
    }
  }
`;

export const LightBlueButton = styled(Button)`             //done LightBlueButton
  && {
    background-color: #0773B9;
    color: #fff;
    &:hover {
      background-color: #0a6ead;
    }
  }
`;

export const GreenButton = styled(Button)`
  && {
    background-color: #78aa3b;
    color: #fff;
    &:hover {
      background-color: #88c343;
    }
  }
`;

export const BrownButton = styled(Button)`
  && {
    background-color: #2c1006;
    color: white;
    &:hover {
      background-color: #40220c;
      border-color: #40220c;
      box-shadow: none;
    }
  }
`;

export const IndigoButton = styled(Button)`  //remove this class and use blue
  && {
    background-color: #2f2b80;
    color: white;
    &:hover {
      background-color: #534ea6;
      border-color: #473d90;
      box-shadow: none;
    }
  }
`;
