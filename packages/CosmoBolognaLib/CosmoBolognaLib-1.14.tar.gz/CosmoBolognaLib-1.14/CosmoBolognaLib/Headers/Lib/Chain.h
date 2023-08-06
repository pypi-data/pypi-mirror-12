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
 *  @file Headers/Lib/Chain.h
 *
 *  @brief The class Chain
 *
 *  This file defines the interface of the class Chain
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @Contact federico.marulli3@unbo.it
 */

#ifndef __CHAIN__
#define __CHAIN__

#include "GSLfunction.h"

namespace cosmobl {

  /** 
   *  @class Chain Chain.h "Headers/Lib/Chain.h"
   *
   *  @brief The class Chain
   *
   *  This class is used to define the chains, output of the montecarlo
   *  process
   */
  class Chain {

  protected:
    /// chain size: the lenght of the chain
    int m_chain_size;

    /// values: content of the chain
    vector<double> m_values;
    /// mean: chain mean value 
    double m_mean;
    /// standard deviation: chain values standard deviation 
    double m_std;
    /// median: chain median value
    double m_median;

    /// var: 
    vector<double> m_var;
    /// dist: 
    vector<double> m_dist;

  public:
    /**
     *  @name Constructors/destructors
     */
    ///@{

    /**
     *  @brief default constructor
     *
     *  @return object of class Chain.  
     */
    Chain() {};

    /**
     *  @brief constructor
     *
     *  @param chain_size: size of the chain 
     *
     *  @return object of class Chain.
     */
    Chain(int chain_size) : m_chain_size(chain_size) { m_values.resize(m_chain_size,0);}

    /**
     *  @brief default destructor
     *  @return none
     */
    ~Chain() {};

    ///@}

    /**
     *  @brief compute statistics (mean, std, median) of the chain
     *  
     *  @param max: maximum step of the chain to use
     *  @param min: minumium step of the chain to use
     *
     *  @return none
     */
    void Statistics(int max=-1, int min=-1);

    /**
     *  @brief compute chain distribution 
     *  
     *  @param nbin: numbers of bin
     *
     *  @return none
     */
    void ComputeDistribution(int );

   /**
    *  @brief return the private member m_var
    *  
    *  @return var: the binned chain values range
    */
    vector<double> var() {return m_var;}

   /**
    *  @brief return the private member m_dist
    *  
    *  @return var: the chain values distribution
    */
    vector<double> dist() {return m_dist;}

    /**
     *  @brief return the private member m_mean 
     *  
     *  @return mean: the chain mean value
     */
    double mean () { return m_mean;}
   
    /**
     *  @brief return the private member m_median
     *  
     *  @return mean: the chain median value
     */
    double median () { return m_median;}
  
    /**
     *  @brief return the private member m_std 
     *  
     *  @return mean: the chain standard deviation value
     */
    double std () { return m_std;}

    /**
     *  @brief set the chain size
     *  
     *  @parame chain_size: the chain size
     *
     *  @return none
     */
    void set_chain_size(int chain_size) { m_chain_size=chain_size; m_values.resize(m_chain_size,0);}

    /**
     * @brief return the private member m_chain_size
     *
     * @return chain_size: the chain size
     */
    int chain_size() {return m_chain_size;}
    
    /**
     *  @brief set the i-th chain value
     *
     *  @param i: the i-th chain step
     *  @parame value: the value at the i-th step
     *
     *  @return none
     */
    void set_chain_value(int i, double value) { m_values[i] = value;}

    /**
     * @brief return the private member m_values at the i-th step
     * 
     * @param i: the i-th step
     *
     * @return chain_value: the chain value at i-th step
     */
    double chain_value(int i) { return m_values[i];}
  };
}

#endif
