/********************************************************************
 *  Copyright (C) 2014 by Federico Marulli and Alfonso Veropalumbo  *
 *  federico.marulli3@unibo.it                                      *
 *                                                                  *
 *  This program is free software; you can redistribute it and/or   *
 *  modify it under the terms of the GNU General Public License as  *
 *  published by the Free Software Foundation; either version 2 of  *
 *  the License, or (at your option) any later version.             *
 *                                                                  *
 *  This program is distributed in the hope that it will be useful, *
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of  *
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the   *
 *  GNU General Public License for more details.                    *
 *                                                                  *
 *  You should have received a copy of the GNU General Public       *
 *  License along with this program; if not, write to the Free      *
 *  Software Foundation, Inc.,                                      *
 *  59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.       *
 ********************************************************************/

/**
 *  @file Chain.cpp
 *
 *  @brief Methods of the  class Chain 
 *
 *  This file contains the implementation of the methods of the class
 *  Chain, output of the montecarlo
 *  process
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo 
 *
 *  @Contact federico.marulli3@unbo.it
 */

#include "Chain.h"

using namespace cosmobl;


// ============================================================================================


void cosmobl::Chain::Statistics(int max, int min){

  max = (max <=0) ? m_values.size() : max;
  min = (min <=0) ? 0 : min;
  vector<double> values;
  
  for(int i=min;i<max;i++)
    values.push_back(m_values[i]);

  m_mean = Average(values);
  m_std = Sigma(values);

  double a;
  Quartile(values, a, m_median, a);

}


// ============================================================================================


void cosmobl::Chain::ComputeDistribution(int nbin){

  vector<double> ww(m_values.size(),1);
  distribution(m_var, m_dist, m_values, ww, nbin);

}
