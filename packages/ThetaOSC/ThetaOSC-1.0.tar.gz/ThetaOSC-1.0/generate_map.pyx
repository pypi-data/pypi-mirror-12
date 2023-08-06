# import pyximport
# pyximport.install(pyimport = True)
"""
generate mapping from 2 fisheyes to equirectangular
"""

import numpy
#from numpy import cos,sin

cdef extern from "math.h":
    cdef double sin(double)
    cdef double cos(double)
    cdef double atan2(double,double)
    cdef double sqrt(double)
    
cdef double pi=numpy.pi

cdef f(int u, int v, int w, int h):
    cdef double x,y,z
    cdef double ox,oy,e
    cdef double theta,phi,R
    cdef int X,Y,Z,wh,hh

    
    wh=w/4
    hh=h/2

    R=float(w)/4.0*0.889
    ov=hh
    ou=wh*0.987
    
    theta=pi*v/h
    phi=2*pi*u/w

    x=R*sin(theta)*cos(phi)
    y=R*sin(theta)*sin(phi)
    z=R*cos(theta)
    # if 0<= phi < pi:
    #     return(v, 2*R-u  )
    # else:
    #     return(w-v, u-2*R)
    if 0<= phi < pi:
        return((z-ou)+w, ov-x)
    else:
        return((ou-z),  ov-x)
    
cdef g(width, height):
    cdef int u,v
    map0=numpy.zeros(( width/2, width,  2),dtype=numpy.float32)
    for v in range(width/2):
            for u in range(width):
                map0[v, u :] = f(u, v, width, width/2)
    return map0


def generate_map(w, h):
    map0=g(w, h)
    return map0
