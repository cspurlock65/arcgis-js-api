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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/screenUtils","../../../../geometry/Polygon","./ElevationAligners","./Graphics3DDrapedGraphicLayer","./Graphics3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./lineUtils","../../lib/glMatrix","../../support/aaBoundingBox","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry"],function(e,t,r,i,n,a,o,s,l,p,h,y,u,d,g,c,v,_){var m=u.vec3d,f=u.mat4d;return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype._prepareResources=function(){var e=this.symbol,t=this._isPropertyDriven("size")||this._isPropertyDriven("color")||this._isPropertyDriven("opacity"),r={idHint:this._getStageIdHint(),width:this._getWidth(e),color:this._getMaterialOpacityAndColor()};if(!this._isPropertyDriven("size")){var i=h.validateSymbolLayerSize(r.width);if(i)return this._logWarning(i),void this.reject()}if(t||r.width>=1.5)this._isPropertyDriven("size")&&(r.width=0),this._material=y.createRibbonMaterial(r);else{if(!(r.width>0))return void this.reject();this._material=y.createNativeMaterial(r)}this._context.stage.add(g.ModelContentType.MATERIAL,this._material),this.resolve()},t.prototype._getWidth=function(e){return null!=e.size?i.pt2px(e.size):1},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(g.ModelContentType.MATERIAL,this._material.id),this._material=null)},t.prototype.createGraphics3DGraphic=function(e,t){var r=this._validateGeometry(e.geometry);if("polyline"!==r.type&&"polygon"!==r.type&&"extent"!==r.type)return this._logWarning("unsupported geometry type for line symbol: "+r.type),null;var n="polygon"===r.type||"extent"===r.type?"rings":"paths",a="graphic"+e.uid,o=this._getVertexOpacityAndColor(t,Float32Array,255),s=0;t.size&&this._isPropertyDriven("size")&&(s=l.getSingleSizeDriver(t.size),s=i.pt2px(s));var p=this.getGraphicElevationContext(e);return"on-the-ground"===p.mode?this._createAsOverlay(e,n,o,s,p,a):this._createAs3DShape(e,n,o,s,p,a,e.uid)},t.prototype.layerPropertyChanged=function(e,t,r){if("opacity"===e){var i=this._material.getColor();return this._material.setColor([i[0],i[1],i[2],this._getMaterialOpacity()]),!0}if("elevationInfo"===e){var n=this._elevationContext.mode;this._updateElevationContext();var a=this._elevationContext.mode;if(null==n||null==a)return!1;if("on-the-ground"===n&&"on-the-ground"===a)return!0;if(n!==a&&("on-the-ground"===n||"on-the-ground"===a))return!1;var o=l.needsElevationUpdates2D(a);for(var s in t){var p=t[s],h=r(p);if(h&&!h.isDraped()){var y=p.graphic;h.needsElevationUpdates=o,h.elevationContext.set(this.getGraphicElevationContext(y))}}return!0}return!1},t.prototype._getOutlineGeometry=function(e,t){return t},t.prototype._getGeometry=function(e){var t=this._validateGeometry(e.geometry);return"extent"===t.type&&(t=n.fromExtent(t)),t},t.prototype._createAs3DShape=function(e,t,r,i,n,o,p){var h=this._getGeometry(e),u=h.hasZ,d=h[t],g=this._getOutlineGeometry(h,d),_=[],x=[],E=[],D=m.create(),b=new Array(6),G=l.getGeometryVertexData3D(g,u,h.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,n);if(this._logGeometryCreationWarnings(G,d,t,"LineSymbol3DLayer"),g.length>0){for(var C=G.geometryData.outlines,w=G.eleVertexData,A=G.vertexData,S=0;S<C.length;++S){var P=C[S];if(!(P.count<=1)){var L=P.index,M=P.count;if(!this._context.clippingExtent||(l.computeBoundingBox(w,L,M,b),!l.boundingBoxClipped(b,this._context.clippingExtent))){l.chooseOrigin(A,L,M,D),l.subtractCoordinates(A,L,M,D);var R=new Float64Array(w.buffer,3*L*w.BYTES_PER_ELEMENT,3*M),T=new Float64Array(A.buffer,3*L*A.BYTES_PER_ELEMENT,3*M),O=y.createPolylineGeometry(T,R,"rings"===t,r,i),B=new c(O,o+"path"+S);B.singleUse=!0,_.push(B),x.push([this._material]);var z=f.identity();f.translate(z,D,z),E.push(z)}}}if(_.length>0){var I=new v({geometries:_,materials:x,transformations:E,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicId:p},idHint:o}),U=a.perVertexElevationAligner,N=new s(this,I,_,null,null,U,n);return N.alignedTerrainElevation=G.terrainElevation,N.needsElevationUpdates=l.needsElevationUpdates2D(n.mode),N}}return null},t.prototype._createAsOverlay=function(e,t,r,i,n,a){var s=this._getGeometry(e);this._material.renderPriority=this._symbolLayerOrder;var p=s[t],h=this._getOutlineGeometry(s,p),u=[],g=new Array(6),c=d.create(d.NEGATIVE_INFINITY),v=m.create(),x=l.getGeometryVertexDataDraped(h,s.spatialReference,this._context.overlaySR);if(this._logGeometryCreationWarnings(x,p,t,"LineSymbol3DLayer"),h.length>0){for(var E=x.vertexData,D=x.geometryData.outlines,b=0;b<D.length;++b){var G=D[b],C=G.index,w=G.count;if(l.computeBoundingBox(E,C,w,g),!l.boundingBoxClipped(g,this._context.clippingExtent)){d.expand(c,g),l.chooseOrigin(E,C,w,v),l.subtractCoordinates(E,C,w,v),l.setZ(E,C,w,this._getDrapedZ());var A=new Float64Array(E.buffer,3*C*E.BYTES_PER_ELEMENT,3*w),S=f.identity();f.translate(S,v,S);var P=y.createPolylineGeometry(A,null,"rings"===t,r,i),L=new _(P);L.material=this._material,L.center=[.5*(g[0]+g[3]),.5*(g[1]+g[4]),0],L.bsRadius=.5*Math.sqrt((g[3]-g[0])*(g[3]-g[0])+(g[4]-g[1])*(g[4]-g[1])),L.transformation=S,L.name=a,L.uniqueName=a+"#"+P.id,u.push(L)}}return new o(this,u,null,null,c,n)}return null},t}(p)});