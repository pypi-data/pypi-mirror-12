#ifndef PYTHONIC_INCLUDE_NUMPY_NEGATIVE_HPP
#define PYTHONIC_INCLUDE_NUMPY_NEGATIVE_HPP

#include "pythonic/include/utils/proxy.hpp"
#include "pythonic/include/types/ndarray.hpp"
#include "pythonic/include/types/numexpr_to_ndarray.hpp"
#include "pythonic/include/utils/numpy_traits.hpp"
#include "pythonic/include/operator_/neg.hpp"

namespace pythonic
{

  namespace numpy
  {

#define NUMPY_NARY_FUNC_NAME negative
#define NUMPY_NARY_FUNC_SYM pythonic::operator_::neg
#include "pythonic/include/types/numpy_nary_expr.hpp"
  }
}

#endif
