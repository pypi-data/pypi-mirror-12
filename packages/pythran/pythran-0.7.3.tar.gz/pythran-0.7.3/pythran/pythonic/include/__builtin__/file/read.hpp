#ifndef PYTHONIC_INCLUDE_BUILTIN_FILE_READ_HPP
#define PYTHONIC_INCLUDE_BUILTIN_FILE_READ_HPP

#include "pythonic/include/types/file.hpp"
#include "pythonic/include/types/str.hpp"
#include "pythonic/include/utils/proxy.hpp"

namespace pythonic
{

  namespace __builtin__
  {

    namespace file
    {

      types::str read(types::file &f, long size = -1);
      types::str read(types::file &&f, long size = -1);

      PROXY_DECL(pythonic::__builtin__::file, read);
    }
  }
}
#endif
