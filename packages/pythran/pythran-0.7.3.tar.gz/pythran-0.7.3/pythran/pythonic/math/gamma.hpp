#ifndef PYTHONIC_MATH_GAMMA_HPP
#define PYTHONIC_MATH_GAMMA_HPP

#include "pythonic/include/math/gamma.hpp"

#include "pythonic/utils/proxy.hpp"
#include <cmath>

namespace pythonic
{

  namespace math
  {
    double gamma(double x)
    {
      return std::tgamma(x);
    }

    PROXY_IMPL(pythonic::math, gamma);
  }
}

#endif
