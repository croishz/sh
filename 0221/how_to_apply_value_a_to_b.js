/* ----- 함수 A에서 함수 B로 값을 전달할 수 있는 방법 찾기 ---- */

// Test
// 함수 print에서 함수 value_creator의 값을 출력할 수 있는 방법을 4가지 이상 만들어보세요.
function print(_v) {
	if (typeof _v === "string")
		return console.log(`-=-=-=-=-= Print Value : ${_v}`);
	console.log("-=-=-=-=-= Print Value : ", _v);
}
function value_creator() {
	let value = 0;
	return {
		get: function () {
			console.count("get");
			return value;
		},
		set: function (_v) {
			value = _v;
		},
	};
}

// 1. closure를 이용.
// 값 : null
const a = value_creator();
a.set(null);
print(a.get());

// 2. 전역 변수를 이용.
// 값 : "null2"
let value = "null2";
a.set(value);
print(a.get());
// 2-1. 전역 변수의 값을 변경할 시.
value = [1, 2, 3];
print(a.get());
print(value); // 반영되지 않음.

// 3. 공유 객체를 이용하는 방법.
// 값 : "eee"
const c = {
	alpha: value_creator(),
	beta: print,
};
c.alpha.set("eee");
c.seta = c.alpha.get();
c.beta(c.seta);

// 4. 제 3의 함수에서 받아 전달.
// 값 : {react: "js framework", user: "anyone"}
const another = function () {
	let store = new Object();
	return {
		store_update: function (_data) {
			// console.log("받은 데이터 : ", _data);
			if (store != data) {
				store = {
					...store,
					..._data,
				};
			}
		},
		read: function () {
			return store;
		},
		useSelector: function (name) {
			return store[name];
		},
		dispatch: function (data) {
			this.store_update(data);
		},
	};
};

a.set({
	react: "js framework",
	user: "anyone",
});
const 제3함수 = another();
제3함수.update(a.get());
print(제3함수.read());

// 5. print를 callback으로 사용해 인자를 전달.
// 값 : { 승혜: "aka. 만렙" }
a.set({ 승혜: "aka. 만렙" });
a.set = function (callback) {
	callback(a.get());
};
a.set(print);

// 번외. 다른 객체의 prototype.method를 사용.
const 함수A = function (value, index) {
	const t = "승혜";
	if (index === 3) return t;
	return value;
};
const 함수B = function (value, index) {
	index === 3; // value = 승혜;
};
[(0, 0, 0, 0, 0)]
	.map(함수A) // 기대값 [0, 0, 0, "승혜", 0]
	.map(함수B);

/* 
react는 모던 자바스크립트를 따름. 
모던 자바스크립트는 외부에서 내부의 정보를 바꾸거나, 외부의 변수를 참조해서 내부에서 사용하는 방법을 지향함. 
- 그래서 전역변수의 사용을 피하며,
- react의 모든 함수(컴포넌트)는 get과 set이 없는 캡슐화를 기반으로 함. 
- 이로 인해 data를 전달할 수 있는 방법에 제한이 있음. 
- 가장 쉽게 사용할 수 있는 방법이 매개변수를 이용하는 것.


또한 data의 흐름을 양방향이 아닌 단방향으로 제한함.
- A에서 B로 전달은 가능하지만, B에서 A로는 전달이 어려움. 
	후자를 위해서 B를 A 스코프 안에 포함시키는 코드를 작성하게 되나, 
	해당 컴포넌트가 가지는 data의 양이 커지면 바람직하지 않아짐.
	A 컴포넌트에 B부터 Z까지의 컴포넌트가 모두 달려있다면 관련된 로직이 많아져 매우 복잡해지는 것.

위 원칙들에 의해서 
function outer(){
	const state = ...;
	return (
		<component1 style={state.style}>
	)

	inner1(state.a);
	inner1(state.b);
};
function inner1(props){
	const {} = props;
	....
};

의 구조를 갖게 됨. react를 가장 단순하게 도식으로 만들면 (props = state) => props => props => ..... 와 같음.
다만 이런 폭포수 구조 때문에 inner의 inner의 inner에게 값을 전달하기가 매우 번거로운 drilling issue가 생김. 

이 단점을 극복하기 위해 제공된 react 내부 도구가 useContext - context api -. 
(다만, 공식 문서상에서는 이에 대한 언급은 없음. 만들어진 이유는 다른 것 때문.)
react 외부 도구 - react 라이브러리 - 에서 제공한 것이 store.  
그래서 mobx나 redux라는 상태 관리 도구를 같이 사용하는 것이 필수가 된 것.
*/

// action 객체의 이해.
// [ 값을 전달할 때, 이 값을 전달하는 행위의 목적을 같이 전달하는 것. ]
// 따라서 CRUD interface와 유사함.
// URL, URI처럼 a/b/c...등의 구조를 가짐.
// UI 요소에서 발생할 인터랙션을 앞서 정의 - interface 정의 - 해서 해당 interface의 로직이 구동하도록 유도함.

// 예측가능하기 쉬워지며,
// 책임소재를 찾기가 쉬워짐.
// 해당 interface를 유발시키는 ui 요소가 복수 이상이더라도 코드를 재사용하므로 중복 코드가 나오는 것을 예방함.

// sample
const CHANGE_PASSWORD_NOW = "change password/now";
const CHANGE_PASSWORD_LATER = "change password/later";
const api = {
	"change password/now": function () {},
	"change password/later": function () {},
};
function reducer(action) {
	switch (action.interface) {
		case CHANGE_PASSWORD_NOW:
			return api[CHANGE_PASSWORD_NOW];
		case CHANGE_PASSWORD_LATER:
			return api[CHANGE_PASSWORD_LATER];
	}
}
function action_creator(interface, data) {
	const action = {
		interface,
		data,
	};
	return action;
}
document.createElement("button").addEventListener("click", (event) => {
	const action = action_creator({
		inteface: CHANGE_PASSWORD_NOW,
		eventType: event.type,
		target: event.currentTarget,
		password: target.value,
	});
	reducer(action);
});
