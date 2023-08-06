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
 *  @file CatalogueAnalysis/TwoPointCorrelation/Measurements_Monopole.cpp
 *
 *  @brief Methods of the class TwoPointCorrelation_Monopole used to
 *  measure the monopole of the two-point correlation function
 *
 *  This file contains the implementation of the methods of the class
 *  TwoPointCorrelation_Monopole used to measure the monopole of the
 *  two-point correlation function
 *
 *  @authors Federico Marulli, Alfonso Veropalumbo
 *
 *  @authors federico.marulli3@unbo.it, alfonso.veropalumbo@unibo.it
 */

#include "TwoPointCorrelation_Monopole.h"

using namespace cosmobl;


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::setParameters (const bool binType, const double rMin, const double rMax, const int nbins, const double pshift)
{
  if (rMin<1.e-30) ErrorMsg("Error in cosmobl::TwoPointCorrelation::setParameters of Init.cpp: rMin must be >0!");

  m_binType = binType;
  m_rMin = rMin;
  m_rMax = rMax; 
  m_nbins = nbins;

  if (m_binType==0) // linear binning
    m_binSize = (m_rMax-m_rMin)/m_nbins;
    
  else  // logarithmic binning
    m_binSize = (log10(m_rMax)-log10(m_rMin))/m_nbins;
    
  m_shift = m_binSize*pshift;
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::setParameters (const bool binType, const double rMin, const double rMax, const double binSize, const double pshift)
{
  if (rMin<1.e-30) ErrorMsg("Error in cosmobl::TwoPointCorrelation::setParameters of Init.cpp: rMin must be >0!");

  m_binType = binType;
  m_rMin = rMin;
  m_rMax = rMax; 
  m_binSize = binSize;
  m_shift = binSize*pshift;

  if (m_binType==0) { // linear binning
    m_nbins = nint((m_rMax-m_rMin)/m_binSize);
    m_rMax = (m_nbins-m_shift)*m_binSize+m_shift+m_rMin;
    cout << "---> rMax = " << m_rMax << endl;
  }
    
  else { // logarithmic binning
    m_nbins = nint((log10(m_rMax)-log10(m_rMin))/m_binSize);
    m_rMax = pow(10.,(m_nbins-m_shift)*m_binSize+m_shift+log10(m_rMin));
    cout << "---> rMax = " << m_rMax << endl;
  }
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::allocate_vectors (const bool doGR)
{
  m_gg.erase(m_gg.begin(), m_gg.end());
  m_rr.erase(m_rr.begin(), m_rr.end());
  if (doGR) m_gr.erase(m_gr.begin(), m_gr.end());
  m_rad.erase(m_rad.begin(), m_rad.end());
  m_xi.erase(m_xi.begin(), m_xi.end());
  m_error_xi.erase(m_error_xi.begin(), m_error_xi.end());
  
  // "+1" is to avoid some "if" (i.e. it's to improve performances)
  for (int i=0; i<m_nbins+1; i++) { 
    m_gg.push_back(0.);
    m_rr.push_back(0.);
    if (doGR) m_gr.push_back(0.);
    m_rad.push_back(-1.e30);
    m_xi.push_back(-1.e30);
    m_error_xi.push_back(-1.e30);
  }
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::count_pairs (const shared_ptr<Catalogue> cat1, const ChainMesh_Catalogue &ChM, Pairs &pp, const bool cross, const bool tcount)  
{
  time_t start; time (&start);

  int nObj = cat1->nObjects();
  
  shared_ptr<Catalogue> cat2 = ChM.catalogue();
  
  void (Pairs::*Put)(shared_ptr<Object>, shared_ptr<Object>) = (m_binType) ? &Pairs::put_1D_log : &Pairs::put_1D_lin;
  
  float fact_count = 100./nObj;
  int dp = cout.precision();
  cout.setf(ios::fixed); cout.setf(ios::showpoint); cout.precision(2);

  int nlog = (m_binType) ? m_nbins : 0;
  int nlin = (!m_binType) ? m_nbins : 0;
  double logbinSize = (m_binType) ? m_binSize : 0;
  double linbinSize = (!m_binType) ? m_binSize : 0;
  
  int tid = 0;
  
#pragma omp parallel num_threads(omp_get_max_threads()) private(tid) 
  {
    tid = omp_get_thread_num();

    if (tid == 0) {
      int nthreads = omp_get_num_threads();
      cout << "Number of threads = " << nthreads << endl;
    }
    
    Pairs3D pp_thread(nlog, nlin, 0, m_rMin, m_rMax, logbinSize, linbinSize, 0.);
    
#pragma omp for schedule(static, 2) 
    for (int i=0; i<nObj; i++) { // loop on the objects of the catalogue    

      // get the indexes of close objects (i.e. objects inside the close cells of the chain-mesh)
      vector<long> close_objects = ChM.close_objects(cat1->coordinates(i), (cross) ? -1 : (long)i);
 
      for (auto &&j : close_objects) // loop on the closed objects
	(pp_thread.*Put)(cat1->object(i), cat2->object(j)); // estimate the distance between the two objects and update the pair count
      	
      // estimate the computational time and update the time count
      time_t end_temp; time (&end_temp); double diff_temp = difftime(end_temp, start);
      if (tcount && tid==0) { cout << "\r..." << float(i)*fact_count << "% completed (" << diff_temp << " seconds)\r"; cout.flush(); }
      
      if (i==int(nObj*0.25)) cout << "......25% completed" << endl;
      if (i==int(nObj*0.5)) cout << "......50% completed" << endl;
      if (i==int(nObj*0.75)) cout << "......75% completed"<< endl;   
    }

#pragma omp critical
    {
      if (m_binType) pp.sum_1D_log(pp_thread);
      else pp.sum_1D_lin(pp_thread);
    }
    
  }
  
  time_t end; time (&end);
  double diff = difftime(end,start);
  if (tid==0) {
    if (diff<60) cout << "   time spent to count the pairs: " << diff << " seconds" << endl << endl;
    else if (diff<3600) cout << "   time spent to count the pairs: " << diff/60 << " minutes" << endl << endl;
    else cout << "   time spent to count the pairs: " << diff/3600 << " hours" << endl << endl;
  }
  cout.unsetf(ios::fixed); cout.unsetf(ios::showpoint); cout.precision(dp);
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::count_pairs_direct (const Catalogue &cat1, const Catalogue &cat2) 
{
  time_t start; time (&start);
  cout.setf(ios::fixed); cout.setf(ios::showpoint); cout.precision(1);
  
  vector<double> x1 = cat1.var(Var::_XX_), y1 = cat1.var(Var::_YY_), z1 = cat1.var(Var::_ZZ_),
    x2 = cat2.var(Var::_XX_), y2 = cat2.var(Var::_YY_), z2 = cat2.var(Var::_ZZ_); 
  
  float fact_count = 100./float(x1.size());
  

  vector<double> RR; double rr;
  for (int i=0; i<int(x1.size()); i++) { 
    for (int j=i; j<int(x2.size()); j++) { 
      rr = sqrt((x1[i]-x2[j])*(x1[i]-x2[j])+(y1[i]-y2[j])*(y1[i]-y2[j])+(z1[i]-z2[j])*(z1[i]-z2[j]));
      if (log10(m_rMin)<log10(rr) && rr<m_rMax) RR.push_back(rr);
    }
    time_t end_temp; time (&end_temp); double diff_temp = difftime(end_temp, start);
    cout << "\r..." << float(i)*fact_count << "% completed  (" << diff_temp/60 << " minutes)\r"; cout.flush();
  }
  
  cout.precision(6); 
  double lgr1, lgr2, logbinSize_inv = 1./m_logbinSize;
  int num;
   
  for (int i=0; i<m_nlogbins; i++) {
    lgr1 = (i*m_logbinSize+m_shift_log+log10(m_rMin))-m_logbinSize*0.5;
    lgr2 = (i*m_logbinSize+m_shift_log+log10(m_rMin))+m_logbinSize*0.5;
    num = 0;    

    if (lgr2>log10(m_rMax)) {
      string Err = "Error in cosmobl::TwoPointCorrelation::count_pairs_direct of FuncTest.cpp: r2 = " + conv(pow(10.,lgr2),par::fDP3) + " >rMAX_eff = " + conv(m_rMax,par::fDP3);
      ErrorMsg(Err);
    }

    for (unsigned int k=0; k<RR.size(); k++) {
      if (lgr1<=log10(RR[k]) && log10(RR[k])<lgr2) num ++;
      if (int((log10(RR[k])-log10(m_rMin))*logbinSize_inv)==i) 
	if (pow(10.,lgr1)>RR[k] || RR[k]>pow(10.,lgr2)) ErrorMsg("Error in cosmobl::TwoPointCorrelation::count_pairs_direct of FuncTest.cpp!");
    }

    cout.setf(ios::fixed); cout << setprecision(9) << " " << pow(10,i*m_logbinSize+m_shift_log+log10(m_rMin)) << "   " << setprecision(0) << num*2 << endl;
  }

  time_t end; time (&end);
  double diff = difftime(end,start);
  if (diff<3600) cout << "   time spent to count the pairs: " << diff/60 << " minutes" << endl << endl;
  else cout << "   time spent to count the pairs: " << diff/3600 << " hours" << endl << endl;

  cout.unsetf(ios::fixed); cout.unsetf(ios::showpoint); cout.precision(6);  
  
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::measure (const string dir_output_pairs, const vector<string> dir_input_pairs, const int count_gg, const int count_rr, const int count_gr, const bool doGR, const bool tcount)
{
  int nData = m_data->weightedN();
  int nRandom = m_random->weightedN();
  
  if (nData==0 || nRandom==0)  
    ErrorMsg("Error in cosmobl::TwoPointCorrelation_Monopole::measure of TwoPointCorrelation_Monopole.cpp!");
 
  if (count_gg>-1 || count_rr>-1 || count_gr>-1) allocate_vectors(doGR);

  
  // ----------- compute polar coordinates, if necessary ----------- 

  if (!isSet(m_data->var(Var::_RA_)) || !isSet(m_data->var(Var::_DEC_)) || !isSet(m_data->var(Var::_DC_))) 
    m_data->computePolarCoordinates();
  
  if (!isSet(m_random->var(Var::_RA_)) || !isSet(m_random->var(Var::_DEC_)) || !isSet(m_random->var(Var::_DC_))) 
    m_random->computePolarCoordinates();
  
  
  // ----------- create the chain-mesh ----------- 
  
  double cell_size = m_rMax*0.1;

  ChainMesh_Catalogue ChM_data, ChM_random;

  if (count_gg==1)
    ChM_data.set_par(cell_size, m_data, m_rMax);
  
  if (count_rr==1 || count_gr==1) 
    ChM_random.set_par(cell_size, m_random, m_rMax);
  
  
  // ----------- count the number of pairs ----------- 

  string file;

  vector<double> (Pairs::*PP)() const;
  if (m_binType) PP = &Pairs::PPlog;
  else PP = &Pairs::PPlin;
 
  int nlog = (m_binType) ? m_nbins : 0;
  int nlin = (!m_binType) ? m_nbins : 0;
  double logbinSize = (m_binType) ? m_binSize : 0;
  double linbinSize = (!m_binType) ? m_binSize : 0;
  
  
  // ===== Object-Object =====

  file = "gg";
  cout << "Object-Object" << endl;

  if (count_gg==1) {

    Pairs3D gg(nlog, nlin, 0, m_rMin, m_rMax, logbinSize, linbinSize, 0.);
    
    count_pairs(m_data, ChM_data, gg, 0, tcount);       
    
    if (!isDimEqual(m_gg, (gg.*PP)()))
      ErrorMsg("Error in of cosmobl::TwoPointCorrelation_Monopole::measure of TwoPointCorrelation_Monopole.cpp!");

    m_gg = (gg.*PP)();

    if (dir_output_pairs!="NULL") write_pairs(m_gg, dir_output_pairs, file);
    
    m_data->Order();
  }
  
  else if (count_gg==0)
    read_pairs(m_gg, dir_input_pairs, file);
  
  
  // ===== Random-Random =====
  
  file = "rr";
  cout << "Random-Random" << endl; 
  
  if (count_rr==1) { 

    Pairs3D rr(nlog, nlin, 0, m_rMin, m_rMax, logbinSize, linbinSize, 0.);
    
    count_pairs(m_random, ChM_random, rr, 0, tcount);
    
    if (!isDimEqual(m_rr, (rr.*PP)()))
      ErrorMsg("Error in of cosmobl::TwoPointCorrelation_Monopole::measure of TwoPointCorrelation_Monopole.cpp!");
  
    m_rr = (rr.*PP)();

    if (dir_output_pairs!="NULL") write_pairs (m_rr, dir_output_pairs, file);

    if (!doGR || count_gr!=1) m_random->Order();
  }

  else if (count_rr==0)
    read_pairs (m_rr, dir_input_pairs, file);


  // ===== Object-Random =====

  if (doGR) {

    file = "gr";
    cout << "Object-Random" << endl;

    if (count_gr==1) {

      Pairs3D gr(nlog, nlin, 0, m_rMin, m_rMax, logbinSize, linbinSize, 0.);
      
      count_pairs(m_data, ChM_random, gr, 1, tcount); 

      if (!isDimEqual(m_gr, (gr.*PP)()))
	ErrorMsg("Error in of cosmobl::TwoPointCorrelation_Monopole::measure of TwoPointCorrelation_Monopole.cpp!");
  
      m_gr = (gr.*PP)();
      
      if (dir_output_pairs!="NULL") write_pairs (m_gr, dir_output_pairs, file);
   
    }

    else if (count_gr==0) 
      read_pairs (m_gr, dir_input_pairs, file);
    
    m_random->Order();
  }

  
  // ----------- compute the correlation functions ----------- 

  double norm = double(nRandom)*double(nRandom-1)/(nData*double(nData-1));
  double norm1 = double(nRandom-1)/nData;

  for (int i=0; i<m_nbins; i++) {
    m_rad[i] = pow(10.,i*m_binSize+m_shift+log10(m_rMin));
    if (m_gg[i]>0 && m_rr[i]>0) {
      m_xi[i] = (doGR) ? max(-1.,norm*m_gg[i]/m_rr[i]-norm1*m_gr[i]/m_rr[i]+1.) : max(-1.,norm*m_gg[i]/m_rr[i]-1.);
      m_error_xi[i] = Error(i);
    }
  }
 
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::measure (const string dir_output_pairs, const bool tcount)
{
  measure(dir_output_pairs, {}, 1, 1, 1, 1, tcount);
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::measure (const vector<string> dir_input_pairs)
{
  measure("NULL", dir_input_pairs, 0, 0, 0, 1, 0);
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::measure (const vector<string> dir_input_pairs, const int count_gg, const int count_rr, const int count_gr, const bool doGR, const bool tcount=0)
{
  measure("NULL", dir_input_pairs, count_gg, count_rr, count_gr, doGR, tcount);
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::write_pairs (const vector<double> PP, const string dir, const string file) 
{  
  string MK = "mkdir -p "+dir; if (system (MK.c_str())) {};
  
  string file_out = dir+file;
  ofstream fout (file_out.c_str()); checkIO(file_out, 0);
  
  fout.setf(ios::fixed);

  for (int i=0; i<m_nbins; i++) 
    fout << /*setprecision(0) << */PP[i] << endl;
  
  fout.clear(); fout.close(); cout << "I wrote the file " << file_out << endl;
  
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::read_pairs (vector<double> &PP, const vector<string> dir, const string file) 
{
  if (dir.size()==0)
    ErrorMsg ("Error in cosmobl::TwoPointCorrelation_Monopole::read_pairs of TwoPointCorrelation_Monopole.cpp! dir.size()=0!");
      
  for (size_t dd=0; dd<dir.size(); dd++) {
        
    string file_in = dir[dd]+file; 
    cout << "I'm reading the pair file: " << file_in << endl;
    
    ifstream fin(file_in.c_str()); checkIO(file_in, 1);
   
    double pp;
    for (int i=0; i<m_nbins; i++) {
      fin >>pp;
      PP[i] += pp;
    }
    
    fin.clear(); fin.close(); cout << "I read the file " << file_in << endl;
  }
}

  
// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::read_pairs (vector<double> &PP, string dir, const string file) 
{
  vector<string> Dir; Dir.push_back(dir);
  read_pairs(PP, Dir, file);
}


// ============================================================================


void cosmobl::TwoPointCorrelation_Monopole::write (const string dir, const string file, const int rank) 
{    
  checkDim(m_rad, m_nbins, "rad");
  
  string file_out = dir+file;
  
  ofstream fout (file_out.c_str()); checkIO(file_out, 0);

  fout << "# rad  xi  error" << endl;

  int dp = fout.precision();
  fout.setf(ios::fixed); fout.setf(ios::showpoint); fout.precision(4);
  
  for (int i=0; i<m_nbins; i++) 
    if (m_rad[i]>m_rMin) {
      fout.width(6); fout << right << m_rad[i] << "  " << m_xi[i] << "  " << m_error_xi[i] << endl;
    }
  
  fout.unsetf(ios::fixed); fout.unsetf(ios::showpoint); fout.precision(dp);
  
  fout.close(); cout << "I wrote the file: " << file_out << endl;
}


// ============================================================================


double TwoPointCorrelation_Monopole::Error (const int index) 
{
  int nData = m_data->nObjects();
  int nRandom = m_random->nObjects();
  
  double normGG = 2./(nData*(nData-1.));
  double normRR = 2./(nRandom*(nRandom-1.));
  double normGR = 1./(nData*nRandom);

  double GGn = m_gg[index]*normGG;
  double RRn = m_rr[index]*normRR;
  double GRn = m_gr[index]*normGR;
  double xi = max(-0.999,GGn/RRn-2.*GRn/RRn+1.); // check!!!

  double fact = normRR/normGG*m_rr[index]*(1.+xi)+4./nData*pow(normRR*m_rr[index]/normGG*(1.+xi),2.);
  
  double ERR = (m_rr[index]>0 && fact>0) ? normGG/(normRR*m_rr[index])*sqrt(fact) : 1.e30;

  ERR *= sqrt(3); // check!!!

  return ERR;
}
