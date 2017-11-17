'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _Header = require('../component/Header');

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/zhengwenping/works/webServer/demo/front-end-thinking/next.js-methods/pages/index.js?entry';


var PostLink = function PostLink(props) {
  return _react2.default.createElement('li', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, _react2.default.createElement(_link2.default, { as: '/p/' + props.id, href: '/post?title=' + props.title, __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, _react2.default.createElement('a', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, props.title)));
};

var Index = function Index() {
  return _react2.default.createElement('div', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, _react2.default.createElement(_Header2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }), _react2.default.createElement(_link2.default, { href: '/about', __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, _react2.default.createElement('button', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, 'Go to About Page')), _react2.default.createElement('p', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24
    }
  }, 'Hello Next.js'), _react2.default.createElement('ul', {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, _react2.default.createElement(PostLink, { id: 'hello-next.js', title: 'Hello Next', __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }), _react2.default.createElement(PostLink, { id: 'app-next.js', title: 'apps Next', __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  })));
};

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxpbmsiLCJIZWFkZXIiLCJQb3N0TGluayIsInByb3BzIiwiaWQiLCJ0aXRsZSIsIkluZGV4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsQUFBTzs7OztBQUNQLEFBQU8sQUFBWTs7Ozs7Ozs7O0FBR25CLElBQU0sV0FBVyxTQUFYLEFBQVcsU0FBQSxBQUFDLE9BQVUsQUFDMUI7eUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxBQUFDLGdDQUFLLFlBQVUsTUFBaEIsQUFBc0IsSUFBTSx1QkFBcUIsTUFBakQsQUFBdUQ7Z0JBQXZEO2tCQUFBLEFBQ0U7QUFERjtxQkFDRSxjQUFBOztnQkFBQTtrQkFBQSxBQUFJO0FBQUo7QUFBQSxXQUhOLEFBQ0UsQUFDRSxBQUNFLEFBQVUsQUFJakI7QUFSRDs7QUFXQSxJQUFNLFFBQVEsU0FBUixBQUFRLFFBQU0sQUFDbEI7eUJBQ0UsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsR0FBQSxrQkFDRSxBQUFDOztnQkFBRDtrQkFERixBQUNFLEFBQ0E7QUFEQTtBQUFBLHNCQUNBLEFBQUMsZ0NBQUssTUFBTixBQUFXO2dCQUFYO2tCQUFBLEFBQ0U7QUFERjtxQkFDRSxjQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FISixBQUVFLEFBQ0UsQUFFRixzQ0FBQSxjQUFBOztnQkFBQTtrQkFBQTtBQUFBO0FBQUEsS0FMRixBQUtFLEFBQ0Esa0NBQUEsY0FBQTs7Z0JBQUE7a0JBQUEsQUFDRTtBQURGO0FBQUEsbUNBQ0UsQUFBQyxZQUFTLElBQVYsQUFBYSxpQkFBZ0IsT0FBN0IsQUFBbUM7Z0JBQW5DO2tCQURGLEFBQ0UsQUFDQTtBQURBO29DQUNBLEFBQUMsWUFBUyxJQUFWLEFBQWEsZUFBYyxPQUEzQixBQUFpQztnQkFBakM7a0JBVE4sQUFDRSxBQU1FLEFBRUUsQUFJUDtBQUpPOztBQVZSLEFBZ0JBOztrQkFBQSxBQUFlIiwiZmlsZSI6ImluZGV4LmpzP2VudHJ5Iiwic291cmNlUm9vdCI6Ii9Vc2Vycy96aGVuZ3dlbnBpbmcvd29ya3Mvd2ViU2VydmVyL2RlbW8vZnJvbnQtZW5kLXRoaW5raW5nL25leHQuanMtbWV0aG9kcyJ9