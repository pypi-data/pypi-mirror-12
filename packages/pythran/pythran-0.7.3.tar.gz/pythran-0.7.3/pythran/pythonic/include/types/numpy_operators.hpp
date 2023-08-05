#ifndef PYTHONIC_INCLUDE_TYPES_NUMPY_OPERATORS_HPP
#define PYTHONIC_INCLUDE_TYPES_NUMPY_OPERATORS_HPP

#include "pythonic/include/types/numpy_broadcast.hpp"
#include "pythonic/include/operator_/add.hpp"
#include "pythonic/include/operator_/and_.hpp"
#include "pythonic/include/operator_/or_.hpp"
#include "pythonic/include/operator_/__xor__.hpp"
#include "pythonic/include/operator_/div.hpp"
#include "pythonic/include/operator_/eq.hpp"
#include "pythonic/include/operator_/gt.hpp"
#include "pythonic/include/operator_/ge.hpp"
#include "pythonic/include/operator_/lshift.hpp"
#include "pythonic/include/operator_/lt.hpp"
#include "pythonic/include/operator_/le.hpp"
#include "pythonic/include/operator_/mul.hpp"
#include "pythonic/include/operator_/neg.hpp"
#include "pythonic/include/operator_/not_.hpp"
#include "pythonic/include/operator_/ne.hpp"
#include "pythonic/include/operator_/pos.hpp"
#include "pythonic/include/operator_/rshift.hpp"
#include "pythonic/include/operator_/sub.hpp"
#include "pythonic/include/numpy/mod.hpp"
#include "pythonic/include/numpy/bitwise_not.hpp"
#include "pythonic/include/types/numpy_op_helper.hpp"

namespace pythonic
{
  /* operators must live in the same namespace as the associated type */
  namespace types
  {
#define NUMPY_BINARY_FUNC_NAME operator+
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::add
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator&
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::and_
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_UNARY_FUNC_NAME operator~
#define NUMPY_UNARY_FUNC_SYM numpy::proxy::bitwise_not
#include "pythonic/include/types/numpy_unary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator|
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::or_
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator^
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::__xor__
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator/
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::div
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator==
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::eq
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator%
#define NUMPY_BINARY_FUNC_SYM numpy::proxy::mod
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator>
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::gt
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator>=
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::ge
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator<<
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::lshift
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator<
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::lt
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator<=
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::le
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator*
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::mul
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_UNARY_FUNC_NAME operator-
#define NUMPY_UNARY_FUNC_SYM operator_::proxy::neg
#include "pythonic/include/types/numpy_unary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator!=
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::ne
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_UNARY_FUNC_NAME operator+
#define NUMPY_UNARY_FUNC_SYM operator_::proxy::pos
#include "pythonic/include/types/numpy_unary_op.hpp"

#define NUMPY_UNARY_FUNC_NAME operator!
#define NUMPY_UNARY_FUNC_SYM operator_::proxy::not_
#include "pythonic/include/types/numpy_unary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator>>
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::rshift
#include "pythonic/include/types/numpy_binary_op.hpp"

#define NUMPY_BINARY_FUNC_NAME operator-
#define NUMPY_BINARY_FUNC_SYM operator_::proxy::sub
#include "pythonic/include/types/numpy_binary_op.hpp"
  }
}

#endif
