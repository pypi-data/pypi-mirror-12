/*******************************************************************
 *  Copyright (C) 2015 by Federico Marulli and Alfonso Veropalumbo *
 *  federico.marulli3@unibo.it                                     *
 *                                                                 *
 *  This program is free software; you can redistribute it and/or  *
 *  modify it under the terms of the GNU General Public License as *
 *  published by the Free Software Foundation; either version 2 of *
 *  the License, or (at your option) any later version.            *
 *                                                                 *
 *  This program is distributed in the hope that it will be useful,*
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of *
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the  *
 *  GNU General Public License for more details.                   *
 *                                                                 *
 *  You should have received a copy of the GNU General Public      *
 *  License along with this program; if not, write to the Free     *
 *  Software Foundation, Inc.,                                     *
 *  59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.      *
 *******************************************************************/

/**
 *  @file Headers/Lib/Pairs.h
 *
 *  @brief The class Pairs
 *
 *  This file defines the interface of the class Pairs, used to handle
 *  pairs of objects to compute the two-point correlation function
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @authors federico.marulli3@unbo.it, alfonso.veropalumbo@unibo.it
 */

#ifndef __PAIRS__
#define __PAIRS__


#include "Catalogue.h"


// ===================================================================================================


namespace cosmobl {
  
  /**
   *  @class Pairs Pairs.h "Headers/Lib/Pairs.h"
   *
   *  @brief The class Pairs
   *
   *  This class is used to handle objects of type <EM> Pairs
   *  </EM>. It contains all virtual methods implemented in the
   *  derived classes Pairs2D and Pairs3D
   */
  class Pairs {

  public:
    
    /**
     *  @brief default destructor
     *  @return none
     */
    virtual ~Pairs () {}

    /**
     *  @brief get the private member \e m_nlog
     *  @return the number of logarithmic bins, or an error message if
     *  the derived object does not have this member
     */
    virtual int nlog () const { cosmobl::ErrorMsg("Error in Pairs::nlog() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_nlin
     *  @return the number of linear bins, or an error message if the
     *  derived object does not have this member
     */
    virtual int nlin () const { cosmobl::ErrorMsg("Error in Pairs::nlin() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_ncos
     *  @return the number of angular bins, or an error message if the
     *  derived object does not have this member
     */
    virtual int ncos () const { cosmobl::ErrorMsg("Error in Pairs::ncos() of Pairs.h!"); return 0; }

     /**
     *  @brief get the protected member \e m_thetaMin
     *  @return the minimum value of the angle &theta; used to count
     *  the number of pairs
     */
    virtual double thetaMin () const { cosmobl::ErrorMsg("Error in Pairs::thetaMin() of Pairs.h!"); return 0; }

    /**
     *  @brief get the protected member \e m_thetaMax
     *  @return the maximum value of the angle &theta; used to count
     *  the number of pairs
     */    
    virtual double thetaMax () const { cosmobl::ErrorMsg("Error in Pairs::thetaMax() of Pairs.h!"); return 0; }
    
    /**
     *  @brief get the private member \e m_rMin
     *  @return the minimum separation used to count pairs, or an
     *  error message if the derived object does not have this member
     */
    virtual double rMin () const { cosmobl::ErrorMsg("Error in Pairs::rMin() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_rMax
     *  @return the maximum separation used to count pairs, or an
     *  error message if the derived object does not have this member
     */
    virtual double rMax () const { cosmobl::ErrorMsg("Error in Pairs::rMax() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_PPlog[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th logarithmic bin, or an
     *  error message if the derived object does not have this member
     */
    virtual double PPlog (const int i) const { cosmobl::ErrorMsg("Error in Pairs::PPlog() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_PPlin[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th linear bin, or an
     *  error message if the derived object does not have this member
     */
    virtual double PPlin (const int i) const { cosmobl::ErrorMsg("Error in Pairs::PPlin() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_PPlog
     *  @return the vector containing the number of pairs in
     *  logarithmic bins, or an error message if the derived object
     *  does not have this member
     */
    virtual vector<double> PPlog () const { cosmobl::ErrorMsg("Error in Pairs::PPlog() of Pairs.h!"); vector<double> PP; return PP; }

    /**
     *  @brief get the private member \e m_PPlin
     *  @return the vector containing the number of pairs in linear
     *  bins, or an error message if the derived object does not have
     *  this member
     */
    virtual vector<double> PPlin () const { cosmobl::ErrorMsg("Error in Pairs::PPlin() of Pairs.h!"); vector<double> PP; return PP; }
    
    /**
     *  @brief get the private member \e m_PP2d[i][j]
     *  @param i the bin index in the direction perpendicular to the
     *  line-of-sight
     *  @param j the bin index in the direction parallel to the
     *  line-of-sight
     *  @return the number of pairs in the i-th linear bin
     *  perpendicular to the line-of-sight, and in the j-th linear bin
     *  parallel to the line-of-sight, or an error message if the
     *  derived object does not have this member
     */
    virtual double PP2d (const int i, const int j) const { cosmobl::ErrorMsg("Error in Pairs::PP2d() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_PPslog[i][j]
     *  @param i the logarithmic bin index in the direction
     *  perpendicular to the line-of-sight
     *  @param j the linear bin index in the direction parallel to the
     *  line-of-sight
     *  @return the number of pairs in the i-th linear bin
     *  perpendicular to the line-of-sight, and in the j-th
     *  logarithmic bin parallel to the line-of-sight, or an error
     *  message if the derived object does not have this member
     */
    virtual double PPslog (const int i, const int j) const { cosmobl::ErrorMsg("Error in Pairs::PPslog() of Pairs.h!"); return 0; }     

    /**
     *  @brief get the private member \e m_PPcoslog[i][j]
     *  @param i the logarithmic bin index 
     *  @param j the angular bin index
     *  @return the number of pairs in the i-th logarithmic bin in r,
     *  and in the j-th linear angular bin in cos(&theta;), or an
     *  error message if the derived object does not have this member
     */
    virtual double PPcoslog (const int i, const int j) const { cosmobl::ErrorMsg("Error in Pairs::PPcoslog() of Pairs.h!"); return 0; }

    /**
     *  @brief get the private member \e m_PPcoslin[i][j]
     *  @param i the linear bin index 
     *  @param j the angular bin index
     *  @return the number of pairs in the i-th linear bin in r, and
     *  in the j-th linear angular bin in cos(&theta;), or an error
     *  message if the derived object does not have this member
     */
    virtual double PPcoslin (const int i, const int j) const { cosmobl::ErrorMsg("Error in Pairs::PPcoslin() of Pairs.h!"); return 0; }
   
    /**
     *  @brief get the private member \e m_PP2d
     *  @return a matrix containing the number of pairs in linear bins
     *  perpendicular to the line-of-sight, and linear bins parallel
     *  to the line-of-sight, or an error message if the derived
     *  object does not have this member
     */
    virtual vector<vector<double> > PP2d () const { cosmobl::ErrorMsg("Error in Pairs::PP2d() of Pairs.h!"); vector<vector<double> > PP; return PP; }
   
    /**
     *  @brief get the private member \e m_PPslog
     *  @return a matrix containing the number of pairs in linear bins
     *  perpendicular to the line-of-sight, and in logarithmic bins
     *  parallel to the line-of-sight, or an error message if the
     *  derived object does not have this member
     */
    virtual vector<vector<double> > PPslog () const { cosmobl::ErrorMsg("Error in Pairs::PPslog() of Pairs.h!"); vector<vector<double> > PP; return PP; }

    /**
     *  @brief get the private member \e m_PPcoslog
     *  @return a matrix containing the number of pairs in logarithmic
     *  bins in r and linear angular bins in cos(&theta;), or an error
     *  message if the derived object does not have this member
     */
    virtual vector<vector<double> > PPcoslog () const { cosmobl::ErrorMsg("Error in Pairs::PPcoslog() of Pairs.h!"); vector<vector<double> > PP; return PP; }

    /**
     *  @brief get the private member \e m_PPcoslin
     *  @return a matrix containing the number of pairs in linear bins
     *  in r and linear angular bins in cos(&theta;), or an error
     *  message if the derived object does not have this member
     */
    virtual vector<vector<double> > PPcoslin () const { cosmobl::ErrorMsg("Error in Pairs::PPcoslin() of Pairs.h!"); vector<vector<double> > PP; return PP; }
    
    /**
     *  @brief set the protected member Pairs2D::m_nlog
     *  @param nlog the number of logarithmic bins
     *  @return none
     */
    virtual void set_nlog (const int nlog) { cosmobl::ErrorMsg("Error in Pairs::set_nlog() of Pairs.h!"); }

    /**
     *  @brief set the protected member Pairs2D::m_nlin
     *  @oaram nlin the number of linear bins
     *  @return none
     */
    virtual void set_nlin (const int nlin) { cosmobl::ErrorMsg("Error in Pairs::set_nlin() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_ncos
     *  @param ncos the number of angular bins
     *  @return none
     */
    virtual void set_ncos (const int ncos) { cosmobl::ErrorMsg("Error in Pairs::set_ncos() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_rMin
     *  @param rMin the minimum separation used to count pairs
     *  @return none
     */
    virtual void set_rMin (const double rMin) { cosmobl::ErrorMsg("Error in Pairs::set_rMin() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_rMax
     *  @param rMax the maximum separation used to count pairs
     *  @return none
     */
    virtual void set_rMax (const double rMax) { cosmobl::ErrorMsg("Error in Pairs::set_rMax() of Pairs.h!"); }
    
    /**
     *  @brief set the protected member Pairs2D::m_thetaMin
     *  @return thetaMin the minimum value of the angle &theta; used
     *  to count the number of pairs
     *  @return none
     */
    virtual void set_thetaMin (const double thetaMin) { cosmobl::ErrorMsg("Error in Pairs::set_thetaMin() of Pairs.h!"); }

    /**
     *  @brief set the protected member Pairs2D::m_thetaMax
     *  @param thetaMax the maximum value of the angle &theta; used to
     *  count the number of pairs
     *  @return none
     */    
    virtual void set_thetaMax (const double thetaMax) { cosmobl::ErrorMsg("Error in Pairs::set_thetaMax() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_logbinSize_inv
     *  @param logbinSize the inverse of the logarithmic bin size
     *  @return none
     */
    virtual void set_logbinSize_inv (const double logbinSize) { cosmobl::ErrorMsg("Error in Pairs::set_logbinSize_inv() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_linbinSize_inv
     *  @param linbinSze the inverse of the linear bin size
     *  @return none
     */
    virtual void set_linbinSize_inv (const double linbinSize) { cosmobl::ErrorMsg("Error in Pairs::set_linbinSize_inv() of Pairs.h!"); }

    /**
     *  @brief set the private member Pairs3D::m_cosbinSize_inv
     *  @param cosbinSize the inverse of the angular bin size
     *  @return none
     */
    virtual void set_cosbinSize_inv (const double cosbinSize) { cosmobl::ErrorMsg("Error in Pairs::set_cosbinSize_inv() of Pairs.h!"); }
    
    /**
     *  @brief set the private member \e m_PPlog[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void set_PPlog (const int i, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PPlog() of Pairs.h!"); }

    /**
     *  @brief set the private member \e m_PPlin[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void set_PPlin (const int i, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PPlin() of Pairs.h!"); }

    /**
     *  @brief set the private member \e m_PP2d[i][j]
     *  @param i the bin index in the direction perpendicular to the
     *  line-of-sight
     *  @param j the bin index in the direction parallel to the
     *  line-of-sight
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void set_PP2d (const int i, const int j, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PP2d() of Pairs.h!"); }

    /**
     *  @brief get the private member \e m_PPslog[i][j]
     *  @param i the logarithmic bin index in the direction
     *  perpendicular to the line-of-sight
     *  @param j the linear bin index in the direction parallel to the
     *  line-of-sight
     *  @param pp the number of pairs in the bin    
     *  @return none, or an error message if the derived object does not
     *  have this member
     */
    virtual void set_PPslog (const int i, const int j, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PPslog() of Pairs.h!"); }     

    /**
     *  @brief set the private member \e m_PPcoslog[i][j]
     *  @param i the logarithmic bin index 
     *  @param j the angular bin index
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does not
     *  have this member
     */
    virtual void set_PPcoslog (const int i, const int j, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PPcoslog() of Pairs.h!"); }

    /**
     *  @brief set the private member \e m_PPcoslin[i][j]
     *  @param i the linear bin index 
     *  @param j the angular bin index
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void set_PPcoslin (const int i, const int j, const double pp) { cosmobl::ErrorMsg("Error in Pairs::PPcoslin() of Pairs.h!"); }

    
    /**
     *  @brief sum the number of 1D pairs in logarithmic bins, for
     *  &xi;(r)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_1D_log (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_1D_log() of Pairs.h!"); }

    /**
     *  @brief sum the number of 1D pairs in linear bins, for
     *  &xi;(r)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_1D_lin (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_1D_lin() of Pairs.h!"); }

    /**
     *  @brief sum the number of 2D pairs in linear-linear bins, for
     *  &xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_2D_linlin (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_2D_linlin() of Pairs.h!"); }

    /**
     *  @brief sum the number of 2D pairs in logarithmic-linear bins, for
     *  &xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_2D_loglin (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_2D_loglin() of Pairs.h!"); }

    /**
     *  @brief sum the number of 2D pairs in logarithmic-linear bins, for
     *  &xi;(r,&mu;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_2Drcos_loglin (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_2Drcos_loglin() of Pairs.h!"); }

    /**
     *  @brief sum the number of 2D pairs in linear-linear bins, for
     *  &xi;(r,&mu;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    virtual void sum_2Drcos_linlin (const Pairs &, const double ww=1) { cosmobl::ErrorMsg("Error in Pairs::sum_2Drcos_linlin() of Pairs.h!"); }
    
    /**
     *  @brief sum all the number of pairs
     *  @param pp pointer to an object of class Pairs
     *  @param ww the weight
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void sum_all (const shared_ptr<Pairs> pp, const double ww=1.) { cosmobl::ErrorMsg("Error in Pairs::sum() of Pairs.h!"); }

    /**
     *  @brief sum all the number of pairs
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    virtual void sum_all (const Pairs &pp, const double ww=1.) { cosmobl::ErrorMsg("Error in Pairs::sum() of Pairs.h!"); }
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 1D pair vector in logarithmic bins accordingly, for
     *	&xi;(r)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_1D_log (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_1D_log() of Pairs.h!"); }
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 1D pair vector in linear bins accordingly, for
     *	&xi;(r)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_1D_lin (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_1D_lin() of Pairs.h!"); }
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in linear-linear bins accordingly, for
     *	&xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_2D_linlin (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_1D_linlin() of Pairs.h!"); }

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in logarithmic-linear bins accordingly, for
     *	&xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_2D_loglin (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_2D_loglin() of Pairs.h!"); }

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in linear-linear bins accordingly, for
     *	&xi;(r,&mu;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_2Drcos_loglin (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_2Drcos_loglin() of Pairs.h!"); }

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in linear-linear bins accordingly, for
     *	&xi;(r,&mu;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_2Drcos_linlin (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_2Drcos_linlin() of Pairs.h!"); }
    
    /**
     *  @brief estimate the distance between two objects and update
     *	all the pair vectors accordingly
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    virtual void put_all (const shared_ptr<Object>, const shared_ptr<Object>) { cosmobl::ErrorMsg("Error in Pairs::put_all() of Pairs.h!"); }
  };


  // ============================================================================

  /**
   *  @class Pairs2D Pairs.h "Headers/Lib/Pairs.h"
   *
   *  @brief The class Pairs2D
   *
   *  This class is used to handle objects of type <EM> Pairs2D
   *  </EM>, used to measure the angular two-point correlation
   *  function
   */
  class Pairs2D : public Pairs
  {

  protected:

    /// the number of logarithmic bins
    int m_nlog;

    /// the number of linear bins
    int m_nlin;

    /// the minimum value of the angle &theta; used to count the number of pairs
    double m_thetaMin; 

    /// the maximum value of the angle &theta; used to count the number of pairs
    double m_thetaMax;

    /// the inverse of the logarithmic bin size
    double m_logbinSize_inv;
    
    /// the inverse of the linear bin size
    double m_linbinSize_inv;

    /// the number of pairs in logarithmic bins of &theta;
    vector<double> m_PPlog;

    /// the number of pairs in linear bins of &theta;
    vector<double> m_PPlin;

  
  public:
  
    /**
     *  @brief default constructor
     *  @return error: the default constructor is not allowed
     */
    Pairs2D () { ErrorMsg("Error in Pairs2D: the default constructor is not allowed!"); }
    
    /**
     *  @brief constructor
     *  @param nlog the number of logarithmic bins
     *  @param nlin the number of linear bins
     *  @param thetaMin the minimum value of the angle &theta; used to
     *  count the number of pairs
     *  @param thetaMax the maximum value of the angle &theta; used to
     *  count the number of pairs
     *  @param logbinSize the logarithmic bin size
     *  @param linbinSize the linear bin size
     *  @return object of class Pairs2D
     */
    Pairs2D (const int nlog, const int nlin, const double thetaMin, const double thetaMax, const double logbinSize, const double linbinSize) 
      : m_nlog(nlog), m_nlin(nlin), m_thetaMin(thetaMin), m_thetaMax(thetaMax), m_logbinSize_inv(1./logbinSize), m_linbinSize_inv(1./linbinSize)
      { 
	m_PPlog.resize(m_nlog+1, 0.);
	m_PPlin.resize(m_nlin+1, 0.);
      }
  
    /**
     *  @brief get the protected member Pairs2D::m_nlog
     *  @return the number of logarithmic bins
     */
    int nlog () const override { return m_nlog; }

    /**
     *  @brief get the protected member Pairs2D::m_nlin
     *  @return the number of linear bins
     */
    int nlin () const override { return m_nlin; }

    /**
     *  @brief get the protected member Pairs2D::m_thetaMin
     *  @return the minimum value of the angle &theta; used to count
     *  the number of pairs
     */
    double thetaMin () const override { return m_thetaMin; }

    /**
     *  @brief get the protected member Pairs2D::m_thetaMax
     *  @return the maximum value of the angle &theta; used to count
     *  the number of pairs
     */    
    double thetaMax () const override { return m_thetaMax; }

    /**
     *  @brief get the private member Pairs2D::m_PPlog[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th logarithmic bin
     */
    double PPlog (const int i) const override { return m_PPlog[i]; }

    /**
     *  @brief get the private member Pairs2D::m_PPlin[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th linear bin
     */
    double PPlin (const int i) const override { return m_PPlin[i]; }

    /**
     *  @brief get the private member Pairs2D::m_PPlog
     *  @return the vector containing the number of pairs in
     *  logarithmic bins
     */
    vector<double> PPlog () const override { return m_PPlog; }

    /**
     *  @brief get the private member Pairs2D::m_PPlin
     *  @return the vector containing the number of pairs in linear
     *  bins
     */
    vector<double> PPlin () const override { return m_PPlin; }

    /**
     *  @brief set the protected member Pairs2D::m_nlog
     *  @param nlog the number of logarithmic bins
     *  @return none
     */
    void set_nlog (const int nlog) override { m_nlog = nlog; m_PPlog.resize(m_nlog+1, 0.); }

    /**
     *  @brief set the protected member Pairs2D::m_nlin
     *  @param nlin the number of linear bins
     *  @return none
     */
    void set_nlin (const int nlin) override { m_nlin = nlin; m_PPlin.resize(m_nlin+1, 0.); }

    /**
     *  @brief set the protected member Pairs2D::m_thetaMin
     *  @return thetaMin the minimum value of the angle &theta; used
     *  to count the number of pairs
     *  @return none
     */
    void set_thetaMin (const double thetaMin) override { m_thetaMin = thetaMin; }

    /**
     *  @brief set the protected member Pairs2D::m_thetaMax
     *  @param thetaMax the maximum value of the angle &theta; used to
     *  count the number of pairs
     *  @return none
     */    
    void set_thetaMax (const double thetaMax) override { m_thetaMax = thetaMax; }

    /**
     *  @brief set the private member Pairs3D::m_logbinSize_inv
     *  @param logbinSize the inverse of the logarithmic bin size
     *  @return none
     */
    void set_logbinSize_inv (const double logbinSize) override { m_logbinSize_inv = 1./logbinSize; }

    /**
     *  @brief set the private member Pairs3D::m_linbinSize_inv
     *  @param linbinSze the inverse of the linear bin size
     *  @return none
     */
    void set_linbinSize_inv (const double linbinSize) override { m_linbinSize_inv = 1./linbinSize; }
    
    /**
     *  @brief set the private member Pairs2D::m_PPlog[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPlog (const int i, const double pp) override { m_PPlog[i] = pp; }

    /**
     *  @brief set the private member Pairs2D::m_PPlin[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPlin (const int i, const double pp) override { m_PPlin[i] = pp; }
    
    /**
     *  @brief sum all the number of pairs
     *  @param pp pointer to an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_all (const shared_ptr<Pairs>, const double ww=1) override;

    /**
     *  @brief sum all the number of pairs
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_all (const Pairs &, const double ww=1) override;

    /**
     *  @brief estimate the distance between two objects and update
     *	the pair vectors accordingly
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_all (const shared_ptr<Object>, const shared_ptr<Object>) override;
  
  };


  // ============================================================================
  
  /**
   *  @class Pairs3D Pairs.h "Headers/Lib/Pairs.h"
   *
   *  @brief The class Pairs3D
   *
   *  This class is used to handle objects of type <EM> Pairs3D
   *  </EM>, used to measure the 3D two-point correlation function
   */
  class Pairs3D : public Pairs
  {
 
  protected:
    
    /// the number of logarithmic bins
    int m_nlog;

    /// the number of linear bins
    int m_nlin;

    /// the number of angular bins
    int m_ncos;

    /// the minimum separation used to count pairs
    double m_rMin;

    /// the maximum separation used to count pairs
    double m_rMax;

    /// the inverse of the logarithmic bin size
    double m_logbinSize_inv;

    /// the inverse of the linear bin size
    double m_linbinSize_inv;

    /// the inverse of the angular bin size
    double m_cosbinSize_inv;

    /// the number of pairs in logarithmic bins of &theta;
    vector<double> m_PPlog;

    /// the number of pairs in linear bins of &theta;
    vector<double> m_PPlin;

    /// the number of pairs in linear bins both perpendicular and parallel to the line-of-sight
    vector<vector<double> > m_PP2d;

    /// the number of pairs in linear bins perpendicular to the line-of-sight, and in logarithmic bins parallel to the line-of-sight
    vector<vector<double> > m_PPslog;

    /// the number of pairs in logarithmic bins in r and linear angular bins in cos(&theta;)
    vector<vector<double> > m_PPcoslog;

    /// the number of pairs in linear bins in r and linear angular bins in cos(&theta;)
    vector<vector<double> > m_PPcoslin;

  
  public:

    /**
     *  @brief default constructor
     *  @return error: the default constructor is not allowed
     */
    Pairs3D () { ErrorMsg("Error in Pairs3D: the default constructor is not allowed!"); }

    /**
     *  @brief constructor
     *  @param nlog the number of logarithmic bins
     *  @param nlin the number of linear bins
     *  @param ncos the number of angular bins
     *  @param rMin the minimum separation used to count pairs
     *  @param rMax the maximum separation used to count pairs
     *  @param logbinSize the logarithmic bin size
     *  @param linbinSize the linear bin size
     *  @param cosbinSize the angular bin size
     *  @return object of class Pairs3D
     */
    Pairs3D (const int nlog, const int nlin, const int ncos, const double rMin, const double rMax, const double logbinSize, const double linbinSize, const double cosbinSize) 
      : m_nlog(nlog), m_nlin(nlin), m_ncos(ncos), m_rMin(rMin), m_rMax(rMax), m_logbinSize_inv(1./logbinSize), m_linbinSize_inv(1./linbinSize), m_cosbinSize_inv(1./cosbinSize)
      {
	m_PPlog.resize(m_nlog+1, 0.);
	m_PPlin.resize(m_nlin+1, 0.);
	m_PP2d.resize(m_nlin+1, vector<double>(m_nlin+1, 0.));
	m_PPslog.resize(m_nlog+1, vector<double>(m_nlin+1, 0.));
	m_PPcoslog.resize(m_nlog+1, vector<double>(m_ncos+1, 0.));
	m_PPcoslin.resize(m_nlin+1, vector<double>(m_ncos+1, 0.));
      }

    /**
     *  @brief get the private member Pairs3D::m_nlog
     *  @return the number of logarithmic bins
     */
    int nlog () const override { return m_nlog; }
    
    /**
     *  @brief get the private member Pairs3D::m_nlin
     *  @return the number of linear bins
     */
    int nlin () const override { return m_nlin; }

    /**
     *  @brief get the private member Pairs3D::m_ncos
     *  @return the number of angular bins
     */
    int ncos () const override { return m_ncos; }

    /**
     *  @brief get the private member Pairs3D::m_rMin
     *  @return the minimum separation used to count pairs
     */
    double rMin () const override { return m_rMin; }

    /**
     *  @brief get the private member Pairs3D::m_rMax
     *  @return the maximum separation used to count pairs
     */
    double rMax () const override { return m_rMax; }

    /**
     *  @brief get the private member Pairs3D::m_PPlog[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th logarithmic bin
     */
    double PPlog (const int i) const override { return m_PPlog[i]; }

    /**
     *  @brief get the private member Pairs3D::m_PPlin[i]
     *  @param i the bin index
     *  @return the number of pairs in the i-th linear bin
     */
    double PPlin (const int i) const override { return m_PPlin[i]; }

    /**
     *  @brief get the private member Pairs3D::m_PP2d[i][j]
     *  @param i the bin index in the direction perpendicular to the
     *  line-of-sight
     *  @param j the bin index in the direction parallel to the
     *  line-of-sight
     *  @return the number of pairs in the i-th linear bin
     *  perpendicular to the line-of-sight, and in the j-th linear bin
     *  parallel to the line-of-sight
     */
    double PP2d (const int i, const int j) const override { return m_PP2d[i][j]; }

    /**
     *  @brief get the private member Pairs3D::m_PPslog[i][j]
     *  @param i the logarithmic bin index in the direction
     *  perpendicular to the line-of-sight
     *  @param j the linear bin index in the direction parallel to the
     *  line-of-sight
     *  @return the number of pairs in the i-th linear bin
     *  perpendicular to the line-of-sight, and in the j-th
     *  logarithmic bin parallel to the line-of-sight
     */
    double PPslog (const int i, const int j) const override { return m_PPslog[i][j]; }     

    /**
     *  @brief get the private member Pairs3D::m_PPcoslog[i][j]
     *  @param i the logarithmic bin index 
     *  @param j the angular bin index
     *  @return the number of pairs in the i-th logarithmic bin in r,
     *  and in the j-th linear angular bin in cos(&theta;)
     */
    double PPcoslog (const int i, const int j) const override { return m_PPcoslog[i][j]; }

    /**
     *  @brief get the private member Pairs3D::m_PPcoslin[i][j]
     *  @param i the linear bin index 
     *  @param j the angular bin index
     *  @return the number of pairs in the i-th linear bin in r, and
     *  in the j-th linear angular bin in cos(&theta;)
     */
    double PPcoslin (const int i, const int j) const override { return m_PPcoslin[i][j]; }   
  
    /**
     *  @brief get the private member Pairs3D::m_PPlog
     *  @return the vector containing the number of pairs in
     *  logarithmic bins
     */
    vector<double> PPlog () const override { return m_PPlog; }

    /**
     *  @brief get the private member Pairs3D::m_PPlin
     *  @return the vector containing the number of pairs in linear
     *  bins
     */
    vector<double> PPlin () const override { return m_PPlin; }

    /**
     *  @brief get the private member Pairs3D::m_PP2d
     *  @return a matrix containing the number of pairs in linear bins
     *  perpendicular to the line-of-sight, and linear bins parallel
     *  to the line-of-sight
     */
    vector<vector<double> > PP2d () const override { return m_PP2d; }

    /**
     *  @brief get the private member Pairs3D::m_PPslog
     *  @return a matrix containing the number of pairs in linear bins
     *  perpendicular to the line-of-sight, and in logarithmic bins
     *  parallel to the line-of-sight
     */
    vector<vector<double> > PPslog () const override { return m_PPslog; }

    /**
     *  @brief get the private member Pairs3D::m_PPcoslog
     *  @return a matrix containing the number of pairs in logarithmic
     *  bins in r and linear angular bins in cos(&theta;)
     */
    vector<vector<double> > PPcoslog () const override { return m_PPcoslog; }

    /**
     *  @brief get the private member Pairs3D::m_PPcoslin
     *  @return a matrix containing the number of pairs in linear bins
     *  in r and linear angular bins in cos(&theta;)
     */
    vector<vector<double> > PPcoslin () const override { return m_PPcoslin; }

    /**
     *  @brief set the private member Pairs3D::m_nlog
     *  @param nlog the number of logarithmic bins
     *  @return none
     */
    void set_nlog (const int nlog) override { m_nlog = nlog; }
    
    /**
     *  @brief set the private member Pairs3D::m_nlin
     *  @param nlin the number of linear bins
     *  @return none
     */
    void set_nlin (const int nlin) override { m_nlin = nlin; }

    /**
     *  @brief set the private member Pairs3D::m_ncos
     *  @param ncos the number of angular bins
     *  @return none
     */
    void set_ncos (const int ncos) override { m_ncos = ncos; }

    /**
     *  @brief set the private member Pairs3D::m_rMin
     *  @param rMin the minimum separation used to count pairs
     *  @return none
     */
    void set_rMin (const double rMin) override { m_rMin = rMin; }

    /**
     *  @brief set the private member Pairs3D::m_rMax
     *  @param rMax the maximum separation used to count pairs
     *  @return none
     */
    void set_rMax (const double rMax) override { m_rMax = rMax; }

    /**
     *  @brief set the private member Pairs3D::m_logbinSize_inv
     *  @param logbinSize the inverse of the logarithmic bin size
     *  @return none
     */
    void set_logbinSize_inv (const double logbinSize) override { m_logbinSize_inv = 1./logbinSize; }

    /**
     *  @brief set the private member Pairs3D::m_linbinSize_inv
     *  @param linbinSze the inverse of the linear bin size
     *  @return none
     */
    void set_linbinSize_inv (const double linbinSize) override { m_linbinSize_inv = 1./linbinSize; }

    /**
     *  @brief set the private member Pairs3D::m_cosbinSize_inv
     *  @param cosbinSize the inverse of the angular bin size
     *  @return none
     */
    void set_cosbinSize_inv (const double cosbinSize) override { m_cosbinSize_inv = 1./cosbinSize; }
    
    /**
     *  @brief set the private member Pairs3D::m_PPlog[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPlog (const int i, const double pp) override { m_PPlog[i] = pp; }

    /**
     *  @brief set the private member Pairs3D::m_PPlin[i]
     *  @param i the bin index
     *  @param pp the number of pairs in the bin
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPlin (const int i, const double pp) override { m_PPlin[i] = pp; }

    /**
     *  @brief set the private member Pairs3D::m_PP2d[i][j]
     *  @param i the bin index in the direction perpendicular to the
     *  line-of-sight
     *  @param j the bin index in the direction parallel to the
     *  line-of-sight
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PP2d (const int i, const int j, const double pp) override { m_PP2d[i][j] = pp; }

    /**
     *  @brief set the private member Pairs3D::m_PPslog[i][j]
     *  @param i the logarithmic bin index in the direction
     *  perpendicular to the line-of-sight
     *  @param j the linear bin index in the direction parallel to the
     *  line-of-sight
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPslog (const int i, const int j, const double pp) override { m_PPslog[i][j] = pp; }     

    /**
     *  @brief get the private member Pairs3D::m_PPcoslog[i][j]
     *  @param i the logarithmic bin index 
     *  @param j the angular bin index
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPcoslog (const int i, const int j, const double pp) override { m_PPcoslog[i][j] = pp; }

    /**
     *  @brief set the private member Pairs3D::m_PPcoslin[i][j]
     *  @param i the linear bin index 
     *  @param j the angular bin index
     *  @param pp the number of pairs in the bin 
     *  @return none, or an error message if the derived object does
     *  not have this member
     */
    void set_PPcoslin (const int i, const int j, const double pp) override { m_PPcoslin[i][j] = pp; }

    /**
     *  @brief sum the number of 1D pairs in logarithmic bins, for
     *  &xi;(r)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_1D_log (const Pairs &, const double ww=1) override;

    /**
     *  @brief sum the number of 1D pairs in linear bins, for
     *  &xi;(r)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_1D_lin (const Pairs &, const double ww=1) override;

    /**
     *  @brief sum the number of 2D pairs in linear-linear bins, for
     *  &xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_2D_linlin (const Pairs &, const double ww=1) override;

    /**
     *  @brief sum the number of 2D pairs in logarithmic-linear bins, for
     *  &xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_2D_loglin (const Pairs &, const double ww=1) override;

    /**
     *  @brief sum the number of 2D pairs in logarithmic-linear bins, for
     *  &xi;(r,&mu;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_2Drcos_loglin (const Pairs &, const double ww=1) override;

    /**
     *  @brief sum the number of 2D pairs in linear-linear bins, for
     *  &xi;(r,&mu;)
     *
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_2Drcos_linlin (const Pairs &, const double ww=1) override;
    
    /**
     *  @brief sum all the number of pairs
     *  @param pp pointer to an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_all (const shared_ptr<Pairs>, const double ww=1) override;

    /**
     *  @brief sum all the number of pairs
     *  @param pp an object of class Pairs
     *  @param ww the weight
     *  @return none
     */
    void sum_all (const Pairs &, const double ww=1) override;
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 1D pair vector in logarithmic bins accordingly, for
     *	&xi;(r)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_1D_log (const shared_ptr<Object>, const shared_ptr<Object>) override;
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 1D pair vector in linear bins accordingly, for
     *	&xi;(r)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_1D_lin (const shared_ptr<Object>, const shared_ptr<Object>) override;
    
    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in linear-linear bins accordingly, for
     *	&xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_2D_linlin (const shared_ptr<Object>, const shared_ptr<Object>) override;

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in logarithmic-linear bins accordingly, for
     *	&xi;(r<SUB>p</SUB>,&pi;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_2D_loglin (const shared_ptr<Object>, const shared_ptr<Object>) override;

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in logarithmic-linear bins accordingly, for
     *	&xi;(r,&mu;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_2Drcos_loglin (const shared_ptr<Object>, const shared_ptr<Object>) override;

    /**
     *  @brief estimate the distance between two objects and update
     *	the 2D pair vector in linear-linear bins accordingly, for
     *	&xi;(r,&mu;)
     *
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_2Drcos_linlin (const shared_ptr<Object>, const shared_ptr<Object>) override;
    
    /**
     *  @brief estimate the distance between two objects and update
     *	all the pair vectors accordingly
     *  @param obj1 pointer to an object of class Object
     *  @param obj2 pointer to an object of class Object
     *  @return none
     */
    void put_all (const shared_ptr<Object>, const shared_ptr<Object>) override;
  };
}

#endif
