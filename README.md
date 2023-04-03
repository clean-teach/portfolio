# 안녕하세요! **김청훈** 의 포트폴리오 입니다.

안다고 생각하는 것은 부족하다. <br/>
(안다고 생각하는 것이 자신감의 원동력일지는 모른다.) <br/>
하지만 정말 "아는 지" 확인 하는 방법은, 직접 해보는 수 밖에 없다. <br/>
한 발 더 나아가서 미래의 나도 알기 위해서는 기록하여야 한다. <br/>
"안다 = 경험한다 + 기록한다"

## 개요

1. [Link](#Link)
   1. [Notio](#Notio)
   1. [배포 링크](#배포-링크)
   1. [개발 모드 로컬 실행 방법](#개발-모드-로컬-실행-방법)
2. [설치 패키지 및 개발 환경](#설치-패키지-및-개발-환경)
3. [프로젝트 트리 구조](#프로젝트-트리-구조)
   1. [폴더를 구분한 기준](#폴더를-구분한-기준)
4. [작업 시 주안점](#작업-시-주안점)
5. [한계점 및 개선 사항](#한계점-및-개선-사항)

<br/>

---

## Link

### Notion

[노션 링크 ->](https://seemly-mile-d41.notion.site/Portfolio-36bf2c8f26a44fcb9007bc2f9d2c9414)

### 배포 링크

[https://clean-teach-portfolio.netlify.app/](https://clean-teach-portfolio.netlify.app/)

### 개발 모드 로컬 실행 방법

1. 컴퓨터에 레파지토리 받아주세요.
2. `yarn run dev:assets`
3. index.html 파일 우클릭 -> Open with Live Server

<br/>

---

## 설치 패키지 및 개발 환경

- `typescript`
  - 타입으로 보호되는 안전한 코딩을 할 수 있습니다.
  - 컴파일 단계에서 오류 확인이 가능합니다.
  - 타입 추론을 통해 코드 생산성, 가독성을 높일 수 있습니다.
- `webpack`

  - 자바스크립트 모듈 번들러입니다.
  - 호환 플러그인을 포함하는 경우 HTML, CSS, 심지어는 이미지와 같은 프론트엔드 자산들을 변환할 수 있습니다.
  - 의존성이 있는 모듈을 취하여 해당 모듈을 대표하는 정적 자산들을 생성합니다.

- `babel`

  - ECMAScript 2015+ 코드를 이전 JavaScript 엔진에서 실행할 수 있는 이전 버전과 호환되는 JavaScript 코드로 변환합니다.
  - 언어의 최신 기능을 활용할 수 있습니다.

- `sass`

  - 단순 반복 등 CSS의 불편함을 해소시켜주는 스타일시트 언어입니다.
  - CSS의 확장팩 같은 언어이기 때문에 CSS 파일 그 자체를 SCSS로 확장자만 바꾸어주어도 정상적으로 작동합니다.
  - 계층적으로 상속되는 CSS를 더욱 계층적으로 보이게 만드는 **네스팅** 기능, 특수 선택자, 연산, 함수, 조건문, 반복문 등을 스타일 시트에서 사용 할 수 있습니다.
  - webkit 코드나 ms 코드를 일일이 적지 않아도 webkit이나 IE 등에서 인식할 수 있게 해주는 **Vendor Prefix** 기능을 제공 합니다.

  <br/>

---

## 프로젝트 트리 구조

    index.html
    src
    ├─js
    │  │  cursor.ts
    │  │  form-submission-handler.ts
    │  │  index.ts
    │  │  loadingPage.ts
    │  │  main.ts
    │  │
    │  ├─module
    │  │      accessibility.ts
    │  │      actionHeader.ts
    │  │      actionStyleContactArea.ts
    │  │      actionStyleFooterCard.ts
    │  │      actionStylePortfolioByScroll.ts
    │  │      actionTab.ts
    │  │      clock.ts
    │  │      setBackgroundColorByMouseMove.ts
    │  │      setBackgroundStyleByScroll.ts
    │  │      setIntervalTitle.ts
    │  │
    │  └─utils
    │          utils.ts
    │
    └─scss
        │  animation.scss
        │  common.scss
        │  cursor.scss
        │  index.scss
        │  loader.scss
        │  main-background.scss
        │
        └─layouts
                contact-section.scss
                footer.scss
                header.scss
                main-section.scss
                portfolio-section.scss

### 폴더를 구분한 기준

- Style Sheet
  - [x] 섹션별로 SCSS 파일 분리
    - 기존에 `index.scss`에 모여있던 SCSS 코드를 섹션당 하나의 파일로 "layouts" 디렉토리에 분류
      - 전체 화면의 배경 스타일은 "`main-background.scss`" 파일에 작성
    - 각 섹션의`@media query` 는 각자의 파일에서 관리
    - 전체 SCSS 파일을 import 하는 `style.scss` 파일명을 `index.scss` 로 변경
    - 추후 애니메이션 관련 CSS 코드를 관리하기 위하여 "`animation.scss`" 파일 생성

<br/>

---

## 작업 시 주안점

1. 구조(HTML), CSS(Style), JS(동작) 을 구분하여 작업 프로세스 진행 (동시에 너무 많은 사고가 확장된다면 에너지 효율이 극히 떨어진다!)
2. Test code 등 Github 자주 업로드, 공부 내용 정리 등 중간중간 데이터는 계속 모으고 정리한다.
3. 경력기술서는 자신이 수행한 프로젝트나 협력 했던 활동사항 위주로 작성 (진행기간, 주요업무내용, 본인이 기여한 기술적인 사항, 결과/성과/성취 등)
4. 기여도는 전체 공정 중 퍼센티지가 아니라, 포지션별로 퍼센티지를 기입한다. (예 : 디자인 60%, 퍼블 100%)

### 초기 컨셉

- 개인 블로그 개념으로 보여주는 목적만이 아닌, 공부와 실습, 기록을 목적으로 꾸미 수 있다. (**공부 했다면 흔적을 남기자!**)
- 일단, 배운건 실습 해보기! (포트폴리오는 적립되는 것)
- [x] 정적 사이트로 제작 (주기적 자료 업데이트 없음. 반복 데이터 많지 않음)
- [x] 포트폴리오 카드 위주로 배치
- [x] one page scroll 방식
- [x] 반응형 페이지로 제작

### 구상, 기획, 디자인

#### 페이지 구성

- 메인 비주얼 페이지 : 인상깊은 비주얼로 발길을 사로잡는걸 목적으로 한다. 강렬한 메세지를 전달 할 수 있다면, 전체적인 스토리를 잡을 수 있다.
- Skills - skill은 소스를 직접 보거나, GitHub 링크를 연결해 두는 방법이 낫다. 혹은 프로젝트별로 기입 할 수 있다.
- Portfolio - 경험과 기술, 기여도 / 한눈에 보기 편하게 List 형식 배치 (상세 페이지 없음)
  - 실제 서비스 되는 화면이 있다면 링크를 걸고, 실제 서비스 화면보다 작업된 화면이 낫다면 작업된 화면을 로컬링크 건다.
  - 어플리케이션은 해당 어플의 다운로드 페이지 링크를 연결한다.
  - 각 프로젝트의 작업 과정 및 참고한 내용, 혹은 배운 내용을 정리한 노션페이지 링크도 연결한다.
  - [x] 카테고리별(제작, 리뉴얼, 반응형, 등) 필터링 버튼
    - Portfolio 영역의 상단에 제공하여, header menu의 앵커태그에서 바로 가르키게 한다.
    - Total, Study, Work, Side Project 로 구분한다.
    - [x] Study 카테고리
      - 각종 수업의 타이틀
      - 그 실습에서 배운점과 주요 기술, 그 기술의 쓰임새를 요약
      - 링크
        - notion의 **공부일기** 페이지
        - Git Hub 실습 파일
- Contact - 당당하고 예의바른 자세로 고객서비스 UI/UX 능력을 간접 어필 할 수 있는 기회. form 영역 연습의 기회

  - [x] 방문자와 상호소통 할 수 있는 인풋창 (느낀점(비판도 감사히 듣겠습니다.), 피드백 줄 점)

#### Motion 활용 계획

- 모션의 기본은 : “**언제(event)** **무엇(function)**이 벌어지느냐” 이다.
- scroll event 적극 활용 (사용자 입장에서 봤을때, 원페이지 사이트라면 스크롤 이벤트만큼 직관적이고 편리한 이벤트가 없다)
- 스크롤 효과 : skew, scale, sticky, 속도차(패러럴스크롤)

### 기타 구현 내용

- 특정 페이지(이 사이트는 원페이지 사이트이므로 메인페이지)에 해당하는 스크립트 파일은 변수의 전역화를 피하기 위하여 **즉시실행함수**로 감싸줄 수 있다.
- 전체적으로 사용할 수 있는 재사용성이 높은 함수는 utils 파일로 따로 구분해서 리팩토링 하였으며, 이때 import / export 등의 사용은 필요가 없었다. 다만, 유틸을 사용해야 하는 html 파일에서 script src="" 로 유틸파일을 불러와야 했다.

- 자바스크립트로 설정한 스타일은 inline-style이기 때문에 우선순위가 높다. → 그렇기에 class로 스타일을 덮어쓰기가 어렵다.

  ⇒ 이럴때, **CSS important** 를 사용하면 쉽게 해결할 수 있다.

  [명시도 - CSS: Cascading Style Sheets | MDN](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity#!important_%EC%98%88%EC%99%B8)

- 기능을 **이벤트 + 함수** 조합으로만 꾸미기에는 여러 한계가 존재한다.
  - 블럭 스코프 단위의 변수/상수 사용이라던지, 기능별 모듈화라던지..
    ⇒ **이벤트 + 객체(내부의 메소드)** 조합으로 기능을 설계한다면, 필요한 기능만을 적절히 꺼내서 사용하기에 용의하다.
- [x] 적절한 작명
      [[코딩 팁] 함수(메소드) 이름은 어떻게 지어야 할까?](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=magnking&logNo=220950033030)
  - 함수 이름은 보통 “**동사 + 명사**” 순
- [x] css :root 변수 사용해보기
      [[CSS] :root 가상 클래스로 CSS 변수 다루기](https://designer-ej.tistory.com/entry/CSS-root-%EA%B0%80%EC%83%81-%ED%81%B4%EB%9E%98%EC%8A%A4%EB%A1%9C-CSS-%EB%B3%80%EC%88%98-%EB%8B%A4%EB%A3%A8%EA%B8%B0)
- [x] 파비콘 등록하기
- [x] meta tag 작성
      [네이버, 구글 검색등록을 위한 메타태그 작성 도구(Meta tag generator) - SEO & 마케팅](https://www.seomarketing.kr/meta-tag-generator/)
- [x] 반응형, 모바일 버전에서 폰트크기 등 정리
- [x] Custom scroll event
      [[javascript] 스크롤에 따라 부드러운 애니메이션 구현하기](https://elvanov.com/2195)
- [x] Rotate card
      [나만의 포트폴리오 제작기](https://velog.io/@junghyeonsu/%EB%82%98%EB%A7%8C%EC%9D%98-%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-%EC%A0%9C%EC%9E%91%EA%B8%B0)
- [x] 내용 복사 금지
      [[Javascript] 마우스 오른쪽 클릭 금지하는 2가지 방법](https://hianna.tistory.com/445)
- [x] 메인 페이지 마우스무브 이벤트에 따라서 배경색상 변화

  - [x] 이를 적극 유도하기 위하여, 메뉴 를 사방에 배치
  - [x] 그라디언트 적용

    - [x] 그라디언트 모드는 색상 최대 투톤으로 만들어보기
    - [x] 사용자에게 모드 선택권 제공?
          → 구현은 하였으나, 과한 선택권을 제공할 필요는 없다고 판단하여 주석처리(추후 모듈화?)

    - [x] 마우스 방향에 따라서 그라디언트 각도 조절

- [x] 마우스 커서 변경해 보기
  - Mouse Cursor Styling 작업에서 JS 파일과 CSS 파일을 컴포넌트처럼 따로 리팩토링하여, 관리의 용이성과 재활용성을 높였다.
    [브라우저 뷰포트 (layout 와 visual viewport) 간단 정리하기](https://pks2974.medium.com/%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%B7%B0%ED%8F%AC%ED%8A%B8-layout-%EC%99%80-visual-viewport-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0-47756d5ee3cf)
    [[프론트 엔드 / 자바스크립트] 좌표 값 구하기 (e.pageX / Y , e.clientX / Y )](https://goodmemory.tistory.com/103)
  - 기본 마우스 커서는 CSS의 body {cursor: none;} 으로 삭제
  - 커서용으로 만들어진 오브젝트가 마우스커서의 동작을 방해하지 않게 하기 위해서, CSS에서 해당 오브젝트에 pointer-events: none;
  - 마우스 커서용 오브젝트의 위치값은 position: fixed;를 사용해서 viewport를 기준으로 잡고, 마찬가지로 mousemove event의 .clientY / .clientX 메소드를 사용해서 현재 viewport 기준 위치값을 반환하여 사용한다.
  - 커서의 hover, click 등 이벤트 애니메이션은 transition을 사용하는것이 편리하였다. 이때, 커서의 위치값까지 transition이 지정되는것을 막고자, 커서 엘리먼트 내부에 자식 엘리먼트를 만들고 그 요소에게 애니메이션 스타일을 설정함으로써 부모요소의 위치값 스타일과 자식요소의 나머지 스타일 애니메이션을 분리하였다.
- [x] 타이틀 가로스크롤(무한?)
- [x] 자동 애니메이션 (톱니바퀴 등 각종 아이콘 무한 애니메이션)
- [x] 명함카드 3D 애니메이션
- [x] 랜덤값 함수를 이용하여, 초기 색상 무작위 설정
  ```jsx
  function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
  }
  ```
- [x] 이제 스크롤에 따른 스캐일 변화를 구현하기 위하여 0부터 1에 해당하는 퍼센티지 공식을 만든다. → 자주 쓰이는 기능이므로 유틸 함수로 만든다
- [x] tab name (title 태그 내용 정기적으로 반복 바꾸기)
- [x] 디자인 무료툴 정리하며, 적용
- [x] footer 스크롤 레이어 효과 적용
  - position: fixed; 와 z-index를 사용하여, 덮여있는 footer 영역이 들어나는 효과를 구현
- [x] contact 스크롤 인위적으로 조정

  - Contact section 스크롤 모션

    - [x] Position: relative; 사용?
          ⇒ 원래 위치를 기준으로 위치를 이동하는 모션이라면, **position** 보다 **transform**이 적절하다.
    - [x] 글자 만나는 기능 사용하기
    - 구상
      1. 포트폴리오 영역 스크롤이 끝나는 지점에서 글자 만나는 모션 동작
      2. 글자가 만나고 스크롤이 조금 더 진행되면, 만나는 글자가 사라지고(fade-out)
      3. 사라진 공간에 “contact” 제목이 생긴다.
         1. 이때, 글자는 배경색과 같이 하얀색이고 text-shadow 가 스크롤에 따라서 넓어지는 형태로 등장하여, 입체적인 효과를 준다.
      4. 제목이 나타나면, 하단의 form영역과 함께 스크롤이 진행된다.
    - 구현

      1. 이를 위해서, 실제 스크롤 영역을 만들고
         1. “contact” section의 윗공간을 빈 공간으로 충분한 스크롤을 만들고,
      2. 글자만 만나는 모션의 영역을 따로 추가하고, position: fixed;와 z-index 를 사용하여, 고정된 영역에서 모션을 보여준다.
      3. 모션이 시작되고 끝나는 스크롤의 지점을 미리 변수로 저장해둔다.

         1. 전체 기능을 객체로 만들고 get() 함수를 사용해서, window.load 시점에 한번만 페이지 정보를 저장해둔다.

            [window load / document ready , 페이지의 모든 요소가 로딩된 후에 특정 javascript 실행하기 (이미지로딩/동영상로딩/페이지로딩 등등)](https://doolyit.tistory.com/156)

      4. 모션은 되도록 position이나 width, height 값보단 transform 속성을 사용한다.

         [translate() vs positioning 비교 :: 마이구미](https://mygumi.tistory.com/238)

      5. 마치 position: sticky;처럼, 끝나는 지점에서 스크롤이 진행 되어야 하는데,
         1. 원래 위치를 미리 CSS에서 설정하고 그 위치에 도달하면, position: fixed; → position: relative;로 바꿔준다.
      6. 시작 포인트 + 끝 포인트 + 최대값 + 최소값 퍼센티지 함수 만들기
      7. 스크롤이벤트에 반응 버벅 거리는 현상 해결

         [ZeroCho Blog](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)

         [스크롤 등의 이벤트 최적화하기](https://marshallku.com/web/tips/%EC%8A%A4%ED%81%AC%EB%A1%A4-%EB%93%B1%EC%9D%98-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%B5%9C%EC%A0%81%ED%99%94%ED%95%98%EA%B8%B0)

         - { passive:true }
           [{ passive:true } 의 진정한 의미 - amati.io](https://amati.io/eventlisteneroptions-passive-true/)

         1. 동작의 마무리 조건을 스크롤이 아니라, 동작 마무리 그 자체로 하면 될 일?
            - 스크롤 범위 조건문 else에서 동작 마무리 조건문 한번 더 필터링
         2. 동작의 시작 마무리 조건에 한계를 설정하지 않는다?

            or 한계값에 오차를 둔다

         3. 스크롤 시작, 끝 지점 밖에서는 인위적으로 값을 정해준다.

            ⇒ **해결**

- [x] 포트폴리오 사이트에 접속한 시간을 하단에 표시해주기
  - `.localStorage`와 `new Date()` `.padStart()` `setInteval` 을 이용.
    - “사이트 첫 방문”의 조건을 찾지 못했기 때문에 `.localStorage` 를 활용할 필요는 없었다.
  - “벌써 00시간 00분 00초 동안 관심을 보여주셨어요!”
    - 당신과 처음 만난 날짜는 00:00 입니다.
    - 저에 대해 더욱 많은 것을 알고 싶으시면, 아래 연락처로 연락 주세요”
  - [x] 경과시간 계산
        [[Javascript] 경과 시간 계산하기 (시간, 분, 초)](https://hianna.tistory.com/390)
  - footer card 뒷면에 추가
    - 3D card 구현 시, 부모요소에게 `overflow: hiddne;` 이 있다면, 자식의 입체적인 구조가 가려진다.

<br/>

---

## 한계점 및 개선 사항

### 최적화

- 아래 내용을 나름 시도해 보았으나, 객관적인 기능 테스트 방법을 몰라서 결과를 확인 할 수 없었다.
- [ ] 앞으로 학습과 병행하여 아래 계획한 내용들을 추가로 구현해보고 싶다.

#### 최적화 시도 내용 및 계획

- [x] 인트로(로딩 화면) : "크롬 최적화 안내" 등 최적환경 안내
  - [x] loading 페이지용 스크립트도 따로 리팩토링 하였는데, 이는 추후 페이지 로드과정에서 선별적으로 로딩화면을 노출함으로써 비동기작업을 해보려는 계획이다.
        [setTimeout과 setInterval을 이용한 호출 스케줄링](https://ko.javascript.info/settimeout-setinterval)
  - [ ] 적절한 이벤트를 사용하여, 최대한 빠른 실행
        [DOMContentLoaded - Web API | MDN](https://developer.mozilla.org/ko/docs/Web/API/Window/DOMContentLoaded_event)
    - [ ] HTML 문서의 **생명주기**
          [DOMContentLoaded, load, beforeunload, unload 이벤트](https://ko.javascript.info/onload-ondomcontentloaded)

### Portfolio Scroll Event 코드 최적화 하기

- [x] 전체 함수로 묶어서 상태값을 함수 내부 지역변수로 관리
- [x] 상태값은 현재 보여져야 할 순서 number
- [x] 전체 함수 내부에서 기능별 함수로 묶기
  - 현재 스크롤 위치에 따른 상태값 계산
  - 포트폴리오 이미지 영역 모션
    - 스크롤 아래로 내렸을 때 :
      - 이미지 영역의 활성화 조건 : 현재 보여지는 viewport (스크롤top 부터 스크롤bottom까지의 영역) 안에 위치한 HTML element 활성화
    - 스크롤 위로 올렸을 때 :
  - 포트폴리오 텍스트 영역 모션 (이미지 모션에 종속된다)
    - 스크롤 아래로 내렸을 때 :
      - 대응하는 이미지 영역의 top값이, viewport의 중간지점 이상으로 올라왔을때 나타남
      - 대응하는 이미지 영역의 bottom값이, viewport의 중간지점 이상으로 올라갔을때 사라짐
    - 스크롤 위로 올렸을 때 :
      - 대응하는 이미지 영역의 top값이, viewport의 중간지점 이상으로 올라왔을때 나타남
      - 대응하는 이미지 영역의 bottom값이, viewport의 중간지점 이상으로 올라갔을때 사라짐
  - 전체 함수 내부에서 스크롤 이벤트 사용? or 스크롤 이벤트 내부에서 전체함수 사용하고 필요한 값은 매개변수로 받아오기
- [x] 기능별 객체형태로 코드 분리
  - 객체 형태로 기능을 리팩토링 하는 것과 함수형태로 리팩토링 하는 것의 차이
    - 함수 형태는 내부 변수들도 매번 실행하기 때문에 초기설정을 유지하기 어렵고, 각 기능별로만 실행될 내부 메소들을 관리하기 어렵다.
  - 메소드를 정의할때 화살표 함수를 사용하는것을 피한다.
    [Arrow function | PoiemaWeb](https://poiemaweb.com/es6-arrow-function#41-%EB%A9%94%EC%86%8C%EB%93%9C)
    → 대신, 메소드를 위한 단축 표기법인 [ES6의 축약 메소드 표현](https://poiemaweb.com/es6-enhanced-object-property#3-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%B6%95%EC%95%BD-%ED%91%9C%ED%98%84)을 사용하는 것이 좋다.
- [x] export/import 사용하여 모듈화
  - 종종 **Uncaught SyntaxError: Cannot use import statement outside a module** 오류가 뜰 때가 있는데,
    → 이때는 모듈을 불러오는 <script> 태그에 `type="module"`을 추가해주면 해결된다.
  - **net::ERR_ABORTED 404 (Not Found)**
    위와 같은 에러가 뜬다면 **확장자**를 빠트리지 않았는지 확인해준다!
  - [ ] 함수에서 필요한 DOM 변수는 필요한 각 모듈 안에서만 호출할 수 있게 하고,
        적절한 이벤트에서 한번만 호출할 수 있게 한다.
  - [ ] bind 함수를 사용해서 이벤트와 함수를 연결해준다.
    - 메인 페이지에서는 이 bind 함수를 호출한다.
- [ ] portfolio 영역 스크롤 코드 사용성 개선
  - [x] 이미지 사이즈 최적화
        [웹 성능을 위한 이미지 최적화](https://velog.io/@hustle-dev/%EC%9B%B9-%EC%84%B1%EB%8A%A5%EC%9D%84-%EC%9C%84%ED%95%9C-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%B5%9C%EC%A0%81%ED%99%94)
  - [x] 함수 → 객체 ?
    - [ ] 개선 테스트
          [마이리얼트립 웹사이트 성능 측정 및 최적화 Part 1. 리소스 로딩](https://medium.com/myrealtrip-product/fe-website-perf-part1-6ae5b10e3433)
- [ ] CSS 애니메이션 최적화
      [CSS 애니메이션 성능 개선 방법(reflow 최소화, will-change 사용) | WIT블로그](https://wit.nts-corp.com/2017/06/05/4571)
- [ ] 이벤트 위임 사용해보기

### Vanilla JavaScript 로 작업한 이유

- 공부 초기부터 시작한 프로젝트이기 때문에 다른 tool을 몰랐다.
  - 직접 원하는 기능을 구현해봄으로써 추후 학습 할 프레임워크와 라이브러리 환경의 편리함을 느껴보았다.
- Vanilla JavaScript 의 기본 원리와 사용 방법을 공부하고 싶었다.
- 내용이 자주 업데이트 되는 편은 아니고, SEO(Search Engine Optimize)가 더욱 중요한 사이트이다.
  - `next.js` 나 `Gatsby` 학습 전에 시작한 프로젝트이고, 해당 기술들을 학습 중 입니다.
  - [ ] 추후 관리가 용이한 버전으로 업데이트 해 볼 것.
