void _meandel(int leng, int lagnumb, int subtractit, double subratio, double
        thres, int getit, int notrend2, double * at, double * inte, double *
        lagit, double * tim) {

           double intdifto,blindint,atint,maxint,intsum,intcount,meanint,meanint_all,varint,varint_all,nowint;
           int m,n,k,maxat=0,minat,nowat,from,to=0,tosam,doit;

           if(getit==1){
           /* run blind subtraction *******************************************/
           if(subtractit==1){
               /* any blind available? */
               minat=-1;
               for(n=0;n<leng;n++){
                   if(*(inte+(leng*2)+n)!=0){
                       if(minat==-1){
                           minat=n;
                       }
                       maxat=n;
                   }
               }
               /* interpolate blind values ***********************************/
               if(minat!=-1){
                   for(n=0;n<minat;n++){
                       *(inte+(leng*4)+n)=*(inte+(leng*4)+minat);
                   }
                   for(n=maxat;n<leng;n++){
                       *(inte+(leng*4)+n)=*(inte+(leng*4)+maxat);
                   }
                   if(minat<(maxat-1)){
                       from=minat;
                       while(from<maxat){
                           for(n=(from+1);n<leng;n++){
                               if(*(inte+(leng*2)+n)!=0){
                                   to=n;
                                   break;
                               }
                           }
                           if(from<(to-1)){
                               for(n=(from+1);n<=(to-1);n++){
                                  *(inte+(leng*4)+n) = (  *(inte+(leng*4)+from) + ( (*(inte+(leng*4)+to)-*(inte+(leng*4)+from)) * fabs((*(tim+n)-*(tim+from))/(*(tim+to)-*(tim+from))) )  );
                               }
                           }
                           from=to;
                       }
                   }
               }
               /* filter: above threshold subrat? ******************************/
               doit=0;
               for(n=0;n<(leng);n++){
                   if(*(inte+leng+n)!=0){
                       if(*(inte+(leng*3)+n)>(*(inte+(leng*4)+n)*subratio)){
                           *(inte+n)=2;
                           doit=1;
                       }else{
                           *(inte+n)=1;
                       }
                   }
               }
           }else{
               doit=1;
               for(n=0;n<(leng);n++){
                   *(inte+n)=2;
               }
           }

           /* detect peaks & store maximum value over all lags ****************/
           if(doit==1){
                for(m=0;m<lagnumb;m++){ // for each lag
                    doit=0;
                    k=0;
                    to=-1;
                    intsum=0;
                    intcount=0;
                    maxint=0;
                    maxat=0;
                    blindint=0;
                    /* initialize: get first nonblind = starting point */
                    while( (to+1)<leng ){
                        to++;
                        if(*(inte+(leng)+to)!=0){
                            intsum=(intsum+*(inte+(leng*3)+to));
                            intcount++;
                            tosam=to;
                            maxint=*(inte+(leng*3)+tosam);
                            blindint=*(inte+(leng*4)+tosam);
                            maxat=tosam;
                            *(inte+(leng*5)+(leng*m)+tosam)=*(inte+(leng*3)+tosam);
                            break;
                        }
                    }
                    from=to;
                    /* iterate over all non-blind time points */
                    while((to+1)<leng){
                        to++;
                        if(*(inte+(leng)+to)!=0){
                            /* deal with to */
                            intsum=(intsum+*(inte+(leng*3)+to));
                            intcount++;
                            tosam=to;
                            /* deal with from */
                            while(  (fabs(*(tim+to)-*(tim+from))>*(lagit+m)) && ((from+1)<leng)  ){
                                if(*(inte+(leng*3)+from)!=0){
                                    intsum=(intsum-*(inte+(leng*3)+from));
                                    intcount--;
                                }
                                from++;
                            }
                            /* check result */
                            if(intcount>0){
                                intdifto=(intsum/intcount);
                                if(*(inte+(leng*3)+tosam)>intdifto){
                                    *(inte+(leng*5)+(leng*m)+tosam)=intdifto;
                                    if(*(inte+(leng*3)+tosam)>maxint){
                                        maxint=*(inte+(leng*3)+tosam);
                                        blindint=*(inte+(leng*4)+tosam);
                                        maxat=tosam;
                                    }
                                    doit=1;
                                }else{
                                    if(doit==1){
                                        *(inte+(leng*5)+(leng*lagnumb)+(leng*m)+k)=maxint;
                                        *(inte+(leng*5)+(leng*lagnumb*2)+(leng*m)+k)=*(tim+maxat);
                                        *(inte+(leng*5)+(leng*lagnumb*3)+(leng*m)+k)=blindint;
                                        k++;
                                        doit=0;
                                    }
                                    *(inte+(leng*5)+(leng*m)+tosam)=*(inte+(leng*3)+tosam);
                                    intsum=*(inte+(leng*3)+tosam);
                                    intcount=1;
                                    maxint=*(inte+(leng*3)+tosam);
                                    blindint=*(inte+(leng*4)+tosam);
                                    maxat=tosam;
                                    from=tosam;
                               }
                            }
                        }
                    }

                    /* get absolute deviation & mean **************************/
                    /* have maximum peak excluded for meanint & varint ********/
                    /* subtract blind from maximum ****************************/
                    intsum=0;
                    for(to=0;to<k;to++){
                        intsum=(intsum+*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+to));
                    }
                    maxint=0;
                    meanint_all=0;
                    varint_all=0;
                    maxat=-1;
                    if(k>1){ // more than one trend per lag detected?
                        for(to=0;to<k;to++){
                            atint=*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+to);
                            blindint=*(inte+(leng*5)+(leng*lagnumb*3)+(leng*m)+to);
                            meanint=((intsum-*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+to))/(k-1));
                            varint=0;
                            for(from=0;from<k;from++){
                                if(from!=to){
                                    varint=(varint+fabs(*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+from)-meanint));
                                }
                            }
                            varint=(varint/(k-1));
                            if( ((atint-blindint)>maxint) && (atint>(blindint*subratio)) && (atint>(meanint+(thres*varint))) ){
                                maxint=(atint-blindint);
                                meanint_all=meanint;
                                varint_all=varint;
                                maxat=to;
                            }
                        }
                    }else{
                        maxint=intsum;
                    }
                    if(maxat>-1){
                        *(at+(m*6)+1)=*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+maxat);
                    }else{
                        *(at+(m*6)+1)=0;
                    }
                    *(at+(m*6)+2)=varint_all;
                    *(at+(m*6)+4)=maxint;
                    *(at+(m*6)+5)=meanint_all;
                    /* instead of global trend, report maximum sample-blind intensity */
                    if(notrend2==1){
                        maxint=0;
                        for(n=0;n<(leng);n++){
                            if((*(inte+(leng*3)+n)-*(inte+(leng*4)+n))>maxint){
                                maxint=(*(inte+(leng*3)+n)-*(inte+(leng*4)+n));
                            }
                        }
                        *(at+(m*6)+4)=maxint; // overwrite above value
                    }
                    /* get absolute deviation & mean **************************/
                    /* have current peak excluded for meanint & varint ********/
                    /* subtract blind from newest *****************************/
                    /* get latest=newest value */
                    nowint=0;
                    nowat=0;
                    for(to=(leng-1);to>=0;to--){
                        if(*(inte+leng+to)!=0){
                            if(*(inte+to)==2){
                                nowint=*(inte+(leng*3)+to);
                                nowat=to;
                                break;
                            }else{
                                nowint=0;
                                nowat=to;
                                break;
                            }
                        }
                    }
                    if(nowint>0){
                        meanint=(intsum/k);
                        varint=0;
                        for(to=0;to<k;to++){
                            varint=(varint+fabs(*(inte+(leng*5)+(leng*lagnumb)+(leng*m)+to)-meanint));
                        }
                        if(k>0){
                            varint=(varint/k);
                        }
                        if(varint!=0){
                            *(at+(m*6))=nowint;
                            if( (nowint>(meanint+(thres*varint))) ){
                                *(at+(m*6)+3)=(nowint-*(inte+(leng*4)+nowat));
                            }else{
                                *(at+(m*6)+3)=0;
                            }
                        }else{
                            *(at+(m*6))=nowint;
                            if(nowint>0){
                                *(at+(m*6)+3)=(nowint-*(inte+(leng*4)+nowat));
                            }else{
                                *(at+(m*6)+3)=0;
                            }
                        }
                    }else{
                        *(at+(m*6))=0;
                        *(at+(m*6)+3)=0;
                    }
                }
           }else{
                for(m=0;m<lagnumb;m++){
                    *(at+(m*6))=0;      /* nowint */
                    *(at+(m*6)+1)=0;    /* maxint */
                    *(at+(m*6)+2)=0;    /* varint */
                    *(at+(m*6)+3)=0;    /* nowint-blind*/
                    *(at+(m*6)+4)=0;    /* maxint-blind */
                    *(at+(m*6)+5)=0;    /* meanint */
                }
           }
}


}
