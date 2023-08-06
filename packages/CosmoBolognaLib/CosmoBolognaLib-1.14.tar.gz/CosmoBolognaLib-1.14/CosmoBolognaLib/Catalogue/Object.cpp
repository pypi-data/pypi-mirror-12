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
 *  @file Catalogue/Object.cpp
 *
 *  @brief Methods of the class Object 
 *
 *  This file contains the implementation of the methods of the class
 *  Object, used to handle astronomical sources
 *
 *  @author Federico Marulli
 *
 *  @author federico.marulli3@unbo.it
 */

#include "Catalogue.h"


using namespace cosmobl;


// ============================================================================


shared_ptr<Object> cosmobl::Object::make_Object(string type, double xx, double yy, double zz, double weight){
  if (type=="GenericObject"){return move(unique_ptr<GenericObject>(new GenericObject(xx,yy,zz,weight)));}
  else if (type=="RandomObject"){return move(unique_ptr<RandomObject>(new RandomObject(xx,yy,zz,weight)));}
  else if (type=="Galaxy"){return move(unique_ptr<Galaxy>(new Galaxy(xx,yy,zz,weight)));}
  else if (type=="Cluster"){return move(unique_ptr<Cluster>(new Cluster(xx,yy,zz,weight)));}
  else if (type=="Mock"){return move(unique_ptr<Mock>(new Mock(xx,yy,zz,weight)));}
  else if (type=="Halo"){return move(unique_ptr<Halo>(new Halo(xx,yy,zz,weight)));}
  else {ErrorMsg("Error in make_Object of object, no such type of object");}
  return NULL;
}


// ============================================================================


shared_ptr<Object> cosmobl::Object::make_Object(string type, double ra, double dec, double redshift, const Cosmology &cosmology, double weight){
  if (type=="GenericObject"){return move(unique_ptr<GenericObject>(new GenericObject(ra,dec,redshift,cosmology,weight)));}
  else if (type=="RandomObject"){return move(unique_ptr<RandomObject>(new RandomObject(ra,dec,redshift,cosmology,weight)));}
  else if (type=="Galaxy"){return move(unique_ptr<Galaxy>(new Galaxy(ra,dec,redshift,cosmology,weight)));}
  else if (type=="Cluster"){return move(unique_ptr<Cluster>(new Cluster(ra,dec,redshift,cosmology,weight)));}
  else if (type=="Mock"){return move(unique_ptr<Mock>(new Mock(ra,dec,redshift,cosmology,weight)));}
  else if (type=="Halo"){return move(unique_ptr<Halo>(new Halo(ra,dec,redshift,cosmology,weight)));}
  else {ErrorMsg("Error in make_Object of object, no such type of object");}
  return NULL;
}


