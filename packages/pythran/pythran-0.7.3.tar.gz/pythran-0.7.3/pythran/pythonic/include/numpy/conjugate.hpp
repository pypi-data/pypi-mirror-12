#ifndef PYTHONIC_INCLUDE_NUMPY_CONJUGATE_HPP
#define PYTHONIC_INCLUDE_NUMPY_CONJUGATE_HPP

#include "pythonic/include/utils/proxy.hpp"
#include "pythonic/include/types/ndarray.hpp"
#include "pythonic/include/types/numexpr_to_ndarray.hpp"
#include "pythonic/include/utils/numpy_traits.hpp"
#include <nt2/sdk/complex/complex.hpp>
#include <nt2/include/functions/conj.hpp>

namespace pythonic
{

  namespace numpy
  {
#define NUMPY_NARY_FUNC_NAME conjugate
#define NUMPY_NARY_FUNC_SYM nt2::conj
#include "pythonic/include/types/numpy_nary_expr.hpp"
  }
}

#endif
