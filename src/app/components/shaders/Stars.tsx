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
    attribute vec2 a_position;
    attribute vec2 a_velocity;
    uniform mediump float u_time;
    
    void main() {
      vec2 position = a_position + a_velocity * u_time;
      
      position = fract(position * 0.5 + 0.5) * 2.0 - 1.0;
      
      gl_Position = vec4(position, 0.0, 1.0);
      gl_PointSize = 8.0;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    uniform mediump float u_time;

    void main() {
      vec2 coord = gl_PointCoord.xy - vec2(0.5);
      float dist = length(coord);
      
      if (dist > 0.5) discard;

      float flicker = sin(u_time * 3.0 + gl_FragCoord.x * 0.1) * 0.4 + 0.6;
      float core = smoothstep(0.5, 0.2, dist) * 1.5;
      float glow = (1.0 - smoothstep(0.0, 0.7, dist)) * 0.6;
      float intensity = (core + glow) * flicker;
      
      vec3 color = mix(vec3(1.0, 1.0, 0.9), vec3(1.0, 0.7, 0.2), glow * 0.5);
      
      gl_FragColor = vec4(color * intensity, intensity);
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

  const numStars = 500;
  const stars = new Float32Array(numStars * 4);
  for (let i = 0; i < numStars; i++) {
    const i4 = i * 4;
    stars[i4] = Math.random() * 2 - 1;
    stars[i4 + 1] = Math.random() * 2 - 1;
    stars[i4 + 2] = (Math.random() - 0.5) * 0.02;
    stars[i4 + 3] = (Math.random() - 0.5) * 0.02;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, stars, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  const velocityLocation = gl.getAttribLocation(program, "a_velocity");
  
  gl.enableVertexAttribArray(positionLocation);
  gl.enableVertexAttribArray(velocityLocation);
  
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 16, 0);
  gl.vertexAttribPointer(velocityLocation, 2, gl.FLOAT, false, 16, 8);

  const timeLocation = gl.getUniformLocation(program, "u_time");

  function render(time: number) {
    if (!gl) return;
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(timeLocation, time * 0.001);
    gl.drawArrays(gl.POINTS, 0, numStars);
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}