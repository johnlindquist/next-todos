'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _inherits2 = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _getPrototypeOf = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('C:\\projects\\next-todos\\node_modules\\babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _react = require('C:\\projects\\next-todos\\node_modules\\react\\react.js');

var _react2 = _interopRequireDefault(_react);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API = 'https://now-todos-wxzbpfyrvk.now.sh/todos';

var TodoApp = function (_React$Component) {
    (0, _inherits3.default)(TodoApp, _React$Component);
    (0, _createClass3.default)(TodoApp, null, [{
        key: 'getInitialProps',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
                var req = _ref2.req;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return _axios2.default.get(API).then(function (res) {
                                    return { items: res.data };
                                });

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function getInitialProps(_x) {
                return _ref.apply(this, arguments);
            }

            return getInitialProps;
        }()
    }]);

    function TodoApp(props) {
        (0, _classCallCheck3.default)(this, TodoApp);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TodoApp.__proto__ || (0, _getPrototypeOf2.default)(TodoApp)).call(this, props));

        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.state = { items: props.items, text: '' };
        return _this;
    }

    (0, _createClass3.default)(TodoApp, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h3',
                    null,
                    'TODO'
                ),
                _react2.default.createElement(TodoList, { handleDelete: this.handleDelete, items: this.state.items }),
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.handleSubmit },
                    _react2.default.createElement('input', { onChange: this.handleChange, value: this.state.text }),
                    _react2.default.createElement(
                        'button',
                        null,
                        'Add #' + (this.state.items.length + 1)
                    )
                )
            );
        }
    }, {
        key: 'handleChange',
        value: function handleChange(e) {
            this.setState({ text: e.target.value });
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var newItem = {
                title: this.state.text,
                id: Date.now()
            };
            this.setState(function (prevState) {
                return {
                    items: prevState.items.concat(newItem),
                    text: ''
                };
            });

            _axios2.default.post(API, newItem);
        }
    }, {
        key: 'handleDelete',
        value: function handleDelete(id) {
            this.setState(function (prevState) {
                return {
                    items: prevState.items.filter(function (item) {
                        return item.id != id;
                    })
                };
            });
            _axios2.default.delete(API + '/' + id);
        }
    }]);
    return TodoApp;
}(_react2.default.Component);

exports.default = TodoApp;

var TodoList = function (_React$Component2) {
    (0, _inherits3.default)(TodoList, _React$Component2);

    function TodoList(props) {
        (0, _classCallCheck3.default)(this, TodoList);
        return (0, _possibleConstructorReturn3.default)(this, (TodoList.__proto__ || (0, _getPrototypeOf2.default)(TodoList)).call(this, props));
    }

    (0, _createClass3.default)(TodoList, [{
        key: 'render',
        value: function render() {
            var _this3 = this;

            return _react2.default.createElement(
                'ul',
                null,
                this.props.items.map(function (item) {
                    return _react2.default.createElement(
                        'li',
                        { key: item.id },
                        item.title,
                        _react2.default.createElement(
                            'button',
                            { onClick: _this3.props.handleDelete.bind(_this3, item.id) },
                            _react2.default.createElement('img', { src: 'https://icon.now.sh/delete_forever' })
                        )
                    );
                })
            );
        }
    }]);
    return TodoList;
}(_react2.default.Component);
    if (module.hot) {
      module.hot.accept()
      if (module.hot.status() !== 'idle') {
        var Component = module.exports.default || module.exports
        next.router.update('/', Component)
      }
    }
  