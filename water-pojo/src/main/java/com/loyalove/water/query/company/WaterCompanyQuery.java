package com.loyalove.water.query.company;

import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.pojo.WaterCompanyPO;
import com.loyalove.water.query.BaseQuery;

import java.util.Date;

/**
 * Title: FirmQuery.java
 * Description: FirmQuery
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class WaterCompanyQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private WaterCompanyPO waterCompanyPO;

    public WaterCompanyQuery() {
        this.waterCompanyPO = new WaterCompanyPO();
    }

    public Integer getWaterCompanyId() {
        return waterCompanyPO.getWaterCompanyId();
    }

    public void setWaterCompanyId(Integer waterCompanyId) {
        waterCompanyPO.setWaterCompanyId(waterCompanyId);
    }

    public String getCompanyCode() {
        return waterCompanyPO.getCompanyCode();
    }

    public void setCompanyCode(String companyCode) {
        waterCompanyPO.setCompanyCode(companyCode);
    }

    public String getName() {
        return waterCompanyPO.getName();
    }

    public void setName(String name) {
        waterCompanyPO.setName(name);
    }

    public String getAddress() {
        return waterCompanyPO.getAddress();
    }

    public void setAddress(String address) {
        waterCompanyPO.setAddress(address);
    }

    public String getTel() {
        return waterCompanyPO.getTel();
    }

    public void setTel(String tel) {
        waterCompanyPO.setTel(tel);
    }

    public String getLng() {
        return waterCompanyPO.getLng();
    }

    public void setLng(String lng) {
        waterCompanyPO.setLng(lng);
    }

    public String getLat() {
        return waterCompanyPO.getLat();
    }

    public void setLat(String lat) {
        waterCompanyPO.setLat(lat);
    }

    public Integer getCreateUser() {
        return waterCompanyPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        waterCompanyPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return waterCompanyPO.getCreateTime();
    }

    public void setCreateTime(Date createTime) {
        waterCompanyPO.setCreateTime(createTime);
    }

    public Date getUpdateTime() {
        return waterCompanyPO.getUpdateTime();
    }

    public void setUpdateTime(Date updateTime) {
        waterCompanyPO.setUpdateTime(updateTime);
    }
}
