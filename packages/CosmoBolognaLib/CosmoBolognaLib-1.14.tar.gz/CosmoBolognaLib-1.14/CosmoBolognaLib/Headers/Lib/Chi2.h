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
 *  @file Headers/Lib/Chi2.h
 *
 *  @brief The class Chi2 
 *
 *  This file defines the interface of the class Chi2, used for
 *  &chi;&sup2; analyses
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @authors federico.marulli3@unbo.it, alfonso.veropalumbo@unibo.it
 */

#ifndef __CHI2__
#define __CHI2__

#include "Data.h"
 

// ============================================================================================


namespace cosmobl {

  struct STR_params{
    shared_ptr<Data> data;
    shared_ptr<Model> model;

    STR_params(shared_ptr<Data> _data, shared_ptr<Model> _model) :
      data(_data), model(_model) {}
  };

  typedef function<double(double , shared_ptr<void>)> chi2_1par;
  typedef function<double(vector<double> , shared_ptr<void> )> chi2_npar;


  double chi2_1d_model_1par(double , shared_ptr<void> );
  double chi2_1d_error_1par(double , shared_ptr<void> );
  double chi2_1d_covariance_1par(double , shared_ptr<void> );
  double chi2_2d_error_1par(double , shared_ptr<void> );

  double chi2_1d_model_npar(vector<double> , shared_ptr<void> );
  double chi2_1d_error_npar(vector<double> , shared_ptr<void> );
  double chi2_1d_covariance_npar(vector<double> , shared_ptr<void> );
  double chi2_2d_error_npar(vector<double> , shared_ptr<void> );


  class Chi2
  {
    protected:
      shared_ptr<Data> m_data;
      shared_ptr<Model> m_model; 

    public:
      Chi2() {}
      ~Chi2() {}

      Chi2 (shared_ptr<Data> data, shared_ptr<Model> model) :
	m_data(data), m_model(model) {}

      void minimize(double , string type="model", int dim=1, unsigned int max_iter=100, double min=-1.e30, double max=1.e30);
      void minimize(vector<double> , string type="model", int dim=1, unsigned int max_iter=100, double tol=1.e-6); 
      void minimize(double , chi2_1par , unsigned int max_iter=100, double min=-1.e30, double max=1.e30);
      void minimize(vector<double> , chi2_npar, unsigned int max_iter=100, double tol=1.e-6); 

  };


  /**
   *  @class Chi2_old Chi2_old.h "Headers/Lib/Chi2_old.h"
   *
   *  @brief The class Chi2_old
   *
   *  This class is used to handle objects of type &chi;&sup2;. It is
   *  used for all kind of &chi;&sup2; analyses, such as &chi;&sup2; minimisation
   *  and the estimation of confidence contours
   */
  class Chi2_old {

  public:
    
    typedef double(*model_1D) (double, shared_ptr<void> , vector<double>);
    typedef double(*model_2D) (double, double, shared_ptr<void> , vector<double>);
    
    Chi2_old (vector<double> xx, vector<double> fx1D, vector<double> df1D, model_1D func1D, shared_ptr<void> params, bool ptype=1, int fit_type=0)
      : m_dim(1), m_xx(xx), m_fx1D(fx1D), m_df1D(df1D), m_func1D(func1D), m_params(params), m_ptype(ptype), m_min1(0), m_max1(fx1D.size()), m_fit_type(fit_type) 
      {
	if (m_fit_type>1) cosmobl::ErrorMsg("Error in Chi2_old::Chi2_old of Chi2_old.h!");
      }
  
    Chi2_old (vector<double> xx, vector<double> yy, vector< vector<double> > fx2D, vector< vector<double> > df2D, model_2D func2D, shared_ptr<void> params, bool ptype=1, int fit_type=0)
      : m_dim(2), m_xx(xx), m_yy(yy), m_fx2D(fx2D), m_df2D(df2D), m_func2D(func2D), m_params(params), m_ptype(ptype), m_min1(0), m_max1(fx2D.size()), m_min2(0), m_max2(fx2D[0].size()), m_fit_type(fit_type) 
      {
	if (m_fit_type>1) cosmobl::ErrorMsg("Error in Chi2_old::Chi2_old of Chi2_old.h!");
      }

    Chi2_old (vector<double> xx, vector<double> fx1D, vector<vector<double> > covinv, model_1D func1D, shared_ptr<void> params, bool ptype=1)
      : m_dim(1), m_xx(xx), m_fx1D(fx1D), m_covinv(covinv), m_func1D(func1D), m_params(params), m_ptype(ptype), m_min1(0), m_max1(fx1D.size()), m_fit_type(2) {}
  
    Chi2_old (vector<double> xx, vector<double> fx1D, string cov_file, model_1D func1D, shared_ptr<void> params, bool ptype=1, double xmin=-1.e30, double xmax=-1.e30)
      : m_dim(1), m_xx(xx), m_fx1D(fx1D), m_func1D(func1D), m_params(params), m_ptype(ptype), m_fit_type(2)
      {
	if (xmin<-1.e29 && xmax<-1.e29) { m_min1 = 0, m_max1 = xx.size(); }
	else cosmobl::find_index(m_xx, xmin, xmax, m_min1, m_max1);
    
	vector<vector<double> > cov;
	cosmobl::read_cov(cov_file, cov, m_covinv, m_min1, m_max1); 
      
	if (!m_fit_type) 
	  for (unsigned int i=0; i<m_xx.size(); i++) m_df1D.push_back(sqrt(cov[i][i]));   
      }
  
  
    double bestfit (int i) { return m_bestfit[i]; }; 

    void set_par_limits (vector< vector<double> > par_limits) { m_par_limits = par_limits; } // set the priors
  
    void change_params (shared_ptr<void> params) { m_params = params; } // change the model parameters

    // set limits in the fitted 1D function
    void set_limits (double, double); 
    void set_limits (int, int); 
  
    // set limits in the fitted 2D function
    void set_limits (double, double, double, double); 
    void set_limits (int, int, int, int); 

    double get_chi2 (vector<double>);

    void get_bestfit (vector<double> &);

    void decompose_index (int, int, int, vector<int> &);

    void likelihood_normalization (int, int);

    void create_chi2grid (int, vector<double> &, string);

    void single_par_pdf (int, vector<double> &, vector<double> &, bool Likelihood=1, bool norm=0);

    void contour_2par (int, int, string, bool norm=0);

    
  protected:

    // ----- data -----
    int m_dim;
    vector<double> m_xx, m_yy, m_fx1D, m_df1D;
    vector<vector<double> > m_fx2D, m_df2D, m_covinv;

    // ----- model & parameters -----
    model_1D m_func1D;                   // 1D model
    model_2D m_func2D;                   // 2D model
    shared_ptr<void> m_params;                      // model parameters
    vector<vector<double> > m_par_limits; // prior limits on the model parameters
    bool m_ptype;                        // m_ptype = 0 -> fitPar[fitPar.size()-1] = i ; m_ptype = 1 -> fitPar[fitPar.size()-1] = index++
    int m_min1, m_max1, m_min2, m_max2;  // limits in the fitted function
    int m_fit_type;                      // fit type: 0 -> diagonal chi^2, 1 -> diagonal log(chi^2), 2 -> full covariance chi^2 

    // ----- chi2 grid ----- 
    vector<double> m_bestfit;            // best-fit parameters
    vector<vector<double> > m_grid_par;   // parameter grid   
    vector<double> m_chi2_grid;          // chi2 estimated at the parameter grid       
    double m_lnorm;                      // likelihood normalization

  };
}

#endif
