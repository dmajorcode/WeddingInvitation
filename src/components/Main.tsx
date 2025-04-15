import styled from "styled-components";
import CalendarPic from "/images/calendar3.jpg";
import {
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Button as MuiButton,
  Typography,
} from "@mui/material";
import { lazy, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ManPic from "/images/man.jpg";
import WomanPic from "/images/woman.jpg";

import BoyPic1 from "/images/boy1.jpg";
import BoyPic2 from "/images/boy2.jpg";
import BoyPic3 from "/images/boy3.jpg";
import BoyPic4 from "/images/boy4.jpg";
import GirlPic1 from "/images/girl1.jpg";
import GirlPic2 from "/images/girl2.jpg";
import GirlPic3 from "/images/girl3.jpg";
import GirlPic4 from "/images/girl4.jpg";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import Map from "../Map";
import { INFORMATION } from "../value";
import AttendModal from "./AttendModal";
import PhoneModal from "./PhoneModal";
import ProgressiveImg from "./ProgressiveImg";
import Heart from "/images/heart.png";
import image45 from "/images/image45.jpg";
import KakaoMapIcon from "/images/kakaoMap.png";
import MainPic from "/images/main7.jpg";
import NaverMapIcon from "/images/naverMap.png";

// Comment for Deployment
interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const PhotoGallery = lazy(() => import("./Gallery/PhotoGallery"));

// First, create arrays of photos for each person
const GROOM_PHOTOS = [ManPic, BoyPic1, BoyPic2, BoyPic3, BoyPic4]; // Add more photos as needed
const BRIDE_PHOTOS = [WomanPic, GirlPic1, GirlPic2, GirlPic3, GirlPic4]; // Add more photos as needed

// TODO: 콘솔 보이는 것 막기

function Main({ setComponent }: Props) {
  // Replace isboy/isGirl with photo indices
  const [groomPhotoIndex, setGroomPhotoIndex] = useState(0);
  const [bridePhotoIndex, setBridePhotoIndex] = useState(0);

  // TODO: put speaker emoji and music https://www.youtube.com/watch?v=yHXB9lk93Ts
  const [isVisible, setIsVisible] = useState(false);

  const [searchParams] = useSearchParams();
  const dear = searchParams.get("dear"); // 받는사람 성명

  const [openGroomAccount, setOpenGroomAccount] = useState<boolean>(false);
  const [openBrideccount, setOpenBrideAccount] = useState<boolean>(false);
  const [copyPopupOpen, setCopyPopupOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const refEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkPosition = () => {
      if (refEl.current) {
        const { top } = refEl.current.getBoundingClientRect();
        const isVisible = top < window.innerHeight - 150;

        if (isVisible) {
          // Reset photo indices to 0 (Man and Woman photos) when section becomes visible
          setGroomPhotoIndex(0);
          setBridePhotoIndex(0);
        }

        setIsVisible(isVisible);
      }
    };

    // Run immediately on mount
    checkPosition();

    // Keep checking at intervals since scroll is banned
    const interval = setInterval(checkPosition, 300); // Check every 300ms

    return () => clearInterval(interval);
  }, []);

  // Photo cycling effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGroomPhotoIndex((prev) => (prev + 1) % GROOM_PHOTOS.length);
      setBridePhotoIndex((prev) => (prev + 1) % BRIDE_PHOTOS.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const onClickCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setCopyPopupOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClosePopup = () => {
    setCopyPopupOpen(false);
  };

  const onClickLink = async () => {
    try {
      await navigator.clipboard.writeText(
        "https://wedding-invitation-kj.vercel.app/"
      );
      setCopiedText("청첩장 링크");
      setCopyPopupOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const handleMusicEnd = () => {
    if (audioRef.current && !hasPlayedOnce) {
      audioRef.current.play();
      setHasPlayedOnce(true);
    } else {
      setIsMusicPlaying(false);
    }
  };

  return (
    <Wrappper>
      <ContentWrapper>
        <SpeakerButton onClick={toggleMusic}>
          {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </SpeakerButton>
        <audio
          ref={audioRef}
          src="/music/background-music.mp3"
          onEnded={handleMusicEnd}
          preload="auto"
          loop
        />
        <div style={{ position: "relative", display: "inline-block" }}>
          <ProgressiveImg placeholderSrc={MainPic} />
        </div>

        <TitleImageTitle
          style={{
            fontSize: "1.875rem",
          }}
        ></TitleImageTitle>
        <DescriptionWrapper
          style={{ padding: "3.125rem 1.25rem", backgroundColor: "#f9f9f9" }}
        >
          <Parent>
            <TopName>
              정상진
              <img
                src={Heart}
                alt="Heart"
                style={{
                  width: "1.25rem",
                  height: "1.25rem",
                  margin: "0 0.625rem",
                }}
              />
              강다은
            </TopName>
          </Parent>
          <TitleDescription>
            2025. 04. 27. 일요일 AM 11:30
            <br /> 서울동부지방법원 동백홀
            <br />
            <br />
            <br />
          </TitleDescription>
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            backgroundColor: "#f9f9f9",
            gap: "2rem",
            position: "relative",
            paddingTop: "4.0625rem",
          }}
        >
          <div>
            <EnglishSubTitle>INVITATION</EnglishSubTitle>
            {dear ? (
              <Title
                style={{
                  textAlign: "center",
                  lineHeight: "1.77",
                }}
              >
                소중한 {dear}님 <br />
                저희 결혼식에 초대합니다
              </Title>
            ) : (
              <Title>소중한 분들을 초대합니다</Title>
            )}
          </div>
          <Description>
            <span style={{ letterSpacing: "0.14em", fontWeight: "bold" }}>
              상
            </span>
            상해 왔던 모든 행복이 현실이 되는 순간
            <br />
            <span style={{ letterSpacing: "0.14em", fontWeight: "bold" }}>
              진
            </span>
            정한 동반자를 만나 새 삶을 시작합니다 <br />
            <span style={{ letterSpacing: "0.14em", fontWeight: "bold" }}>
              다
            </span>
            가올 날들을 같이 한 걸음씩 걸어나가며
            <br />
            <span style={{ letterSpacing: "0.14em", fontWeight: "bold" }}>
              은
            </span>
            은한 꽃향기처럼 봄날과 함께 피어나갈 <br />
            저희의 사랑이야기를 나누고자 합니다. <br />
          </Description>
          <HR />
          <Description>
            <Parent>
              정선태 &nbsp;•&nbsp; 김명옥
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;아들&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: "MaruBuriBold",
                fontSize: "1.1875rem",
                marginLeft: "0.625rem",
                color: "#3b3b3b",
                position: "relative",
                bottom: "0.0625rem",
              }}
            >
              상진
            </span>
            <br />
            <Parent
              style={{
                left: "1px",
                position: "relative",
              }}
            >
              강희천 &nbsp;•&nbsp; 김도희
              &nbsp;&nbsp;의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;딸&nbsp;&nbsp;&nbsp;
            </Parent>
            <span
              style={{
                fontFamily: "MaruBuriBold",
                fontSize: "1.1875rem",
                marginLeft: "0.625rem",
                color: "#3b3b3b",
                position: "relative",
                bottom: "0.0625rem",
              }}
            >
              다은
            </span>
          </Description>
          <HR />
          <Button
            onClick={() =>
              setComponent(<PhoneModal setComponent={setComponent} />)
            }
          >
            <i
              className="fa fa-phone"
              style={{
                transform: "rotate(98deg)",
                marginRight: "0.75rem",
                fontSize: "1rem",
              }}
            ></i>
            전화로 축하 인사하기
          </Button>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            padding: "6.25rem 1.375rem",
            background:
              "linear-gradient(to bottom, #f9f9f9 0%,rgb(247, 247, 247) 5%)",
          }}
        >
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>
            시간이 흐르고,
            <br />
            사랑이 피었습니다
          </Title>

          <InterviewWrapper>
            <div>
              <InterviewImageWrapper>
                {GROOM_PHOTOS.map((photo, index) => (
                  <InterviewImage
                    key={index}
                    style={{
                      backgroundImage: `url(${photo})`,
                      opacity: index === groomPhotoIndex ? 1 : 0,
                      zIndex: index === groomPhotoIndex ? 1 : 0,
                    }}
                  />
                ))}
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem 0",
                  fontSize: "1.125rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    marginRight: "0.375rem",
                    color: "#136198",
                  }}
                >
                  신랑
                </span>{" "}
                정상진
              </p>
            </div>
            <div>
              <InterviewImageWrapper>
                {BRIDE_PHOTOS.map((photo, index) => (
                  <InterviewImage
                    key={index}
                    style={{
                      backgroundImage: `url(${photo})`,
                      opacity: index === bridePhotoIndex ? 1 : 0,
                      zIndex: index === bridePhotoIndex ? 1 : 0,
                    }}
                  />
                ))}
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: "center",
                  margin: "1rem 0",
                  fontSize: "1.125rem",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8125rem",
                    marginRight: "0.375rem",
                    color: "#e05068",
                  }}
                >
                  신부
                </span>{" "}
                강다은
              </p>
            </div>
          </InterviewWrapper>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            padding: "2.5rem 1.25rem",
            background:
              "linear-gradient(to bottom, rgb(247, 247, 247) 0%, #ffffff 5%)",
          }}
        >
          <EnglishSubTitle>GALLERY</EnglishSubTitle>
          <Title style={{ marginBottom: "2.5rem" }}>우리의 순간</Title>

          <PhotoGallery />
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            background: "linear-gradient(to bottom, #ffffff 0%, #f9f9f9 5%)",
            paddingTop: "5rem",
          }}
        >
          <EnglishSubTitle style={{ color: "#777777" }}>
            WEDDING DAY
          </EnglishSubTitle>
          <Title>날짜 </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            draggable={false}
            style={{
              width: "91%",
              maxWidth: "27.8125rem",
              marginTop: "2.1875rem",
              userSelect: "none",
              WebkitUserSelect: "none",
              WebkitTouchCallout: "none",
              WebkitTapHighlightColor: "transparent",
              pointerEvents: "none",
            }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: "#efefef",
            gap: "2.25rem",
            position: "relative",
          }}
        >
          <div>
            <EnglishSubTitle>SAVE THE DATE</EnglishSubTitle>
            <Title>참석여부를 전달해주세요</Title>
          </div>
          <Description>
            축하의 마음으로 예식에 참석하시는
            <br />
            모든 분들을 더욱 귀하게 모실 수 있도록, <br />
            참석 여부를 알려주시면 감사하겠습니다.
          </Description>
          <Button
            style={{ backgroundColor: "#444444", color: "white" }}
            onClick={() =>
              setComponent(<AttendModal setComponent={setComponent} />)
            }
          >
            <i
              className="fa fa-calendar-check"
              aria-hidden="true"
              style={{
                marginRight: "0.75rem",
                fontSize: "1rem",
                color: "white",
              }}
            ></i>
            참석여부 전달하기
          </Button>
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            backgroundColor: "#f6f6f6",
            position: "relative",
          }}
          ref={refEl}
        >
          <div>
            <EnglishSubTitle>LOCATION</EnglishSubTitle>
            <Title>오시는 길</Title>
          </div>
          <Description style={{ margin: "3.125rem 0 1.5rem" }}>
            <Location>서울동부지방법원</Location>
            <br />
            <LocationDetail>
              서울 송파구 법원로 101(서울 송파구 문정동 352)
            </LocationDetail>
          </Description>
          <Map />
          <MapIconsWrapper>
            <MapIconItem href="https://kko.kakao.com/JvuRBfKyOW">
              <MapIconImage src={KakaoMapIcon} width={24} height={24} />
              카카오맵
            </MapIconItem>
            <MapIconItem href="https://m.map.naver.com/search2/search.naver?query=%EC%84%9C%EC%9A%B8%EB%8F%99%EB%B6%80%EC%A7%80%EB%B0%A9%EB%B2%95%EC%9B%90&sm=hty&style=v5#/map/1/11628085">
              <MapIconImage src={NaverMapIcon} width={24} height={24} />
              네이버지도
            </MapIconItem>
          </MapIconsWrapper>
          <NaviWrapper style={{ paddingTop: "1.875rem" }}>
            <NaviTitle>자가용 & 주차 안내</NaviTitle>
            <Li
              style={{
                marginBottom: "0.25rem",
                display: "block",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ fontSize: "0.625rem" }}>𒊹</Marker>네비게이션에
              "서울동부지방법원" 검색
            </Li>
            <Li
              style={{
                marginBottom: "0.25rem",
                display: "block",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ fontSize: "0.625rem" }}>𒊹</Marker>지상주차장
              무료주차
            </Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>지하철 안내</NaviTitle>
            <Li>
              <Marker style={{ color: "hotpink", fontSize: "0.9375rem" }}>
                𒊹
              </Marker>
              8호선 문정역 3번 출구(도보 10분)
            </Li>
          </NaviWrapper>
          <NaviWrapper
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <NaviTitle>대중교통 버스 안내</NaviTitle>

            <Li
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.125rem",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
                fontWeight: "490",
              }}
            >
              서울동부지방법원 앞 건영아파트 정류장
            </Li>

            <Li
              style={{
                display: "block",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ color: "green", fontSize: "0.9375rem" }}>
                𒊹
              </Marker>
              일반버스 : 30, 31, 32, 119, 331
            </Li>

            <Li
              style={{
                display: "block",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ color: "blue", fontSize: "0.9375rem" }}>
                𒊹
              </Marker>
              간선버스 : 302, 303, 320, 333, 343, 345, 350, 360
            </Li>

            <Li
              style={{
                display: "block",
                marginBottom: "0.75rem",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ color: "green", fontSize: "0.9375rem" }}>
                𒊹
              </Marker>
              지선버스 : 3322, 3420
            </Li>

            <Li
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.125rem",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
                fontWeight: "490",
              }}
            >
              서울동부지방법원 앞 정류장
            </Li>

            <Li
              style={{
                display: "block",
                whiteSpace: "normal",
                wordBreak: "break-word",
                textIndent: "-1.4375rem",
                paddingLeft: "1.5625rem",
              }}
            >
              <Marker style={{ color: "green", fontSize: "0.9375rem" }}>
                𒊹
              </Marker>
              마을버스(녹색) : 송파02
            </Li>
          </NaviWrapper>
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            background: "linear-gradient(to bottom, #f6f6f6 0%, #f9f9f9 5%)",
          }}
        >
          <EnglishSubTitle>
            <i
              className="fa fa-heart"
              style={{ color: "#ffa2a2", fontSize: "1rem" }}
            ></i>
          </EnglishSubTitle>
          <Title>마음 전하실 곳</Title>
          <Description
            style={{
              margin: "2.25rem 0",
            }}
          >
            참석하지 못하더라도 축복해주시는
            <br />그 마음 감사히 간직하겠습니다.
          </Description>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "65%",
              margin: "0 auto",
              paddingTop: "0",
              minWidth: "fit-content",
            }}
          >
            <TabButton
              style={{
                backgroundColor: openGroomAccount ? "#efefef" : "#f8f8f8",
                color: "#000000",
                transition: "all 0.3s ease",
                border: "none",
                width: "100%",
                height: "3.125rem",
                borderRadius: "0.09rem 0.09rem 0 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: openGroomAccount
                  ? "-0.0625rem 0 0.1875rem rgba(0, 0, 0, 0.1), 0.0625rem 0 0.1875rem rgba(0, 0, 0, 0.1)"
                  : "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1)",
                margin: 0,
                padding: "0 1.25rem",
                position: "relative",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
                touchAction: "manipulation",
              }}
              onClick={() => setOpenGroomAccount(!openGroomAccount)}
            >
              <span
                style={{
                  position: "absolute",
                  left: "48%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                신랑측 계좌번호
              </span>
              <i
                className={`fa fa-chevron-${openGroomAccount ? "up" : "down"}`}
                style={{
                  fontSize: "0.875rem",
                  marginLeft: "auto",
                  pointerEvents: "none",
                }}
              />
            </TabButton>
            <AccountWrapper
              style={{
                height: openGroomAccount ? "auto" : 0,
                opacity: openGroomAccount ? 1 : 0,
                transition: "all 0.3s ease",
                overflow: "hidden",
                backgroundColor: "#f8f8f8",
                borderRadius: "0 0 1px 1px",
                padding: "0",
                border: "none",
                boxShadow: openGroomAccount
                  ? "-1px 0 3px rgba(0, 0, 0, 0.1), 1px 0 3px rgba(0, 0, 0, 0.1)"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
                margin: 0,
                width: "100%",
              }}
            >
              {INFORMATION.groom.map((info, index) => (
                <div
                  key={info.name}
                  style={{
                    backgroundColor: "white",
                    padding: "12px 8px 4px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    borderBottom:
                      index !== INFORMATION.groom.length - 1
                        ? "1px solid #e0e0e0"
                        : "none",
                  }}
                >
                  <AccountOwner
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "0",
                      margin: "0",
                      color: "#666666",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                      size="small"
                      sx={{
                        color: "#666666",
                        "&:hover": {
                          backgroundColor: "rgba(102, 102, 102, 0.08)",
                        },
                        padding: "2px",
                        marginLeft: "6px",
                        marginRight: "0",
                      }}
                    >
                      <FileCopyIcon
                        sx={{ fontSize: 14, fill: "rgb(166, 166, 166)" }}
                        color="action"
                      />
                    </IconButton>
                    {info.name}
                  </AccountOwner>
                  <AccountItem
                    style={{
                      margin: "0",
                      padding: "2px 12px",
                      fontSize: "15px",
                      userSelect: "text",
                      cursor: "text",
                      WebkitUserSelect: "text",
                      MozUserSelect: "text",
                      msUserSelect: "text",
                      whiteSpace: "normal",
                      wordBreak: "break-all",
                      color: "#666666",
                      fontWeight: "300",
                      height: "32px",
                    }}
                  >
                    {info.bank} {info.accountNumberShown}
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
            <div style={{ height: "15px" }}></div>
            <TabButton
              onClick={() => setOpenBrideAccount(!openBrideccount)}
              style={{
                backgroundColor: openBrideccount ? "#efefef" : "#f8f8f8",
                color: "#000000",
                transition: "all 0.3s ease",
                border: "none",
                width: "100%",
                height: "3.125rem",
                borderRadius: "0.09rem 0.09rem 0 0",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: "500",
                boxShadow: openBrideccount
                  ? "-0.0625rem 0 0.1875rem rgba(0, 0, 0, 0.1), 0.0625rem 0 0.1875rem rgba(0, 0, 0, 0.1)"
                  : "0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.1)",
                margin: 0,
                padding: "0 1.25rem",
                position: "relative",
                transform: "translateZ(0)",
                WebkitTransform: "translateZ(0)",
                WebkitTapHighlightColor: "transparent",
                userSelect: "none",
                touchAction: "manipulation",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: "48%",
                  transform: "translateX(-50%)",
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                신부측 계좌번호
              </span>
              <i
                className={`fa fa-chevron-${openBrideccount ? "up" : "down"}`}
                style={{
                  fontSize: "14px",
                  marginLeft: "auto",
                  pointerEvents: "none",
                }}
              />
            </TabButton>
            <AccountWrapper
              style={{
                height: openBrideccount ? "auto" : 0,
                opacity: openBrideccount ? 1 : 0,
                transition: "all 0.3s ease",
                overflow: "hidden",
                backgroundColor: "#f8f8f8",
                borderRadius: "0 0 1px 1px",
                padding: "0",
                border: "none",
                boxShadow: openBrideccount
                  ? "-1px 0 3px rgba(0, 0, 0, 0.1), 1px 0 3px rgba(0, 0, 0, 0.1)"
                  : "0 1px 3px rgba(0, 0, 0, 0.1)",
                margin: 0,
                width: "100%",
              }}
            >
              {INFORMATION.bride.map((info, index) => (
                <div
                  key={info.name}
                  style={{
                    backgroundColor: "white",
                    padding: "12px 8px 4px 8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                    borderBottom:
                      index !== INFORMATION.bride.length - 1
                        ? "1px solid #e0e0e0"
                        : "none",
                  }}
                >
                  <AccountOwner
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "0",
                      margin: "0",
                      color: "#666666",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                      size="small"
                      sx={{
                        padding: "2px",
                        marginLeft: "6px",
                        marginRight: "0",
                      }}
                    >
                      <FileCopyIcon
                        sx={{ fontSize: 14, fill: "rgb(166, 166, 166)" }}
                      />
                    </IconButton>
                    {info.name}
                  </AccountOwner>
                  <AccountItem
                    style={{
                      margin: "0",
                      padding: "2px 12px",
                      fontSize: "15px",
                      userSelect: "text",
                      cursor: "text",
                      WebkitUserSelect: "text",
                      MozUserSelect: "text",
                      msUserSelect: "text",
                      whiteSpace: "normal",
                      wordBreak: "break-all",
                      color: "#666666",
                      fontWeight: "300",
                      height: "32px",
                    }}
                  >
                    {info.bank} {info.accountNumberShown}
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
          </div>
        </DescriptionWrapper>
        <LastImgWrapper>
          <ThankYouText>
            저희의 새로운 시작을 축하해주시는
            <br />
            모든 분들께 감사드립니다.
          </ThankYouText>
          <Dimmed></Dimmed>
        </LastImgWrapper>
      </ContentWrapper>

      {isVisible && (
        <BottomBar
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0px",
          }}
        >
          <button
            style={{
              width: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "4px",
              fontSize: "15px",
              height: "18px",
            }}
            onClick={() =>
              setComponent(<AttendModal setComponent={setComponent} />)
            }
          >
            <i className="fa fa-calendar-check" aria-hidden="true"></i>
            참석여부 전달하기
          </button>
          <button
            style={{
              width: "40%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              gap: "4px",
              fontSize: "15px",
              height: "18px",
            }}
            onClick={onClickLink}
          >
            <i className="fa fa-link" aria-hidden="true"></i>
            링크 복사
          </button>
        </BottomBar>
      )}
      <Dialog
        open={copyPopupOpen}
        onClose={handleClosePopup}
        PaperProps={{
          style: {
            borderRadius: "12px",
            padding: "16px",
            minWidth: "280px",
          },
        }}
      >
        <DialogContent
          style={{ textAlign: "center", padding: "16px 0 24px 0" }}
        >
          <Typography style={{ fontSize: "16px", color: "#666666" }}>
            {copiedText === "청첩장 링크"
              ? "링크가 복사되었습니다."
              : "복사가 완료되었습니다."}
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", padding: "0 0 6px 0" }}
        >
          <MuiButton
            onClick={handleClosePopup}
            style={{
              backgroundColor: "#e0e0e0",
              color: "#333333",
              padding: "4px 16px",
              borderRadius: "6px",
              textTransform: "none",
              fontSize: "14px",
              height: "32px",
            }}
          >
            확인
          </MuiButton>
        </DialogActions>
      </Dialog>
    </Wrappper>
  );
}

export default Main;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 3.5rem;
  width: 100%;
  background-color: #f2f2f2;
  border-top: 0.0625rem solid #eaeaea;
  display: flex;
  z-index: 400;

  & > button {
    color: #444444;
    font-family: Pretendard;
    white-space: nowrap;
    font-size: 1rem;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 0.4375rem;
      font-size: 0.9375rem;
    }
  }

  & > button > i {
    margin-right: 0.5rem;
    font-size: 0.9375rem;
    color: #444444;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 0.4375rem;
      font-size: 0.875rem;
    }
  }
`;

const Dimmed = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0.29) 50%,
    // rgba(0, 0, 0, 0.32) 60%,
    rgba(0, 0, 0, 0.74) 80%,
    rgba(0, 0, 0, 0.78) 100%
  );
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LastImgWrapper = styled.div`
  width: 100%;
  max-width: 37.5rem;
  height: calc(min(100vw, 37.5rem) * 0.6667);
  position: relative;
  background-image: url(${image45});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  color: white;
  font-size: 1.125rem;
  line-height: 1.8;
  padding: 0 1.25rem;
  box-sizing: border-box;
  margin: 0 auto;
  margin-bottom: 3.4375rem;
  overflow: hidden;
`;

const InterviewWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 4%;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 2.25rem 0;
`;

const InterviewImageWrapper = styled.div`
  position: relative;
  width: min(calc((100vw - 4.25rem) / 2), 15rem);
  height: min(calc((100vw - 4.25rem) / 2), 15rem);
  margin: 0;
`;

const InterviewImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 0.9375rem;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: opacity 2s ease-in-out;
  opacity: 0;
  z-index: 0;

  &:hover {
    transform: none;
  }
`;

const TitleImageTitle = styled.div`
  font-family: MaruBuriBold;
  color: #ffffff;
  font-size: min(16vw, 5.3125rem);
  position: absolute;
  z-index: 5;
  top: 2.1875rem;
  font-style: italic;
  line-height: 0.8;
  text-align: center;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  letter-spacing: 0.0625rem;
  text-shadow: 0.125rem 0.125rem 0.1875rem rgba(0, 0, 0, 0.2);
`;

const Wrappper = styled.div`
  background-color: #f2eeee;
  width: 100vw;
  position: relative;
  padding-bottom: 0;
`;

const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 37.5rem;
  line-height: 1.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.75rem 1.25rem;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 445px) {
    padding: 3.625rem 1.125rem;
  }

  @media only screen and (max-width: 360px) {
    padding: 3.4375rem 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.15625rem;
  line-height: 2.375rem;
  text-align: center;
  font-weight: bold;
  position: relative;
  white-space: nowrap;
  font-weight: 200;
  color: #4e4e4e;

  @media only screen and (max-width: 445px) {
    font-size: 1.0625rem;
    line-height: 2.25rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1rem;
    line-height: 2.125rem;
  }

  @media only screen and (max-width: 340px) {
    font-size: 0.9375rem;
    line-height: 2rem;
  }
`;

const Flower = styled.div`
  width: 2.125rem;
  height: 2.125rem;
  background-size: contain;
  margin: 0 0.75rem;

  @media only screen and (max-width: 400px) {
    width: 2.0625rem;
    height: 2.0625rem;
  }

  @media only screen and (max-width: 360px) {
    width: 2rem;
    height: 2rem;
  }
`;

const TopName = styled(Description)`
  font-size: 1.5625rem;
  margin-bottom: 2rem;
  color: #141414;
  letter-spacing: 0.03125rem;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 445px) {
    font-size: 1.40625rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1.375rem;
  }

  @media only screen and (max-width: 340px) {
    font-size: 1.34375rem;
  }
`;

const TitleDescription = styled(Description)`
  line-height: 2.0625rem;
  font-size: 1.4375rem;
  color: #3a3a3a;
  font-family: "GowunBatang-Regular", serif;

  @media only screen and (max-width: 445px) {
    font-size: 1.0625rem;
    line-height: 2.03125rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1.03125rem;
    line-height: 2rem;
  }

  @media only screen and (max-width: 340px) {
    font-size: 1.0125rem;
    line-height: 1.95rem;
  }
`;

const Title = styled.p`
  font-family: MaruBuriBold;
  font-size: 1.46875rem;
  font-weight: 500;
  color: #4d4d4d;
  margin-bottom: 0.625rem;
  line-height: 1.8;
  text-align: center;

  @media only screen and (max-width: 445px) {
    font-size: 1.4375rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1.375rem;
  }
`;

const EnglishSubTitle = styled.p`
  font-family: MaruburiLight;
  font-size: 0.8125rem;
  color: #b2b2b2;
  letter-spacing: 0.1875rem;
  text-align: center;
  padding-bottom: 0.75rem;

  @media only screen and (max-width: 445px) {
    font-size: 0.78125rem;
    padding-bottom: 0.71875rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 0.76875rem;
    padding-bottom: 0.6875rem;
  }
`;

const HR = styled.hr`
  width: min(16.875rem, 70%);
  border: 0;
  height: 0.0625rem;
  border-width: 0.0625rem 0 0 0;
  border-style: solid;
  border-color: #d6d6d6;
`;

const Button = styled.button`
  font-family: "Pretendard";
  background-color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.03125rem;
  width: min(18.75rem, 85%);
  height: 3.75rem;
  border: 0.0625rem solid #afafaf;
  font-size: 1.09375rem;
  border-radius: 0.625rem;
  cursor: pointer;
  margin: 0.625rem 0;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 360px) {
    font-size: 1rem;
  }
`;

const TabButton = styled.div`
  border: 0.0625rem solid gray;
  width: 100%;
  height: 2.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  color: white;
  border-radius: 0.375rem;
  box-shadow: 0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.2);
  position: relative;
`;

const NaviWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 0.0625rem solid lightgray;
  padding: 2.1875rem 0;
  overflow: visible;

  @media only screen and (max-width: 400px) {
    padding: 2.0625rem 0;
  }
`;

const NaviTitle = styled.div`
  font-size: 1.3125rem;
  font-weight: 600;
  margin-bottom: 1.125rem;
  font-family: "GowunBatang-Regular", serif;

  @media only screen and (max-width: 445px) {
    font-size: 1.25rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1.1875rem;
  }
`;

const Li = styled.li`
  list-style: none;
  font-family: Pretendard;
  font-size: 1.09375rem;
  line-height: 1.8;
  white-space: nowrap;

  @media only screen and (max-width: 445px) {
    font-size: 1.0625rem;
  }

  @media only screen and (max-width: 360px) {
    font-size: 1.0125rem;
  }

  @media only screen and (max-width: 340px) {
    font-size: 0.95rem;
  }
`;

const Marker = styled.span`
  font-size: 0.5rem;
  color: #555555;
  margin-right: 0.375rem;
  font-family: Pretendard;
  position: relative;
  bottom: 0.1875rem;
`;

const AccountWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  minwidth: "fit-content";
  transition: height 0.6s;
  transition-timing-function: cubic-bezier(0.15, 0.82, 0.165, 1);
  overflow: hidden;
`;

const AccountOwner = styled.div`
  font-family: Pretendard;
  width: 100%;
  padding-top: 20px;
`;

const AccountItem = styled.div`
  font-family: Pretendard;
  margin-top: 8px;
  height: 40px;
  width: 100%;
  background-color: white;
  display: flex;
  padding: 12px;
  align-items: center;
  position: relative;

  & > button {
    position: absolute;
    top: 1px;
    right: 2px;
    font-family: Pretendard;
    background-color: white;
    border: 1px solid #c6c6c6;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    padding: 6px 8px;
    font-size: 15px;
    color: #555555;
    cursor: pointer;
  }
`;

const Parent = styled.span`
  font-family: Pretendard;
  font-weight: 400;
  font-size: 19px;
  color: #555555;

  @media only screen and (max-width: 445px) {
    font-size: 18px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.5px;
  }
`;

const Location = styled.span`
  font-family: Pretendard;
  font-weight: 600;
  font-size: 21px;
  color: #314a35;

  @media only screen and (max-width: 360px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 19px;
  }
`;

const LocationDetail = styled.span`
  font-family: Pretendard;
  font-weight: 300;
  font-size: 17.5px;
  color: #555555;
  line-height: 1.8;

  @media only screen and (max-width: 360px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.5px;
  }
`;

const MapIconsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 330px;
  margin: 20px 0;
  gap: 50px;

  @media only screen and (max-width: 400px) {
    width: 320px;
    gap: 45px;
  }

  @media only screen and (max-width: 360px) {
    width: 310px;
    gap: 43px;
  }

  @media only screen and (max-width: 340px) {
    width: 290px;
    gap: 42px;
  }
`;

const MapIconItem = styled.a`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: Pretendard;
  font-size: 1rem;
  text-decoration: none;

  @media only screen and (max-width: 380px) {
    font-size: 0.96875rem;
  }

  @media only screen and (max-width: 340px) {
    font-size: 0.9375rem;
  }
`;

const MapIconImage = styled.img`
  border-radius: 0.25rem;
`;

const SpeakerButton = styled.button`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 0;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    font-size: 1.5rem;
    color: white !important;
    filter: drop-shadow(0.125rem 0.125rem 0.25rem rgba(0, 0, 0, 0.3));
    fill: white !important;
  }
`;

const ThankYouText = styled.span`
  position: absolute;
  bottom: 10%;
  left: 0;
  right: 0;
  display: block;
  text-align: center;
  width: 100%;
  font-size: clamp(1.5rem, 8vw, 3rem); /* Increased font size with clamp */
  line-height: 1.3em;
  font-family: "Nanum-Letter", serif;
  color: rgba(216, 216, 216, 0.74);
  z-index: 200;
  padding: 0 1rem;
  box-sizing: border-box;
`;
