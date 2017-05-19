"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var cx = _interopRequire(require("classnames"));

var ListItem = React.createClass({
	displayName: "ListItem",

	getDefaultProps: function getDefaultProps() {
		return {
			disabled: false,
			selected: false,
			focused: false };
	},
	render: function render() {
		var _this = this;

		var classes = cx("react-list-select--item", {
			"is-disabled": this.props.disabled,
			"is-selected": this.props.selected,
			"is-focused": this.props.focused });

		return React.createElement(
			"li",
			{ className: classes,
				onMouseOver: function () {
					return _this.props.onMouseOver(_this.props.index);
				},
				onClick: function (event) {
					return _this.props.onChange({ event: event, index: _this.props.index });
				} },
			this.props.children
		);
	}
});

module.exports = ListItem;