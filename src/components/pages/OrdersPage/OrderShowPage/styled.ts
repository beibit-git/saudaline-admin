import styled from '@emotion/styled';
import { Col } from 'antd';

export const ContainerDetails = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  svg {
    margin-right: 10px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 35px;
    flex-direction: column;
  }
`;

export const CourierBoxContainer = styled(Col)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
  color: white;

  svg {
    margin-right: 10px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 35px;
    flex-direction: column;
  }
`;

export const CourierInfoBox = styled.div`
  display: flex;
  background-color: #67be23;
  align-items: center;
  padding: 10px 13px;
  margin-right: 10px;
  border-radius: 10px;
  color: white;

  @media screen and (max-width: 1199px) {
    margin-right: 12px;
    margin-left: 0;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 15px;
    width: 100%;
  }
`;

export const CourierInfoBoxText = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

export const ProductFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: 800;

  & > span:first-child {
    margin-right: 10px;
    color: #67be23;
  }

  & > span:nth-child(2) {
    margin-right: 20px;
  }
`;

export const Product = styled.div`
  display: flex;
  align-items: center;
`;

export const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  white-space: nowrap;
`;
