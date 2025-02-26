import styled from 'styled-components';
import { child, get, increment, ref, update } from 'firebase/database';
import { dbref, realtimeDb } from '../firebase.ts';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { jsConfetti } from '../App.tsx';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks/index';
import React from 'react';

// 쓰로틀링 함수
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: ReturnType<typeof setTimeout>;
  let lastRan: number;

  return function (...args: Parameters<T>) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

const EMOJIS = [
  '❤️',
  '❤️',
  '💜',
  '💚',
  '💛',
  '💛',
  '🧡',
  '🧡',
  '💛',
  '🤍',
  '💗',
  '🤍',
  '💗',
];

const SPECIAL_EMOJIS = ['🌻'];

function checkOneInThousand() {
  // Math.random()은 0 이상 1 미만의 값을 반환
  const randomNumber = Math.random();

  // 1000분의 1 확률을 체크: randomNumber가 0과 1 사이에서 0.001 이하일 경우
  if (randomNumber < 0.001) {
    return true;
  } else {
    return false;
  }
}

// 자식 컴포넌트 (타입스크립트)
interface ChildProps {
  // 자식에서 부모에게 호출될 메서드를 위한 타입
}

const LikeButton = React.forwardRef<{}, ChildProps>((props, childRef) => {
  const [showFireworks, setShowFireworks] = useState(false);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 부모가 호출할 수 있도록 메서드를 노출
  useImperativeHandle(childRef, () => ({
    triggerChildEvent: onClickLike,
  }));

  useEffect(() => {
    fetchLikes();
  }, []);

  useEffect(() => {
    // count가 10의 배수일 때만 비활성화 타이머를 설정
    if (count > 0 && count % 10 === 0) {
      setShowFireworks(true);

      // setTimeout을 한 번만 실행하도록 ref 사용
      if (timeoutRef.current) clearTimeout(timeoutRef.current); // 이전 타이머 정리

      timeoutRef.current = setTimeout(() => {
        setShowFireworks(false);
      }, 5000);
    } else {
      setShowFireworks(false);
    }
    return () => {
      // 컴포넌트 언마운트 시 타이머를 정리
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [count]);

  const fetchLikes = async () => {
    get(child(dbref, '/like'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const { likes } = snapshot.val();
          setLikes(likes);
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const increaseLikes = async () => {
    const dbRef = ref(realtimeDb, '/like');
    try {
      await update(dbRef, {
        likes: increment(1),
      });

      setLikes((prevLikes) => prevLikes + 1);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handle = () => {
    setCount((prev) => prev + 1);

    jsConfetti.addConfetti({
      emojis: EMOJIS,
      emojiSize: 32,
    });

    increaseLikes();
  };

  const onClickLike = useCallback(throttle(handle, 500), []);

  return (
    <>
      {showFireworks && <Fireworks autorun={{ speed: 1, duration: 5000 }} />}
      <div
        style={{
          marginTop: 20,
          fontFamily: 'Pretendard',
          color: '#e36f6f',
          textAlign: 'center',
          fontSize: '14.5px',
        }}
      >
        재밌게 보셨다면,
        <br />
        좋아요 버튼을 눌러주세요:)
        <button
          style={{
            cursor: 'pointer',
            position: 'relative',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            width: '80px',
            height: '78px',
            margin: '0 auto',
          }}
          disabled={showFireworks}
          onClick={onClickLike}
        >
          <span
            style={{
              position: 'absolute',
              color: 'white',
              fontSize: '17px',
              zIndex: 10,
              top: '50%',
              left: '50%',
              fontFamily: 'Pretendard',
              fontWeight: 500,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {' '}
            {showFireworks ? <>FEVER TIME!</> : <>{likes}</>}
          </span>
          <i
            className="fa fa-heart"
            style={{
              top: 0,
              color: '#f48383',
              fontSize: '81px',
              position: 'absolute',
              textShadow: 'rgba(0, 0, 0, 0.25) 4px 6px 10px',
            }}
          ></i>
        </button>
      </div>
    </>
  );
});

export default LikeButton;
