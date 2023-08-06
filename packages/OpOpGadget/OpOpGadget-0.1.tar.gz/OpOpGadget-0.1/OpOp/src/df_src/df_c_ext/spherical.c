#include <stdlib.h>
#include <math.h>


void df_spherical(double const *dens, double const *pot, int const len, double *df)
{
    int i,j;
    double dqi,dqs;

    //double* drpsi=(double*)malloc(len*sizeof(double));
    //double* int_df=(double*)malloc(len*sizeof(double));
    double drpsi[len];
    double int_df[len];



    for(j=0;j<len-1;j++)
    {
        drpsi[j]=(dens[j+1]-dens[j])/(pot[j+1]-pot[j]);
    }


    for(i=0;i<len-1;i++)
    {
        int_df[i]=0;
        dqi=0;

        for(j=i;j<len-1;j++)
        {
            dqs=sqrt(pot[i]-pot[j+1]);
            int_df[i]=int_df[i]+drpsi[j]*(dqs-dqi);
            dqi=dqs;
        }
    }
    int_df[len]=int_df[len-1];

    for(i=0; i<(len-1);i++)
    {
        df[i]=(int_df[i+1]-int_df[i])/(pot[i+1]-pot[i]);
    }
    df[len]=df[len-1];

    //free(int_df);
    //free(drpsi);
}