Array.prototype.remove=function(dx)
{
    if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0,n=0;i<this.length;i++)
    {
        if(this[i]!=this[dx])
        {
            this[n++]=this[i];
        }
    }
    this.length-=1;
}

Array.prototype.del=function(dx)
{
	var flag = false;
    //if(isNaN(dx)||dx>this.length){return false;}
    for(var i=0;i<this.length;i++)
    {
    	if(flag){
    		this[i-1]=this[i];
    	}
    	else{
    		if(this[i].id == dx.id && i > 0 || i == 0 && this.length == 1 )
            {
            	flag = true;
            }
    	}
    }
    if(flag)
    	this.length-=1;
    
    return flag;
}
Array.prototype.getString=function(){
	var str = [];
	this.forEach(function(e){  
		str.push(e.id);
	});
	return str.join(",");
}

function CustomAlert(i,s){
	jQuery(i).modal('show', {backdrop: 'static'});
	jQuery(i + ' .modal-body').html(s);
}

function editAjax(url,data) {
	$.ajax({
	    url: $('#ctx').val() + url,
	    type: 'POST',
	    data:data,
	    cache: false,
	    dataType: 'json',
	    success: function (content) {
	    	//CustomAlert('#modal-1',data.msg);
	    }
	});
}
function doAjax(url,data,callback) {
	$.ajax({
	    url: $('#ctx').val() + url,
	    type: 'POST',
	    data:data,
	    cache: false,
	    dataType: 'json',
	    success: function (data) {
	    	//CustomAlert('#modal-1',data.msg);
	    	callback.call(data);
	    }
	});
}

function getDistance(a,b){
	return Math.sqrt((a.lng - b.lng)*(a.lng - b.lng) - (a.lat - b.lat)*(a.lat - b.lat));
}
function getMultiply(b,c,a){
	return (b.lng - a.lng)*(c.lat - a.lat) - (c.lng - a.lng)*(b.lat - a.lat);
}
function getGrahampoints(points){
	
	var temp,polygon=[],i=0,i=0,k=0,top=2;
	
	for(i=0;i<points.length;i++){
		if((points[i].lat <= points[k].lat)&&(points[i].lng < points[k].lng))
			k=i;
	}
	
	temp=points[0];
	points[0]=points[k];
	points[k]=temp;
	
	for(i=1;i<points.length-1;i++){
		k=i;
		for(j=i+1;j<points.length;j++){
			if((getMultiply(points[j],points[k],points[0])>0)||((getMultiply(points[j],points[k],points[0])==0)&&(getDistance(points[0],points[j])>getDistance(points[0],points[k]))))
				k=j;
		}
		temp=points[i];
		points[i]=points[k];
		points[k]=temp;
	}
	
	polygon.push(points[0]);
	console.log(points[0].lng + "," + points[0].lat);
	polygon.push(points[1]);
	console.log(points[1].lng + "," + points[1].lat);
	polygon.push(points[2]);
	console.log(points[2].lng + "," + points[2].lat);
	
	for(i=3;i<points.length;i++){
		while(getMultiply(points[i],polygon[top],polygon[top-1])>=0)
			top--;
		
		polygon[++top]=points[i];
	}
	while(polygon.length > top+1)
		polygon.pop();
	
	return polygon;
}
