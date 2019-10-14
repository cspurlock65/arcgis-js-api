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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/extendsHelper","../../../Color","./size","./support/colors","./support/SymbologyBase","./support/utils"],function(e,o,n,a,r,t,i,c,m){function p(e,o,n,a){var r=i[o];if(r){var t=r[e.numColors]||r.stops,c="mesh"!==e.geometryType&&e.worldScale,m=c?e.view:null;switch(e.geometryType){case"point":case"multipoint":var p=n;return l({name:r.name,tags:r.tags,colors:t,noDataColor:p.noDataColor,opacity:1,sizeScheme:a,outline:p.outline,size:p.size},m);case"polyline":var h=n;return s({name:r.name,tags:r.tags,colors:t,noDataColor:h.noDataColor,opacity:1,sizeScheme:a,width:h.width},m);case"polygon":var y=n,v=a;v&&v.marker&&null!=y.markerSize&&(v.marker.size=y.markerSize);return d({name:r.name,tags:r.tags,colors:t,noDataColor:y.noDataColor,opacity:y.fillOpacity,outline:y.outline,sizeScheme:v},m);case"mesh":var w=n;return u({name:r.name,tags:r.tags,colors:t,noDataColor:w.noDataColor,opacity:w.fillOpacity});default:return}}}function l(e,o){return{name:e.name,tags:e.tags.slice(),colors:e.colors.map(function(e){return new r(e)}),noDataColor:new r(e.noDataColor),outline:{color:new r(e.outline.color),width:e.outline.width},size:o?m.toWorldScale(e.size,o):e.size,sizeScheme:e.sizeScheme,opacity:e.opacity}}function s(e,o){return{name:e.name,tags:e.tags.slice(),colors:e.colors.map(function(e){return new r(e)}),noDataColor:new r(e.noDataColor),width:o?m.toWorldScale(e.width,o):e.width,sizeScheme:e.sizeScheme,opacity:e.opacity}}function d(e,o){var n=e.sizeScheme;return n.marker.size=o?m.toWorldScale(n.marker.size,o):n.marker.size,{name:e.name,tags:e.tags.slice(),colors:e.colors.map(function(e){return new r(e)}),noDataColor:new r(e.noDataColor),outline:{color:new r(e.outline.color),width:e.outline.width},sizeScheme:n,opacity:e.opacity}}function u(e){return{name:e.name,tags:e.tags.slice(),colors:e.colors.map(function(e){return new r(e)}),noDataColor:new r(e.noDataColor),opacity:e.opacity}}var h={light:{color:[153,153,153,.25],width:"1px"},dark:{color:[153,153,153,.25],width:"1px"},darker:{color:[26,26,26,.25],width:"1px"}},y={light:{common:{noDataColor:"#aaaaaa",outline:h.light,size:"8px"},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",outline:h.darker,size:"8px"},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}},v={light:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}},w={light:{common:{noDataColor:"#aaaaaa",outline:h.light,fillOpacity:.8,markerSize:"8px"},primary:"predominant-v1",secondary:["predominant-v2","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]},dark:{common:{noDataColor:"#aaaaaa",outline:h.dark,fillOpacity:.8,markerSize:"8px"},primary:"predominant-v2",secondary:["predominant-v1","predominant-v3","predominant-v4","predominant-v5","predominance-race","predominance-money","predominance-race-ethnic","predominance-rainbow","predominance-sequence"]}},g={name:"default",label:"Default",description:"Default theme for visualizing features by their predominant category.",schemes:{point:y,polyline:v,polygon:w}},f={default:g};return new(function(e){function o(){return e.call(this,{themeDictionary:f})||this}return a(o,e),o.prototype.getSchemes=function(e){var o=this.getRawSchemes({theme:"default",basemap:e.basemap,geometryType:e.geometryType,basemapTheme:e.basemapTheme});if(o){var n=o.schemesInfo,a=o.basemapId,r=o.basemapTheme,i=n.common,c=t.getSchemes({basemap:e.basemap,geometryType:e.geometryType,worldScale:e.worldScale,view:e.view}),m=c&&c.primaryScheme;return{primaryScheme:p(e,n.primary,i,m),secondarySchemes:n.secondary.map(function(o){return p(e,o,i,m)}).filter(Boolean),basemapId:a,basemapTheme:r}}},o.prototype.getSchemeByName=function(e){return this.filterSchemesByName(e)},o.prototype.getSchemesByTag=function(e){return this.filterSchemesByTag(e)},o.prototype.cloneScheme=function(e){if(e){var o=n({},e);return o.colors=o.colors.map(function(e){return new r(e)}),o.noDataColor&&(o.noDataColor=new r(o.noDataColor)),"outline"in o&&o.outline&&(o.outline={color:o.outline.color&&new r(o.outline.color),width:o.outline.width}),"sizeScheme"in o&&o.sizeScheme&&(o.sizeScheme=t.cloneScheme(o.sizeScheme)),o}},o}(c))});