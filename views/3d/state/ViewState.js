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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Evented","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec3f64","../../ViewAnimation","./Constraints","./controllers/AnimationController","./controllers/CameraController","../support/earthUtils","../support/PropertiesPool","../webgl-engine/lib/Camera"],function(e,t,r,o,a,n,i,l,p,s,c,u,d,m,f){Object.defineProperty(t,"__esModule",{value:!0});var y=function(e){function t(t){var r=e.call(this,t)||this;return r.propertiesPool=new m.default({camera:f.default},r),r.lastSeenCameraProjectionValues=new f.default,r.events=new n,r.updateQueue=new Array,r.processingUpdates=!1,r}return r(t,e),t.prototype.destroy=function(){this.cameraController=null,this.propertiesPool&&(this.propertiesPool.destroy(),this.propertiesPool=null)},t.prototype.normalizeCtorArgs=function(e){return{camera:this.createInitialCamera(e.viewingMode),mode:e.viewingMode,spatialReference:e.spatialReference,constraints:new s.default({mode:e.viewingMode})}},Object.defineProperty(t.prototype,"animation",{get:function(){return this.cameraController instanceof c.AnimationController?this.cameraController.viewAnimation:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"camera",{get:function(){return this._get("camera")},set:function(e){e!==h&&h.copyFrom(e),h.markViewDirty(),h.computeUp(this.mode),g.camera=h,this.events.emit("before-camera-change",g);var t=this._get("camera");this.cameraProjectionChanged(this.lastSeenCameraProjectionValues,h)&&(this.lastSeenCameraProjectionValues.copyFrom(h),C.camera=this.lastSeenCameraProjectionValues,this.events.emit("camera-projection-changed",C)),t&&t.equals(h)||this._set("camera",this.propertiesPool.get("camera").copyFrom(h))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isGlobal",{get:function(){return!this.isLocal},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isLocal",{get:function(){return"local"===this.mode},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"interacting",{get:function(){return!!this.cameraController&&this.cameraController.isInteractive},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cameraController",{get:function(){return this._get("cameraController")},set:function(e){var t=this;if(!this.stopActiveCameraController())return void(e&&(e.state=u.State.Rejected));e&&(e.watch("state",function(r){r!==u.State.Finished&&r!==u.State.Stopped||(t._set("cameraController",null),t.updateCamera(function(t){return e.onControllerEnd(t)}))},!0),e.onControllerStart(this.camera)),this._set("cameraController",e)},enumerable:!0,configurable:!0}),t.prototype.switchCameraController=function(e){return this.cameraController=e,e.state!==u.State.Rejected},t.prototype.stopActiveCameraController=function(){return!(this.cameraController&&!this.cameraController.stopController())},t.prototype.cameraChanged=function(){this.updateCamera(function(){})},t.prototype.updateCamera=function(e){this.updateQueue.push(e),this.processUpdateQueue()},t.prototype.processUpdateQueue=function(){if(0!==this.updateQueue.length&&!this.processingUpdates){this.processingUpdates=!0;var e=this.updateQueue.shift();h.copyFrom(this._get("camera")),e(h),this.camera=h,this.processingUpdates=!1,this.processUpdateQueue()}},t.prototype.createInitialCamera=function(e){return"global"===e?new f.default(l.vec3f64.fromValues(4*d.earthRadius,0,0),l.vec3f64.fromValues(d.earthRadius,0,0),l.vec3f64.fromValues(0,0,1)):new f.default(l.vec3f64.fromValues(0,0,100),l.vec3f64.fromValues(0,0,0),l.vec3f64.fromValues(0,1,0))},t.prototype.cameraProjectionChanged=function(e,t){return e.fov!==t.fov||(e.fullViewport[0]!==t.fullViewport[0]||e.fullViewport[1]!==t.fullViewport[1]||e.fullViewport[2]!==t.fullViewport[2]||e.fullViewport[3]!==t.fullViewport[3]||(e.padding[0]!==t.padding[0]||e.padding[1]!==t.padding[1]||e.padding[2]!==t.padding[2]||e.padding[3]!==t.padding[3]))},o([i.property({readOnly:!0,type:p,dependsOn:["cameraController"]})],t.prototype,"animation",null),o([i.property({type:f.default})],t.prototype,"camera",null),o([i.property({constructOnly:!0})],t.prototype,"constraints",void 0),o([i.property({readOnly:!0})],t.prototype,"events",void 0),o([i.property({readOnly:!0,dependsOn:["isLocal"]})],t.prototype,"isGlobal",null),o([i.property({readOnly:!0,dependsOn:["mode"]})],t.prototype,"isLocal",null),o([i.property({constructOnly:!0})],t.prototype,"mode",void 0),o([i.property({constructOnly:!0})],t.prototype,"spatialReference",void 0),o([i.property({readOnly:!0,dependsOn:["cameraController"]})],t.prototype,"interacting",null),o([i.property()],t.prototype,"cameraController",null),t=o([i.subclass("esri.views.3d.state.ViewState")],t)}(i.declared(a));t.ViewState=y;var h=new f.default,g={camera:null},C={camera:null};t.default=y});