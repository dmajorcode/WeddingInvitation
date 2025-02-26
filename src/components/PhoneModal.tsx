import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { INFORMATION } from '../value';

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhoneModal = ({ setComponent }: Props) => {
  const elRef = useRef<HTMLDivElement>(null);

  useOutsideClick({
    ref: elRef,
    handler: () => setComponent(null),
  });

  const onClickPhone = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const onClickMessage = (phoneNumber: string) => {
    window.location.href = `sms:${phoneNumber}`;
  };

  return (
    <Container ref={elRef}>
      <CloseButton onClick={() => setComponent(null)}>
        <i
          className="fa fa-times"
          style={{ color: 'white' }}
          aria-hidden="true"
        ></i>
      </CloseButton>

      <Wrapper>
        <Title>신랑측</Title>
        {INFORMATION.groom.map((info) => (
          <ContentWrapper key={info.name}>
            <Content>{info.title}</Content>
            <Name>{info.name}</Name>
            <Content style={{ marginLeft: '16px' }}>
              <Icon
                className="fa fa-phone"
                onClick={() => onClickPhone(info.phoneNumber)}
              ></Icon>
            </Content>
            <Content>
              <Icon
                className="fa fa-envelope"
                onClick={() => onClickMessage(info.phoneNumber)}
                style={{ transform: 'none' }}
              ></Icon>
            </Content>
          </ContentWrapper>
        ))}
      </Wrapper>
      <Wrapper>
        <Title style={{ color: '#a25364', borderBottom: '2px solid #e3cfd3' }}>
          신부측
        </Title>
        {INFORMATION.bride.map((info) => (
          <ContentWrapper key={info.name}>
            <Content>{info.title}</Content>
            <Name>{info.name}</Name>
            <Content style={{ marginLeft: '16px' }}>
              <Icon
                className="fa fa-phone"
                onClick={() => onClickPhone(info.phoneNumber)}
              ></Icon>
            </Content>
            <Content>
              <Icon
                className="fa fa-envelope"
                onClick={() => onClickMessage(info.phoneNumber)}
                style={{ transform: 'none' }}
              ></Icon>
            </Content>
          </ContentWrapper>
        ))}
      </Wrapper>
    </Container>
  );
};

export default PhoneModal;

const Container = styled.div`
  position: relative;
  background-color: white;
  width: min(calc(100vw - 20px), 500px);
  height: 565px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: fadeInUp 0.3s ease-in-out;
  flex-direction: column;
  gap: 21px;

  @media only screen and (max-width: 445px) {
    height: 555px;
    gap: 19px;
  }

  @media only screen and (max-width: 360px) {
    height: 525px;
    gap: 18px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 312px;

  @media only screen and (max-width: 600px) {
    width: 292px;
  }

  @media only screen and (max-width: 445px) {
    width: 262px;
  }

  @media only screen and (max-width: 360px) {
    width: 232px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 60px;
  color: #2d5976;
  border-bottom: 2px solid #cad3d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 26px;

  @media only screen and (max-width: 600px) {
    font-size: 21px;
    height: 58px;
    margin-bottom: 25px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 20px;
    height: 56px;
    margin-bottom: 24px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 19px;
    height: 54px;
    margin-bottom: 22px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 17px;
    gap: 15px;
  }

  @media only screen and (max-width: 445px) {
    margin-bottom: 16px;
    gap: 14px;
  }

  @media only screen and (max-width: 360px) {
    margin-bottom: 15px;
    gap: 13px;
  }
`;

const Icon = styled.i`
  transform: rotate(93deg);
  color: #555555;
  padding: 6.5px;
  font-size: 21px;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    padding: 5.5px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 19px;
    padding: 5px;
  }
`;

const Content = styled.span`
  color: #555555;
  font-size: 17px;

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 15px;
  }
`;

const Name = styled(Content)`
  font-size: 20px;
  color: #444444;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
    font-size: 19px;
  }

  @media only screen and (max-width: 445px) {
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.28);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  font-size: 21px;
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  font-weight: 200;

  @media only screen and (max-width: 445px) {
    width: 34px;
    height: 34px;
    font-size: 20px;
  }

  @media only screen and (max-width: 360px) {
    width: 33px;
    height: 33px;
    font-size: 19px;
    top: 11px;
    right: 11px;
  }
`;
