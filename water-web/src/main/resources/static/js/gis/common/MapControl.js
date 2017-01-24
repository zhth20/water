/**
 * 用户自定义控件
 */
function MapControl(self) {
    // 默认停靠位置和偏移量
    //this.data = data;
    this.customMap = self;
    this.control = [];
    this.show = 0;
    this.btn = false;
    this.initialize();
}

MapControl.prototype.initialize = function () {
	var self = this;
	//self.control.push(new CustomControl(this.map,this.data, 'view'));self.customMap.customer.cong.map
	self.control.push(new CustomCharts(self.customMap,0));
	self.control.push(new CustomControl(self.customMap,'dn'));
	self.control.push(new CustomControl(self.customMap,'materials'));
	self.control.push(new CustomControl(self.customMap,'setting'));
	self.control.push(new CustomControl(self.customMap,'edit'));
	self.control.push(new CustomControl(self.customMap,'struct'));
	self.control.push(new CustomControl(self.customMap,'point'));
	self.control.push(new CustomCharts(self.customMap,1));
	//self.control.push(new CustomControl(this,data, 'pipe-m'));
	//self.control.push(new CustomControl(this,data, 'pipe-area'));
	//self.control[0].hide();
	$.each(self.control, function (index, e) {
		self.customMap.map.addControl(e);
		e.hide();
		//if(index != self.con_index){
			//self.control[index].hide();
		//}
		//console.log("createControl:" + index + " " + e);
	});
	//this.charts.push(new CustomEdit(this.map,null,'view'));
	
	//self.customMap.map.addControl(new CustomCharts(self.customMap.map,0));
	
}
MapControl.prototype.render = function(i){
	var self = this;
	if(i == (0x01<<8) || i == (0x01<<9) ){
		CustomAlert('#modal-1','系统研发中  ... ...');
		return ;
	}
	if(i == (0x01<<10)){
		//window.location.href="help.jsp"; 
		CustomAlert('#modal-1','系统研发中  ... ...');
		//window.open("http://www.jb51.net");   
		return ;
	}
	if(self.show == (self.show | i))
		self.show = self.show - i;
	else
		self.show = (self.show | i);
	
	$.each(self.control, function (index, e) {
		//console.log(index + ','  + i + ',' + self.show);
		if(index > 3 && ((0x01<<(index)) < i || (0x01<<(index)) > i)){
			if(self.show == (self.show | (0x01<<(index)))){
				self.show = self.show - (0x01<<(index));
				e.closefunc();
			}
		}
		else{
			if(self.show == (self.show | (0x01<<(index))))
				e.openfunc();
			else
				e.closefunc();
		}
		//console.log(index + ',' + i + ',' + self.show);
		//if(index != self.con_index){
			//self.control[index].hide();
		//}
		//console.log("createControl:" + index + " " + e);
	});
}