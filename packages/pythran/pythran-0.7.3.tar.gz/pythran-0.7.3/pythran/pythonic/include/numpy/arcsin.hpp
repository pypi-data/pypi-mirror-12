#ifndef PYTHONIC_INCLUDE_NUMPY_ARCSIN_HPP
#define PYTHONIC_INCLUDE_NUMPY_ARCSIN_HPP

#include "pythonic/include/utils/proxy.hpp"
#include "pythonic/include/types/ndarray.hpp"
#include "pythonic/include/types/numexpr_to_ndarray.hpp"
#include "pythonic/include/utils/numpy_traits.hpp"
#include <nt2/include/functions/asin.hpp>

namespace nt2
{
  double asin(long l);
}

namespace pythonic
{

  namespace numpy
  {
#define NUMPY_NARY_FUNC_NAME arcsin
#define NUMPY_NARY_FUNC_SYM nt2::asin
#include "pythonic/include/types/numpy_nary_expr.hpp"
  }
}

#endif
