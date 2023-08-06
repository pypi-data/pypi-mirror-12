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

#include "ctst.h"
#include <assert.h>

void TSTmultiply(double alpha, double beta,
                 double * v, int n1,
                 double * out, int n2){
	// alpha is middle diagonal
	// beta is for diagonals immediately above and below
	assert(n1==n2);

	out[0] = alpha*v[0] + beta*v[1];
	for (int i=1; i<n1-1; i++){
		out[i] = beta * (v[i-1]+v[i+1]) + alpha*v[i];
	}
	out[n1-1] = beta*v[n1-2] + alpha*v[n1-1];
}

void TSTmultiply_plus(double alpha, double beta,
                      double * v, int n1,
                      double * b, int n2,
                      double * out, int n3){
	// TST(alpha, beta) * v + b
	assert(n1==n2 && n2==n3);

	out[0] = alpha*v[0] + beta*v[1] + b[0];
	for (int i=1; i<n1-1; i++){
		out[i] = beta * (v[i-1]+v[i+1]) + alpha*v[i] + b[i];
	}
	out[n1-1] = beta*v[n1-2] + alpha*v[n1-1] + b[n1-1];
}

void TSTmultiply_plus_coeff(double alpha, double beta, double coeff,
                            double * v, int n1,
                            double * b, int n2,
                            double * out, int n3){
	// TST(alpha, beta) * v + coeff * b
	assert(n1==n2 && n2==n3);

	out[0] = alpha*v[0] + beta*v[1] + coeff*b[0];
	for (int i=1; i<n1-1; i++){
		out[i] = beta * (v[i-1]+v[i+1]) + alpha*v[i] + coeff*b[i];
	}
	out[n1-1] = beta*v[n1-2] + alpha*v[n1-1] + coeff*b[n1-1];
}
