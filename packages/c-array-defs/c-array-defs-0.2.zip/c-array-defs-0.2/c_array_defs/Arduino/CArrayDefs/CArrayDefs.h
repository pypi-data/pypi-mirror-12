#ifndef ___C_ARRAY_DEFS__H___
#define ___C_ARRAY_DEFS__H___

#include <stdint.h>  // Defines `uint8_t`, etc.
#include <stddef.h>  // Defines `NULL`


class Int8Array {
public:
  uint32_t length;
  int8_t *data;
};


class Int16Array {
public:
  uint32_t length;
  int16_t *data;
};


class Int32Array {
public:
  uint32_t length;
  int32_t *data;
};


class UInt8Array {
public:
  uint32_t length;
  uint8_t *data;
};


/*
 * Define initialization functions outside of `UInt8Array` class so that
 * `UInt8Array` can remain a [Plain Old Data (POD)][1] structure to allow
 * tight-packing (i.e., no padding between member variables).
 *
 * This special packing does not seem to be a necessary on 8-bit AVR (e.g.,
 * Arduino UNO, Mega2560) architectures, but seems to be required at least on
 * 32-bit ARM (e.g., Teensy 3.2) architectures.
 *
 * See [here][2] for more details.
 *
 * [1]: https://en.wikipedia.org/wiki/Passive_data_structure
 * [2]: http://www.catb.org/esr/structure-packing
 */
inline UInt8Array UInt8Array_init_default() {
  UInt8Array result;
  result.length = 0;
  result.data = 0;
  return result;
}


inline UInt8Array UInt8Array_init(uint32_t length, uint8_t *data) {
  UInt8Array result;
  result.length = length;
  result.data = data;
  return result;
}


class UInt16Array {
public:
  uint32_t length;
  uint16_t *data;
};


class UInt32Array {
public:
  uint32_t length;
  uint32_t *data;
};


class FloatArray {
public:
  uint32_t length;
  float *data;
};

#endif  // #ifndef ___C_ARRAY_DEFS__H___
