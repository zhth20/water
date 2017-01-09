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

    public String getFirmCode() {
        return firmPO.getFirmCode();
    }

    public void setFirmCode(String firmCode) {
        firmPO.setFirmCode(firmCode);
    }

    public String getName() {
        return firmPO.getName();
    }

    public void setName(String name) {
        firmPO.setName(name);
    }

    public String getAddress() {
        return firmPO.getAddress();
    }

    public void setAddress(String address) {
        firmPO.setAddress(address);
    }

    public String getTel() {
        return firmPO.getTel();
    }

    public void setTel(String tel) {
        firmPO.setTel(tel);
    }

    public Integer getCreateUser() {
        return firmPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        firmPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return firmPO.getCreateTime();
    }

    public void setCreateTime(Date createTime) {
        firmPO.setCreateTime(createTime);
    }

    public Date getUpdateTime() {
        return firmPO.getUpdateTime();
    }
}
