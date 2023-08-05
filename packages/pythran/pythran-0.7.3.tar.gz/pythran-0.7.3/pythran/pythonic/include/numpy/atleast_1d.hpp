#ifndef PYTHONIC_INCLUDE_NUMPY_ATLEAST1D_HPP
#define PYTHONIC_INCLUDE_NUMPY_ATLEAST1D_HPP

#include "pythonic/include/numpy/asarray.hpp"

namespace pythonic
{

  namespace numpy
  {
    template <class T>
    typename std::enable_if<types::is_dtype<T>::value,
                            types::ndarray<T, 1>>::type
    atleast_1d(T t);

    template <class T>
    auto atleast_1d(T const &t) -> typename std::enable_if<
        not(types::is_dtype<T>::value),
        typename types::numpy_expr_to_ndarray<T>::type>::type;

    PROXY_DECL(pythonic::numpy, atleast_1d);
  }
}

#endif
