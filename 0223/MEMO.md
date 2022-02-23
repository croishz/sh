# 복습

1. javascript에서 데이터타입 불린값으로 변환될 때 false로 바뀌는 아이들 - 5개 : "", null, NaN, undefined, 0

2. 정보를 전달하는 방법. (= scope를 고려하는 방법)
	2-1. closure - lexical env (정적 코드 환경)

3. class 함수에 3가지 영역이 있음. Static(이 영역 안의 값은 고정, class함수의 고유의 영역.), constructor(this 키워드를 사용해서 instance 객체에게 할당할 값을), prototype(instance에게 공유해주는 영역)

4. javascript 이벤트 진행 절차 - 캡쳐링, 버블링
	4-1. event.currentTarget / event.target의 차이. <- 이벤트 위임.

5. && 와 || - and와 or의 개념이 아님.

6. Action:interface의 이해 (flux pattern)
값을 전달할 때, 이 값을 전달하는 행위의 목적을 같이 전달하는 것.
예측가능한 로직을 만들기 쉬워지고,
책임소재를 분명히 할 수 있음.