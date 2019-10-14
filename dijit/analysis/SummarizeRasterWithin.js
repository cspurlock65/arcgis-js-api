// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.30/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/json","dojo/has","dojo/dom-class","dojo/dom-style","dojo/string","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","../../kernel","../../lang","./RasterAnalysisMixin","./utils","./AnalysisRegistry","./ItemTypes","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeRasterWithin.html"],function(e,t,i,a,s,l,n,r,u,o,h,y,d,c,p,L,m,v,_,g,S){var T=e([u,o,h,y,d,L],{declaredClass:"esri.dijit.analysis.SummarizeRasterWithin",templateString:S,widgetsInTemplate:!0,inputLayer:null,valueLayer:null,valueLayers:null,zoneField:null,ignoreNoData:!0,statsType:null,toolName:"SummarizeRasterWithin",helpFileName:"SummarizeRasterWithin",toolNlsName:g.summarizeRasterWithinTool,rasterGPToolName:"SummarizeRasterWithin",resultParameter:"outputRaster",browseType:[_.IS,_.FS],hasCustomCheck:!0,customCheckFailureMessage:g.customCheckFailureMessage.integerService,constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),e.rerun&&(e.inputLayer=e.inputZoneLayer,e.valueLayer=e.inputRasterLayertoSummarize,e.statsType=e.statisticType,e.ignoreNoData=e.ignoreMissingValues)},_getJobParameters:function(){var e=a.toJson(m.constructAnalysisInputLyrObj(this.get("inputLayer"))),t=a.toJson(m.constructAnalysisInputLyrObj(this.get("valueLayer")));return{zoneField:this.get("zoneField"),ignoreMissingValues:this.get("ignoreNoData"),statisticType:this.get("statsType"),inputZoneLayer:e,inputRasterLayertoSummarize:t}},_setDefaultInputs:function(){var e=0;this.valueLayers&&i.forEach(this.valueLayers,function(t,i){this._layersSelect.addOption({value:i,label:t.name}),0!==i||this.rerun?this.valueLayer&&t.name===this.valueLayer.name&&t.url===this.valueLayer.url&&(e=i):this.set("valueLayer",t)},this),this.valueLayer&&e>0&&this._layersSelect.set("value",e),this.zoneField&&this._zoneFieldSelect.set("value",this.zoneField),this.statsType&&this._loadStatsType(!0),this._ignoreNoDataCheck.set("checked",this.ignoreNoData)},_resetUI:function(){this.set("zoneField",this.zoneField),this.inputLayer&&this.valueLayer&&(this.outputLayerName=r.substitute(this.i18n.outputLayerNameFull,{layername:this.inputLayer.name,valuelayername:this.valueLayer.name}),this._outputLayerInput.set("value",this.outputLayerName))},_loadStatsType:function(e){if(this._statsTypeSelect.removeOption(this._statsTypeSelect.getOptions()),this.valueLayer){var t=!1,i=this.valueLayer.pixelType;this.isFloat(this.valueLayer)?!i&&this.rerun&&this.statsType&&["MAJORITY","MEDIAN","MINORITY","VARIETY"].indexOf(this.statsType)>0&&(t=!0):t=!0;var a=e&&this.statsType;t?this._statsTypeSelect.addOption([{value:"MEAN",label:this.i18n.average,selected:"MEAN"===a},{value:"MAJORITY",label:this.i18n.majority,selected:"MAJORITY"===a},{value:"MAXIMUM",label:this.i18n.maximum,selected:"MAXIMUM"===a},{value:"MEDIAN",label:this.i18n.median,selected:"MEDIAN"===a},{value:"MINIMUM",label:this.i18n.minimum,selected:"MINIMUM"===a},{value:"MINORITY",label:this.i18n.minority,selected:"MINORITY"===a},{value:"RANGE",label:this.i18n.range,selected:"RANGE"===a},{value:"STD",label:this.i18n.standardDeviation,selected:"STD"===a},{value:"SUM",label:this.i18n.sum,selected:"SUM"===a},{value:"VARIETY",label:this.i18n.variety,selected:"VARIETY"===a}]):this._statsTypeSelect.addOption([{value:"MEAN",label:this.i18n.average,selected:"MEAN"===a},{value:"MAXIMUM",label:this.i18n.maximum,selected:"MAXIMUM"===a},{value:"MINIMUM",label:this.i18n.minimum,selected:"MINIMUM"===a},{value:"RANGE",label:this.i18n.range,selected:"RANGE"===a},{value:"STD",label:this.i18n.standardDeviation,selected:"STD"===a},{value:"SUM",label:this.i18n.sum,selected:"SUM"===a}])}},_handleLayerChange:function(e){"browselayers"===e||"browse"===e?(this._isAnalysisSelect=!1,this.defaultItemTypes=[],this.set("allowedItemTypes",[_.IS]),this._createBrowseItems({browseValue:e,disableLAAL:!0,disableBoundary:!0},{},this._layersSelect)):(this.set("valueLayer",this.valueLayers[e]),this.inputLayer&&this.valueLayer&&(this.outputLayerName=r.substitute(this.i18n.outputLayerNameFull,{layername:this.inputLayer.name,valuelayername:this.valueLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)))},_handleBrowseItemsSelect:function(e,i){e&&e.selection&&m.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.inputLayers:this.valueLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:this._browseLyrsdlg,widget:this},i).always(t.hitch(this,function(){this._isAnalysisSelect?this._handleAnalysisLayerChange(this._analysisSelect.get("value")):this._handleLayerChange(this._layersSelect.get("value"))}))},isFloat:function(e){return e.pixelType&&["F32","F64"].indexOf(e.pixelType)>=0},isPixelTypeDefined:function(e){return e.pixelType&&"UNKNOWN"!==e.pixelType},isFeatureLayer:function(e){return e.type===_.FLAYER},_setInputLayersAttr:function(e){this.inputLayers=i.filter(e,t.hitch(this,function(e){return this.isFeatureLayer(e)||!this.isFloat(e)&&this.isPixelTypeDefined(e)}))},isValidInputLayer:function(e){return this.isFeatureLayer(e)||!this.isFloat(e)&&this.isPixelTypeDefined(e)},addBrowseOption:function(){m.addReadyToUseLayerOption(this,[{disableLAAL:!0,select:this._layersSelect}])},_getInputLayersAttr:function(){return this.inputLayers},_getValueLayerAttr:function(){return this.valueLayer=this.valueLayers[this._layersSelect.get("value")],this.valueLayer},_setValueLayerAttr:function(e){this.valueLayer=e,this._loadStatsType()},_setValueLayersAttr:function(e){this.valueLayers=e,this.valueLayer=this.valueLayers[0]},_getValueLayersAttr:function(){return this.valueLayers},_setZoneFieldAttr:function(e){if(this._zoneFieldSelect.removeOption(this._zoneFieldSelect.getOptions()),this.inputLayer){var t;if("esri.layers.ArcGISImageServiceLayer"===this.inputLayer.declaredClass){if(!this.inputLayer.hasRasterAttributeTable)return void this._zoneFieldSelect.addOption({value:"VALUE",label:"VALUE"});t=this.inputLayer._rasterAttributeTableFields}else if(!(t=this.inputLayer.fields))return;i.forEach(t,function(e){e.type!==v.FieldTypes.Integer&&e.type!==v.FieldTypes.String||this._zoneFieldSelect.addOption({value:e.name,label:p.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})},this)}},_getZoneFieldAttr:function(){return this._zoneFieldSelect&&this._zoneFieldSelect.get("value")&&(this.zoneField=this._zoneFieldSelect.get("value")),this.zoneField},_setIgnoreNoDataAttr:function(e){this.ignoreNoData=e},_getIgnoreNoDataAttr:function(){return this._ignoreNoDataCheck&&(this.ignoreNoData=this._ignoreNoDataCheck.get("checked")),this.ignoreNoData},_setStatsTypeAttr:function(e){this.statsType=e},_getStatsTypeAttr:function(){return this._statsTypeSelect&&this._statsTypeSelect.get("value")&&(this.statsType=this._statsTypeSelect.get("value")),this.statsType}});return s("extend-esri")&&t.setObject("dijit.analysis.SummarizeRasterWithin",T,c),T});