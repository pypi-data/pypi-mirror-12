/*
Copyright (c) 2015, Simon D. Wilkinson

This file is part of Sinope. (https://github.com/sw561/sinope)

Sinope is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Sinope is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Sinope.  If not, see <http://www.gnu.org/licenses/>.
*/

%module ctst
%{
#define SWIG_FILE_WITH_INIT
#include "ctst.h"
%}

%include "numpy.i"

%init %{
import_array();
%}

%apply (double* IN_ARRAY1, int DIM1) {(double * v, int n1)};
%apply (double* INPLACE_ARRAY1, int DIM1) {(double * out, int n2)};
void TSTmultiply(double alpha, double beta,
                 double * v, int n1,
                 double * out, int n2);

%apply (double* IN_ARRAY1, int DIM1)
    {(double * in, int n1), (double * b, int n2)};
%apply (double* INPLACE_ARRAY1, int DIM1) {(double * out, int n3)};
void TSTmultiply_plus(double alpha, double beta,
                      double * in, int n1,
                      double * b, int n2,
                      double * out, int n3);

%apply (double* IN_ARRAY1, int DIM1)
    {(double * v, int n1), (double * b, int n2)};
%apply (double* INPLACE_ARRAY1, int DIM1) {(double * out, int n3)};
void TSTmultiply_plus_coeff(double alpha, double beta, double coeff,
                            double * v, int n1,
                            double * b, int n2,
                            double * out, int n3);
