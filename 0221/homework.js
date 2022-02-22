// Q. false로 데이터타입 바뀌는 5가지

function booleanCheck(v) {
	if (v) {
		console.log(true);
	} else {
		console.log(false);
	}
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
	btn_all_chk: document.querySelector("privacychk_all"),
	privacychk_pack: document.querySelectorAll("input[type='checkbox'].privacychk_pack"),
};

function checkboxControl() {
	let btn_all_chk;
	let privacychk_pack;

	return {
		get: function () {
			console.log(btn_all_chk);
			console.log(privacychk_pack);
		},

		set: function (_v) {
			btn_all_chk = _v.btn_all_chk;
			privacychk_pack = _v.privacychk_pack;

			this.addEvent();
		},

		addEvent: function () {
			btn_all_chk.on({
				click: this.clickAllChk,
			});
			privacychk_pack.on({
				change: this.changeChk,
			});
		},

		// 기존 코드 사용했어요
		clickAllChk: function () {
			privacychk_pack.prop("checked", this.checked);
		},

		changeChk: function () {
			const max = privacychk_pack.length;
			const now = privacychk_pack.filter(":checked").length;
			btn_all_chk.prop("checked", max == now ? true : false);
		},
	};
}

const a = checkboxControl();
a.set(el);
console.log(a.get());
