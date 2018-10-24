/*********************************
** 名称:JQeury实现表格行列冻结
**
** 作者:YJJ
**
** 时间:2014年4月16日
**
** 修改人：Allen
**
** 修改时间:2017-06-10
**
** 修改记录:兼容
**
** 描述:类似Excel中的冻结窗格功能.建议给出表头固定宽度,所有单元格的高度,指定表格宽度;
**
** 修改人：Christopher
**
** 修改时间:2018-08-05
**
** 修改记录:增加冻结右侧列的功能+兼容
**
** 描述:支持冻结函数传入第4个参数，用于冻结尾列;兼容ie下宽度和高度显示的问题
**********************************/
$.fn.mergeAttributes = function(src){
	if($.browser.msie) {
		$(this).get(0).mergeAttributes(src.get(0));
	}else{
		attrs = src.get(0).attributes;
		i = attrs.length - 1;
		for(;i>=0;i--){
			var name = attrs[i].name;
			if(name.toLowerCase() === 'id' || attrs[i].value=="" || attrs[i].value==null ||attrs[i].value=="null"){
				continue;
			}
			try{
				$(this).attr(name,attrs[i].value);
			}catch(e){
			}
		}
	}
}
$.fn.FrozenTable = function(iRowHead,iRowFoot,iColLeft,iColRight){
	var oTable = $(this);
	var oTableId = oTable.attr("id");
	var oDiv = $(this).parent();
	// 兼容不同浏览器下高度
	var addHeight = null;
	if(oDiv.get(0).tagName != "DIV") return;
	oTable.find("td").attr("noWrap","nowrap");
	if($.browser.msie) {
		addHeight = 1;
	}else{
		addHeight = null;
	}
    if (oTable.width() > oDiv.width() && oTable.height() > oDiv.height()) {
    	// top冻结行与left冻结列交集
		if(iRowHead>0 && iColLeft>0){
			var oCloneTable = $("<table id='oTableLH_"+oTableId+"'></table>");//创建的是左侧列和行交集的表头
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,0,iRowHead,iColLeft,null,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1005");
			oCloneTable.css("left",oDiv.offset().left);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top);
		}
		// // bottom冻结行与left冻结列交集
		if(iRowFoot>0 && iColLeft>0){
			var oCloneTable = $("<table id='oTableLF_"+oTableId+"'></table>");	
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,iColLeft,null,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1004");
			oCloneTable.css("left",oDiv.offset().left);
			oCloneTable.css("top",(oDiv.offset().top+oDiv.outerHeight(true)-oCloneTable.outerHeight(true)-17));
		}
		// top冻结行与right冻结列交集
		if(iRowHead>0 && iColRight>0){
			var oCloneTable = $("<table id='oTableRH_"+oTableId+"'></table>");
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,0,iRowHead,-1,iColRight,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1006");
			oCloneTable.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneTable.outerWidth(true)-17);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top);
		}

		// bottom冻结行与right冻结列交集
		if(iRowFoot>0 && iColRight>0){
			var oCloneTable = $("<table id='oTableRF_"+oTableId+"'></table>");
			oDiv.parent().append(oCloneTable);
			oCloneTable.CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,-1,iColRight,addHeight);
			oCloneTable.css("position","absolute");
			oCloneTable.css("z-index","1007");
			oCloneTable.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneTable.outerWidth(true)-17);
			oCloneTable.css("border-bottom-style",'none');
            oCloneTable.css("border-top-style", 'none');
			oCloneTable.css("top",oDiv.offset().top+oDiv.outerHeight(true)-oCloneTable.outerHeight(true)-17);
		}

	}
	//top冻结行
    if (iRowHead > 0 && oTable.height() > oDiv.height()) {
		var oCloneDiv = $("<div id='oDivH_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,iRowHead,-1);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("width",oDiv.outerWidth(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1002");
		oCloneDiv.css("left",oDiv.offset().left);
		oCloneDiv.css("top",oDiv.offset().top);
	}
	// bottom冻结行
    if (iRowFoot > 0 && oTable.height() > oDiv.height()) {
		var oCloneDiv = $("<div id='oDivF_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,oTable.find("tr").length-iRowFoot,oTable.find("tr").length,-1);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("width",oDiv.outerWidth(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1001");
		oCloneDiv.css("left",oDiv.offset().left);
		oCloneDiv.css("top",oDiv.offset().top+oDiv.outerHeight(true)-oCloneDiv.outerHeight(true)-17);
	}
	// left冻结列
    if (iColLeft > 0 && oTable.width() > oDiv.width()) {
		var oCloneDiv = $("<div id='oDivL_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,oTable.find("tr").length,iColLeft);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("height",oDiv.outerHeight(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1000");
        // oCloneDiv.css("left", oDiv.offset().left);//注释掉可解决错乱问题
		oCloneDiv.css("top",oDiv.offset().top);
	}
	// right冻结列
	if (iColRight > 0 && oTable.width() > oDiv.width()) {
		var oCloneDiv = $("<div id='oDivR_"+oTableId+"'><table></table></div>");
		oDiv.parent().append(oCloneDiv);
		oCloneDiv.find("table").CloneTable(oTable,0,oTable.find("tr").length,-1,iColRight);
		oCloneDiv.css("overflow","hidden");
		oCloneDiv.css("height",oDiv.outerHeight(true)-17);
		oCloneDiv.css("position","absolute");
		oCloneDiv.css("z-index","1003");
        oCloneDiv.css("left",oDiv.offset().left+oDiv.outerWidth(true)-oCloneDiv.outerWidth(true)-17);
		oCloneDiv.css("top",oDiv.offset().top);
	}
	oDiv.scroll(function(){
		if(typeof($("#oDivH_"+oTableId).get(0))!='undefined'){
			$("#oDivH_"+oTableId).scrollLeft($(this).scrollLeft());
		}
		if(typeof($("#oDivF_"+oTableId).get(0))!='undefined'){
			$("#oDivF_"+oTableId).scrollLeft($(this).scrollLeft());
		}
		if(typeof($("#oDivL_"+oTableId).get(0))!='undefined'){
			$("#oDivL_"+oTableId).scrollTop($(this).scrollTop());
		}
		if(typeof($("#oDivR_"+oTableId).get(0))!='undefined'){
			$("#oDivR_"+oTableId).scrollTop($(this).scrollTop());
		}
	});
};
$.fn.CloneTable = function(oSrcTable,iRowStart,iRowEnd,iColumnEnd,colRightNum,addHeight){
	var iWidth = 0,iHeight = 0;
	$(this).mergeAttributes(oSrcTable);
	var Log="";
	var rowspanValue = 0;
	var rowNumber = 0;
	var rowIndex;
	for(var i=iRowStart;i<iRowEnd;i++){
		// 当前选中行
		var oldTr = oSrcTable.find("tr").eq(i);
		// 是否只存在行合并的单元格需要复制
		var isSingleRowspan = false;
		// 行合并的单元格数量
		var rowspanCount = 0;
		var colCount = 0;
		// 需要复制的列数
		var colNumber = 0;
		for(var j=(colRightNum?(oldTr.find("td").length-colRightNum):0); j<(iColumnEnd==-1?oldTr.find("td").length:iColumnEnd); j++){
			var oidTd = oldTr.find("td").eq(j);
			colNumber++;
			var colspan = oidTd.attr("colspan");
			if (typeof(colspan)=="undefined" || colspan==1) { 
			   colCount += 1;
			}else{
			   colCount += colspan;
			}  
			var rowspan = oidTd.attr("rowspan");
			if(typeof(rowspan)!="undefined" && rowspan!=1){
				// 行合并的单元格数量
				rowspanCount++;
				// 合并行的单元格位置（第几行）
				rowIndex = i;
				// 合并的行数量
				rowspanValue = rowspan;
				// 行合并的单元格数量
				rowNumber = rowspanCount;
			}
			if(colCount>=iColumnEnd && iColumnEnd!=-1){
				break;
			}
		} 
		Log +=i+"=="+rowIndex+"="+rowspanCount+"="+rowNumber+"="+rowspanValue+"<br>";
		// 获取需要复制的列数
		// 对合并行的单元格覆盖下的行做判断和适配
		if(i>rowIndex && i<=(rowIndex+rowspanValue-1) && (iColumnEnd!=-1 || colRightNum) ){
			// 判断是否仅存在合并的行单元格需要复制
			if(rowNumber!=0 && (iColumnEnd==rowNumber || colRightNum==rowNumber) ){
				isSingleRowspan = true;
			}else{
				// 减去行合并的单元格数量
				colNumber -= 1;
				if(rowspanCount==0){
					colNumber -= (rowNumber-1);
				}
			}
		}
		if(colNumber!=0){
			var newTr = $("<tr></tr>");
			newTr.mergeAttributes(oldTr);
			var jWidth = 0;
			iHeight += oldTr.outerHeight(true);
			for(var j=(colRightNum?(oldTr.find("td").length-colRightNum):0); j<colNumber+(colRightNum?(oldTr.find("td").length-colRightNum):0);j++){
				if(isSingleRowspan){
					continue;
				}
				var oidTd = oldTr.find("td").eq(j);
				var newTd = oidTd.clone();
				
				/*IE 一行多列合并时
				if(iColumnEnd==-1 && iRowStart!=0 && $.browser.msie){
					if (typeof(newTd.attr("colspan"))!="undefined" && newTd.attr("colspan")!=1) { 
						alert(newTd.text()+"==2=="+newTd.attr("colspan")+"---"+colCount);
					}  
				}
				if(iColumnEnd==-1 && iRowStart!=0 && j==1){
				    newTd.width(oidTd.outerWidth(true)-1);
					jWidth += (oidTd.outerWidth(true)-1);
				}else{
					newTd.width(oidTd.outerWidth(true));
					jWidth += oidTd.outerWidth(true);
				}*/

				newTd.height(oidTd.outerHeight(true)-3);
				// 兼容不同浏览器下宽度
				if($.browser.msie) {
					newTd.width(oidTd.width());
				}else{
					newTd.width(oidTd.outerWidth(true));
				}
				jWidth += oidTd.outerWidth(true);
				iWidth = Math.max(iWidth,jWidth);
				newTr.append(newTd);
			}
			$(this).append(newTr);
		}
	}
	$(this).width(iWidth);
	if(addHeight){
		$(this).height(iHeight+addHeight);
	}else{
		$(this).height(iHeight);
	}
}
