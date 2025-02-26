import styled from "styled-components";
import CalendarPic from "/images/calendar3.png";
import CalendarBackground from "/images/calendarBackground.jpg";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

// import FloatingBar from './../components/FloatingBar';
import { useEffect, useRef, useState, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import Snowfall from "react-snowfall";
import ManPic from "/images/man.jpg";
import WomanPic from "/images/woman.jpg";
import BoyPic from "/images/boy.jpeg";
import GirlPic from "/images/girl.jpeg";
import MainPic from "/images/main7.jpg";
import ProgressiveImg from "./ProgressiveImg";
import High from "/images/high.jpg";
import TossIcon from "/images/toss.jpg";
import KakaoMapIcon from "/images/kakaoMap.png";
import NaverMapIcon from "/images/naverMap.png";
import TMavIcon from "/images/tmap.png";
import KakayPayIcon from "/images/kakaopay.png";
import SunFlower from "/images/sunflower1.png";
import SunFlower2 from "/images/sunflower2.png";
import SunFlower3 from "/images/sunflower3.png";
import image45 from "/images/image45.jpg";
import Hall from "/images/food2.jpg";
import Hall2 from "/images/hall2.jpg";
import Cursor from "/images/cursor.png";
import PhoneModal from "./PhoneModal";
import Map from "../Map";
import LikeButton from "./LikeButton";
import AttendModal from "./AttendModal";
import { INFORMATION } from "../value";
import BusMap from "/images/busMap.png";

interface Props {
  setComponent: React.Dispatch<React.SetStateAction<React.ReactNode>>;
}

const BUS_MAP_URL =
  "https://map.naver.com/p/directions/14119087.345187,4396486.7244838,%EC%B6%A9%EB%82%A8%20%EC%98%88%EC%82%B0%EA%B5%B0%20%EC%98%88%EC%82%B0%EC%9D%8D%20%EC%82%B0%EC%84%B1%EB%A6%AC%20678,,SIMPLE_POI/-/-/transit?c=18.57,0,0,0,dh";

const PhotoGallery = lazy(() => import("./Gallery/PhotoGallery"));

function Main({ setComponent }: Props) {
  const [isboy, setIsBoy] = useState(true);
  const [isGirl, setIsGirl] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const refEl = useRef(null);

  const childRef = useRef<{ triggerChildEvent: () => void }>(null);

  const triggerChildEventFromParent = () => {
    // 부모가 자식의 메서드를 호출
    if (childRef.current) {
      childRef.current.triggerChildEvent();
    }
  };

  const [searchParams] = useSearchParams();
  const dear = searchParams.get("dear"); // 받는사람 성명

  const [openGroomAccount, setOpenGroomAccount] = useState<boolean>(false);
  const [openBrideccount, setOpenBrideAccount] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition);

    const intervalId = setInterval(() => {
      setIsBoy((prev) => !prev);
      setIsGirl((prev) => !prev);
    }, 4000);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("scroll", checkScrollPosition);
    };
  }, []);

  // 카카오 SDK 로드
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.integrity =
      "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
    script.crossOrigin = "anonymous";
    script.onload = () => {
      // 카카오 SDK 초기화
      window.Kakao.init(import.meta.env.VITE_APP_KAKAO_APP_KEY); // 카카오 앱의 JavaScript 키 입력
    };
    document.body.appendChild(script);

    // Cleanup (스크립트 제거)
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const checkScrollPosition = () => {
    if (refEl.current) {
      const { offsetTop } = refEl.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const onClickCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${text}\n계좌번호가 복사되었습니다.`);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickLink = async () => {
    try {
      await navigator.clipboard.writeText("https://always-summer.vercel.app");
      alert(`청첩장 링크가 복사되었습니다.`);
    } catch (err) {
      console.error(err);
    }
  };

  const onClickMapIcon = (platform: "NAVER" | "KAKAO" | "TMAP") => {
    if (platform === "NAVER") {
      window.location.href =
        "https://m.map.naver.com/search2/search.naver?query=%EB%B3%B4%ED%85%8C%EA%B0%80%EB%A7%88%EC%A7%80%EC%98%A4#/map/1/31494641";
    }
  };

  // 내비게이션 시작 함수
  const startNavigation = () => {
    window.Kakao.Navi.start({
      name: "보테가마지오",
      x: 37.5456811,
      y: 127.042481,
      coordType: "wgs84",
    });
  };

  return (
    <Wrappper>
      <ContentWrapper>
        <ProgressiveImg placeholderSrc={MainPic} src={High} />
        <TitleImageTitle>
          We're Getting
          <br />
          Married!
        </TitleImageTitle>
        <DescriptionWrapper style={{ padding: "32px 20px" }}>
          <TopName>
            정상진
            <Flower
              style={{
                backgroundImage: `url(${SunFlower2})`,
              }}
            />
            강다은
          </TopName>
          <TitleDescription>
            2025. 04. 27. 일요일 AM 11:30
            <br /> 서울동부지방법원 동백홀
          </TitleDescription>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: "#f6f6f6",
            gap: "32px",
            position: "relative",
            paddingTop: "65px",
          }}
        >
          <Snowfall
            color="gold"
            snowflakeCount={30}
            radius={[1, 5]}
            // images={['🌻']}
            speed={[0.2, 1]}
            style={{ opacity: 0.35 }}
          />
          {/* <div
            style={{
              backgroundImage: `url(${SunFlower3})`,
              width: '50px',
              height: '50px',
              backgroundSize: 'contain',
            }}
          /> */}
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
            같은 계절이 6번 돌아오는 동안
            <br />
            함께 행복했던 기억이 차곡차곡 쌓였습니다. <br />
            부부로서 하나의 길을 걷게 될
            <br /> 힘찬 첫걸음을 내딛는 날, 함께해 주세요. <br />
            귀한 걸음 하시어 따스하게 격려해 주신다면 <br /> 평생의 응원으로
            여기며 살아가겠습니다.
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
                fontSize: "19px",
                marginLeft: "10px",
                color: "#3b3b3b",
                position: "relative",
                bottom: "1px",
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
                fontSize: "19px",
                marginLeft: "10px",
                color: "#3b3b3b",
                position: "relative",
                bottom: "1px",
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
                marginRight: "12px",
                fontSize: "16px",
              }}
            ></i>
            전화로 축하 인사하기
          </Button>
        </DescriptionWrapper>
        <DescriptionWrapper
          style={{
            backgroundColor: "#efefef",
            gap: "36px",
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
                marginRight: "12px",
                fontSize: "16px",
                color: "white",
              }}
            ></i>
            참석여부 전달하기
          </Button>
        </DescriptionWrapper>
        <DescriptionWrapper style={{ padding: "60px 22px" }}>
          <EnglishSubTitle>GROOM & BRIDE</EnglishSubTitle>
          <Title>신랑 신부는요,</Title>

          <InterviewWrapper>
            <div>
              <InterviewImageWrapper>
                <InterviewImage
                  style={{
                    opacity: isboy ? 0 : 1,
                    backgroundImage: `url(${BoyPic})`,
                  }}
                />
                <InterviewImage
                  style={{
                    opacity: isboy ? 1 : 0,
                    backgroundImage: `url(${ManPic})`,
                  }}
                />
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: "center",
                  margin: "24px 0 20px",
                  fontSize: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "14.5px",
                    marginRight: "8px",
                    color: "#136198",
                  }}
                >
                  신랑
                </span>{" "}
                정상진
              </p>
              <Interview>
                교내 영어회화 스터디에서 고양이 같은 여성분을 만났습니다.
                처음에는 말수가 적고 철벽을 치는 고양이 같았지만, 막상 같이
                공부하면서 여행, 게임 이야기를 할 때면 귀여운 말티즈가 되어
                재잘재잘 말하는 것을 보니 개냥이였던 것이 틀림없습니다. 제가
                힘들어할 때면 쪼르르 옆에 와서 격려해주고, 어느 날은 짜잔하면서
                콘서트나 비행기 티켓을 준비해서 저를 놀래켜주기도 했습니다.{" "}
                <div style={{ height: "18.5px" }}></div>
                이렇게 이쁘고 귀여운 여자친구를 데리고 이제는 같은 진로를 통해
                같은 미래를 바라보며 살아보고자 합니다. 여태껏 서로 달랐던
                부분들을 잘 맞춰왔듯이, 앞으로도 많은 대화를 통해 서로
                배려하면서 예쁘게 잘 살아가겠습니다.
              </Interview>
            </div>
            <div>
              <InterviewImageWrapper>
                <InterviewImage
                  style={{
                    opacity: isGirl ? 0 : 1,
                    backgroundImage: `url(${GirlPic})`,
                  }}
                />
                <InterviewImage
                  style={{
                    opacity: isGirl ? 1 : 0,
                    backgroundImage: `url(${WomanPic})`,
                  }}
                />
              </InterviewImageWrapper>
              <p
                style={{
                  textAlign: "center",
                  margin: "24px 0 20px",
                  fontSize: "20px",
                }}
              >
                <span
                  style={{
                    fontSize: "14.5px",
                    marginRight: "8px",
                    color: "#e05068",
                  }}
                >
                  신부
                </span>{" "}
                강다은
              </p>
              <Interview>
                교내 영어회화 스터디에서 다부지고 귀여운 남자를 만났습니다.
                무뚝뚝해보이던 첫인상과는 달리, 스터디 초반부터 초콜릿과 쿠키를
                챙겨주고, 시험 끝나면 맛있는걸 먹으러 가자는 모습이 귀여웠던
                기억이 납니다. 스터디가 끝난 이후로도 다정하고 우직한 그의
                모습에 마음을 열고 사귀게 되었습니다.
                <div style={{ height: "18.5px" }}></div>
                "보고 싶다"는 한마디에 왕복 4시간의 거리를 마다하지 않고
                달려오고, 잊을만 하면 꽃다발을 사서 안겨주는 그의 변치않는
                사랑과 배려에 점점 더 확신이 생겼습니다. 취업과 퇴사, 그리고
                대학 재입학까지, 삶의 굴곡을 함께하며 쌓아온 신뢰와 사랑을
                바탕으로 서로 아끼며 행복하게 살아가겠습니다.
              </Interview>
            </div>
          </InterviewWrapper>
          <LikeButton ref={childRef} />
        </DescriptionWrapper>

        <DescriptionWrapper
          style={{
            backgroundImage: `url(${CalendarBackground})`,
          }}
        >
          <EnglishSubTitle style={{ color: "#777777" }}>
            WEDDING DAY
          </EnglishSubTitle>
          <Title>날짜 </Title>
          <img
            src={CalendarPic}
            alt="캘린더"
            style={{ width: "91%", maxWidth: "385px", marginTop: "35px" }}
          />
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>GALLERY</EnglishSubTitle>
          <Title style={{ marginBottom: "40px" }}>우리의 소중한 순간</Title>

          <PhotoGallery />
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
          <Description style={{ margin: "50px 0 24px" }}>
            <Location>보테가마지오</Location>
            <br />
            <LocationDetail>
              서울 성동구 서울숲2길 32-14 갤러리아포레 G층
            </LocationDetail>
          </Description>
          <Map />
          <MapIconsWrapper>
            {/* <MapIconItem target="_blank" onClick={() => onClickMapIcon('TMAP')}>
              <MapIconImage src={TMavIcon} width={24} height={24} />
              티맵
            </MapIconItem> */}
            <MapIconItem href="https://kko.kakao.com/q2SI2nKc7p">
              <MapIconImage src={KakaoMapIcon} width={24} height={24} />
              카카오맵
            </MapIconItem>
            <MapIconItem href="https://m.map.naver.com/search2/search.naver?query=%EB%B3%B4%ED%85%8C%EA%B0%80%EB%A7%88%EC%A7%80%EC%98%A4#/map/1/31494641">
              <MapIconImage src={NaverMapIcon} width={24} height={24} />
              네이버지도
            </MapIconItem>
          </MapIconsWrapper>
          <NaviWrapper style={{ paddingTop: "30px" }}>
            <NaviTitle>자가용 & 주차 안내</NaviTitle>
            <Li style={{ marginBottom: "4px" }}>
              <Marker>𒊹</Marker>내비게이션으로 "보테가마지오" 검색해주세요.
            </Li>
            <Li>
              <Marker>𒊹</Marker>무료 주차는 2시간 가능합니다.
            </Li>
            <Li> - &nbsp;건물 내 B3-B7층, 무료주차 2시간 가능</Li>
            <Li> - &nbsp;안내데스크에서 주차 등록 必</Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>지하철 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker>수인분당선 서울숲역 5번 출구
            </Li>
            <Li style={{ marginBottom: "12px" }}>- &nbsp;도보 2분 거리</Li>
            <Li>
              <Marker>𒊹</Marker>2호선 뚝섬역 8번 출구
            </Li>
            <Li>- &nbsp;도보 5분 거리</Li>
          </NaviWrapper>
          <NaviWrapper>
            <NaviTitle>대중교통 버스 안내</NaviTitle>
            <Li>
              <Marker>𒊹</Marker> 뚝섬 서울숲 정류장
            </Li>
            <Li style={{ marginBottom: "12px" }}>
              - &nbsp;간선(파랑색) : 121, 141, 145, 148, 463
            </Li>
            <Li>
              <Marker>𒊹</Marker> 성동구민 종합 체육센터 정류장
            </Li>
            <Li style={{ marginBottom: "12px" }}>
              - &nbsp;지선(녹색) : 2014, 2224, 2413
            </Li>
            <Li>
              <Marker>𒊹</Marker> 뚝섬역 8번 출구 정류장
            </Li>
            <Li>- &nbsp;지선(녹색) : 2016, 2224, 2413</Li>
          </NaviWrapper>
          <NaviWrapper
            style={{
              margin: "40px 0 0 0",
              border: "4px double lightgray",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0)",
              padding: "30px 0 56px",
            }}
          >
            <Flower
              style={{
                backgroundImage: `url(${SunFlower2})`,
                marginBottom: "18px",
              }}
            />
            <NaviTitle>전세버스 안내</NaviTitle>
            <Li
              style={{
                textAlign: "center",
                marginTop: "12px",
              }}
            >
              귀한 발걸음을 해주시는 <br />
              지방 하객분들의 편의를 위해 <br />
              예산↔서울 간 전세버스를 준비하였습니다.
            </Li>
            <Li
              style={{
                textAlign: "left",
                lineHeight: 1.7,
              }}
            >
              <i
                className="fa fa-clock"
                aria-hidden="true"
                style={{
                  marginTop: "38px",
                  marginRight: "8px",
                  fontSize: "15.5px",
                  color: "#444444",
                }}
              ></i>
              출발 시간 : 2025. 04. 27. (일) 오전 10시
              <br />
              <i
                className="fa fa-map-marker-alt"
                aria-hidden="true"
                style={{
                  marginTop: "16px",
                  marginRight: "8px",
                  fontSize: "15.5px",
                  color: "#444444",
                }}
              ></i>
              탑승 장소 : 충남 예산군 예산읍 산성리 653
              <br />
              하나로마트 예산농협 본점, 대로 앞 <br />
              <i
                className="fa fa-phone"
                aria-hidden="true"
                style={{
                  marginTop: "16px",
                  marginRight: "8px",
                  fontSize: "15.5px",
                  color: "#444444",
                  transform: "rotate(98deg)",
                }}
              ></i>
              관련 문의 : 신부측 연락처로 부탁드립니다.
            </Li>

            {/* <img
              src={BusMap}
              style={{
                width: '80%',
                marginTop: '36px',
                border: '1px solid lightgray',
              }}
            /> */}
            {/* <AButton
              target="_blank"
              href={BUS_MAP_URL}
              style={{ position: 'relative', top: '30px' }}
            >
              탑승 위치 보기
            </AButton> */}
          </NaviWrapper>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <EnglishSubTitle>WEDDING DINING INFO</EnglishSubTitle>
          <Title style={{ margin: "0 0 24px" }}>예식 · 식사 안내</Title>

          {/* <Slider /> */}
          <DescriptionItem>
            <HR style={{ width: "100%", marginBottom: "6px" }} />
            <img
              src={Hall}
              loading="lazy"
              style={{ marginBottom: "18px", width: "100%" }}
            />
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>예식장 내부에 ATM기가
              없으니 참고 부탁드립니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>식사 장소는 예식홀과
              동일한 층에 마련되어 있습니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>예식 시작 30분 전부터
              식사가 가능합니다.
            </DescriptionLi>

            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              전체메뉴의 80% 이상이 즉석 메뉴로 구성된 뷔페로, 생맥주, 와인 등
              주류도 무제한이니 편하게 즐겨주시면 감사하겠습니다.
            </DescriptionLi>
          </DescriptionItem>

          <EnglishSubTitle style={{ marginTop: "68px" }}>
            RECEPTION INFO
          </EnglishSubTitle>
          <Title style={{ margin: "0 0 24px" }}>
            지방 피로연 (앞잔치) 안내
          </Title>
          <DescriptionItem>
            <HR style={{ width: "100%", marginBottom: "6px" }} />
            <img
              src={Hall2}
              loading="lazy"
              style={{ marginBottom: "18px", width: "100%" }}
            />
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>거리가 멀어 본식에
              참석하지 못하시는 분들을 위해, 예식 4일전 작은 피로연 자리를
              마련하였습니다.
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              일시 : 25.02.05. 수요일 오후 5시
            </DescriptionLi>
            <DescriptionLi>
              <DescriptionMarker>𒊹</DescriptionMarker>
              장소 : 충청남도 예산군 더스타웨딩홀 피로연장
            </DescriptionLi>
          </DescriptionItem>
        </DescriptionWrapper>

        <DescriptionWrapper style={{ backgroundColor: "#f6f6f6" }}>
          <EnglishSubTitle>
            <i
              className="fa fa-heart"
              style={{ color: "#ffa2a2", fontSize: "16px" }}
            ></i>
          </EnglishSubTitle>
          <Title>마음 전하실 곳</Title>
          <Description
            style={{
              margin: "36px 0",
            }}
          >
            필요하신 분들을 위해
            <br />
            안내드리니 양해 부탁드립니다.
            <br />
            참석하지 못하더라도 축복해주시는
            <br />그 마음 감사히 간직하겠습니다.
          </Description>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              width: "98%",
            }}
          >
            <TabButton
              style={{ backgroundColor: "#355568" }}
              onClick={() => setOpenGroomAccount(!openGroomAccount)}
            >
              신랑측 계좌번호 보기
            </TabButton>
            <AccountWrapper style={{ height: openGroomAccount ? "310px" : 0 }}>
              {INFORMATION.groom.map((info) => (
                <div key={info.name}>
                  <AccountOwner>
                    {info.bank} (예금주 : {info.name})
                  </AccountOwner>
                  <AccountItem>
                    {info.accountNumber}
                    <button
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                    >
                      복사하기
                    </button>
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
            <TabButton
              onClick={() => setOpenBrideAccount(!openBrideccount)}
              style={{ backgroundColor: "#714048" }}
            >
              신부측 계좌번호 보기
            </TabButton>
            <AccountWrapper style={{ height: openBrideccount ? "310px" : 0 }}>
              {INFORMATION.bride.map((info) => (
                <div key={info.name}>
                  <AccountOwner>
                    {info.bank} (예금주 : {info.name})
                  </AccountOwner>
                  <AccountItem>
                    {info.accountNumber}
                    <button
                      onClick={() => {
                        onClickCopy(info.accountNumber);
                      }}
                    >
                      복사하기
                    </button>
                  </AccountItem>
                </div>
              ))}
            </AccountWrapper>
          </div>
        </DescriptionWrapper>
        <LastImgWrapper style={{ backgroundImage: `url(${image45})` }}>
          <span style={{ color: "white", zIndex: 200 }}>
            저희의 새로운 시작을 축하해주시는
            <br />
            모든 분들께 감사드립니다.
          </span>
          <Dimmed></Dimmed>
        </LastImgWrapper>
      </ContentWrapper>

      {isVisible && (
        <BottomBar>
          <button
            style={{ width: "50%" }}
            onClick={() =>
              setComponent(<AttendModal setComponent={setComponent} />)
            }
          >
            <i className="fa fa-calendar-check" aria-hidden="true"></i>
            참석여부 전달하기
          </button>
          <button
            style={{ width: "25%", content: "23423" }}
            onClick={onClickLink}
          >
            {" "}
            <i className="fa fa-link" aria-hidden="true"></i>
            링크 복사
          </button>
          {/* <button style={{ width: '25%' }}>
            {' '}
            <i className="fa fa-comment" aria-hidden="true"></i>
            카톡 공유
          </button> */}
          <button
            style={{ width: "25%" }}
            onClick={triggerChildEventFromParent}
          >
            {" "}
            <i className="fa fa-heart" aria-hidden="true"></i>
            좋아요
          </button>
        </BottomBar>
      )}
    </Wrappper>
  );
}

export default Main;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: #f2f2f2;
  border-top: 1px solid #eaeaea;
  display: flex;
  z-index: 400;

  & > button {
    color: #444444;
    font-family: Pretendard;
    white-space: nowrap;
    font-size: 16px;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 7px;
      font-size: 15px;
    }
  }

  & > button > i {
    margin-right: 8px;
    font-size: 15px;
    color: #444444;
    z-index: 450;

    @media only screen and (max-width: 380px) {
      margin-right: 7px;
      font-size: 14px;
    }
  }
`;

const Dimmed = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  position: absolute;
`;

const LastImgWrapper = styled.div`
  width: 100vw;
  max-width: 600px;
  height: calc(min(100vw, 600px) * 0.6667);
  position: relative;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 18px;
  text-align: center;
  line-height: 1.8;

  @media only screen and (max-width: 380px) {
    font-size: 17px;
    line-height: 1.7;
  }
`;

const InterviewWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 36px;
  flex-direction: column;
  margin: 36px 0;
`;

const Interview = styled.div`
  width: 100%;
  font-size: 15.4px;
  color: #555555;
  line-height: 1.8;

  word-break: break-all;

  @media only screen and (max-width: 390px) {
    font-size: 15px;
  }
`;

const InterviewImageWrapper = styled.div`
  position: relative;
  width: min(calc(100vw - 44px), 510px);
  height: min(calc(100vw - 44px), 510px);
  margin: 0 auto;
`;

const InterviewImage = styled.div`
  position: absolute;
  top: 0;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  transition: opacity 2s;
`;

const TitleImageTitle = styled.div`
  font-family: Cafe24Behappy, MaruBuriBold;
  color: #ffffff;
  font-size: min(16vw, 85px);
  position: absolute;
  z-index: 5;
  top: 35px;
  font-style: italic;
  line-height: 0.8;
  text-align: center;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  letter-spacing: 1px;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`;

const Wrappper = styled.div`
  background-color: #e4e4e4;
  width: 100vw;
  position: relative;
  padding-bottom: 55px;
`;

const ContentWrapper = styled.div`
  background-color: white;
  width: 100%;
  max-width: 600px;
  line-height: 1.4rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const MainImage = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 450px;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (max-width: 445px) {
    padding: 58px 18px;
  }

  @media only screen and (max-width: 360px) {
    padding: 55px 16px;
  }
`;

const Description = styled.p`
  font-size: 18.5px;
  line-height: 38px;
  text-align: center;
  font-weight: bold;
  position: relative;
  /* animation: fade_up 0.8s; */
  white-space: nowrap;
  font-weight: 200;
  color: #4e4e4e;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
    line-height: 36px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16px;
    line-height: 34px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
    line-height: 32px;
  }
`;

const Flower = styled.div`
  width: 34px;
  height: 34px;
  background-size: contain;
  margin: 0 12px;

  @media only screen and (max-width: 400px) {
    width: 33px;
    height: 33px;
  }

  @media only screen and (max-width: 360px) {
    width: 32px;
    height: 32px;
  }
`;

const TopName = styled(Description)`
  font-size: 23px;
  margin-bottom: 32px;
  color: #141414;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 445px) {
    font-size: 22.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 22px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 21.5px;
  }
`;

const TitleDescription = styled(Description)`
  line-height: 33px;
  font-size: 17.2px;
  color: #3a3a3a;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
    line-height: 32.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.5px;
    line-height: 32px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 16.2px;
    line-height: 31.2px;
  }
`;

const Title = styled.p`
  font-family: MaruBuriBold;
  font-size: 23.5px;
  font-weight: 500;
  color: #4d4d4d;
  margin-bottom: 10px;

  @media only screen and (max-width: 445px) {
    font-size: 23px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 22px;
  }
`;

const EnglishSubTitle = styled.p`
  font-family: MaruburiLight;
  font-size: 13px;
  color: #b2b2b2;
  letter-spacing: 3px;
  text-align: center;
  padding-bottom: 12px;

  @media only screen and (max-width: 445px) {
    font-size: 12.5px;
    padding-bottom: 11.5px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 12.3px;
    padding-bottom: 11px;
  }
`;

const HR = styled.hr`
  width: min(270px, 70%);
  border: 0;
  height: 1px;
  border-width: 1px 0 0 0;
  border-style: solid;
  border-color: #d6d6d6;
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3개의 열 */
  grid-template-rows: repeat(8, 1fr); /* 8개의 행 */
  gap: 10px; /* 이미지 사이 간격 */
  max-width: 100%; /* 가로 크기 제한 */
  margin: 0 auto; /* 가운데 정렬 */
`;

const GalleryItem = styled.div`
  border: 2px solid #ddd; /* 이미지를 감싸는 테두리 */
  border-radius: 8px; /* 테두리 둥글게 처리 */
  overflow: hidden;
`;

const GalleryItemImg = styled.img`
  width: 100%; /* 이미지가 갤러리 아이템에 꽉 차도록 설정 */
  height: 100%; /* 이미지 높이도 꽉 차도록 설정 */
  object-fit: cover; /* 이미지 크기 맞추기 */
  display: block; /* 이미지 아래 공백 제거 */
`;

const Button = styled.button`
  font-family: "Pretendard";
  background-color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5px;
  width: min(300px, 85%);
  height: 60px;
  border: 1px solid #afafaf;
  font-size: 17.5px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 360px) {
    font-size: 16px;
  }
`;

const AButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Pretendard";
  background-color: rgba(255, 255, 255, 0.1);
  letter-spacing: 0.5px;
  width: min(300px, 85%);
  height: 60px;
  border: 1px solid #afafaf;
  font-size: 17.5px;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px 0px;
  text-decoration: none;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 360px) {
    font-size: 16px;
  }
`;

const TabButton = styled.div`
  border: 1px solid gray;
  width: 230px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  color: white;
  border-radius: 6px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const NaviWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid lightgray;
  padding: 35px 0;
  overflow: visible;

  @media only screen and (max-width: 400px) {
    padding: 33px 0;
  }
`;

const NaviTitle = styled.div`
  font-size: 21px;
  font-weight: 600;
  margin-bottom: 18px;

  @media only screen and (max-width: 445px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 19px;
  }
`;

const Li = styled.li`
  list-style: none;
  font-family: Pretendard;
  font-size: 17.5px;
  line-height: 1.8;
  white-space: nowrap;

  @media only screen and (max-width: 445px) {
    font-size: 17px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.2px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15.2px;
  }
`;

const Marker = styled.span`
  font-size: 10px;
  color: #555555;
  margin-right: 6px;
  font-family: Pretendard;
  position: relative;
  bottom: 3px;
`;

const AccountWrapper = styled.div`
  margin: 0 auto;
  width: max(75%, 290px);
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

const IntroduceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid gray;
  gap: 6px;

  & > * {
    font-family: Pretendard;
    font-size: 15px;
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
  gap: 8px;
  font-family: Pretendard;
  font-size: 16px;
  text-decoration: none;

  @media only screen and (max-width: 380px) {
    font-size: 15.5px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
  }
`;

const MapIconItemDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: Pretendard;
  font-size: 16px;
  text-decoration: none;

  @media only screen and (max-width: 380px) {
    font-size: 15.5px;
  }

  @media only screen and (max-width: 340px) {
    font-size: 15px;
  }
`;

const MapIconImage = styled.img`
  border-radius: 4px;
`;

const DescriptionItem = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  gap: 6.5px;
  font-size: 15px;
  font-family: Pretendard;
  line-height: 1.8;
  word-break: keep-all;
  word-wrap: break-word;
  color: #555555;
`;

const DescriptionLi = styled.li`
  list-style: none;
  /* font-weight: 800; */
  font-family: Pretendard;
  font-size: 17px;

  @media only screen and (max-width: 445px) {
    font-size: 16.6px;
  }

  @media only screen and (max-width: 360px) {
    font-size: 16.2px;
  }
`;

const DescriptionMarker = styled.span`
  font-size: 10px;
  color: #555555;
  margin-right: 6px;
  font-family: Pretendard;
  position: relative;
  bottom: 3px;
`;
