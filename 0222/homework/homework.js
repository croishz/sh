// Q. false로 데이터타입 바뀌는 5가지

function booleanCheck(v) {
	if (v) {
		console.log(true);
	} else {
		console.log(false);
	}
	// console.log(v ? true : false );
}

booleanCheck("정상적인 값"); // true
booleanCheck(undefined); // false
booleanCheck(null); // false
booleanCheck(0); // false
booleanCheck(NaN); // false
booleanCheck(""); // false

// Q. checkbox interface 만들기

// element는 계속 바뀔 수 있으니까?!
const el = {
	btn_all_chk: document.querySelector("privacychk_all"), // document 내에서 수집한 해당 요소 중 1st.
	privacychk_pack: document.querySelectorAll(
		"input[type='checkbox'].privacychk_pack"
	), // nodeList 반환, prototype.forEach라는 반복문이 있음.

	// getElementById
	// getElementsByClassName() // HTMLCollection
	// Array.prototype.map.call(document.querySelectorAll(".selector"), callback);
	// const a = ...a.geta
	// a.map = Array.prototype.map;
	// const [...nodelist] = document.querySelectorAll(...);
	// nodeList.map()
};

// class 승혜 {
// 	// static field
// 	static default_className = "아임승혜";

// 	// 생성자 필드
// 	constructor(){

// 	}
// 	// prototype field
// 	create(){
// 		console.log(승혜.default_className);
// 	}
// 	read(){}
// 	utility(){}
// 	delete(){}
// }

// class 승혜클론 extends 승혜 {
// 	constructor(){
// 		console.log(super());
// 	}
// }

function checkboxControl() {
	let btn_all_chk;
	let chk_pack;

	return {
		// get: function () {
		// 	console.log(btn_all_chk);
		// 	console.log(chk_pack);
		// },

		set: function (_element) {
			$this = $(this);
			_this = this;
			btn_all_chk = _element.btn_all_chk || "";
			chk_pack = _element.privacychk_pack || "";
		},
		// init: function (param) {
		// 	this.set(param);
		// 	this.addEvent();
		// },
		runEvent: function () {
			this.addEvent();
		},
		addEvent: function () {
			btn_all_chk.on({
				click: this.clickAllChk,
			});
			chk_pack.on({
				change: this.changeChk,
			});
		},

		// 기존 코드 사용했어요
		clickAllChk: function () {
			chk_pack.prop("checked", this.checked);
		},

		changeChk: function () {
			const max = chk_pack.length;
			const now = chk_pack.filter(":checked").length;
			btn_all_chk.prop("checked", max == now ? true : false);
		},
	};
}

const privacyCheckControl = checkboxControl();
const element = {
	all_button: document.querySelector("privacychk_all"), // document 내에서 수집한 해당 요소 중 1st.
	checkbox: document.querySelectorAll(
		"input[type='checkbox'].agreement-checkbox"
	), // nodeList 반환, prototype.forEach라는 반복문이 있음.

	// getElementById
	// getElementsByClassName() // HTMLCollection
	// Array.prototype.map.call(document.querySelectorAll(".selector"), callback);
	// const a = ...a.geta
	// a.map = Array.prototype.map;
	// const [...nodelist] = document.querySelectorAll(...);
	// nodeList.map()
};
privacyCheckControl.set(el);
console.log(privacyCheckControl.get());

평가 : 50점.