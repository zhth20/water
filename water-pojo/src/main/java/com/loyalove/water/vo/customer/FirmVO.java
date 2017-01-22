package com.loyalove.water.vo.customer;

import com.loyalove.water.pojo.FirmPO;
import com.loyalove.water.vo.BaseVO;

import java.util.Date;

/**
 * Created by Loyal on 2017/1/22.
 */
public class FirmVO extends BaseVO {
    private FirmPO firmPO;

    public FirmVO() {
        this.firmPO = new FirmPO();
    }

    public Integer getFirmId() {
        return firmPO.getFirmId();
    }

    public String getLogo() {
        return firmPO.getLogo();
    }

    public String getTel() {
        return firmPO.getTel();
    }

    public String getTitle() {
        return firmPO.getTitle();
    }

    public void setUpdateTime(Date updateTime) {
        firmPO.setUpdateTime(updateTime);
    }

    public void setTitle(String title) {
        firmPO.setTitle(title);
    }

    public String getProvince() {
        return firmPO.getProvince();
    }

    public void setAddress(String address) {
        firmPO.setAddress(address);
    }

    public Date getUpdateTime() {
        return firmPO.getUpdateTime();
    }

    public Integer getCreateUser() {
        return firmPO.getCreateUser();
    }

    public void setProvince(String province) {
        firmPO.setProvince(province);
    }

    public void setLng(String lng) {
        firmPO.setLng(lng);
    }

    public void setMark(String mark) {
        firmPO.setMark(mark);
    }

    public void setTel(String tel) {
        firmPO.setTel(tel);
    }

    public void setCreateTime(Date createTime) {
        firmPO.setCreateTime(createTime);
    }

    public void setFirmCode(String firmCode) {
        firmPO.setFirmCode(firmCode);
    }

    public void setLat(String lat) {
        firmPO.setLat(lat);
    }

    public void setLogo(String logo) {
        firmPO.setLogo(logo);
    }

    public void setCreateUser(Integer createUser) {
        firmPO.setCreateUser(createUser);
    }

    public String getName() {
        return firmPO.getName();
    }

    public String getAddress() {
        return firmPO.getAddress();
    }

    public void setName(String name) {
        firmPO.setName(name);
    }

    public String getLng() {
        return firmPO.getLng();
    }

    public String getLat() {
        return firmPO.getLat();
    }

    public void setFirmId(Integer firmId) {
        firmPO.setFirmId(firmId);
    }

    public String getFirmCode() {
        return firmPO.getFirmCode();
    }

    public Date getCreateTime() {
        return firmPO.getCreateTime();
    }

    public String getMark() {
        return firmPO.getMark();
    }
}
