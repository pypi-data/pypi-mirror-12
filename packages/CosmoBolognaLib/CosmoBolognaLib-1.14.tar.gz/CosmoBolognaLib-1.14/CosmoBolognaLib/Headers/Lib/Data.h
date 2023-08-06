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
 *  @file Headers/Lib/Data.h
 *
 *  @brief The class Data
 *
 *  This file defines the interface of the class Data
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @Contact federico.marulli3@unbo.it
 */

#ifndef __DATA__
#define __DATA__

#include "Model.h"

namespace cosmobl {

  class Data
  {
    protected:
      vector<double> m_x;
      vector<double> m_y;
      vector<double> m_fx;
      vector<double> m_error_fx;
      vector< vector<double> > m_covariance_fx;
      vector< vector<double> > m_inverse_covariance_fx;
      vector< vector<double> > m_fxy;
      vector< vector<double> > m_error_fxy;
      bool m_cov;
      bool m_2d;
      int m_x_down;
      int m_x_up;
      int m_y_down;
      int m_y_up;
      double m_xmin;
      double m_xmax;
      double m_ymin;
      double m_ymax;

    public:
      Data(){}
      ~Data(){}

      Data(string input_file , double xmin=-1.e30, double xmax=1.e30); 

      Data(vector<double> , vector<double> , double xmin=-1.e30, double xmax=1.e30); 

      Data(vector<double> , vector<double> , vector<double> , double xmin=-1.e30, double xmax=1.e30); 

      Data(vector<double> , vector<double> , vector< vector<double> > , double xmin=-1.e30, double xmax=1.e30);

      Data(vector<double> , vector<double> , vector< vector<double> >, vector< vector<double> > , double xmin=-1.e30, double xmax=1.e30, double ymin=-1.e30, double ymax=1.e30); 


      void read_data_1d_error(string, double xmin=-1.e30, double xmax=1.e30);

      int x_down() {return m_x_down;}
      int x_up() {return m_x_up;}
      int y_down() {return m_y_down;}
      int y_up() {return m_y_up;}

      double XX( int i) {return m_x[i];}
      double YY( int i) {return m_y[i];}

      double fx( int i) {return m_fx[i];}
      double error_fx( int i) {return m_error_fx[i];}
      double covariance_fx(int i, int j) {return m_covariance_fx[i][j];}
      double inverse_covariance_fx(int i, int j) {return m_inverse_covariance_fx[i][j];}

      double fxy(int i, int j) {return m_fxy[i][j];}
      double error_fxy(int i, int j) {return m_error_fxy[i][j];}

      void set_limits(double , double);

      void set_XX(vector<double> x) {m_x=x;}
      void set_YY(vector<double> y) {m_y=y;}

      void set_fx(vector<double> fx) {m_fx=fx;}
      void set_error_fx(vector<double> error_fx) {m_error_fx=error_fx;}
      void set_covariance_fx(string ); 
      void set_covariance_fx(vector<vector<double> > ); 

      void set_fxy(vector<vector<double> > fxy) {m_fxy = fxy;}
      void set_error_fxy(vector<vector<double> > error_fxy) {m_error_fxy=error_fxy;}

      int ndata_eff() { return (m_2d) ?  (m_x_up-m_x_down)*(m_y_up-m_y_down): (m_x_up-m_x_down);}
      int ndata() { return (m_2d) ?  m_x.size()*m_y.size():  m_x.size();}
      
  };

}

#endif
