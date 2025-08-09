import styled from "styled-components";

export const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #eaeef6;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFoundContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFoundContent = styled.div`
  text-align: center;
  padding: 40px;
`;

export const NotFoundTitle = styled.h1`
  font-size: 120px;
  font-weight: 700;
  color: #565eef;
  margin-bottom: 20px;
  line-height: 1;
`;

export const NotFoundSubtitle = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
`;

export const NotFoundText = styled.p`
  font-size: 16px;
  color: #94a6be;
  margin-bottom: 40px;
  line-height: 1.5;
`;

export const NotFoundButton = styled.button`
  background-color: #565eef;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:hover {
    background-color: #33399b;
  }
`;
