package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.FirmPO;
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
public class FirmQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private FirmPO firmPO;

    public FirmQuery() {
        this.firmPO = new FirmPO();
    }

    public Integer getFirmId() {
        return firmPO.getFirmId();
    }

    public void setUpdateTime(Date updateTime) {
        firmPO.setUpdateTime(updateTime);
    }

    public void setFirmId(Integer firmId) {
        firmPO.setFirmId(firmId);
    }

    public String getFirmName() {
        return firmPO.getFirmName();
    }

    public Date getUpdateTime() {
        return firmPO.getUpdateTime();
    }

    public void setFirmName(String firmName) {
        firmPO.setFirmName(firmName);
    }

    public Integer getCreateUser() {
        return firmPO.getCreateUser();
    }

    public String getFirmCode() {
        return firmPO.getFirmCode();
    }

    public String getFirmTel() {
        return firmPO.getFirmTel();
    }

    public void setFirmAddress(String firmAddress) {
        firmPO.setFirmAddress(firmAddress);
    }

    public String getFirmAddress() {
        return firmPO.getFirmAddress();
    }

    public void setCreateTime(Date createTime) {
        firmPO.setCreateTime(createTime);
    }

    public Date getCreateTime() {
        return firmPO.getCreateTime();
    }

    public void setFirmCode(String firmCode) {
        firmPO.setFirmCode(firmCode);
    }

    public void setFirmTel(String firmTel) {
        firmPO.setFirmTel(firmTel);
    }

    public void setCreateUser(Integer createUser) {
        firmPO.setCreateUser(createUser);
    }
}
