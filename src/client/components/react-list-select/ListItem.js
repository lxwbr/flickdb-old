"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var cx = _interopRequire(require("classnames"));

class ListItem extends React.Component {
	constructor(props) {
		super(props);
		this.displayName = "ListItem"
	}
	
	static get defaultProps() {
		return {
			disabled: false,
			selected: false,
			focused: false
		}
	}

	render() {
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
}

module.exports = ListItem;