/********************************************************************
 *  Copyright (C) 2010 by Federico Marulli and Alfonso Veropalumbo  *
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
 *  @file Headers/Lib/TwoPointCorrelation_Monopole.h
 *
 *  @brief The class TwoPointCorrelation_Monopole
 *
 *  This file defines the interface of the class
 *  TwoPointCorrelation_Monopole, used to measure the monopole of the
 *  two-point correlation function
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @authors federico.marulli3@unbo.it, alfonso.veropalumbo@unibo.it
 */

#ifndef __TWOPOINTMON__
#define __TWOPOINTMON__

#include "TwoPointCorrelation.h"


namespace cosmobl {

  /**
   *  @class TwoPointCorrelation_Monopole TwoPointCorrelation_Monopole.h
   *  "Headers/Lib/TwoPointCorrelation_Monopole.h"
   *
   *  @brief The class TwoPointCorrelation_Monopole
   *
   *  This class is used to handle objects of type <EM>
   *  TwoPointCorrelation_Monopole </EM>. It is used to measure the
   *  monopole of the two-point correlation function, \f$\xi(r)\f$,
   *  defined as \f$dP_{12}=n^2[1+\xi(r)]dV_1dV_2\f$, where \f$n\f$ is
   *  the average number density, and \f$dP_{12}\f$ is the probability
   *  of finding a pair with one object in the volume \f$dV_1\f$ and
   *  the other one in the volume \f$dV_2\f$, separated by a comoving
   *  distance r.
   */
  class TwoPointCorrelation_Monopole : public TwoPointCorrelation {

  protected :
    
    /**
     *  @name Input and random catalogues
     */
    ///@{
    
    /// input data catalogue
    shared_ptr<Catalogue> m_data;

    /// output data catalogue
    shared_ptr<Catalogue> m_random;
    
    ///@}
    
    /**
     *  @name Two-point correlation function data
     */
    ///@{
    
    /// number of object-object pairs
    vector<double> m_gg;

    /// number of random-random pairs
    vector<double> m_rr;

    /// number of object-random pairs
    vector<double> m_gr;

    /// radial bins
    vector<double> m_rad;

    /// binned monopole of the two-point correlation function
    vector<double> m_xi;

    /// error on the binned monopole of the two-point correlation function
    vector<double> m_error_xi;
    
    ///@}

    /**
     *  @name Binning parameters
     */
    ///@{
    
    /// binning type: 0 &rarr; linear; 1 &rarr; logarithmic 
    bool m_binType;
    
    /// minimum separation used to count the pairs
    double m_rMin;

    /// maximum separation used to count the pairs
    double m_rMax;
    
    /// bin size
    double m_binSize;

    /// number of bins
    int m_nbins;
    
    /// radial shift used to centre the output bins 
    double m_shift;

    ///@}
    

    /**
     *  @name Methods to allocate internal vectors
     */
    //@{

    /**
     *  @brief allocate the internal vectors
     *  @param doGR 1 &rarr; count object-random pairs ; 0 &rarr;
     *  don't count object-random pairs (for the natural estimator)
     *  @return none
     */
    void allocate_vectors (const bool);

    ///@}
    
    
    /**
     *  @name Internal input/output methods
     */
    ///@{
    
    /**
     *  @brief write the number of pairs
     *
     *  @param PP vector of pairs
     *  @param dir output directory
     *  @param file output file
     *  @return none
     */
    void write_pairs (const vector<double>, const string, const string);

    /**
     *  @brief read the number of pairs
     *
     *  @param [out] PP vector of pairs
     *  @param [in] dir vector of input directories
     *  @param [in] file input file
     *  @return none
     */
    void read_pairs (vector<double> &, const vector<string>, const string);

    /**
     *  @brief read the number of pairs
     *
     *  @param [out] PP vector of pairs
     *  @param [in] dir input directory
     *  @param [in] file input file
     *  @return none
     */
    void read_pairs (vector<double> &, string, const string);
    
    ///@}

  public:
    
    /**
     *  @name Constructors/destructors
     */
    ///@{

    /**
     *  @brief default constructor
     *  @return object of class TwoPointCorrelation_Monopole
     */
    TwoPointCorrelation_Monopole () 
      : TwoPointCorrelation()
      { setParameters(1, 0.1, 50., 20); }

    /**
     *  @brief constructor
     *  @param data object of class Catalogue containing the input
     *  catalogue
     *  @param random of class Catalogue containing the random data
     *  catalogue
     *  @return object of class TwoPointCorrelation_Monopole
     */
    TwoPointCorrelation_Monopole (Catalogue data, Catalogue random) 
      : m_data(move(make_shared<Catalogue>(Catalogue(data)))), m_random(move(make_shared<Catalogue>(Catalogue(random))))
      { setParameters(1, 0.1, 50., 20); }

    /**
     *  @brief default destructor
     *  @return none
     */
    ~TwoPointCorrelation_Monopole () {}


    ///@}

    /**
     *  @name Methods to get private/protected parameters
     */
    ///@{
    
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_data
     *  @return the input data catalogue
     */
    shared_ptr<Catalogue> data () const { return m_data; }
   
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_random
     *  @return the input random catalogue
     */
    shared_ptr<Catalogue> random () const { return m_random; }
    
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_gg
     *  @return the number of object-object pairs
     */
    vector<double> gg () const { return m_gg; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_rr
     *  @return the number of random-random pairs
     */
    vector<double> rr () const { return m_rr; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_gr
     *  @return the number of object-random pairs
     */
    vector<double> gr () const { return m_gr; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_rad
     *  @return the radial bins
     */
    vector<double> rad () const { return m_rad; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_xi
     *  @return the binned monopole of the two-point correlation
     *  function
     */
    vector<double> xi () const { return m_xi; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_error_xi
     *  @return the error on the binned monopole of the two-point
     *  correlation function
     */
    vector<double> error_xi () const { return m_error_xi; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_binType
     *  @return the binning type: 0 &rarr; linear; 1 &rarr; logarithmic
     */
    bool binType () const { return m_binType; }
    
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_rMin
     *  @return the minimum separation used to count the pairs
     */
    double rMin () const { return m_rMin; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_rMax
     *  @return the maximum separation used to count the pairs
     */
    double rMax () const { return m_rMax; }
    
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_binSize
     *  @return the bin size
     */
    double binSize () const { return m_binSize; }

    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_nbins
     *  @return the number of bins
     */
    int nbins () const { return m_nbins; }
    
    /**
     *  @brief get the protected member
     *  TwoPointCorrelation_Monopole::m_shift
     *  @return the radial shift used to centre the output bins
     */
    double shift () const { return m_shift; }
    
    ///@}


    /**
     *  @name Methods to set the binning parameters
     */
    ///@{
    
    /**
     *  @brief set the binning parameters 
     *  @param binType binning type: 0 &rarr; linear; 1 &rarr;
     *  logarithmic
     *  @param rMin minimum separation used to count the pairs
     *  @param rMax maximum separation used to count the pairs
     *  @param nbins number of bins
     *  @param pshift shift parameter, i.e. the radial shift is
     *  binSize*pshift
     *  @return none
     */
    void setParameters (const bool binType, const double rMin, const double rMax, const int nbins, const double pshift=0.5);
    
    /**
     *  @brief set the binning parameters 
     *  @param binType binning type: 0 &rarr; linear; 1 &rarr;
     *  logarithmic
     *  @param rMin minimum separation used to count the pairs
     *  @param rMax maximum separation used to count the pairs
     *  @param binSize bin size
     *  @param pshift shift parameter, i.e. the radial shift is
     *  binSize*pshift
     *  @return none
     */
    void setParameters (const bool binType, const double rMin, const double rMax, const double binSize, const double pshift=0.5);

    ///@}


    /**
     *  @name Methods to count the number of pairs and measure the
     *  monopole of the two-point correlation function
     */
    ///@{

    /**
     *  @brief count the number of pairs
     *
     *  @param cat1 pointer to an object of class Catalogue,
     *  containing the first catalogue
     *
     *  @param ChM object of class ChainMesh_Catalogue, used to
     *  construct the chain-mesh
     *
     *  @param pp object of class Pairs
     *
     *  @param cross 1 &rarr; count the number of cross-pairs; 0
     *  &rarr; don't count the number of cross-pairs
     *
     *  @param tcount 1 &rarr; activate the time counter ; 0 &rarr;
     *  don't activate the time counter
     * 
     *  @return none
     */
    void count_pairs (const shared_ptr<Catalogue>, const ChainMesh_Catalogue &, Pairs &, const bool, const bool tcount=0);

    /**
     *  @brief simple count of object pairs (to test performances)
     *
     *  @param cat1 object of class Catalogue, containing the first
     *  catalogue
     *
     *  @param cat2 object of class Catalogue, containing the second
     *  catalogue
     * 
     *  @return none
     */
    void count_pairs_direct (const Catalogue &, const Catalogue &);

    /**
     *  @brief measure the monopole of the two-point correlation
     *  function, &xi;(r)
     *
     *  @param dir_output_pairs output directory used to store the
     *  number of pairs
     *
     *  @param dir_input_pairs vector of input directories used to store the
     *  number of pairs (if the pairs are read from files)
     *
     *  @param count_gg 1 &rarr; count the number of object-object
     *  pairs; 0 &rarr; read the number of object-object pairs
     *
     *  @param count_rr 1 &rarr; count the number of random-random
     *  pairs; 0 &rarr; read the number of random-random pairs
     *
     *  @param count_gr 1 &rarr; count the number of object-random
     *  pairs; 0 &rarr; read the number of object-random pairs
     *
     *  @param doGR 1 &rarr; use the number of object-random pairs to
     *  estimate the monopole of the two-point correlation function; 0
     *  &rarr; use the natural estimator
     *
     *  @param tcount 1 &rarr; activate the time counter; 0 &rarr;
     *  don't activate the time counter; 
     *
     *  @return none
     */
    void measure (const string, const vector<string>, const int, const int, const int, const bool, const bool tcount=0);

    /**
     *  @brief measure the monopole of the two-point correlation
     *  function, &xi;(r)
     *
     *  @param dir_output_pairs output directory used to store the
     *  number of pairs
     * 
     *  @param tcount 1 &rarr; activate the time counter; 0 &rarr;
     *  don't activate the time counter; 
     *
     *  @return none
     */
    void measure (const string, const bool tcount=0);

    /**
     *  @brief measure the monopole of the two-point correlation
     *  function, &xi;(r)
     *
     *  @param dir_input_pairs vector of input directories used to store the
     *  number of pairs (if the pairs are read from files)
     *
     *  @return none
     */
    void measure (const vector<string>);
    
    /**
     *  @brief measure the monopole of the two-point correlation
     *  function, &xi;(r)
     *
     *  @param dir_input_pairs vector of input directories used to store the
     *  number of pairs (if the pairs are read from files)
     *
     *  @param count_gg 1 &rarr; count the number of object-object
     *  pairs; 0 &rarr; read the number of object-object pairs
     *
     *  @param count_rr 1 &rarr; count the number of random-random
     *  pairs; 0 &rarr; read the number of random-random pairs
     *
     *  @param count_gr 1 &rarr; count the number of random-object
     *  pairs; 0 &rarr; read the number of random-object pairs
     *  
     *  @param doGR 1 &rarr; use the number of object-random pairs to
     *  estimate the monopole of the two-point correlation function; 0
     *  &rarr; use the natural estimator
     *
     *  @param tcount 1 &rarr; activate the time counter; 0 &rarr;
     *  don't activate the time counter; 
     *
     *  @return none
     */
    void measure (const vector<string>, const int, const int, const int, const bool, const bool);

    ///@}

  
    /**
     *  @name Input/Output methods
     */
    ///@{
    
    /**
     *  @brief write the measured two-point correlation
     *  @param dir output directory
     *  @param file output file
     *  @param cpu index (for MPI usage)
     *  @return none
     */
    void write (const string, const string, const int rank=0);
    
    ///@}
    
    /**
     *  @name Methods to estimate the errors
     */
    ///@{
    
    /**
     *  @brief estimate the Poisson error 
     *  @param index the index of the spatial bin
     *  @return the Poisson error
     */
    double Error (const int index);
    
  };

}

#endif
