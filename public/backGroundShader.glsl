#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

uniform float timeChange;
uniform float currentTab;
uniform float previousTab;
uniform float isTouchDevice;

#define PI 3.1415926538

float gt(float v1,float v2)
{
    return step(v2,v1);
}

float lt(float v1,float v2)
{
    return step(v1,v2);
}

float between(float val,float start,float end)
{
    return gt(val,start)*lt(val,end);
}

float eq(float v1,float v2,float e)
{
    return between(v1,v2-e,v2+e);
}

float s_gt(float v1,float v2,float e)
{
    return smoothstep(v2-e,v2+e,v1);
}

float s_lt(float v1,float v2,float e)
{
    return smoothstep(v1-e,v1+e,v2);
}

float s_between(float val,float start,float end,float epsilon)
{
    return s_gt(val,start,epsilon)*s_lt(val,end,epsilon);
}

float s_eq(float v1,float v2,float e,float s_e)
{
    return s_between(v1,v2-e,v2+e,s_e);
}

vec2 rotate(vec2 vec,float a)
{
    return vec2(vec.x*cos(a)-vec.y*sin(a),vec.x*sin(a)+vec.y*cos(a));
}

vec2 getNormal(float angle)
{
    return vec2(sin(angle),cos(angle));
}

// Some useful functions for snoise
vec3 mod289(vec3 x){
    return x-floor(x*(1./289.))*289.;
}
vec2 mod289(vec2 x){
    return x-floor(x*(1./289.))*289.;
}
vec3 permute(vec3 x){
    return mod289(((x*34.)+1.)*x);
}

//
// Description : GLSL 2D simplex noise function
//      Author : Ian McEwan, Ashima Arts
//  Maintainer : ijm
//     Lastmod : 20110822 (ijm)
//     License :
//  Copyright (C) 2011 Ashima Arts. All rights reserved.
//  Distributed under the MIT License. See LICENSE file.
//  https://github.com/ashima/webgl-noise
//
float snoise(vec2 v)
{
    
    // Precompute values for skewed triangular grid
    const vec4 C=vec4(.211324865405187,
        // (3.0-sqrt(3.0))/6.0
        .366025403784439,
        // 0.5*(sqrt(3.0)-1.0)
        -.577350269189626,
        // -1.0 + 2.0 * C.x
    .024390243902439);
    // 1.0 / 41.0
    
    // First corner (x0)
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    
    // Other two corners (x1, x2)
    vec2 i1=vec2(0.);
    i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
    vec2 x1=x0.xy+C.xx-i1;
    vec2 x2=x0.xy+C.zz;
    
    // Do some permutations to avoid
    // truncation effects in permutation
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
    
    vec3 m=max(.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.);
    
    m=m*m;
    m=m*m;
    
    // Gradients:
    //  41 pts uniformly over a line, mapped onto a diamond
    //  The ring size 17*17 = 289 is close to a multiple
    //      of 41 (41*7 = 287)
    
    vec3 x=2.*fract(p*C.www)-1.;
    vec3 h=abs(x)-.5;
    vec3 ox=floor(x+.5);
    vec3 a0=x-ox;
    
    // Normalise gradients implicitly by scaling m
    // Approximation of: m *= inversesqrt(a0*a0 + h*h);
    m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
    
    // Compute final noise value at P
    vec3 g=vec3(0.);
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*vec2(x1.x,x2.x)+h.yz*vec2(x1.y,x2.y);
    return 130.*dot(m,g);
}

#define FBNLOOP 5
float fbm(vec2 xy)// Fractal Brownian Motion
{
    float val=0.;
    float amp=.5;
    float lac=2.;
    
    if (isTouchDevice == 1.) {
        float n=snoise(xy);
        // val+=amp*(n*.5+.5);// Regular FBN
        // val += amp * abs(n); // turbulence FBN
        val += amp * pow(1.-abs(n), 2.); // ridge FBN
        xy*=lac;
        amp*=.5;
    } else {
        for(int i=0;i<FBNLOOP;i++)
            {
                float n=snoise(xy);
                val+=amp*(n*.5+.5);// Regular FBN
                //val += amp * abs(n); // turbulence FBN
                //val += amp * pow(1.-abs(n), 2.); // ridge FBN
                xy*=lac;
                amp*=.5;
            }
    }
    return val;
}

void fbmRain(vec2 xy,inout vec3 col,float pixel,vec2 mouse)
{
    vec2 q;
    q.x=fbm(xy+u_time/10.);
    q.y=fbm(xy-mouse*(1.-isTouchDevice));
    
    vec2 r;
    r.x=snoise(xy+1.*q+vec2(1.7,9.2)+.15*u_time);
    r.y=fbm(xy+1.*q+vec2(8.3,2.8)+.126*u_time);
    
    vec2 p=xy+q-r;
    
    float fbm=fbm(p);

    float dim = 0.2*isTouchDevice;
    
    vec3 colA1=vec3(.101961,.619608,.666667) - dim;
    vec3 colB1=vec3(.666667,.666667,.498039) - dim;
    vec3 colC1=vec3(0,0,.164706) - dim;
    vec3 colD1=vec3(.5,.75,.75) - dim;

    vec3 colA2=vec3(q.x      , q.y      , r.x);
    vec3 colB2=vec3(r.x      , r.y      , q.x);
    vec3 colC2=vec3(q.x*r.x  , r.x*q.y  , q.y*r.y);
    vec3 colD2=vec3(r.x-r.y  , 0.  , r.y/q.x)*.2;
    
    vec3 colA3=vec3(q.x,q.y,r.x);
    vec3 colB3=vec3(r.x,r.y,q.x);
    vec3 colC3=vec3(q.x+r.x,r.x*q.y,0.);
    vec3 colD3=vec3(r.x+r.y,0.,r.y-q.x)*.5;
    
    vec3 colA4=vec3(q.y*r.y    , q.x*r.x,  q.y*r.y)*.1;
    vec3 colB4=vec3(q.y*r.y*6. , q.x*r.x,  q.y-r.y);
    vec3 colC4=vec3(r.y-r.y    , r.x/r.x,  q.y+q.y)*.75;
    vec3 colD4=vec3(q.y*r.y    , q.x*r.x,  q.y*r.y)*.2;
    
    vec3 colAb=colA1*eq(previousTab,0.,.1)
    +colA2*eq(previousTab,1.,.1)
    +colA3*eq(previousTab,2.,.1)
    +colA4*eq(previousTab,3.,.1);
    
    vec3 colAa=colA1*eq(currentTab,0.,.1)
    +colA2*eq(currentTab,1.,.1)
    +colA3*eq(currentTab,2.,.1)
    +colA4*eq(currentTab,3.,.1);
    
    vec3 colBb=colB1*eq(previousTab,0.,.1)
    +colB2*eq(previousTab,1.,.1)
    +colB3*eq(previousTab,2.,.1)
    +colB4*eq(previousTab,3.,.1);
    
    vec3 colBa=colB1*eq(currentTab,0.,.1)
    +colB2*eq(currentTab,1.,.1)
    +colB3*eq(currentTab,2.,.1)
    +colB4*eq(currentTab,3.,.1);
    
    vec3 colCb=colC1*eq(previousTab,0.,.1)
    +colC2*eq(previousTab,1.,.1)
    +colC3*eq(previousTab,2.,.1)
    +colC4*eq(previousTab,3.,.1);
    
    vec3 colCa=colC1*eq(currentTab,0.,.1)
    +colC2*eq(currentTab,1.,.1)
    +colC3*eq(currentTab,2.,.1)
    +colC4*eq(currentTab,3.,.1);
    
    vec3 colDb=colD1*eq(previousTab,0.,.1)
    +colD2*eq(previousTab,1.,.1)
    +colD3*eq(previousTab,2.,.1)
    +colD4*eq(previousTab,3.,.1);
    
    vec3 colDa=colD1*eq(currentTab,0.,.1)
    +colD2*eq(currentTab,1.,.1)
    +colD3*eq(currentTab,2.,.1)
    +colD4*eq(currentTab,3.,.1);
    
    vec3 colA=mix(colAb,colAa,timeChange);
    vec3 colB=mix(colBb,colBa,timeChange);
    vec3 colC=mix(colCb,colCa,timeChange);
    vec3 colD=mix(colDb,colDa,timeChange);
    
    col=mix(colA,colB,clamp((fbm*fbm)*4.,0.,1.));
    col=mix(col,colC,clamp(length(q),0.,1.));
    col=mix(col,colD,clamp(length(r.x),0.,1.));
}

void main()
{
    // Getting values
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    vec2 mouse=u_mouse.xy/u_resolution.xy;
    
    // Setting up view port
    float zoom=10.;
    vec2 zoomCenter=vec2(0.,0.);
    float viewPortCenter=.5;
    float ratioX=u_resolution.y/u_resolution.x;
    float ratioY=u_resolution.x/u_resolution.y;
    
    // EscurrentTablishing screen xy values
    vec2 xy=(uv-viewPortCenter)*zoom+zoomCenter;
    float xIsBigger=gt(u_resolution.x,u_resolution.y);
    xy=vec2(xy.x,xy.y*ratioX)*xIsBigger+vec2(xy.x*ratioY,xy.y)*(1.-xIsBigger);
    xy=rotate(xy,-PI/4.);
    
    // Establishing mouse xy values
    mouse=(mouse-viewPortCenter)*zoom+zoomCenter;
    // mouse.y *= ratio;
    mouse=rotate(mouse,-PI/4.);
    
    // Width of a single pixel
    float pixel=zoom/u_resolution.x;
    
    // Color init
    vec3 col=vec3(0.);
    
    fbmRain(xy,col,pixel,mouse/20.);
    
    gl_FragColor=vec4(col,1);
}