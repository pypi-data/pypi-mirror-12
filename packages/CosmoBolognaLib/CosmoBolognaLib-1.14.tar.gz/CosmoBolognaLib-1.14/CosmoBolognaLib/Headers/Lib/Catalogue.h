/********************************************************************
 *  Copyright (C) 2015 by Federico Marulli and Alfonso Veropalumbo  *
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
 * @file Headers/Lib/Catalogue.h
 *
 * @brief The class Catalogue 
 *
 * This file defines the interface of the class Catalogue, used
 * handle catalogues of astronomical sources
 *
 * @authors Federico Marulli, Alfonso Veropalumbo 
 *
 * @authors federico.marulli3@unbo.it, alfonso.veropalumbo@unibo.it
 */

#ifndef __CATALOGUE__
#define __CATALOGUE__ 

#include "ChainMesh.h"
#include "Object.h"
#include "GenericObject.h"
#include "RandomObject.h"
#include "Halo.h"
#include "Mock.h"
#include "Galaxy.h"
#include "Cluster.h"


// ============================================================================================


namespace cosmobl {

  /**
   * @enum Var
   * @brief strongly typed enum class representing the catalogue variables
   */
  enum Var { 
    /// coordinate x
    _XX_ = 1, 
    /// coordinate y
    _YY_ = 2, 
    /// coordinate z
    _ZZ_ = 3,
    /// Right Ascension
    _RA_ = 4, 
    /// Declination
    _DEC_ = 5, 
    /// redshift
    _REDSHIFT_ = 6, 
    /// comoving distance
    _DC_ = 7, 
    /// weight
    _WEIGHT_ = 8, 
    /// mass
    _MASS_ = 9, 
    /// richness
    _RICHNESS_ = 10, 
    /// magnitude
    _MAGNITUDE_ = 11, 
    /// velocity along the x direction
    _VX_ = 12, 
    /// velocity along the y direction
    _VY_ = 13, 
    /// velocity along the z direction
    _VZ_ = 14, 
    /// region
    _REGION_ = 15,
    /// generic properties
    _GENERIC_ = 16,
    /// generic properties
    _RADIUS_ = 17 
  };


  /**
   * @class Catalogue Catalogue.h "Headers/Lib/Catalogue.h"
   *
   * @brief The class Catalogue
   *
   * This class is used to handle objects of type <EM> Catalogue
   * </EM>
   */
  class Catalogue {

  private :
    
    /// vector containing the objects of the catalogue
    vector<shared_ptr<Object> > m_sample;
    
    /// vector containing the object indexes
    vector<int> m_index;      

  public :

    /**
     * @brief default constructor
     * @return object of class Catalogue
     */
    Catalogue () {}

    /**
     * @brief constructor 
     * @param type, the type of object the catalogue contains
     * @parameter xx, vector containing the objects xx coordinates
     * @parameter yy, vector containing the objects yy coordinates
     * @parameter zz, vector containing the objects zz coordinates
     * @parameter weight, vector containing the objects weights
     * @return object of type catalogue
     */
    Catalogue (string type, vector<double> xx, vector<double> yy, vector<double> zz, vector<double> weight={});

    /**
     * @brief constructor 
     * @param type, the type of object the catalogue contains
     * @parameter ra, vector containing the objects right ascensions
     * @parameter dec, vector containing the objects declinations
     * @parameter redshift, vector containing the objects redshifts
     * @parameter cosmology, cosmology to convert from observed to comoving coordinates
     * @parameter weight, vector containing the objects weights
     * @return object of type catalogue
     */ 
    Catalogue (string type, vector<double> ra, vector<double> dec, vector<double> redshift, Cosmology cosmology, vector<double> weight={}); 

    /**
     * @brief constructor 
     * @parameter vector of object of class T
     * @return object of type catalogue
     */ 
    template<typename T>
      Catalogue(vector<T> objects){
        for (size_t i=0; i<objects.size(); i++)
          m_sample.push_back(move(make_shared<T>(T(objects[i]))));
      }

    /**
     * @brief constructor 
     * @param sample vector of objects of type \e Object
     * @return object of class Catalogue
     */
    Catalogue (vector<shared_ptr<Object> > sample) {
      for (auto &&i : sample)
	m_sample.push_back(move(i));
    }

    /**
     *  @brief read a random catalogue
     *  @param file vector containing the files where the random
     *  catalogues are stored
     *  @param object_type, the type of object
     *  @param nSub the fracton of objects randomly selected (nSub=1
     *  &rArr; all objects are selected)
     *  @return an object of class Catalogue
     */
    Catalogue (const vector<string> , string object_type="GenericObject", const double nSub=1.1);

    /**
     *  @brief read a random catalogue with polar coordinates [ra, dec,
     redshift]
     *  @param file_in the name of the input file
     *  @param cosm object of class Cosmology
     *  @param object_type, the type of object
     *  @param nSub the fracton of objects randomly selected (nSub=1
     *  &rArr; all objects are selected)
     *  @param fact conversion factor
     *  @return an object of class Catalogue
     */
    Catalogue (const string, const Cosmology &, string object_type="GenericObject", const double nSub=1.1, const double fact=1.);

    /**
     *  @brief create a random catalogue in a box
     *  @param catalogue object of class Catalogue
     *
     *  @param N_R fraction of random objects, i.e.
     *  N<SUB>R</SUB>=N<SUB>random</SUB>/N<SUB>objects</SUB>
     *
     *  @return an object of class Catalogue
     */
    Catalogue (const Catalogue, const double);

    /**
     *  @brief create a random catalogue in a cone
     *
     *  @param [in] catalogue object of class Catalogue
     *
     *  @param [in] nRandom the number of random objects
     *
     *  @param [in] cosm object of class Cosmology 
     *
     *  @param [in] Angle angle of the cone 
     *
     *  @param [in] step_redshift the number of steps in redshift used to
     *  redshift distribution of the random object; if step_redshift=0
     *  the redshift distribution is estimated from the convolvolution
     *  of N(D<SUB>C</SUB>)
     *
     *  @param [in] redshift vector containing the redshift of the object in
     *  the real catalogue
     *
     *  @param [out] dc vector containing the central values of the binned comoving distances
     *  of the random objects
     *
     *  @param [out] convol vector containing the central values of the
     *  binned smoothed distribution of comoving distances of the random
     *  objects
     *
     *  @param [in] idum the random seed
     *  @return an object of class Catalogue
     */
//    Catalogue (const Catalogue, const int, const Cosmology &, const double, const int, const vector<double>, vector<double> &, vector<double> &, const int idum=13);

    /**
     *  @brief create a random catalogue for a mock sample (with polar
     * coordinates [ra, dec, redshift])
     *  
     *  @param [in] catalogue object of class Catalogue
     *
     *  @param [in] nRandom the number of random objects
     *
     *  @param [in] cosm object of class Cosmology 
     *
     *  @param [in] dir the directory where the random catalogue is stored
     *
     *  @param [in] step_redshift the number of steps in redshift used to
     *  redshift distribution of the random object; if step_redshift=0
     *  the redshift distribution is estimated from the convolvolution
     *  of N(D<SUB>C</SUB>)
     *
     *  @param [in] redshift vector containing the redshift of the object in
     *  the real catalogue
     *
     *  @param [out] dc vector containing the central values of the binned comoving distances
     *  of the random objects
     *
     *  @param [out] convol vector containing the central values of the
     *  binned smoothed distribution of comoving distances of the random
     *  objects
     *
     *  @param [in] idum the random seed
     *  @return an object of class Catalogue
     */
//    Catalogue (Catalogue, int &, Cosmology &, string &, int &, vector<double>, vector<double> &, vector<double> &, int idum=13);
  

    /**
     * @brief default destructor
     * @return none
     */
    ~Catalogue () {}

    /**
     * @brief add one single object to the catalogue
     * @param object pointer to an object of type \e Object
     * @return none
     */
    void add_object (shared_ptr<Object> object) { m_sample.push_back(move(object)); }

    /**
     * @brief add one single object to the catalogue
     * @param objectobject of type \e T
     * @return none
     */
    template<typename T>
      void add_object (T object) { m_sample.push_back(move(make_shared<T>(T(object)))); }

   
    /**
     * @brief add some objects to the catalogue
     * @param sample vector of pointers to objects of type \e Object
     * @return none
     */
    void add_objects (vector<shared_ptr<Object> > sample) { 
      for (auto &&i : sample)
	m_sample.push_back(move(i));
    }

    /**
     * @brief add some objects to the catalogue
     * @param sample vector of objects of type \e T
     * @return none
     */
    template<typename T>
    void add_objects (vector<T> sample) { 
      for (auto &&i : sample)
        add_object(i);
    }

    /**
     * @brief remove all objects 
     * @return none
     */
    void remove_objects () {
      m_sample.erase(m_sample.begin(), m_sample.end());
    }
    
    /**
     * @brief replace existing objects with new ones 
     * @param sample vector of objects of type \e T
     * @return none
     */
    template<typename T>
    void remove_objects (vector<T > sample) {
      m_sample.erase(m_sample.begin(), m_sample.end());
      add_objects(sample);
    }

    /**
     * @brief replace existing objects with new ones 
     * @param sample vector of pointers to objects of type \e Object
     * @return none
     */
    void remove_objects (vector<shared_ptr<Object> > sample) {
      m_sample.erase(m_sample.begin(), m_sample.end());
      for (auto &&i : sample)
	m_sample.push_back(move(i));
    }
    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_xx
     * @param i the object index
     * @return the coordinate x of the i-th object 
     */
    double xx (const int i) const { return m_sample[i]->xx(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_yy
     * @param i the object index
     * @return the coordinate y of the i-th object 
     */
    double yy (const int i) const { return m_sample[i]->yy(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_zz
     * @param i the object index
     * @return the coordinate z of the i-th object 
     */
    double zz (const int i) const { return m_sample[i]->zz(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_vx
     * @param i the object index
     * @return the velocity along the x direction of the i-th object
     */
    double vx (const int i) const { return m_sample[i]->vx(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_vy
     * @param i the object index
     * @return the velocity along the y direction of the i-th object
     */
    double vy (const int i) const { return m_sample[i]->vy(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_vz
     * @param i the object index
     * @return the velocity along the z direction of the i-th object
     */
    double vz (const int i) const { return m_sample[i]->vz(); }; 

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_dc
     * @param i the object index
     * @return the comoving distance of the i-th object
     */
    double dc (const int i) const { return m_sample[i]->dc(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_ra
     * @param i the object index
     * @return the Right Ascension of the i-th object
     */
    double ra (const int i) const { return m_sample[i]->ra(); };
    
    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_dec
     * @param i the object index
     * @return the Declination of the i-th object
     */
    double dec (const int i) const { return m_sample[i]->dec(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_redshift
     * @param i the object index
     * @return the redshift of the i-th object
     */
    double redshift (const int i) const { return m_sample[i]->redshift(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_weight
     * @param i the object index
     * @return the weight of the i-th object
     */
    double weight (const int i) const { return m_sample[i]->weight(); };

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_region
     * @param i the object index
     * @return the index of the region of the i-th object
     */
    long region (const int i) const { return m_sample[i]->region(); };

    /**
     * @brief get the total number of region the Catalogues is divided
     * @return the total number of regions
     */
    int Nregion () const;

    /**
     * @brief get the list of regions in which the Catalogue is
     divided     
     * @return the list of regions of regions
     */
    vector<long> get_region_list () const;

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_mass
     * @param i the object index
     * @return the mass of the i-th object
     */
    double mass (const int i) const { return m_sample[i]->mass(); }

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_magnitude
     * @param i the object index
     * @return the magnitude of the i-th object
     */
    double magnitude (const int i) const { return m_sample[i]->magnitude(); }

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_richness
     * @param i the object index
     * @return the richness of the i-th object
     */
    double richness (const int i) const { return m_sample[i]->richness(); }

    /**
     * @brief get the protected member Catalogue::m_sample[i]->m_generic
     * @param i the object index
     * @return generic properties of the i-th object
     */
    double generic (const int i) const { return m_sample[i]->generic(); }

      /**
     * @brief get the protected member Catalogue::m_sample[i]->m_radius
     * @param i the object index
     * @return radius of the i-th object
     */
    double radius (const int i) const { return m_sample[i]->radius(); }
  
    /**
     * @brief get the values of the object variables  
     * @param var_name the variable name
     * @return the vector of the variable Var
     */
    vector<double> var (const Var) const;

    /**
     * @brief get the i-th object of the catalogue
     * @param i the object index
     * @return pointer to an object of the catalogue
     */
    shared_ptr<Object> object (const int i) const { return m_sample[i]; }
    
    /**
     * @brief get the X, Y, Z coordinates of the i-th object of the
     * catalogue
     *
     * @param i the object index
     * @return vector containing the three coordinates
     */
    vector<double> coordinates (const int i) const { return m_sample[i]->coords(); }
  
    /**
     * @brief set a private variable
     * @param var_name name of the variable
     * @param _var vector of variables
     * @return none
     */
    void set_var (const Var, const vector<double>); 

    /**
     * @brief get the number of objects of the catalogue
     * @return the number of objects
     */
    int nObjects () const { return m_sample.size(); }

    /**
     * @brief change the number of objects of the catalogue
     * @param newN the new number of objects
     * @return none
     */
    void resize (const int newN) { m_sample.resize(newN); }

    /**
     * @brief get the minimum and maximum values of a variable
     * @param [in] var_name the variable name
     * @param [out] Lim 2 dimensional vector containing the minimum
     * and maximum values of the variable
     * @param [in] er 0 &rarr; don't erase the vector Lim; 1 &rarr;
     * erase the vector Lim
     * @return none
     */
    void MinMax_var (const Var, vector<double> &, const bool er=1) const;

    /**
     * @brief get the minimum and maximum values of a variable
     * @param[in] var_name vector of variable names
     * @param[out] Lim vector of 2 dimensional vectors containing
     * the minimum and maximum values of the variables
     * @param[in] er 0 &rarr; don't erase the vector Lim; 1 &rarr;
     * erase the vector Lim
     * @return none
     */
    void MinMax_var (const vector<Var>, vector<vector<double> > &, const bool er=1) const;
  
    /**
     * @brief get the minimum and maximum values of a variable
     * @param var_name the variable name
     * @return 2 dimensional vector containing the minimum and
     * maximum values of the variable
     */
    vector<double> MinMax_var (const Var) const;

    /**
     * @brief get the mean, the median, the standard deviation, and
     * the difference between the third and first quartiles of a
     * variable
     * @param [in] var_name the variable name
     * @param [out] stats 4 dimensional vector containing the mean,
     * the median, the standard deviation, and the difference between
     * the third and first quartiles of the variable
     * @return none
     */
    void stats_var (const Var, vector<double> &) const;

    /**
     * @brief get the mean, the median, the standard deviation, and
     * the difference between the third and first quartiles of a
     * variable
     * @param [in] var_name vector of variable names
     * @param [out] stats vector of 4 dimensional vector containing
     * the mean, the median, the standard deviation, and the
     * difference between the third and first quartiles of the
     * variable 
     * @return none
     */
    void stats_var (const vector<Var>, vector<vector<double> > &) const;
  
    /**
     * @brief get the distribution of a variable
     * @param [in] var_name the variable name
     * @param [out] _var vector of variables
     * @param [out] dist vector of values of f(varibles)
     * @param [in] nbin number of bins
     * @param [in] linear 1 &rarr; linear binning; 0 &rarr; logarithmic binning 
     * @param [in] file_out the output file where the distribution is
     * stored
     * @param [in] Volume the volume of the catalogue
     * @param [in] norm 1 &rarr; normalize to the number of objects; 0 &rarr; do not normalize 
     * @param [in] V1 the minimum limit of the distribution
     * @param [in] V2 the maximum limit of the distribution
     * @param [in] bin_type 1 &rarr; dn/dvar; 0 &rarr; dn/dlogvar; 
     * @param [in] convolution 0 &rarr; don't convolve the distribution; 1
     * &rarr; convolve the distribution with a gaussian function
     * @param [in] sigma &sigma;: the standard deviation of the
     * gaussian function used to convolve the distribution
     * @return none
     */
    void var_distr (const Var, vector<double> &, vector<double> &, const int, const bool linear=1, const string file_out="NULL", const double Volume=1., const bool norm=0, const double V1=-1.e30, const double V2=-1.e30, const bool bin_type=1, const bool convolution=0, const double sigma=0.) const;
    
    /**
     * @brief get the total weight of the objects of the catalogue
     * @return the total weight
     */
    double weightedN () const;

    /**
     * @brief compute the comoving coordinates (x, y, z) using (ra,
     * dec, redshift)
     * @param cosm object of class Cosmology
     * @return none
    */
    void computeComovingCoordinates (const Cosmology &); 

    /**
     * @brief compute the polar coordinates (ra, dec, dc) using
     * (x, y, z)
     * @return none
    */
    void computePolarCoordinates (); 

    /**
     * @brief compute the polar coordinates (ra, dec, dc, redshift)
     * using (x, y, z) and a cosmology
     * @param cosm object of class Cosmology
     * @param z1 the minimum redshift used in the computation
     * @param z2 the maximum redshift used in the computation
     * @return none
     */
    void computePolarCoordinates (const Cosmology &, const double z1=0., const double z2=1.); 

    /**
     * @brief normalize (x, y, z) (i.e. &rarr; (x/dc, y/dc, z/dc))
     * @return none
    */
    void normalizeComovingCoordinates (); 
  
    /**
     * @brief back to (x, y, z) (i.e. the inverse of norm_xyv())
     * @return none
    */
    void restoreComovingCoordinates ();  

    /**
     * @brief order the catalogue according to the input vector
     * @param vv vector used to order the catalogue
     * @return none
    */
    void Order (const vector<int>); 

    /**
     * @brief restore the original vector (i.e. the opposite of
     * Order(vector<int>))
     * @return none
    */
    void Order ();  
    
    /**
     * @brief write the comoving coordinates of the catalogue to an
     * output file
     * @param file_output the name of the output file
     * @return none
     */
    void write_comoving_coordinates (const string) const;

    /**
     * @brief write the polar coordinates of the catalogue to an
     * output file
     * @param file_output the name of the output file
     * @return none
    */
    void write_obs_coordinates (const string) const;

    /**
     * @brief write both the comoving and polar coordinates of the
     * catalogue to an output file
     * @param file_output the name of the output file
     * @return none
    */
    void write_coordinates (const string) const;

    /**
     * @brief get the distrance between the i-th object of the
     * catalogue and another object
     * @param i the object index
     * @param obj pointer to an object
     * @return distance between the i-th object of the catalogue and
     * the object obj
    */
    double distance (const int, shared_ptr<Object>) const;
    
    /**
     * @brief get the angular distrance between the i-th object of the
     * catalogue and another object
     * @param i the object index
     * @param obj pointer to an object
     * @return distance between the i-th object of the catalogue and
     * the object obj
    */
    double angsep_xyz (const int, shared_ptr<Object>) const;
    
    /**
     * @brief overloading of the += operator, to sum two catalogues
     * @param cc object of class Catalogue 
     * @return object of class catalogue
    */
    Catalogue operator += (shared_ptr<Catalogue> cc)
    {    
      for (auto &&i : cc->m_sample)
	m_sample.push_back(move(i));

      return *this;
    }

    /**
     * @brief create a sub-catalogue
     * @param var_name the variable name
     * @param down minimum variable used to cut the catalogue
     * @param up maximum variable used to cut the catalogue
     * @param excl 0 &rarr; creates a subcatalogue inside down-up; 1
     * &rarr; creates a subcatalogue outside down-up;
     * @return object of class catalogue
    */
    shared_ptr<Catalogue> cut (const Var, const double, const double, const bool excl=0);

    /**
     * @brief create a smoothed version of the catalogue
     * averaging quantities on a X, Y, Z grid 
     *
     * defalut averaged quantities are X, Y, Z, RA, DEC, REDSHIFT,
     * WEIGHT; others quantities must be passed trough a vector
     *
     * @param gridsize the cell size 
     * @param vars the vector of variable to average on
     * @param SUB the number of sub-catalogue used to create the
     * chain-mesh (use SUB>1 when there could be memory problems)
     * @return object of class catalogue
     */
    shared_ptr<Catalogue> smooth (const double, const vector<Var> vars={}, const int SUB=1);

  };
}

#endif

