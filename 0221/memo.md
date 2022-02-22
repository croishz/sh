# 문제 - 함수 a에서 함수 b로 값을 전달하는 방법을 적어보세요. 
1. a의 반환값을 b의 인자로 주는 방법.
2. a의 inner 함수로 b를 넣는 거. <= closure
3. 전역변수(외부변수).
let scrolltop = null;
window.onresize = function(event){
	scrollTop = event.scrollY;
}
4. 객체 만들기.
obj = {
	name: "승혜",
	a: function a(_custom){
		this.name = _custom;
	},
	b : function b(){
		console.log(this.name);
	}
}
obj.b();

[함수 기본구조]
function name:undefined (parameter = undefined){
	return return_value = undefined;
}

[데이터 타입변환]
false === undefined // false;
false == undefined // true;

false로 바뀌는 데이터타입 또는 값. 
undefined, null, "", 0, ? <= 내일 숙제.


값을 A에서 B로 직접 주지 않고 어딘가에서 보관하는 방법으로 drilling issue를 피함.
일종의 전역변수를 사용하는 것.

@import {useContext} = 'react';
const context = useContext.createContext(initialState);
return(
	<context.provider>
		<App>
		<App/>
	<context.provider>
)

말단 컴포넌트 = (){
	const name = useContext.selector("name");
	setState(name);
}

component의 구분
controller - state의 업데이트가 가능.
presentation - props를 사용하기만 함.