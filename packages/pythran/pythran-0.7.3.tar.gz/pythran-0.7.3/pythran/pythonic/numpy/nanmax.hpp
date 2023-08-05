#ifndef PYTHONIC_NUMPY_NANMAX_HPP
#define PYTHONIC_NUMPY_NANMAX_HPP

#include "pythonic/include/numpy/nanmax.hpp"

#include "pythonic/utils/proxy.hpp"
#include "pythonic/types/ndarray.hpp"
#include "pythonic/__builtin__/ValueError.hpp"
#include "pythonic/numpy/isnan.hpp"

namespace pythonic
{

  namespace numpy
  {
    template <class E, class F>
    void _nanmax(E begin, E end, F &max, utils::int_<1>)
    {
      for (; begin != end; ++begin) {
        auto curr = *begin;
        if (not proxy::isnan()(curr) and curr > max)
          max = curr;
      }
    }
    template <class E, class F, size_t N>
    void _nanmax(E begin, E end, F &max, utils::int_<N>)
    {
      for (; begin != end; ++begin)
        _nanmax((*begin).begin(), (*begin).end(), max, utils::int_<N - 1>());
    }

    template <class E>
    typename types::numpy_expr_to_ndarray<E>::T nanmax(E const &expr)
    {
      typename types::numpy_expr_to_ndarray<E>::T max = std::numeric_limits<
          typename types::numpy_expr_to_ndarray<E>::T>::lowest();
      _nanmax(expr.begin(), expr.end(), max,
              utils::int_<types::numpy_expr_to_ndarray<E>::N>());
      return max;
    }

    PROXY_IMPL(pythonic::numpy, nanmax);
  }
}

#endif
