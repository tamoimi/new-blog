---
title: "[React Docs] 폼"
date: "2023-07-17"
template: "post"
draft: false
slug: "/posts/react-doc-09"
category: "React"
tags:
  - "React"
description: "리액트 공식문서를 읽고 정리한 글"
# socialImage: "./media/42-line-bible.jpg"
---

> 본 게시글은 [리액트 공식문서](https://reactjs.org/docs/getting-started.html)를 읽고 정리한 글이다.

HTML 폼 엘리먼트는 폼 엘리먼트 자체가 내부 상태를 가지기 때문에, React의 다른 DOM 엘리먼트와 다르게 동작한다.

```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

이 폼은 name을 입력받고 사용자가 폼을 제출하면 새로운 페이지로 이동하는 기본 HTML 폼 동작을 수행한다. React에서 동일한 동작을 원한다면 그대로 사용할 수 있다. <u>하지만 대부분의 경우 JavaScript함수로 폼의 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근하도록 하는 것이 편리하다.</u>

이를 위한 표준 방식을 “**제어 컴포넌트 (controlled components)**“라고 부른다.

### 제어 컴포넌트 (Controlled Component)

HTML에서 `<input>`, `<textarea>`, `<select>`와 같은 폼 엘리먼트는 일반적으로 **사용자의 입력을 기반으로 자신의 state를 관리하고 업데이트**한다. React에서는 변경할 수 있는 state가 일반적으로 **컴포넌트의 state 속성에 유지**되며 [setState()](https://ko.legacy.reactjs.org/docs/react-component.html#setstate)에 의해 업데이트된다.

우리는 React state를 “**신뢰 가능한 단일 출처 (single source of truth)**“로 만들어 두 요소를 결합한다. 그러면 폼을 렌더링하는 React 컴포넌트는 폼에 발생하는 사용자 입력값을 제어하고 이러한 방식으로 React에 의해 값이 제어되는 입력 폼 엘리먼트를 **“제어 컴포넌트 (controlled component)“라고 한다.**

예를 들어, 이전 예시가 전송될 때 이름을 기록하길 원한다면 폼을 제어 컴포넌트 (controlled component)로 작성할 수 있다.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

`value` 어트리뷰트는 폼 엘리먼트에 설정되므로 표시되는 값은 항상`this.state.value`가 되고 React state는 신뢰 가능한 단일 출처 (single source of truth)가 된다. React state를 업데이트하기 위해 모든 키 입력에서`handleChange`가 동작하기 때문에 사용자가 입력할 때 보여지는 값이 업데이트된다.

제어 컴포넌트로 사용하면, input의 값은 항상 React state에 의해 결정된다. 코드를 조금 더 작성해야 하지만 다른 UI 엘리먼트에 input의 값을 전달하거나 다른 이벤트 핸들러에서 값을 재설정할 수 있다.

### textarea 태그

- **HTML**에서 `<textarea>` 엘리먼트는 텍스트를 자식으로 정의한다.

```jsx
<textarea>Hello there, this is some text in a text area</textarea>
```

- **React**에서 `<textarea>`는 `value` 어트리뷰트를 대신해서 사용한다. 이렇게 하면 `<textarea>`를 사용하는 폼은 한 줄 입력을 사용하는 폼과 비슷하게 작성할 수 있다.

```jsx
class EssayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Please write an essay about your favorite DOM element.",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("An essay was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

`this.state.value`를 생성자에서 초기화하므로 textarea는 일부 텍스트를 가진채 시작되는 점을 주의하자.

### select태그

- **HTML**에서 `<select>` 는 드롭 다운 목록을 만든다. 예를 들어, 이 HTML은 과일 드롭 다운 목록을 만들고 `selected` 옵션으로 Coconut을 초기값으로 설정할 수 있다.

```jsx
<select>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option selected value="coconut">
    Coconut
  </option>
  <option value="mango">Mango</option>
</select>
```

- **React**에서는 `selected` 어트리뷰트를 사용하는 대신 최상단 `select`태그에 `value` 어트리뷰트를 사용한다. 한 곳에서 업데이트만 하면되기 때문에 제어 컴포넌트에서 사용하기 더 편하다.

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "coconut" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

🦦`select` 태그에 multiple 옵션을 사용한다면 `value` 어트리뷰트에 배열을 전달할 수 있다.

```jsx
<select multiple={true} value={['B', 'C']}>
```

### file input태그

HTML에서 `<input type="file">`는 사용자가 하나 이상의 파일을 자신의 장치 저장소에서 서버로 업로드하거나 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)를 통해 JavaScript로 조작할 수 있다.

```jsx
<input type="file" />
```

이 값은 읽기 전용이기 때문에 React에서 **비제어** 컴포넌트이다. 자세한 내용은 [여기](https://ko.legacy.reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)에서 확인할 수 있다.

### 다중 입력 제어하기

여러 `input` 엘리먼트를 제어해야할 때, 각 엘리먼트에 `name` 어트리뷰트를 추가하고 `event.target.name` 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있다.

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
```

주어진 input 태그의 name에 일치하는 state를 업데이트하기 위해 ES6의 [computed property name](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Object_initializer#%EC%86%8D%EC%84%B1_%EA%B3%84%EC%82%B0%EB%AA%85) 구문을 사용할 수 있다.

### 제어되는 Input Null 값

[제어 컴포넌트](https://ko.legacy.reactjs.org/docs/forms.html#controlled-components)에 `value` prop을 지정하면 의도하지 않는 한 사용자가 변경할 수 없다. `value`를 설정했는데 여전히 수정할 수 있다면 실수로 `value`를 `undefined`나 `null`로 설정했을 수 있다.

```jsx
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function () {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);
```

처음엔 input 태그의 `value` 값은 `hi`이고 입력을 할 수 없는 상태이다. `setTimeout`설정한 시간 뒤 input 태그의 `value`값에 `null`이 들어가면서 입력을 할 수 있다.

### 제어 컴포넌트의 대안

데이터를 변경할 수 있는 모든 방법에 대해 이벤트 핸들러를 작성하고 React 컴포넌트를 통해 모든 입력 상태를 연결해야 하기 때문에 때로는 제어 컴포넌트를 사용하는 게 지루할 수 있다. 특히 기존의 코드베이스를 React로 변경하고자 할 때나 React가 아닌 라이브러리와 React 애플리케이션을 통합하고자 할 때 짜증날 수도 있다. 이러한 경우에 입력 폼을 구현하기 위한 대체 기술인 [비제어 컴포넌트](https://ko.legacy.reactjs.org/docs/uncontrolled-components.html)를 사용할 수도 있다. <u>제어 컴포넌트 vs 비제어 컴포넌트</u>는 곧 다시 자세하게 다뤄보도록 할 것이다 🤪
