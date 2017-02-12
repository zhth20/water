package com.loyalove.water.web.controller.customer.form;

import java.util.Date;

/**
 * Created by Loyal on 2017/2/12.
 */
public class LineForm {

    private String fileName;
    private String cadA;
    private String mapA;
    private String cadB;
    private String mapB;
    private String lineName;
    private String lineType;
    private Date installTime;
    private int height;
    private int deep;

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getCadA() {
        return cadA;
    }

    public void setCadA(String cadA) {
        this.cadA = cadA;
    }

    public String getMapA() {
        return mapA;
    }

    public void setMapA(String mapA) {
        this.mapA = mapA;
    }

    public String getCadB() {
        return cadB;
    }

    public void setCadB(String cadB) {
        this.cadB = cadB;
    }

    public String getMapB() {
        return mapB;
    }

    public void setMapB(String mapB) {
        this.mapB = mapB;
    }

    public String getLineName() {
        return lineName;
    }

    public void setLineName(String lineName) {
        this.lineName = lineName;
    }

    public String getLineType() {
        return lineType;
    }

    public void setLineType(String lineType) {
        this.lineType = lineType;
    }

    public Date getInstallTime() {
        return installTime;
    }

    public void setInstallTime(Date installTime) {
        this.installTime = installTime;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getDeep() {
        return deep;
    }

    public void setDeep(int deep) {
        this.deep = deep;
    }
}
