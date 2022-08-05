#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

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

void main()
{
    // Getting values
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    
    // Setting up view port
    float zoom = 10.;
    vec2 zoomCenter = vec2(0., 0.);
    float viewPortCenter = 0.5;
    float ratio = u_resolution.y/u_resolution.x;
    
    // Establishing screen xy values
    vec2 xy = (uv - viewPortCenter) * zoom + zoomCenter;
    xy = vec2(xy.x, xy.y*ratio);
    
    vec3 col = vec3(0.);
    float pixel = zoom / u_resolution.x;
    float test;


    vec2 n;
    float a;
    float d1;
    float d2;

    xy.x = abs(xy.x);
    xy.y = abs(xy.y) - 1.;

    n = getNormal(.625*sin(u_time/3.)+2.375);
    d1 = dot(xy-vec2(1.5,0), n);

    xy -= n*max(d1, 0.)*2.;
    
    //n = getNormal(3.*PI/4.);
    n = getNormal(.75*sin(u_time/2.)+1.75);

    xy.x = abs(xy.x);
    d1 = dot(xy-vec2(0.5,0), n);
    d2 = dot(xy+vec2(0.5,0), n);
    xy.x -= 0.5;
    xy -= n*min(d1, 0.)*2.;
    xy += n*min(d2, 0.)*2.;
    
    const int iter = 3;
    float scale = 1.;
    
    for (int i = 0; i < iter; ++i)
    {
        xy *= 3.;
        xy.x -= 1.5;
        scale *= 3.;
    
        xy.x = abs(xy.x);
        d1 = dot(xy-vec2(0.5,0), n);
        d2 = dot(xy+vec2(0.5,0), n);
        xy.x -= 0.5;
        xy -= n*min(d1, 0.)*2.;
        xy += n*min(d2, 0.)*2.;
    }
    
    float ldf = length(xy - vec2(clamp(xy.x,-1., 1.), 0));
    float line = eq(ldf/scale, 0., pixel/zoom*10.);
    col.rgb += line;
    
    gl_FragColor=vec4(col,line);
}
