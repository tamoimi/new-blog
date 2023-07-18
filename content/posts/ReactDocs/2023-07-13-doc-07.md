---
title: "[React Docs] 조건부 렌더링"
date: "2023-07-13"
template: "post"
draft: false
slug: "/posts/react-doc-07"
category: "React"
tags:
  - "React"
description: "리액트 공식문서를 읽고 정리한 글"
# socialImage: "./media/42-line-bible.jpg"
---

> 본 게시글은 [리액트 공식문서](https://reactjs.org/docs/getting-started.html)를 읽고 정리한 글이다.

### 조건부 렌더링이란?

쉽게 말하자면 원하는 조건에 따라 다른 결과를 렌더링 하는것이다.

React에서 원하는 동작을 캡슐화하는 컴포넌트를 만들 수 있는데, 이렇게 하면 app상태에 따라서 컴포넌트 중 몇 개만을 렌더링 할 수 있다.

React에서 조건부 렌더링은 JavaScript에서의 조건 처리와 같이 동작한다. [if](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/if...else) 나 [조건부 연산자](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 와 같은 JavaScript 연산자를 현재 상태를 나타내는 엘리먼트를 만드는 데에 사용하면 React는 현재 상태에 맞게 UI를 업데이트할 수 있다.

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
// Try changing to isLoggedIn={true}:
root.render(<Greeting isLoggedIn={false} />);
```

- 위 코드는 두 컴포넌트가 있다고 가정하고 사용자 로그인 상태에 따라 `Greeting` 컴포넌트를 보여주고 있다.

### 엘리먼트 변수

변수에도 엘리먼트를 저장할 수 있는데, 변수를 활용하면 출력의 다른 부분은 변하지 않는 상태로 컴포넌트의 일부를 조건부로 렌더링할 수 있다.

- 로그아웃과 로그인 버튼을 나타내는 두 컴포넌트가 있다면, 다음과 같이 `LoginControl`라는 상태 컴포넌트를 만들 수 있다.

```jsx
function LoginButton(props) {
  return <button onClick={props.onClick}>Login</button>;
}

function LogoutButton(props) {
  return <button onClick={props.onClick}>Logout</button>;
}
```

- 아래의 예시에서는 `LoginControl`이라는 [유상태 컴포넌트](https://ko.legacy.reactjs.org/docs/state-and-lifecycle.html#adding-local-state-to-a-class) 를 만들어서 `state`에 따라 `LogoutButton`를 변수에 할당할지 `LoginButton`를 변수에 할당할지 조건을 만들어 해당 변수를 렌더링 시킬 수 있다.

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<LoginControl />);
```

### 논리 && 연산자로 If를 인라인으로 표현하기

변수를 선언하고 `if`를 사용해서 조건부로 렌더링 하는 것은 좋은 방법이지만 더 짧은 구문을 JSX안에서 인라인으로 처리할 수 있다.

JSX 는 중괄호를 이용해서 [표현식을 포함](https://ko.legacy.reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx) 할 수 있다. 그 안에 JavaScript의 논리 연산자 `&&`를 사용하면 쉽게 엘리먼트를 조건부로 넣을 수 있다.

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

const messages = ["React", "Re: React", "Re:Re: React"];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Mailbox unreadMessages={messages} />);
```

- JavaScript에서 `true && expression`은 항상 `expression`으로 평가되고 `false && expression`은 항상 `false`로 평가된다.
- 따라서 `&&` 뒤의 엘리먼트는 조건이 `true`일때 출력되고, 조건이 `false`라면 React에서 무시되어 출력되지 않는다.
- 만약 `0`과 같이 `false`의 값을 가지는 **falsy 표현식**을 반환하면 여전히 `&&` 뒤에 있는 표현식은 건너뛰지만 **falsy 표현식이 반환**된다는 것에 주의하자. 아래 코드와 같이  `<div>0</div>`이 render 메서드에서 반환되는 것처럼 의도하지 않는 동작을 할 수도 있다.

```jsx
render() {
  const count = 0;
  return (
    <div>
      {count && <h1>Messages: {count}</h1>}
    </div>
  );
}
```

### **조건부 연산자로 If-Else구문 인라인으로 표현하기**

조건부 연산자인 [condition ? true: false](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) 를 사용하면 짧은 구문으로 엘리먼트를 조건부로 렌더링할 수 있다.

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

다음과 같이 더 큰 표현식에서도 조건부 연산자를 사용할 수 있는데, 가독성은 좀 떨어질 수도 있다. 물론 가독성이 큰 문제가 되지 않는다면 편리한 방식을 사용하면 되지만, 렌더링을 위한 조건이 너무 복잡해진다면 [컴포넌트를 분리](https://ko.legacy.reactjs.org/docs/components-and-props.html#extracting-components)하는 것을 고려해보는 것이 좋다.

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

### 컴포넌트가 렌더링하는 것을 막기

가끔 다른 컴포넌트에 의해 렌더링될 때 컴포넌트 자체를 숨기고 싶을 때가 있을 수 있는데, 이때는 렌더링 결과를 출력하는 대신 `null`을 반환하면 해결할 수 있다.

```jsx
function WarningBanner(props) {
  if (!props.warn) {
    return null;
  }

  return <div className="warning">Warning!</div>;
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState((state) => ({
      showWarning: !state.showWarning,
    }));
  }

  render() {
    return (
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? "Hide" : "Show"}
        </button>
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
```

위 예시에서는 `<WarningBanner />`가 `warn` prop의 값에 의해서 렌더링되는데, prop이 `false`라면 컴포넌트는 렌더링하지 않게 된다. 이 때 컴포넌트의 `render`메서드로부터 `null`을 반환하는 것은 생명주기 메서드 호출에 영향을 주지 않고, `componentDidUpdate`는 계속해서 호출하게 된다.
