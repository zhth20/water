package com.loyalove.water.web.util;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.loyalove.water.vo.customer.Point;

import java.io.*;

public class CadParseUtil {
	private Point simpleA;
	private Point simpleB;
	private Point fixA ;//= new Point(4338.376835284901,2772.021694284196);//new Point(13720.819, 13942.391);
	private Point fixB ;//= new Point(5059.970544071644,2458.164297962243);//new Point(14691.117, 18113.665);
	private double x;
	private double y;
	//4481.299549437166,3189.832267715219
	/*4965.579217037006
	2268.115472705687

	106.477771,29.56782

	5099.799900923653
	2436.167505689215

	106.479199,29.569422*/
	public Point getSimpleA() {
		return simpleA;
	}
	public void setSimpleA(Point simpleA) {
		this.simpleA = simpleA;
	}
	public Point getSimpleB() {
		return simpleB;
	}
	public void setSimpleB(Point simpleB) {
		this.simpleB = simpleB;
	}

	public double getX() {
		return x;
	}
	public void setX(double x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
	public CadParseUtil(Point fA, Point simpleA, Point fB, Point simpleB) {
		super();
		this.simpleA = simpleA;
		this.simpleB = simpleB;
		fixA = fA;
		fixB = fB;
		
		setX((fixB.getX()-fixA.getX())/(simpleB.getX()-simpleA.getX()));
		setY((fixB.getY()-fixA.getY())/(simpleB.getY()-simpleA.getY()));
	}
	@Override
	public String toString() {
		return "MapToJson [x=" + x + ", y=" + y + "]";
	}
	
	public Point GetMapPoint(String px,String py){
		Point map = new Point(Double.parseDouble(px),Double.parseDouble(py));
	
		/*
		if(map.getX() == 4436.833676184608 || map.getX() == 4436.982559172156){
			System.out.println(simpleA.getX() + " + (" + map.getX() +"-" +fixA.getX() + ")/" + x);
			System.out.println(simpleA.getY() + " + (" + map.getY() +"-" +fixA.getY() + ")/" + y);
		}*/
		/*
		map.setX(simpleA.getX() + (map.getX() - fixA.getX())/x);
		map.setY(simpleA.getY() + (map.getY() - fixA.getY())/y);*/
		
		return map;
	}

	public JSONArray initDataFromCad(File file) throws IOException{
		//File file=new File("D:/web/java/demo/WebContent/file/guyang.dxf");
		//File file=new File("D:/tools/workspace/map/WebContent/map/data/demo.dxf");
		
        if(!file.exists()||file.isDirectory())
            throw new FileNotFoundException();
        BufferedReader br=new BufferedReader(new FileReader(file));
        
        String str=null;
        String linetype=null;
        StringBuffer sb=new StringBuffer("<data>");
        StringBuffer poline=new StringBuffer();
        str=br.readLine();
     
        JSONArray jsonLine = new JSONArray();  
        while(str!=null){
        	switch(str){
	        	case "LWPOLYLINE":
	        		str=br.readLine();
	        		while(!str.equals("AcDbPolyline")){
	        			str=br.readLine();
	        		}
	        		if(poline.length() > 0){
	        			poline.append(",[");
	        			//System.out.print(",[");
	        		}
	        		else{
	        			poline.append("[");
	        			//System.out.print("[");
	        		}
	        		JSONArray jsonArray = new JSONArray();  
	        		
	        		while(!str.equals("  0")){
	        			while(!str.equals(" 10") && !str.equals("  0"))
	        				str=br.readLine();
	        			if(str.equals("  0"))
	        				break;
	        			String px="",py="";
	        			
	        			if(str.equals(" 10")){
	        				px=br.readLine();
	        			}
	        			str=br.readLine();
	        			
	        			if(str.equals(" 20")){
	        				py=br.readLine();
	        			}
	        			
	        			str=br.readLine();
	        			//GetMapPoint(px,py).toString();
	        			//line.append("<line>"+line_id+","+temp+","+GetInfo(br,0) + "</line>");
	        			Point point = GetMapPoint(px,py);
	        			JSONObject p = new JSONObject();  
	                    p.put("x", point.getX());  
	                    p.put("y", point.getY());  
	                    jsonArray.add(p);  
	                    
	        			poline.append(GetMapPoint(px,py).toString());
	        			//System.out.print(GetMapPoint(px,py).toString());
	        			
	        			while(!str.equals(" 10") && !str.equals("  0"))
	        				str=br.readLine();
	        			
	        			if(str.equals(" 10")){
	        				poline.append(",");
	        				//System.out.print(",");
	        			}
	        			//System.out.print("(" + px + "," + py + "),");
	        		}
	        		poline.append("]");
	        		//System.out.println("]");
	        		//str=br.readLine();
	        		
	        		jsonLine.add(jsonArray);  
	        		break;
        	default:
        		str=br.readLine();
        		break;
        	}
        }
        return jsonLine;
	}
}
