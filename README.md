## PDF 파일에서 텍스트 추출하는 프로젝트

PDF파일에서 텍스트를 추출하는 프로젝트입니다.
신 구조문을 배열 형태로 파싱하기 위해서 PDF의 텍스트를 x좌표 기준으로 나누었습니다.
다른 의안 파일로도 x좌표 기준 파싱이 작동되는 것을 확인했습니다.


**yarn** 패키지를 사용하여 **Create React App**으로 프로젝트를 만들었습니다.

프로젝트를 내려받고 이하의 명령어로 의존성을 설치하시면 됩니다.

```
yarn install
```

그리고 다음의 명령어로 프로젝트를 실행하시면 됩니다.

```
yarn start
```

화면에 보이는 파일 선택란에 PDF 의안파일을 업로드하면 PDF 뷰어가 생깁니다. 

![image](https://github.com/user-attachments/assets/3c6e75e6-a5b9-42a4-bba4-0ad5452996a7)


![image](https://github.com/user-attachments/assets/06839f3f-dbae-44ba-95a0-ae4eae79a3a6)

PDF 페이지 이동도 가능합니다. 

![image](https://github.com/user-attachments/assets/82895817-1c4b-40fe-83de-595b25d9c7f6)

F12를 눌러 개발자도구의 콘솔을 확인하면 배열 형태로 파싱된 결과가 나옵니다.

다음과 같이 파싱 결과를 확인할 수 있습니다.
신 구조문이 아닌 PDF 텍스트들은 따로 처리하지 않았습니다.

![image](https://github.com/user-attachments/assets/a55aea05-659d-4306-9c76-c6a289867049)
