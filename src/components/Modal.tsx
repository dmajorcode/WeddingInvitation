import { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  component: React.ReactNode;
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const Modal: React.FC<ModalProps> = ({ component }: ModalProps) => {
  useEffect(() => {
    if (component) {
      disableScrollLock();
    } else {
      enableScrollLock();
    }
  }, [component]);

  // 스크롤 잠금
  const disableScrollLock = () => {
    const { body } = document;

    if (!body.getAttribute("scrollY")) {
      const pageY = window.scrollY;

      body.setAttribute("scrollY", pageY.toString());

      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.left = "0px";
      body.style.right = "0px";
      body.style.bottom = "0px";
      body.style.top = `-${pageY}px`;
    }
  };

  // 스크롤 잠금 해제
  const enableScrollLock = () => {
    const { body } = document;

    if (body.getAttribute("scrollY")) {
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      body.style.removeProperty("bottom");

      window.scrollTo(0, Number(body.getAttribute("scrollY")));

      body.removeAttribute("scrollY");
    }
  };

  if (!component) {
    return;
  }

  return <Container>{component}</Container>;
};

export default Modal;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100000;
  padding: 0 22px;

  @media only screen and (max-width: 360px) {
    padding: 0 15px;
  }
`;
