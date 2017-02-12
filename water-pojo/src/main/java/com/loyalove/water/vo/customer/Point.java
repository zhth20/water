package com.loyalove.water.vo.customer;

public class Point {
    private Long pointId;
    private Long mapId;
    private Double x;
    private Double y;
    private int h;
    private int d;

    public Long getPointId() {
        return pointId;
    }

    public void setPointId(Long pointId) {
        this.pointId = pointId;
    }

    public Long getMapId() {
        return mapId;
    }

    public void setMapId(Long mapId) {
        this.mapId = mapId;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public int getH() {
        return h;
    }

    public void setH(int h) {
        this.h = h;
    }

    public int getD() {
        return d;
    }

    public void setD(int d) {
        this.d = d;
    }

    public Point() {
        super();
    }

    public Point(Double x, Double y) {
        super();
        this.x = x;
        this.y = y;
    }

    @Override
    public String toString() {
        return "{\"x\":" + x + ",\"y\":" + y + "}";
    }

    public static Point toPoint(String temp) {
        Point point = new Point();
        String[] temps = temp.split(",");
        if (temps.length < 2) return point;
        point.setX(Double.parseDouble(temps[0]));
        point.setY(Double.parseDouble(temps[1]));
        return point;
    }
}
