#include<stdio.h>
#include<cmath>
#include"cppinterface.h"
extern "C"{
   void initialconditions();
}

void initialconditions() {


   int nblocks;
   int glob_nb, nijk;
   double *p,*u,*v,*w,*t, *y, *z,*x, *alpharho1, *alpharho2, *rho, *phi;

   printf("\n ---------------------------------\n");
   printf(  " - initialconditions.cxx (start) -\n");
   printf(  " ---------------------------------\n");

   nblocks = get_integer("nblocks");

   printf(" nblocks = %i\n",nblocks);
   set_pointer(&rho,"rho");

   for (int nb=0; nb < nblocks; nb++){


      set_pointer(nb,&p,"pressure");
      set_pointer(nb,&u,"uvelocity");
      set_pointer(nb,&v,"vvelocity");
      set_pointer(nb,&w,"wvelocity");
      set_pointer(nb,&t,"temperature");
      set_pointer(nb,&y,"cellcenterY");
      set_pointer(nb,&z,"cellcenterZ");
      set_pointer(nb,&x,"cellcenterX");
      set_pointer(nb,&phi,"levelset");


      glob_nb = get_integer(nb,"gnb"); // glob_nb is the global block number
      nijk    = get_integer(nb,"nijk");
      for (int ii=0; ii < nijk; ii++) {
          properties_initialize(nb, ii);
          properties_set_state("alpha",1.0, 0);
        //  properties_set_state("alpha",0.5,1);
        //  properties_set_state("alpha",0.2,2);

        double cx = 0.0045;
        double cy = 0.0023625;
        double cz = 0.01125;

        double D = 0.45e-3; 
        double H = 20*D;
        double L = 5*D;

         u[ii]  =   0.0;
         v[ii]  =   0.0;
         w[ii]  =   0.0;
         p[ii]  =   0.0;
         t[ii]  =  294.25;

         double r = pow( pow(y[ii]-cy, 2) + pow(x[ii]-cx, 2), 0.5);
         phi[ii] = -L/2;
         if(r < D/1.5){
             if(z[ii] > H){
                phi[ii] = z[ii]-(H);
                t[ii]  =  449.85;
            }
         }
           properties_set_back();


      }
   }
   
   printf("\n ---------------------------------\n");
   printf(  " - initialconditions.cxx (end)   -\n");
   printf(  " ---------------------------------\n");
}
