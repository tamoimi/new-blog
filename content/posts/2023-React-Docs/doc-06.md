---
title: "[React Docs] 이벤트 처리하기"
date: "2023-07-12"
template: "post"
draft: false
slug: "/posts/react-doc-06"
category: "React"
tags:
  - "React"
description: "리액트 공식문서를 읽고 정리한 글"
# socialImage: "./media/42-line-bible.jpg"
---

> 본 게시글은 [리액트 공식문서](https://reactjs.org/docs/getting-started.html)를 읽고 정리한 글이다.

React 엘리먼트에서 이벤트를 처리하는 방식은 DOM 엘리먼트에서 이벤트를 처리하는 방식과 매우 유사하다.

1. 하지만 React의 이벤트는 소문자 대신 camelCase를 사용한다.
2. JSX를 사용하여 문자열이 아닌 함수로 이벤트 핸들러를 전달한다.

- HTML

```jsx
// 속성 값을 문자열로 작성하여 이벤트 핸들러를 전달한다.
<button onclick="activateLasers()">Activate Lasers</button>
```

- React

```jsx
// 속성 값은 문자열이 아닌 표현식을 이용해 함수로 이벤트 핸들러를 전달한다.
<button onClick={activateLasers}>Activate Lasers</button>
```

3. React에서는 false를 반환해도 기본 동작을 방지할 수 없다. 반드시 `preventDefault`를 명시적으로 호출해야 한다.

- HTML

```jsx
<form onsubmit="console.log('You clicked submit.'); return false">
  <button type="submit">Submit</button>
</form>
```

- React

```jsx
function Form() {
  function handleSubmit(e) {
    e.preventDefault();
    console.log("You clicked submit.");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Submit</button>
    </form>
  );
}
```

여기서 `e`는 합성 이벤트이다. React이벤트는 브라우저 고유 이벤트와 정확히 동일하게 동작하지는 않는다.

🐝**합성 이벤트란?**
: 합성 이벤트는 객체로 모든 브라우저에서 이벤트를 동일하게 처리하기 위한 Wrapper 객체이다.

React를 사용할 때 DOM 엘리먼트가 생성된 후 리스너를 추가하기 위해 `addEventListener` 를 호출할 필요가 없다. 대신 엘리먼트가 처음 렌더링 될 때 리스너를 제공할 수 있다.

- **Toggle 컴포넌트**

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };

    // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 한다.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
```

JSX 콜백 안에서 `this`의 의미에 대해 주의해야 한다. JavaScript에서 클래스 메서드는 기본적으로 바인딩되어 있지 않다. `this.handleClick`을 바인딩하지 않고 `onClick`에 전달했다면, 함수가 실제 호출될 때 `this`는 `undefined`가 된다.

이는 React만의 특수한 동작이 JavaScript에서 함수가 작동하는 방식의 일부이다. 일반적으로 `onClick={this.handleClick}`과 같이 뒤에 `()`를 사용하지 않고 메서드를 참조할 경우, 해당 메서드를 바인딩 해야 한다.

- **퍼블릭 클래스 필드 문법**

```jsx
class LoggingButton extends React.Component {
  // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 한다.
  // 주의: 이 문법은 *실험적인* 문법이다.
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

: [Create React App](https://github.com/facebookincubator/create-react-app)에서는 이 문법이 기본적으로 설정되어 있다.

- **화살표 함수 사용**

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    // 이 문법은 `this`가 handleClick 내에서 바인딩되도록 한다.
    return <button onClick={() => this.handleClick()}>Click me</button>;
  }
}
```

이 문법의 문제점은 `LoggingButton`이 렌더링될 때마다 다른 콜백이 생성되는 것이다. 대부분의 경우 문제가 되지 않으나 콜백이 하위 컴포넌트에 props로 전달되면 그 컴포넌트들은 추가로 리렌더링이 발생할 수 있다. 이러한 성능 문제를 피하고자 생성자 안에서 바인딩하거나 클래스 필드 문법을 사용하는 것을 권장한다.

### 이벤트 핸들러에 인자 전달하기

루프 내부에서는 이벤트 핸들러에 추가적인 매개변수를 전달하는 것이 일반적이다.

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

위 두 줄은 같으며 각각 화살표 함수와 [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)를 사용했다.   
두 경우 모두 React 이벤트를 나타내는 `e`인자가 ID뒤에 두 번째 인자로 전달된다.   
화살표 함수를 사용하면 명시적으로 인자를 전달해야 하지만 `bind`를 사용할 경우 추가 인자가 자동으로 전달된다.
