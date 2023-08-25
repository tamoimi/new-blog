---
title: "[React 에러 해결] - jsonString 데이터 객체로 변환"
date: "2023-08-25"
template: "post"
draft: false
slug: "/posts/react-jsonData-parsing-error"
category: "React"
tags:
  - "React"
  - "jsonString"
  - "JSON.parse()"
description: "jsonString 데이터 객체로 변환 에러"
# socialImage: "./media/notebook.jpg"
---

## 수정 전 작업 내용

리액트 쿼리로 데이터 배열을 MUI Card 컴포넌트를 사용하여 표시했다.
그리고 각 Card를 클릭하면 데이터의 상세 내용을 볼 수 있는 모달창을 구현했다.

1. Card 를 표시하는 부모 컴포넌트
2. 각 Card를 클릭하면 뜨는 모달창 컴포넌트

부모 컴포넌트에 리액트 쿼리로 데이터를 조회 하고 받은 데이터를 모달창 컴포넌트에 props로 전달했고 전달한 데이터는 `jsonString`형식으로 받고 있기 때문에 이 데이터를 파싱하여 모달창에 그렸어야 했다.

아래 코드 처럼 프롭스로 받은 데이터를 파싱하여 `DialogContent`에 그리고 싶었지만.. 에러...

```js
const ModalComponent = ({ detailData, isOpen }: Props) => {
  const data = JSON.parse(detailData);

  return (
    <Dialog open={isOpen} fullWidth maxWidth="lg">
      <DialogTitle>상세 데이터</DialogTitle>
      <DialogContent>{data}</DialogContent>
    </Dialog>
  );
};
```
> 🚨 에러
> Uncaught SyntaxError: Unexpected end of JSON input at JSON.parse (<anonymous>)

jsonString 데이터 형식이 이상한가 싶어 여러번 코드를 수정했었지만.. 결국 문제는..

## 수정 후

수정 전 코드에서 파싱 에러가 발생한 이유는 아마도 해당 코드에서 데이터 파싱을 수행하는 시점이 모달이 열릴 때로 설정되어 있지 않아서 였을 것이다.
**모달이 열리기 전에 `detailData`에 데이터가 존재하지 않았거나 유효하지 않았기 때문에** 오류가 발생했을 것이다.

그래서 모달이 열릴 때 데이터 파싱을 수행하여 데이터가 유효한지 확인하고, 데이터가 유효한 경우 모달 내부에 표시하는 방식으로 수정했다.

```js
  // 파싱된 데이터를 저장할 상태 변수 추가
  const [parsedData, setParsedData] = useState<StepData>();

  // 데이터 파싱 함수
  const parseData = (dataString: string) => {
    try {
      const newData = JSON.parse(dataString);
      return newData;
    } catch (error) {
      console.error("데이터 파싱 오류:", error);
      return null;
    }
  };

  // 모달이 열릴 때 데이터 파싱 수행
  useEffect(() => {
    if (isOpen) {
      const newData = parseData(detailData);
      setParsedData(newData);
    }
  }, [isOpen, detailData]);
```

> 🐾간단한 코드 설명

- 초기 렌더링 시에 데이터 파싱을 수행하지 않기 위해, 초기에 `parsedData`상태가 빈값이기 때문에, 모달이 열릴 때만 데이터 파싱을 수행할 수 있도록 `useEffect`를 설정했다.
- 모달이 열릴 때 데이터를 가져와야 하므로 이를 `useEffect`안에 둠으로써 모달이 렌더링되기 전에 데이터를 가져올 수 있다.
