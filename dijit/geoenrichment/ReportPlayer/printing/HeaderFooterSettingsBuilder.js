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
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

//            copyrightText: String,

define(["dojo/string","esri/dijit/geoenrichment/when","esri/dijit/geoenrichment/utils/DateUtil","../core/supportClasses/templateJsonUtils/TemplateJsonAnalyzer","../PlayerViewModes","dojo/i18n!esri/nls/jsapi"],function(e,t,r,o,a,i){return i=i.geoenrichment.dijit.ReportPlayer.ReportPlayer,{createHeaderFooterParams:function(o,n,l){var s;if(o.viewMode===a.PANELS_IN_STACK_ALL){var u,d=o.getCurrentReportContainer().getVisibleAreas(),c=n.dynamicReportInfo.combinedAreasInfo,g=d.every(function(e){var t=e.isGrouped+";"+e.groupIndex;return(u=u||t)===t});g=g&&c.groups&&d.length===c.groups[d[0].groupIndex].indexes.length,s=g?d.length===o.getAnalysisAreas().length?[c]:[c.groups[d[0].groupIndex]]:[null]}else s=n.dynamicReportInfo.isMultiFeature?[n.dynamicReportInfo.combinedAreasInfo]:o.getAnalysisAreas();var p=n.getDocumentDefaultStyles(),y={backgroundColor:p.backgroundColor,color:p.color,fontFamily:p.fontFamily};return t(this._getSourceText(o,n,l),function(t){return s.map(function(a){return{header:{show:l.addHeader,title:l.reportTitle||o.getReportTitle(),subtitle:l.reportSubtitle||o.printConfig.subtitle,siteInfo:a&&{siteName:a.name,siteDesc:a.description,siteAddr:a.address,latitude:a.latitude,longitude:a.longitude},style:{headerStyle:y,titleStyle:n.getTableDefaultStyles(null,"ReportTitle"),latLongStyle:n.getTableDefaultStyles(null,"GreyText")}},dataSource:{show:t&&l.addDataSource,sourceText:t&&e.substitute(i.sourcePattern,{source:t}),style:{dataSourceStyle:y}},footer:{show:l.addFooter,copyrightText:"©"+(new Date).getFullYear()+" Esri",formattedDate:r.getReportFooterDate(),style:{footerStyle:y}},documentStyle:p}})})},_getSourceText:function(e,t,r){if(!r.addDataSource)return null;var a=e.getReportData();if(e.isDataDrillingPlayer){var i=a.config,n=o.collectVariablesStats(a.templateJson);return a.templateVariableProvider.getVariablesDataVintageDescription({usedVariablesCache:n,countryID:i.countryID,hierarchy:a.reportObject.hierarchy})}return a.reportObject.dataVintageDescription}}});