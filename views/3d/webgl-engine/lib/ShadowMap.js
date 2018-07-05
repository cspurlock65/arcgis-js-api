// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../../../core/Logger","./Camera","./DefaultVertexAttributeLocations","./DefaultVertexBufferLayouts","./gl-matrix","./glUtil3D","./Util","../../../webgl/BufferObject","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util","../../../webgl/VertexArrayObject"],function(e,t,a,r,i,s,c,d,o,n,h,v,u,p){function l(e,t,a,r,i,s,d,n){c.vec2d.set2(0,0,L);for(var h=0;h<4;++h)c.vec2d.add(L,e[h],L);c.vec2d.scale(L,.25),c.vec2d.set2(0,0,I);for(var h=4;h<8;++h)c.vec2d.add(I,e[h],I);c.vec2d.scale(I,.25),c.vec2d.lerp(e[4],e[5],.5,W[0]),c.vec2d.lerp(e[5],e[6],.5,W[1]),c.vec2d.lerp(e[6],e[7],.5,W[2]),c.vec2d.lerp(e[7],e[4],.5,W[3]);for(var v=0,u=c.vec2d.dist2(W[0],L),h=1;h<4;++h){var p=c.vec2d.dist2(W[h],L);p<u&&(u=p,v=h)}c.vec2d.subtract(W[v],e[v+4],G);var l=G[0];G[0]=-G[1],G[1]=l,c.vec2d.subtract(I,L,Q),c.vec2d.lerp(G,Q,a),c.vec2d.normalize(G);var f,m;f=m=c.vec2d.dot(c.vec2d.subtract(e[0],L,k),G);for(var h=1;h<8;++h){var b=c.vec2d.dot(c.vec2d.subtract(e[h],L,k),G);b<f?f=b:b>m&&(m=b)}c.vec2d.set(L,r),c.vec2d.scale(G,f-t,k),c.vec2d.add(r,k,r);for(var x=-1,g=1,y=0,M=0,h=0;h<8;++h){c.vec2d.subtract(e[h],r,z),c.vec2d.normalize(z);var w=G[0]*z[1]-G[1]*z[0];w>0?w>x&&(x=w,y=h):w<g&&(g=w,M=h)}o.verify(x>0,"leftArea"),o.verify(g<0,"rightArea"),c.vec2d.scale(G,f,q),c.vec2d.add(q,L,q),c.vec2d.scale(G,m,H),c.vec2d.add(H,L,H),X[0]=-G[1],X[1]=G[0];var T=o.rayRay2D(r,e[M],H,c.vec2d.add(H,X,k),1,i),D=o.rayRay2D(r,e[y],H,k,1,s),R=o.rayRay2D(r,e[y],q,c.vec2d.add(q,X,k),1,d),C=o.rayRay2D(r,e[M],q,k,1,n);o.verify(T,"rayRay"),o.verify(D,"rayRay"),o.verify(R,"rayRay"),o.verify(C,"rayRay")}function f(e,t){return 3*t+e}function m(e,t){return c.vec3d.set3(e[t],e[t+3],e[t+6],Y),Y}function b(e,t,a,r,i){c.vec2d.scale(c.vec2d.subtract(a,r,J),.5),K[0]=J[0],K[1]=J[1],K[2]=0,K[3]=J[1],K[4]=-J[0],K[5]=0,K[6]=J[0]*J[0]+J[1]*J[1],K[7]=J[0]*J[1]-J[1]*J[0],K[8]=1,K[f(0,2)]=-c.vec2d.dot(m(K,0),e),K[f(1,2)]=-c.vec2d.dot(m(K,1),e);var s=c.vec2d.dot(m(K,0),a)+K[f(0,2)],d=c.vec2d.dot(m(K,1),a)+K[f(1,2)],o=c.vec2d.dot(m(K,0),r)+K[f(0,2)],n=c.vec2d.dot(m(K,1),r)+K[f(1,2)];s=-(s+o)/(d+n),K[f(0,0)]+=K[f(1,0)]*s,K[f(0,1)]+=K[f(1,1)]*s,K[f(0,2)]+=K[f(1,2)]*s,s=1/(c.vec2d.dot(m(K,0),a)+K[f(0,2)]),d=1/(c.vec2d.dot(m(K,1),a)+K[f(1,2)]),K[f(0,0)]*=s,K[f(0,1)]*=s,K[f(0,2)]*=s,K[f(1,0)]*=d,K[f(1,1)]*=d,K[f(1,2)]*=d,K[f(2,0)]=K[f(1,0)],K[f(2,1)]=K[f(1,1)],K[f(2,2)]=K[f(1,2)],K[f(1,2)]+=1,s=c.vec2d.dot(m(K,1),t)+K[f(1,2)],d=c.vec2d.dot(m(K,2),t)+K[f(2,2)],o=c.vec2d.dot(m(K,1),a)+K[f(1,2)],n=c.vec2d.dot(m(K,2),a)+K[f(2,2)],s=-.5*(s/d+o/n),K[f(1,0)]+=K[f(2,0)]*s,K[f(1,1)]+=K[f(2,1)]*s,K[f(1,2)]+=K[f(2,2)]*s,s=c.vec2d.dot(m(K,1),t)+K[f(1,2)],d=c.vec2d.dot(m(K,2),t)+K[f(2,2)],o=-d/s,K[f(1,0)]*=o,K[f(1,1)]*=o,K[f(1,2)]*=o,i[0]=K[0],i[1]=K[1],i[2]=0,i[3]=K[2],i[4]=K[3],i[5]=K[4],i[6]=0,i[7]=K[5],i[8]=0,i[9]=0,i[10]=1,i[11]=0,i[12]=K[6],i[13]=K[7],i[14]=0,i[15]=K[8]}for(var x=a.getLogger("esri.views.3d.webgl-engine.lib.ShadowMap"),g=function(){function e(){this.camera=new r,this.lightMat=c.mat4d.create()}return e}(),y=function(){function e(e,t){this.doShadowMapMipmapsWork=!1,this.textureRes=4096,this.numCascades=1,this.maxNumCascades=2,this.cascadeDistances=[0,0,0,0,0],this.cascades=[],this.programRep=e,this.rctx=t,this.emptyTexture=d.createEmptyTexture(t);for(var a=0;a<4;++a)this.cascades.push(new g)}return e.prototype.dispose=function(){this.emptyTexture.dispose(),this.emptyTexture=null},Object.defineProperty(e.prototype,"isSupported",{get:function(){return this.rctx.capabilities.standardDerivatives},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"textureResolution",{get:function(){return this.textureRes},set:function(e){this.textureRes=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxCascades",{get:function(){return this.maxNumCascades},set:function(e){this.maxNumCascades=o.clamp(Math.floor(e),1,4)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return!!this.depthTexture},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),e.prototype.getDepthTexture=function(){return this.depthTexture},e.prototype.getCascades=function(){for(var e=0;e<this.numCascades;++e)F[e]=this.cascades[e];return F.length=this.numCascades,F},e.prototype.prepare=function(e,t,a,r){o.assert(this.enabled),c.mat4d.multiply(e.projectionMatrix,e.viewMatrix,w);var i=r.near,s=r.far;i<2&&(i=2),s<2&&(s=2),i>=s&&(i=2,s=4),this.numCascades=Math.min(1+Math.floor(o.logWithBase(s/i,4)),this.maxNumCascades);for(var d=Math.pow(s/i,1/this.numCascades),n=0;n<this.numCascades+1;++n)this.cascadeDistances[n]=i*Math.pow(d,n);c.mat4d.inverse(w,T),c.mat4d.lookAt([0,0,0],[-t[0],-t[1],-t[2]],[0,1,0],V);for(var h=e.viewMatrix,v=e.projectionMatrix,n=0;n<this.numCascades;++n){var u=this.cascades[n],p=-this.cascadeDistances[n],f=-this.cascadeDistances[n+1],m=(v[10]*p+v[14])/Math.abs(v[11]*p+v[15]),x=(v[10]*f+v[14])/Math.abs(v[11]*f+v[15]);o.assert(m<x);for(var g=0;g<8;++g){var y=g%4==0||g%4==3?-1:1,C=g%4==0||g%4==1?-1:1,F=g<4?m:x;c.vec4d.set4(y,C,F,1,D),c.mat4d.multiplyVec4(T,D,R[g]);for(var _=0;_<3;++_)R[g][_]/=R[g][3]}c.vec3d.negate(R[0],B),c.mat4d.translate(V,B,M),u.camera.viewMatrix=M;for(var g=0;g<8;++g)c.mat4d.multiplyVec3(u.camera.viewMatrix,R[g]);c.vec3d.set(R[0],A),c.vec3d.set(R[0],O);for(var g=1;g<8;++g)for(var _=0;_<3;++_)A[_]=Math.min(A[_],R[g][_]),O[_]=Math.max(O[_],R[g][_]);A[2]-=200,O[2]+=200,u.camera.near=-O[2],u.camera.far=-A[2];i=1/R[0][3],s=1/R[4][3],o.assert(i<s);var N=i+Math.sqrt(i*s),L=Math.sin(Math.acos(h[2]*t[0]+h[6]*t[1]+h[10]*t[2]));N/=L,l(R,N,L,E,U,j,P,S),b(E,U,P,S,u.camera.projectionMatrix),u.camera.projectionMatrix[10]=2/(A[2]-O[2]),u.camera.projectionMatrix[14]=-(A[2]+O[2])/(A[2]-O[2]),c.mat4d.multiply(u.camera.projectionMatrix,u.camera.viewMatrix,u.lightMat);var I=this.textureRes/2;u.camera.viewport[0]=n%2==0?0:I,u.camera.viewport[1]=0===Math.floor(n/2)?0:I,u.camera.viewport[2]=I,u.camera.viewport[3]=I}this.lastOrigin=null,this.cascadeDistances[this.numCascades]=100*s;var W=this.rctx,G=W.gl;W.bindFramebuffer(this.fbo),W.bindTexture(null,7),W.setClearColor(1,1,1,1),W.clear(G.COLOR_BUFFER_BIT|G.DEPTH_BUFFER_BIT),W.setBlendingEnabled(!1)},e.prototype.finish=function(e){o.assert(this.enabled),this.rctx.bindFramebuffer(e),this.doShadowMapMipmapsWork&&this.depthTexture.generateMipmap()},e.prototype.bind=function(e){var t=this.rctx,a=this.enabled;t.bindTexture(a?this.depthTexture:this.emptyTexture,7),t.bindProgram(e),e.setUniform1i("depthTex",7),e.setUniform1f("depthHalfPixelSz",a?.5/this.textureRes:-1),e.setUniform1i("shadowMapNum",this.numCascades),e.setUniform4f("shadowMapDistance",this.cascadeDistances[0],this.cascadeDistances[1],this.cascadeDistances[2],this.cascadeDistances[3])},e.prototype.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])},e.prototype.bindView=function(e,t){if(this.enabled){var a=this.lastOrigin;if(!(a&&a[0]===t[0]&&a[1]===t[1]&&a[2]===t[2])){this.lastOrigin=this.lastOrigin||c.vec3d.create(),c.vec3d.set(t,this.lastOrigin);for(var r=0;r<this.numCascades;++r){c.mat4d.translate(this.cascades[r].lightMat,t,_);for(var i=0;i<16;++i)N[16*r+i]=_[i]}}e.setUniformMatrix4fv("shadowMapMatrix",N)}},e.prototype.drawDebugQuad=function(e){o.assert(this.enabled);var t=this.rctx,a=t.gl;if(!this.debugQuadVAO){var r=new Float32Array([0,0,0,0,256,0,1,0,0,256,0,1,256,256,1,1]);this.debugQuadVAO=new p(t,i.Default3D,{geometry:s.Pos2Tex},{geometry:n.createVertex(t,a.STATIC_DRAW,r)})}var c=this.programRep.get("showDepth"),d=this.debugQuadVAO;t.setDepthTestEnabled(!1),t.bindProgram(c),c.setUniformMatrix4fv("proj",e),c.setUniform1i("depthTex",0),t.bindTexture(this.depthTexture,0),t.bindVAO(d),u.assertCompatibleVertexAttributeLocations(d,c),t.drawArrays(a.TRIANGLE_STRIP,0,u.vertexCount(d,"geometry")),t.setDepthTestEnabled(!0)},e.prototype.enable=function(){if(!this.enabled){if(!this.isSupported)return void x.warn("Shadow maps are not supported for this browser or hardware");var e=this.rctx.gl,t={target:e.TEXTURE_2D,pixelFormat:e.RGBA,dataType:e.UNSIGNED_BYTE,wrapMode:e.CLAMP_TO_EDGE,samplingMode:e.NEAREST,flipped:!0,width:this.textureRes,height:this.textureRes};this.depthTexture=new v(this.rctx,t),this.fbo=h.createWithAttachments(this.rctx,this.depthTexture,{colorTarget:0,depthStencilTarget:1,width:this.textureRes,height:this.textureRes})}},e.prototype.disable=function(){this.enabled&&this.fbo&&(this.fbo.dispose(),this.fbo=null,this.depthTexture=null)},e}(),M=c.mat4d.create(),w=c.mat4d.create(),T=c.mat4d.create(),D=c.vec4d.create(),R=[],C=0;C<8;++C)R.push(c.vec4d.create());var A=c.vec3d.create(),O=c.vec3d.create(),E=c.vec2d.create(),U=c.vec2d.create(),j=c.vec2d.create(),P=c.vec2d.create(),S=c.vec2d.create(),V=c.mat4d.create(),B=c.vec3d.create(),F=[],_=c.mat4d.create(),N=new Float32Array(64),L=c.vec2d.create(),I=c.vec2d.create(),W=[c.vec2d.create(),c.vec2d.create(),c.vec2d.create(),c.vec2d.create()],G=c.vec2d.create(),Q=c.vec2d.create(),k=c.vec2d.create(),z=c.vec2d.create(),q=c.vec2d.create(),H=c.vec2d.create(),X=c.vec2d.create(),Y=c.vec3d.create(),J=c.vec2d.create(),K=c.mat3d.create();return y});