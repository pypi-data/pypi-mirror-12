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
 *  @file Data.cpp
 *
 *  @brief Methods of the class Data
 *
 *  This file contains the implementation of the methods of the class
 *  Data
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @Contact federico.marulli3@unbo.it
 */

#include "Data.h"
using namespace cosmobl;


// ======================================================================================


void cosmobl::Data::set_covariance_fx(string filename){

  
  m_covariance_fx.erase(m_covariance_fx.begin(),m_covariance_fx.end());
  m_error_fx.erase(m_error_fx.begin(),m_error_fx.end());

  ifstream fin (filename.c_str());
  if (!fin) {
    string Warn = "Attention: the file " + filename + " does not exist!";
    WarningMsg (Warn);
  }

  vector<double> vv ;
  m_covariance_fx.push_back(vv);
  string line; int i = 0;

  while(getline(fin,line)) {
    stringstream ss(line);
    vector<double> num; double NN = -1.e30;
    while (ss>>NN) num.push_back(NN);
    if (num.size()==3 && num[2]>-1.e29){
      m_covariance_fx[i].push_back(num[2]);
    }
    else {i++; m_covariance_fx.push_back(vv);}
  }

  m_covariance_fx.erase(m_covariance_fx.end()-1,m_covariance_fx.end());
  fin.clear(); fin.close();

  
  for(size_t i=0;i<m_covariance_fx.size();i++)
    m_error_fx.push_back(sqrt(m_covariance_fx[i][i]));

  invert_matrix(m_covariance_fx,m_inverse_covariance_fx,m_x_down,m_x_up);

}


// ======================================================================================


void cosmobl::Data::set_covariance_fx(vector<vector<double> > covariance_fx){

  m_error_fx.erase(m_error_fx.begin(),m_error_fx.end());
  m_covariance_fx=covariance_fx;
  for(size_t i=0;i<m_covariance_fx.size();i++)
    m_error_fx.push_back(sqrt(m_covariance_fx[i][i]));

  invert_matrix(m_covariance_fx,m_inverse_covariance_fx,m_x_down,m_x_up);

}


// ======================================================================================


cosmobl::Data::Data(string input_file, double xmin, double xmax){
  m_cov = 0;
  m_2d=0;
  read_data_1d_error(input_file,xmin,xmax);
}


// ======================================================================================


cosmobl::Data::Data(vector<double> x, vector<double> fx, double xmin, double xmax){
  m_cov = 0;
  m_2d=0;
  m_x = x;
  m_fx = fx;

  find_index(m_x,xmin,xmax,m_x_down,m_x_up);

  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up-1];
}


// ======================================================================================


cosmobl::Data::Data(vector<double> x, vector<double> fx, vector<double> error_fx, double xmin, double xmax){
  m_cov = 0;
  m_2d=0;
  m_x = x;
  m_fx = fx;
  m_error_fx = error_fx;

  find_index(m_x,xmin,xmax,m_x_down,m_x_up);

  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up-1];
}


// ======================================================================================


cosmobl::Data::Data(vector<double> x, vector<double> fx, vector< vector<double>> covariance_fx, double xmin, double xmax){
  m_cov = 1;
  m_2d=0;
  m_x = x;
  m_fx = fx;
  m_covariance_fx = covariance_fx;

  for(size_t i=0;i<m_covariance_fx.size();i++)
    m_error_fx.push_back(sqrt(m_covariance_fx[i][i]));

  find_index(m_x,xmin,xmax,m_x_down,m_x_up);
  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up-1];
  invert_matrix(m_covariance_fx,m_inverse_covariance_fx,m_x_down,m_x_up);
}


// ======================================================================================


cosmobl::Data::Data(vector<double> x, vector<double> y, vector<vector<double> > fxy, vector<vector<double> > error_fxy, double xmin, double xmax, double ymin, double ymax){
  m_cov = 0;
  m_2d=1;
  m_x = x;
  m_y = y;
  m_fxy = fxy;
  m_error_fxy = error_fxy;

  find_index(m_x,xmin,xmax,m_x_down,m_x_up);
  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up];


  find_index(m_y,ymin,ymax,m_y_down,m_y_up);
  m_ymin = m_y[m_y_down];
  m_ymax = m_y[m_y_up-1];
}


// ======================================================================================


void cosmobl::Data::read_data_1d_error(string input_file, double xmin, double xmax){
  ifstream fin(input_file.c_str());
  string line;

  while(getline(fin,line)){
    stringstream ss(line); double NUM;
    ss>>NUM; m_x.push_back(NUM);
    ss>>NUM; m_fx.push_back(NUM);
    ss>>NUM; m_error_fx.push_back(NUM);
  }

  fin.clear(); fin.close();
  
  find_index(m_x,xmin,xmax,m_x_down,m_x_up);
  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up-1];
}


// ======================================================================================


void cosmobl::Data::set_limits(double xmin, double xmax){
  find_index(m_x,xmin,xmax,m_x_down,m_x_up);
  m_xmin = m_x[m_x_down];
  m_xmax = m_x[m_x_up-1];
}
