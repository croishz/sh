// checkbox
const 승혜 = new Object({ aka: "master" });

// custom DOM creator 개념은 React.createElement와 같음.
승혜.createElement = function (_nodeName, _attributes = []) {
	const element = document.createElement(_nodeName);
	if (0 >= _attributes.length) return element;
	_attributes.forEach((pair) => {
		const { name = "", value = "" } = pair;
		if (name === "className") return element.classList.add(value);
		if (name === "text") return (element.innerText = value);
		element.setAttribute(name, value);
	});
	return element;
};
console.log(승혜);
const button = 승혜.createElement("button", [
	{ name: "className", value: "btn" },
	{ name: "type", value: "button" },
	{ name: "text", value: "Click!" },
	{
		name: "style",
		value:
			"margin-top:20px;background:#fff;border-radius:4px;border:2px solid #d9d9d9;font-size:18px;padding:7px 26px;cursor:pointer;",
	},
]);
const checkbox1 = 승혜.createElement("input", [
	{ name: "type", value: "checkbox" },
	{ name: "id", value: "chk1" },
	{ name: "text", value: "checkbox1" },
	{ name: "name", value: "checkbox_test" },
]);
const checkbox2 = 승혜.createElement("input", [
	{ name: "type", value: "checkbox" },
	{ name: "id", value: "chk2" },
	{ name: "name", value: "checkbox_test" },
]);
const checkbox3 = 승혜.createElement("input", [
	{ name: "type", value: "checkbox" },
	{ name: "id", value: "chk3" },
	{ name: "name", value: "checkbox_test" },
]);
const label1 = 승혜.createElement("label", [
	{ name: "for", value: "chk1" },
	{ name: "text", value: "checkbox1" },
	{
		name: "style",
		value: "width:100px; border:1px solid #cecece;padding:10px;cursor:pointer;",
	},
]);
const label2 = 승혜.createElement("label", [
	{ name: "for", value: "chk2" },
	{ name: "text", value: "checkbox2" },
	{
		name: "style",
		value: "width:100px; border:1px solid #cecece;padding:10px;cursor:pointer;",
	},
]);
const label3 = 승혜.createElement("label", [
	{ name: "for", value: "chk3" },
	{ name: "text", value: "checkbox3" },
	{
		name: "style",
		value: "width:100px; border:1px solid #cecece;padding:10px;cursor:pointer;",
	},
]);
console.log(button);
console.log(checkbox1);
console.log(checkbox2);
console.log(checkbox3);

window.addEventListener(
	"DOMContentLoaded", // == $(document).ready(...)
	function () {
		const elements = [checkbox1, label1, checkbox2, label2, checkbox3, label3];
		const wrap = 승혜.createElement("div", [
			{
				name: "className",
				value: "wrap",
			},
			{
				name: "style",
				value:
					"background-color:#f8f9f9; display:inline-flex; gap:20px; align-items:center; padding:20px; margin-right:20px;",
			},
		]);
		document.body.append(wrap, button);
		wrap.append(...elements);

		// event listening
		const checkboxes = [checkbox1, checkbox2, checkbox3];
		// button.addEventListener("click", () => {
		// 	checkboxes.forEach((checkbox) => {
		// 		checkToggle(checkbox);
		// 	});
		// });
		// checkboxes.forEach((checkbox) => {
		// 	checkbox.addEventListener("click", () => {
		// 		checkToggle(this);
		// 		const max = checkboxes.length;
		// 		const now = checkboxes.filter((el) => el.checked).length;
		// 		// if (max <= now) return (button.style.backgroundColor = "lightcoral");
		// 		// button.style.backgroundColor = "white";
		// 		button.style.backgroundColor = max <= now ? "lightcoral" : "white";
		// 	});
		// });
		function checkToggle(_target) {
			_target.checked = !_target.checked;
		}

		const interface = {
			CHECK_EACH: "check/each",
			CHECK_ALL: "check/all",
		};
		// const initial_state = checkboxes.reduce((data, checkbox, index) => {
		// 	data.push({
		// 		id: checkbox.id,
		// 		checked: checkbox.checked,
		// 	});
		// 	return data;
		// }, []);
		// console.log(initial_state);
		const useReducer = function (_reducer, _initial_state) {
			const state = _initial_state || null;
			checkboxes.forEach(
				(checkbox, index) => (checkbox.checked = state[index].checked)
			);
			return [
				state,
				function dispatch(_action_object) {
					_reducer(state, _action_object);
				},
			];
		};
		const reducer = function (_state, _action) {
			switch (action.type) {
				case interface[CHECK_ALL]:
					_state.map(set => set.id === )
				case interface[CHECK_EACH]:
			}
		};
		const [state, dispatch] = useReducer(reducer, initial_state);

		const controller = function (action) {
			switch (action.type) {
				case interface.CHECK_EACH:
					checkboxes.map((checkbox) => {
						checkbox.id === action.id && checkToggle(checkbox);

						const max = checkboxes.length;
						const now = checkboxes.filter((el) => el.checked).length;
						if (max <= now)
							return (button.style.backgroundColor = "lightcoral");
						button.style.backgroundColor = "white";
					});
					return false;
				case interface.CHECK_ALL:
					checkboxes.forEach((checkbox) => {
						checkToggle(checkbox);
					});
					return false;
			}
		};
		document.addEventListener("click", ({ currentTarget, target }) => {
			const climbing = (_target) => {
				if (_target instanceof HTMLLabelElement) return target;
				climbing(_target.parentElement);	// 재귀함수
			};
			
			climbing(event.target);
			console.log(currentTarget);
			console.log(target);
			if (target instanceof HTMLLabelElement)
				return controller({
					type: interface.CHECK_EACH,
					id: target.getAttribute("for"),
				});
			if (target instanceof HTMLInputElement)
				return controller({
					type: interface.CHECK_EACH,
					id: target.id,
				});
			if (isClickButton) return controller({
					type: interface.CHECK_ALL,
				});;
			return false;
			const isClickButton = ()=>{
				controller({
					type: interface.CHECK_ALL,
				});
			};
			const isClickCheckbox = ()=>{
				controller({
					type: interface.CHECK_EACH,
				});
			};
			const isClickLabel = ()=>{
				controller({
					type: interface.CHECK_EACH,
				});
			};
		});
	},
	false
);
