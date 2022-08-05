#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float timeChange;
uniform float tab;
uniform float currentTab;

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
    
    for(int i=0;i<FBNLOOP;i++)
    {
        float n=snoise(xy);
        val+=amp*(n*.5+.5);// Regular FBN
        //val += amp * abs(n); // turbulence FBN
        //val += amp * pow(1.-abs(n), 2.); // ridge FBN
        xy*=lac;
        amp*=.5;
    }
    return val;
}

void fbmRain(vec2 xy,inout vec3 col,float pixel)
{
    vec2 q;
    q.x=fbm(xy+u_time/10.);
    q.y=fbm(xy+vec2(1));;
    
    vec2 r;
    r.x=snoise(xy+1.*q+vec2(1.7,9.2)+.15*u_time);
    r.y=snoise(xy+1.*q+vec2(8.3,2.8)+.126*u_time);
    
    float fbm=fbm(xy+q-r);
    
    vec3 bb=vec3(.1333,.7922,.7922)*eq(currentTab,0.,.1)+vec3(.7922,.1333,.1333)*eq(currentTab,1.,.1);
    vec3 ba=vec3(.1333,.7922,.7922)*eq(tab,0.,.1)+vec3(.7922,.1333,.1333)*eq(tab,1.,.1);
    
    vec3 mb=vec3(.1569,.3294,.4196)*eq(currentTab,0.,.1)+vec3(.4196,.1569,.1569)*eq(currentTab,1.,.1);
    vec3 ma=vec3(.1569,.3294,.4196)*eq(tab,0.,.1)+vec3(.4196,.1569,.1569)*eq(tab,1.,.1);
    
    vec3 bgb=vec3(.0471,.2549,.2549)*eq(currentTab,0.,.1)+vec3(.2549,.0471,.0471)*eq(currentTab,1.,.1);
    vec3 bga=vec3(.0471,.2549,.2549)*eq(tab,0.,.1)+vec3(.2549,.0471,.0471)*eq(tab,1.,.1);
    
    vec3 brightColor=mix(bb,ba,clamp(timeChange,0.,1.));
    vec3 mainColor=mix(mb,ma,clamp(timeChange,0.,1.));
    vec3 backColor=mix(bgb,bga,clamp(timeChange,0.,1.));
    
    col=mix(backColor,brightColor,clamp((fbm*fbm)*4.,0.,1.));
    col=mix(col,mainColor,clamp(length(q),0.,1.));
    col=mix(col,backColor,clamp(length(r.x),0.,1.));
}

void main()
{
    // Getting values
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    
    // Setting up view port
    float zoom=10.;
    vec2 zoomCenter=vec2(0.,0.);
    float viewPortCenter=.5;
    float ratio=u_resolution.y/u_resolution.x;
    
    // Establishing screen xy values
    vec2 xy=(uv-viewPortCenter)*zoom+zoomCenter;
    xy=vec2(xy.x,xy.y*ratio);
    
    xy=rotate(xy,-PI/4.);
    
    // Width of a single pixel
    float pixel=zoom/u_resolution.x;
    
    // Color init
    vec3 col=vec3(0.);
    
    fbmRain(xy,col,pixel);
    
    gl_FragColor=vec4(col,1);
}