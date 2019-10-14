// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/next/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/assignHelper","../../../../core/mathUtils","../../../../core/maybe","../../../../core/string","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../geometry/support/aaBoundingBox","../../glTF/DefaultLoadingContext","../../glTF/esriProvidedModelParameters","../../glTF/loader","../../glTF/internal/indexUtils","./wosrLoader","../../support/buffer/BufferView","../../support/buffer/math","../../support/buffer/utils","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryData","../../webgl-engine/lib/Texture","../../webgl-engine/materials/DefaultMaterial","../../webgl-engine/materials/internal/MaterialUtil"],function(e,t,r,o,s,i,a,u,n,l,c,f,m,d,p,g,x,v,b,h,w,B,M,S,T,R,y){function V(e,t){return void 0===t&&(t={}),s(this,void 0,void 0,function(){var r,s,a,u,n,l,c,f,m,d;return o(this,function(o){switch(o.label){case 0:return r=C(e),"wosr"!==r.fileType?[3,2]:[4,b.load(r.url,t)];case 1:return s=o.sent(),[2,{lods:[s],referenceBoundingBox:s.boundingBox,isEsriSymbolResource:!1,isWosr:!0}];case 2:return a=new p.DefaultLoadingContext(t.streamDataRequester),[4,x.load(a,r.url,t)];case 3:return u=o.sent(),(P(u),F(u),n=i({},t.materialParamsMixin,{treeRendering:u.customMeta.esriTreeRendering},E(u,t.usePBR)),null!=r.specifiedLodIndex)?(l=O(u,n,r.specifiedLodIndex),c=l[0].boundingBox,0!==r.specifiedLodIndex&&(f=O(u,n,r.specifiedLodIndex),c=f[0].boundingBox),[2,{lods:l,referenceBoundingBox:c,isEsriSymbolResource:u.meta.isEsriSymbolResource,isWosr:!1}]):(m=O(u,n),d=m[0].boundingBox,[2,{lods:m,referenceBoundingBox:d,isEsriSymbolResource:u.meta.isEsriSymbolResource,isWosr:!1}])}})})}function C(e){var t=e.match(/(.*\.(gltf|glb))(\?lod=([0-9]+))?$/);return t?{fileType:"gltf",url:t[1],specifiedLodIndex:null!=t[4]?Number(t[4]):null}:e.match(/(.*\.(json|json\.gz))$/)?{fileType:"wosr",url:e,specifiedLodIndex:null}:{fileType:"unknown",url:e,specifiedLodIndex:null}}function E(e,t){return e.meta.isEsriSymbolResource?t?!0===e.customMeta.esriTreeRendering?y.defaultPBRTreeMaterialParameters:y.defaultPBRMaterialParameters:{usePBR:!1}:{usePBR:!0}}function O(e,t,r){var o=e.model,s=c.mat4f64.create(),a=new Array,n=new Map,f=new Map;return o.lods.forEach(function(e,c){if(void 0===r||c===r){var m=0,p={name:e.name,stageResources:{textures:new Array,materials:new Array,geometries:new Array},lodThreshold:u.isSome(e.lodThreshold)?e.lodThreshold:null,pivotOffset:[0,0,0],numberOfVertices:0,boundingBox:d.empty()};a.push(p),e.parts.forEach(function(r){var a=r.material+(r.attributes.normal?"_normal":"")+(r.attributes.color?"_color":"")+(r.attributes.texCoord0?"_texCoord0":"")+(r.attributes.tangent?"_tangent":""),c=o.materials.get(r.material),g=u.isSome(r.attributes.texCoord0),x=u.isSome(r.attributes.normal);if(!n.has(a)){if(g){if(u.isSome(c.textureColor)&&!f.has(c.textureColor)){var v=o.textures.get(c.textureColor),b=i({},v.parameters,{preMultiplyAlpha:!0});f.set(c.textureColor,new T(v.data,c.textureColor,b))}if(u.isSome(c.textureNormal)&&!f.has(c.textureNormal)){var v=o.textures.get(c.textureNormal),b=i({},v.parameters,{preMultiplyAlpha:!0});f.set(c.textureNormal,new T(v.data,c.textureNormal,b))}if(u.isSome(c.textureOcclusion)&&!f.has(c.textureOcclusion)){var v=o.textures.get(c.textureOcclusion),b=i({},v.parameters,{preMultiplyAlpha:!0});f.set(c.textureOcclusion,new T(v.data,c.textureOcclusion,b))}if(u.isSome(c.textureEmissive)&&!f.has(c.textureEmissive)){var v=o.textures.get(c.textureEmissive),b=i({},v.parameters,{preMultiplyAlpha:!0});f.set(c.textureEmissive,new T(v.data,c.textureEmissive,b))}if(u.isSome(c.textureMetallicRoughness)&&!f.has(c.textureMetallicRoughness)){var v=o.textures.get(c.textureMetallicRoughness),b=i({},v.parameters,{preMultiplyAlpha:!0});f.set(c.textureMetallicRoughness,new T(v.data,c.textureMetallicRoughness,b))}}var y=R.COLOR_GAMMA,V=Math.pow(c.color[0],1/y),C=Math.pow(c.color[1],1/y),E=Math.pow(c.color[2],1/y),O=Math.pow(c.emissiveFactor[0],1/y),I=Math.pow(c.emissiveFactor[1],1/y),P=Math.pow(c.emissiveFactor[2],1/y);n.set(a,new R(i({transparent:"BLEND"===c.alphaMode,textureAlphaMode:L(c.alphaMode),textureAlphaCutoff:c.alphaCutoff,diffuse:[V,C,E],ambient:[V,C,E],opacity:c.opacity,doubleSided:c.doubleSided,doubleSidedType:"winding-order",cullFace:c.doubleSided?"none":"back",vertexColors:!!r.attributes.color,vertexTangents:!!r.attributes.tangent,normals:x?"default":"screenDerivative",castShadows:!0,receiveSSAO:!0,textureId:u.isSome(c.textureColor)&&g?f.get(c.textureColor).id:void 0,colorMixMode:c.colorMixMode,normalTextureId:u.isSome(c.textureNormal)&&g?f.get(c.textureNormal).id:void 0,textureAlphaPremultiplied:!0,occlusionTextureId:u.isSome(c.textureOcclusion)&&g?f.get(c.textureOcclusion).id:void 0,emissiveTextureId:u.isSome(c.textureEmissive)&&g?f.get(c.textureEmissive).id:void 0,metallicRoughnessTextureId:u.isSome(c.textureMetallicRoughness)&&g?f.get(c.textureMetallicRoughness).id:void 0,emissiveFactor:[O,I,P],metallicFactor:c.metallicFactor,roughnessFactor:c.roughnessFactor,usePBR:!0},t),a))}var F=A(r.indices||r.attributes.position.count,r.primitiveType),D={},N={},_=r.attributes.position.count,U=B.createBuffer(h.BufferViewVec3f,_);if(w.vec3.transformMat4(U,r.attributes.position,r.transform),N.position={data:U.typedBuffer,size:U.elementCount},D.position=F,u.isSome(r.attributes.normal)){var z=B.createBuffer(h.BufferViewVec3f,_);l.mat4.invert(s,r.transform),l.mat4.transpose(s,s),w.vec3.transformMat4(z,r.attributes.normal,s),N.normal={data:z.typedBuffer,size:z.elementCount},D.normal=F}if(u.isSome(r.attributes.tangent)){var G=B.createBuffer(h.BufferViewVec4f,_);l.mat4.invert(s,r.transform),l.mat4.transpose(s,s),w.vec4.transformMat4(G,r.attributes.tangent,s),N.aTangent={data:G.typedBuffer,size:G.elementCount},D.aTangent=F}if(u.isSome(r.attributes.texCoord0)){var H=B.createBuffer(h.BufferViewVec2f,_);B.vec2.normalizeIntegerBuffer(H,r.attributes.texCoord0),N.uv0={data:H.typedBuffer,size:H.elementCount},D.uv0=F}if(u.isSome(r.attributes.color)){var W=B.createBuffer(h.BufferViewVec4u8,_);if(4===r.attributes.color.elementCount)r.attributes.color instanceof h.BufferViewVec4f?w.vec4.scale(W,r.attributes.color,255):r.attributes.color instanceof h.BufferViewVec4u8?B.vec4.copy(W,r.attributes.color):r.attributes.color instanceof h.BufferViewVec4u16&&w.vec4.scale(W,r.attributes.color,1/256);else{B.vec4.fill(W,255,255,255,255);var j=new h.BufferViewVec3u8(W.buffer,0,4);r.attributes.color instanceof h.BufferViewVec3f?w.vec3.scale(j,r.attributes.color,255):r.attributes.color instanceof h.BufferViewVec3u8?B.vec3.copy(j,r.attributes.color):r.attributes.color instanceof h.BufferViewVec3u16&&w.vec3.scale(j,r.attributes.color,1/256)}N.color={data:W.typedBuffer,size:W.elementCount},D.color=F}var k=new M(new S.GeometryData(N,D),"gltf_"+e.name+"_"+m++);p.stageResources.geometries.push(k),p.stageResources.materials.push(n.get(a)),g&&(u.isSome(c.textureColor)&&p.stageResources.textures.push(f.get(c.textureColor)),u.isSome(c.textureNormal)&&p.stageResources.textures.push(f.get(c.textureNormal)),u.isSome(c.textureOcclusion)&&p.stageResources.textures.push(f.get(c.textureOcclusion)),u.isSome(c.textureEmissive)&&p.stageResources.textures.push(f.get(c.textureEmissive)),u.isSome(c.textureMetallicRoughness)&&p.stageResources.textures.push(f.get(c.textureMetallicRoughness))),p.numberOfVertices+=_;var q=k.boundingInfo;d.expand(p.boundingBox,q.getBBMin()),d.expand(p.boundingBox,q.getBBMax())})}}),a}function L(e){switch(e){case"BLEND":return"blend";case"MASK":return"mask";case"OPAQUE":return"opaque";default:return"blend"}}function A(e,t){switch(t){case 4:return v.trianglesToTriangles(e);case 5:return v.triangleStripToTriangles(e);case 6:return v.triangleFanToTriangles(e)}}function I(e,t){void 0===e&&(e=""),void 0===t&&(t="");var r=n.endsWith(e,"Imposter"),o=e.split("__")[0];if(-1!==t.indexOf("/RealisticTrees/")){var s=g.treeParamsTable[o];if(s)return{crownCenter:s.center,crownDimensions:s.radius,imposter:r}}}function P(e){if(e.meta.isEsriSymbolResource)for(var t=0,r=e.model.lods;t<r.length;t++){var o=r[t],s=I(o.name,e.meta.uri);if(!s)return;e.customMeta.esriTreeRendering=!0;for(var i=0,n=o.parts;i<n.length;i++){var d=n[i],p=d.attributes.normal;if(u.isNone(p))return;for(var g=d.attributes.position,x=g.count,v=m.vec3f64.create(),b=m.vec3f64.create(),w=m.vec3f64.create(),M=B.createBuffer(h.BufferViewVec4u8,x),S=B.createBuffer(h.BufferViewVec3f,x),T=l.mat4.invert(c.mat4f64.create(),d.transform),R=f.vec3.transformMat4(m.vec3f64.create(),s.crownCenter,T),y=f.vec3.transformMat4(m.vec3f64.create(),s.crownDimensions,T),V=0;V<x;V++){g.getVec(V,b),p.getVec(V,v),f.vec3.subtract(w,b,R),f.vec3.divide(w,w,y);var C=a.clamp(f.vec3.length(w),0,1),E=.6+.4*C*C;f.vec3.lerp(w,w,v,.2),S.setVec(V,w),M.set(V,0,255*E),M.set(V,1,255*E),M.set(V,2,255*E),M.set(V,3,255)}d.attributes.normal=S,d.attributes.color=M}}}function F(e){var t=e.model.lods.length;e.meta.isEsriSymbolResource&&e.model.lods.forEach(function(e){if(!u.isSome(e.lodThreshold)){var r=(e.name||"").replace("Imposter","Realistic_LOD0"),o=r.split("_LOD")[0],s=e.parts.reduce(function(e,t){return e+t.attributes.position.count},0);e.lodThreshold=D(o,s,t)}})}function D(e,t,r){if(void 0===e&&(e=""),1===r)return null;if(e in g.lodThresholdLUT){var o=g.lodThresholdLUT[e].vertexCounts,s=g.lodThresholdLUT[e].thresholds,i=o.length,a=t;if(i<=1)return null;if(a<=o[0]){var u=(o[1]-o[0])/(s[1]-s[0]),n=a-o[0];return Math.max(0,s[0]+n*u)}if(a>=o[i-1]){var u=(o[i-1]-o[i-2])/(s[i-1]-s[i-2]),n=a-o[i-1];return s[i-1]+n*u}for(var l=1;l<o.length;++l){var c=o[l-1],f=o[l],m=s[l-1],d=s[l];if(a<f){var p=(a-c)/(f-c);return m*(1-p)+d*p}}}return null}Object.defineProperty(t,"__esModule",{value:!0}),t.fetch=V,t.parseUrl=C,t.gltfToEngineResources=O});