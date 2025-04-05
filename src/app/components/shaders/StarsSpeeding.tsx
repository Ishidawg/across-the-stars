'use client';

import { useEffect, useRef, useState } from 'react';

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current && dimensions.width > 0) {
      initGL(canvasRef.current);
    }
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        filter: 'blur(1.5px)',
      }}
    />
  );
}

function initGL(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl');
  if (!gl) return;

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  gl.clearColor(16/255, 13/255, 54/255, 1);
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vertexShaderSource = `
    attribute vec3 a_star;
    uniform mediump float u_time;
    
    void main() {
      float speed = 0.3;
      float near = 0.1;
      float far = 1.0;
      float range = far - near;
      float z = mod(a_star.z - u_time * speed - near, range) + near;
      
      float factor = 1.0 / z;
      vec2 pos = a_star.xy * factor;
      
      gl_Position = vec4(pos, 0.0, 1.0);
      gl_PointSize = factor * 4.0;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    uniform mediump float u_time;
    
    void main() {
      vec2 coord = gl_PointCoord.xy - vec2(0.5);
      float dist = length(coord);
      
      if (dist > 0.5) discard;
      
      float intensity = smoothstep(0.5, 0.0, dist);
      gl_FragColor = vec4(vec3(1.0) * intensity, intensity);
    }
  `;

  function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  const vertexShader = compileShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(program));
    return;
  }
  gl.useProgram(program);

  const numStars = 800;
  const stars = new Float32Array(numStars * 3);
  for (let i = 0; i < numStars; i++) {
    const i3 = i * 3;
    stars[i3] = Math.random() * 2 - 1;
    stars[i3 + 1] = Math.random() * 2 - 1;
    stars[i3 + 2] = Math.random() * 0.9 + 0.1;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, stars, gl.STATIC_DRAW);

  const starLocation = gl.getAttribLocation(program, "a_star");
  gl.enableVertexAttribArray(starLocation);
  gl.vertexAttribPointer(starLocation, 3, gl.FLOAT, false, 12, 0);

  const timeLocation = gl.getUniformLocation(program, "u_time");

  function render(time: number) {
    if(!gl) return;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(timeLocation, time * 0.001);
    gl.drawArrays(gl.POINTS, 0, numStars);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
