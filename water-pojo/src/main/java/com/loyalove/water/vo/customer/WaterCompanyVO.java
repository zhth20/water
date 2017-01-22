package com.loyalove.water.vo.customer;

import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.vo.BaseVO;

import java.util.Date;

/**
 * Created by Loyal on 2017/1/22.
 */
public class WaterCompanyVO extends BaseVO {
    private WaterCompanyPO waterCompanyPO;

    public WaterCompanyVO() {
        this.waterCompanyPO = new WaterCompanyPO();
    }

    public String getHas3d() {
        return waterCompanyPO.getHas3d();
    }

    public void setHas3d(String has3d) {
        waterCompanyPO.setHas3d(has3d);
    }

    public Integer getWaterCompanyId() {
        return waterCompanyPO.getWaterCompanyId();
    }

    public void setCompanyCode(String companyCode) {
        waterCompanyPO.setCompanyCode(companyCode);
    }

    public String getMark() {
        return waterCompanyPO.getMark();
    }

    public void setMark(String mark) {
        waterCompanyPO.setMark(mark);
    }

    public String getTel() {
        return waterCompanyPO.getTel();
    }

    public String getLng() {
        return waterCompanyPO.getLng();
    }

    public String getLogo() {
        return waterCompanyPO.getLogo();
    }

    public void setName(String name) {
        waterCompanyPO.setName(name);
    }

    public String getProvince() {
        return waterCompanyPO.getProvince();
    }

    public void setLogo(String logo) {
        waterCompanyPO.setLogo(logo);
    }

    public String getName() {
        return waterCompanyPO.getName();
    }

    public Date getUpdateTime() {
        return waterCompanyPO.getUpdateTime();
    }

    public void setWaterCompanyId(Integer waterCompanyId) {
        waterCompanyPO.setWaterCompanyId(waterCompanyId);
    }

    public String getCompanyCode() {
        return waterCompanyPO.getCompanyCode();
    }

    public void setUpdateTime(Date updateTime) {
        waterCompanyPO.setUpdateTime(updateTime);
    }

    public String getLat() {
        return waterCompanyPO.getLat();
    }

    public void setLng(String lng) {
        waterCompanyPO.setLng(lng);
    }

    public void setCreateTime(Date createTime) {
        waterCompanyPO.setCreateTime(createTime);
    }

    public Date getCreateTime() {
        return waterCompanyPO.getCreateTime();
    }

    public void setTel(String tel) {
        waterCompanyPO.setTel(tel);
    }

    public void setAddress(String address) {
        waterCompanyPO.setAddress(address);
    }

    public Integer getCreateUser() {
        return waterCompanyPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        waterCompanyPO.setCreateUser(createUser);
    }

    public void setProvince(String province) {
        waterCompanyPO.setProvince(province);
    }

    public void setTitle(String title) {
        waterCompanyPO.setTitle(title);
    }

    public String getTitle() {
        return waterCompanyPO.getTitle();
    }

    public void setLat(String lat) {
        waterCompanyPO.setLat(lat);
    }

    public String getAddress() {
        return waterCompanyPO.getAddress();
    }
}
