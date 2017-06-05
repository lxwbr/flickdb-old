"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var cx = _interopRequire(require("classnames"));

var map = _interopRequire(require("lodash/collection/map"));

var includes = _interopRequire(require("lodash/collection/includes"));

var isNumber = _interopRequire(require("lodash/lang/isNumber"));

var min = _interopRequire(require("lodash/collection/min"));

var max = _interopRequire(require("lodash/collection/max"));

var range = _interopRequire(require("lodash/utility/range"));

var remove = _interopRequire(require("lodash/array/remove"));

var reject = _interopRequire(require("lodash/collection/reject"));

var uniq = _interopRequire(require("lodash/array/uniq"));

var _keys = require("./keys");

var KEYS = _keys.KEYS;
var KEY = _keys.KEY;

var ListItem = _interopRequire(require("./ListItem"));

var List = React.createClass({
	displayName: "List",

	getDefaultProps: function getDefaultProps() {
		return {
			items: [],
			selected: [],
			disabled: [],
			multiple: false,
			onChange: function () {}
		};
	},

	getInitialState: function getInitialState() {
		return {
			items: this.props.items,
			selectedItems: this.props.selected,
			disabledItems: this.props.disabled,
			focusedIndex: null,
			lastSelected: null };
	},

/*
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			items: nextProps.items,
			selectedItems: nextProps.selected,
			disabledItems: nextProps.disabled });
	},
*/

	clear: function clear() {
		this.setState({
			selected: [],
			disabled: [],
			focusedIndex: null,
			lastSelected: null
		});
	},

	select: function select() {
		var _ref = arguments[0] === undefined ? {} : arguments[0];

		var _ref$index = _ref.index;
		var index = _ref$index === undefined ? null : _ref$index;
		var _ref$contiguous = _ref.contiguous;
		var contiguous = _ref$contiguous === undefined ? false : _ref$contiguous;

		if (includes(this.state.disabledItems, index)) {
			return;
		}var multiple = this.props.multiple;
		var lastSelected = this.state.lastSelected;

		var selectedItems = multiple ? this.state.selectedItems.concat(index) : [index];

		if (contiguous && multiple && isNumber(lastSelected)) {
			var start = min([lastSelected, index]);
			var end = max([lastSelected, index]);

			selectedItems = uniq(selectedItems.concat(range(start, end + 1)));
		}

		this.setState({ selectedItems: selectedItems, lastSelected: index });

		this.props.onChange(multiple ? selectedItems : index);
	},

	deselect: function deselect() {
		var _ref = arguments[0] === undefined ? {} : arguments[0];

		var _ref$index = _ref.index;
		var index = _ref$index === undefined ? null : _ref$index;
		var _ref$contiguous = _ref.contiguous;
		var contiguous = _ref$contiguous === undefined ? false : _ref$contiguous;
		var multiple = this.props.multiple;
		var _state = this.state;
		var selectedItems = _state.selectedItems;
		var lastSelected = _state.lastSelected;

		if (contiguous && multiple && isNumber(lastSelected)) {
			(function () {
				var start = min([lastSelected, index]);
				var end = max([lastSelected, index]);

				var toDeselect = range(start, end + 1);
				selectedItems = reject(selectedItems, function (idx) {
					return includes(toDeselect, idx);
				});
			})();
		} else {
			selectedItems = reject(selectedItems, function (idx) {
				return idx === index;
			});
		}

		this.setState({ selectedItems: selectedItems, lastSelected: index });
		this.props.onChange(this.props.multiple ? selectedItems : null);
	},

	enable: function enable(index) {
		var disabledItems = this.state.disabledItems;

		var indexOf = disabledItems.indexOf(index);

		disabledItems.splice(indexOf, 1);

		this.setState({ disabledItems: disabledItems });
	},

	disable: function disable(index) {
		this.setState({ disabledItems: this.state.disabledItems.concat(index) });
	},

	focusItem: function focusItem() {
		var _ref = arguments[0] === undefined ? {} : arguments[0];

		var _ref$next = _ref.next;
		var next = _ref$next === undefined ? false : _ref$next;
		var _ref$previous = _ref.previous;
		var previous = _ref$previous === undefined ? false : _ref$previous;
		var _ref$index = _ref.index;
		var index = _ref$index === undefined ? null : _ref$index;
		var _state = this.state;
		var focusedIndex = _state.focusedIndex;
		var disabledItems = _state.disabledItems;

		var lastItem = this.state.items.length - 1;

		if (next) {
			if (focusedIndex == null) {
				focusedIndex = 0;
			} else {
				// focus first item if reached last item in the list
				focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1;
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1;
				}
			}
		} else if (previous) {
			if (focusedIndex == null) {
				focusedIndex = lastItem;
			} else {
				// focus last item if reached the top of the list
				focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1;
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1;
				}
			}
		} else if (!includes(disabledItems, index) && isNumber(index)) {
			focusedIndex = index;
		}

		this.setState({ focusedIndex: focusedIndex });
	},

	onKeyDown: function onKeyDown(event) {
		var key = event.keyCode;

		if (key == KEY.UP || key == KEY.K) {
			this.focusItem({ previous: true });
		} else if (key == KEY.DOWN || key == KEY.J) {
			this.focusItem({ next: true });
		} else if (key == KEY.SPACE || key == KEY.ENTER) {
			this.toggleSelect({ event: event, index: this.state.focusedIndex });
		}

		// prevent default behavior, in some situations pressing the key
		// up / down would scroll the browser window
		if (includes(KEYS, key)) {
			event.preventDefault();
		}
	},

	toggleSelect: function toggleSelect() {
		var _ref = arguments[0] === undefined ? {} : arguments[0];

		var event = _ref.event;
		var index = _ref.index;

		event.preventDefault();
		var shift = event.shiftKey;

		if (!includes(this.state.selectedItems, index)) {
			this.select({ index: index, contiguous: shift });
		} else if (this.props.multiple) {
			this.deselect({ index: index, contiguous: shift });
		}
	},

	render: function render() {
		var _this = this;

		var items = map(this.props.items, function (itemContent, index) {
			var disabled = includes(_this.state.disabledItems, index);
			var selected = includes(_this.state.selectedItems, index);
			var focused = _this.state.focusedIndex === index;

			return React.createElement(
				ListItem,
				{ key: index,
					index: index,
					disabled: disabled,
					selected: selected,
					focused: focused,
					onMouseOver: function (index) {
						return _this.focusItem({ index: index });
					},
					onChange: _this.toggleSelect },
				itemContent
			);
		});

		return React.createElement(
			"ul",
			{ className: cx("react-list-select", this.props.className),
				tabIndex: 0,
				onKeyDown: this.onKeyDown },
			items
		);
	}
});

module.exports = List;