#ifndef FAST_CONVERSIONS
#define FAST_CONVERSIONS

#include <Python.h>
#include "fn_bool.h"

#ifdef __cplusplus
extern "C" {
#endif

long fast_atoi(const char *c, bool *error, bool *overflow, size_t str_len);
double fast_atof (const char *p, bool *error, bool *overflow, size_t str_len);
bool fast_atof_test (const char *p, const bool allow_inf, const bool allow_nan, size_t str_len);
bool fast_atoi_test (const char *p, size_t str_len);

#ifdef __cplusplus
} /* extern "C" */
#endif

#endif /* FAST_CONVERSIONS */