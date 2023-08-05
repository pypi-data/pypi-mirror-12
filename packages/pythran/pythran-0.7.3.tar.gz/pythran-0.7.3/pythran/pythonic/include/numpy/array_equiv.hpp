#ifndef PYTHONIC_INCLUDE_NUMPY_ARRAYEQUIV_HPP
#define PYTHONIC_INCLUDE_NUMPY_ARRAYEQUIV_HPP

#include "pythonic/include/numpy/array_equal.hpp"
#include "pythonic/include/numpy/asarray.hpp"

namespace pythonic
{

  namespace numpy
  {
    template <class I0, class U>
    bool _array_equiv(I0 vbegin, I0 vend, U const &uu);

    template <class U, class V>
    typename std::enable_if<types::numpy_expr_to_ndarray<U>::N ==
                                types::numpy_expr_to_ndarray<V>::N,
                            bool>::type
    array_equiv(U const &u, V const &v);

    template <class U, class V>
        typename std::enable_if <
        types::numpy_expr_to_ndarray<U>::N<types::numpy_expr_to_ndarray<V>::N,
                                           bool>::type
        array_equiv(U const &u, V const &v);

    template <class U, class V>
    typename std::enable_if<(types::numpy_expr_to_ndarray<U>::N >
                             types::numpy_expr_to_ndarray<V>::N),
                            bool>::type
    array_equiv(U const &u, V const &v);

    template <class I0, class U>
    bool _array_equiv(I0 vbegin, I0 vend, U const &uu);

    PROXY_DECL(pythonic::numpy, array_equiv);
  }
}

#endif
