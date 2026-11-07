import * as THREE from "three";

// Port of drei's MeshReflectorMaterial (blur/depth disabled, as configured on
// the original site): a standard material whose diffuse colour is modulated by
// a planar reflection rendered from a mirrored camera every frame.

export class ReflectorMaterial extends THREE.MeshStandardMaterial {
  constructor(params = {}) {
    const { mirror = 0, mixStrength = 1, distortion = 1, distortionMap = null, mixContrast = 1, ...rest } = params;
    super(rest);
    this._uniforms = {
      tDiffuse: { value: null },
      distortionMap: { value: distortionMap },
      textureMatrix: { value: new THREE.Matrix4() },
      mirror: { value: mirror },
      mixStrength: { value: mixStrength },
      distortion: { value: distortion },
      mixContrast: { value: mixContrast },
    };
    this.defines = { USE_UV: "" };
    if (distortionMap) this.defines.USE_DISTORTION = "";
  }

  onBeforeCompile(shader) {
    Object.assign(shader.uniforms, this._uniforms);
    shader.vertexShader = `uniform mat4 textureMatrix;\nvarying vec4 my_vUv;\n${shader.vertexShader}`.replace(
      "#include <project_vertex>",
      `#include <project_vertex>
        my_vUv = textureMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );`,
    );
    shader.fragmentShader = `
      uniform sampler2D tDiffuse;
      uniform sampler2D distortionMap;
      uniform float distortion;
      uniform float mirror;
      uniform float mixStrength;
      uniform float mixContrast;
      varying vec4 my_vUv;
      ${shader.fragmentShader}`.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>
      float distortionFactor = 0.0;
      #ifdef USE_DISTORTION
        distortionFactor = texture2D(distortionMap, vUv).r * distortion;
      #endif
      vec4 new_vUv = my_vUv;
      new_vUv.x += distortionFactor;
      new_vUv.y += distortionFactor;
      vec4 merge = texture2DProj(tDiffuse, new_vUv);
      vec4 newMerge = vec4(0.0, 0.0, 0.0, 1.0);
      newMerge.r = (merge.r - 0.5) * mixContrast + 0.5;
      newMerge.g = (merge.g - 0.5) * mixContrast + 0.5;
      newMerge.b = (merge.b - 0.5) * mixContrast + 0.5;
      diffuseColor.rgb = diffuseColor.rgb * ((1.0 - min(1.0, mirror)) + newMerge.rgb * mixStrength);`,
    );
  }

  customProgramCacheKey() {
    return "moosa-reflector";
  }
}

/** Renders the mirrored view for a reflector mesh lying in its local XY plane. */
export class PlanarReflection {
  constructor(mesh, material, resolution) {
    this.mesh = mesh;
    this.material = material;
    this.target = new THREE.WebGLRenderTarget(resolution, resolution, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      type: THREE.HalfFloatType,
    });
    this.target.depthBuffer = true;
    material._uniforms.tDiffuse.value = this.target.texture;
    this.textureMatrix = material._uniforms.textureMatrix.value;
    this.mirrorCamera = new THREE.PerspectiveCamera();
    this.plane = new THREE.Plane();
    this.normal = new THREE.Vector3();
    this.reflectorWorld = new THREE.Vector3();
    this.cameraWorld = new THREE.Vector3();
    this.rotation = new THREE.Matrix4();
    this.lookAt = new THREE.Vector3(0, 0, -1);
    this.clip = new THREE.Vector4();
    this.view = new THREE.Vector3();
    this.target2 = new THREE.Vector3();
    this.q = new THREE.Vector4();
  }

  setResolution(size) {
    this.target.setSize(size, size);
  }

  update(camera) {
    const { mesh, normal, reflectorWorld, cameraWorld, rotation, lookAt, view, target2, mirrorCamera, plane, clip, q } = this;
    reflectorWorld.setFromMatrixPosition(mesh.matrixWorld);
    cameraWorld.setFromMatrixPosition(camera.matrixWorld);
    rotation.extractRotation(mesh.matrixWorld);
    normal.set(0, 0, 1).applyMatrix4(rotation);
    view.subVectors(reflectorWorld, cameraWorld);
    if (view.dot(normal) > 0) return false;
    view.reflect(normal).negate();
    view.add(reflectorWorld);
    rotation.extractRotation(camera.matrixWorld);
    lookAt.set(0, 0, -1).applyMatrix4(rotation);
    lookAt.add(cameraWorld);
    target2.subVectors(reflectorWorld, lookAt);
    target2.reflect(normal).negate();
    target2.add(reflectorWorld);
    mirrorCamera.position.copy(view);
    mirrorCamera.up.set(0, 1, 0).applyMatrix4(rotation).reflect(normal);
    mirrorCamera.lookAt(target2);
    mirrorCamera.far = camera.far;
    mirrorCamera.updateMatrixWorld();
    mirrorCamera.projectionMatrix.copy(camera.projectionMatrix);
    this.textureMatrix.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    this.textureMatrix.multiply(mirrorCamera.projectionMatrix);
    this.textureMatrix.multiply(mirrorCamera.matrixWorldInverse);
    this.textureMatrix.multiply(mesh.matrixWorld);
    plane.setFromNormalAndCoplanarPoint(normal, reflectorWorld);
    plane.applyMatrix4(mirrorCamera.matrixWorldInverse);
    clip.set(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
    const p = mirrorCamera.projectionMatrix;
    q.x = (Math.sign(clip.x) + p.elements[8]) / p.elements[0];
    q.y = (Math.sign(clip.y) + p.elements[9]) / p.elements[5];
    q.z = -1;
    q.w = (1 + p.elements[10]) / p.elements[14];
    clip.multiplyScalar(2 / clip.dot(q));
    p.elements[2] = clip.x;
    p.elements[6] = clip.y;
    p.elements[10] = clip.z + 1;
    p.elements[14] = clip.w;
    return true;
  }

  render(renderer, scene, camera) {
    if (!this.update(camera)) return;
    this.mesh.visible = false;
    const shadowAuto = renderer.shadowMap.autoUpdate;
    // The first pass must build the shadow maps, or the shadow samplers bind an empty texture.
    renderer.shadowMap.autoUpdate = !this.primed;
    this.primed = true;
    renderer.setRenderTarget(this.target);
    renderer.state.buffers.depth.setMask(true);
    if (!renderer.autoClear) renderer.clear();
    renderer.render(scene, this.mirrorCamera);
    renderer.shadowMap.autoUpdate = shadowAuto;
    this.mesh.visible = true;
    renderer.setRenderTarget(null);
  }

  dispose() {
    this.target.dispose();
  }
}
