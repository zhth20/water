/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-13 10:52 创建
 *
 */
package com.loyalove.water.query.firm;

import com.loyalove.water.pojo.MeterPO;
import com.loyalove.water.query.BaseQuery;

import java.util.Date;

/**
 * @author lingfeng@yiji.com
 */
public class MeterQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private MeterPO meterPO;
    public MeterQuery() {
        this.meterPO = new MeterPO();
    }

    public Integer getMeterId() {
        return meterPO.getMeterId();
    }

    public void setMeterId(Integer meterId) {
        meterPO.setMeterId(meterId);
    }

    public String getMeterNo() {
        return meterPO.getMeterNo();
    }

    public void setMeterNo(String meterNo) {
        meterPO.setMeterNo(meterNo);
    }

    public String getTypeCode() {
        return meterPO.getTypeCode();
    }

    public void setTypeCode(String typeCode) {
        meterPO.setTypeCode(typeCode);
    }

    public String getVersion() {
        return meterPO.getVersion();
    }

    public void setVersion(String version) {
        meterPO.setVersion(version);
    }

    public String getModuleNo() {
        return meterPO.getModuleNo();
    }

    public void setModuleNo(String moduleNo) {
        meterPO.setModuleNo(moduleNo);
    }

    public String getPurpose() {
        return meterPO.getPurpose();
    }

    public void setPurpose(String purpose) {
        meterPO.setPurpose(purpose);
    }

    public Integer getCreateUser() {
        return meterPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        meterPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return meterPO.getCreateTime();
    }

    public void setCreateTime(Date createTime) {
        meterPO.setCreateTime(createTime);
    }
}
