---
title: React-Sheet-js
date: "2023-07-10"
template: "post"
draft: false
slug: "/posts/react-sheet-js"
category: "React"
tags:
  - "React"
  - "Sheet.js"
description: "Sheet.js 라이브러리를 활용한 데이터 엑셀 다운로드 기능 구현하기"
# socialImage: "./media/notebook.jpg"
---

### React SheetJS

| SheetJS은 복잡한 스프레드시트에서 유용한 데이터를 추출하고 레거시 및 최신 소프트웨어에서 모두 작동하는 새 스프레드시트를 생성하기 위한 솔루션을 제공한다. 스프레드시트 읽기, 편집 및 내보내기가 필요할 때 사용가능한 라이브러리이다.

- 설치 (node)

```jsx
npm i --save https://cdn.sheetjs.com/xlsx-0.20.0/xlsx-0.20.0.tgz
```

### SheetJS 사용법

**`App.js`**

```jsx
import excelDownload from "./libs/excel-download";
import "./App.css";

function App() {
  const thead = ["Country", "Code", "Capital"];
  const tableData = [
    {
      Country: "Korea",
      Code: "+82",
      Capital: "Seoul",
    },
    {
      Country: "United States",
      Code: "+1",
      Capital: "Washington, D.C.",
    },
    {
      Country: "France",
      Code: "+33",
      Capital: "Paris",
    },
  ];
  const handleExcel = () => {
    excelDownload({
      thead,
      tableData,
      sheetName: "테스트테이블",
      fileName: "테스트테이블.xlsx",
    });
  };
  return (
    <>
      <table>
        <thead>
          <tr>
            {thead.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.Country}</td>
              <td>{row.Code}</td>
              <td>{row.Capital}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleExcel}>excel download</button>
    </>
  );
}

export default App;
```

1. `thead`, `tableData` 라는 이름의 배열 변수를 선언하고, 테이블의 데이터를 나타내는 객체들을 요소로 갖는다.
2. `handleExcel` 함수를 선언하고 이 함수는 Excel 파일을 다운로드하는 역할을 수행한다.
3. 호출한 `excelDownload` 함수에는 `thead` 와 `tableData` 배열, 시트 이름("테스트테이블") 및 파일 이름("테스트테이블.xlsx")을 전달한다.

**`excel-download.js`**

```jsx
import XLSX from "xlsx";

const excelDownload = ({ thead, tableData, sheetName, fileName }) => {
  // 1. 시트 데이터로 변환
  const sheetData = [thead, ...tableData.map((obj) => Object.values(obj))];
  console.log("sheetData", sheetData);

  // 2. excel 워크북 만들기
  const workbook = XLSX.utils.book_new();

  // 3. 생성한 워크북에 시트 데이터를 넣고 sheetName을 지정한다.
  const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  // 4. 해당 워크북에 지정한 파일이름으로 파일을 생성한다.
  XLSX.writeFile(workbook, fileName);
};

export default excelDownload;
```

1. `excelDownload` 함수를 정의하고, 함수에 전달된 매개변수를 추출한다. 매개변수로는 ({ thead, tableData, sheetName, fileName }) 이 포함된다.
2. `sheetData` 배열을 생성한다. 이 배열은 테이블 데이터의 시트 형식으로 변환된다. 먼저, `thead` 배열을 `sheetData`에 추가한다. 그 다음, `tableData` 배열의 각 객체를 순회하면서 `Object.values()` 함수를 사용하여 객체의 값들을 추출한 배열을 `sheetData`에 추가한다. 이렇게 하면 객체의 속성 값들만 남게 된다.
3. `XLSX.utils.aoa_to_sheet()` 함수를 사용하여 시트 데이터(`sheetData`)를 기반으로 새로운 워크시트(`worksheet`)를 생성한다. `aoa_to_sheet`는 "Array of Arrays"의 약어로, 2차원 배열을 워크시트로 변환하는 기능을 제공한다.

| 요약하자면, 위의 코드는 테이블 데이터를 엑셀 파일로 다운로드하기 위한 함수인 `excelDownload`를 정의하고, 해당 함수의 매개변수를 추출하여 활용한다. 그리고 `thead`와 `tableData`를 사용하여 시트 데이터를 만들고, 이를 기반으로 새로운 워크시트를 생성한다.

### 결과
- 화면
![image](https://github.com/tamoimi/sheet-js/assets/100749520/9a36a698-2362-4bc0-985b-4af6184cf241)
- 엑셀 파일
![image](https://github.com/tamoimi/sheet-js/assets/100749520/b4e38929-a4e6-49ef-b16f-0f926ece03ca)

### 데이터를 가져오는 형식
- `aoa_to_sheet` JS 데이터 배열의 배열을 워크시트로 변환
- `json_to_sheet` JS 개체의 배열을 워크시트로 변환
- `table_to_sheet` DOM TABLE 요소를 워크시트로 변환
- `sheet_add_aoa` 기존 워크시트에 JS 데이터 배열 배열을 추가
- `sheet_add_json` 기존 워크시트에 JS 개체 배열을 추가
