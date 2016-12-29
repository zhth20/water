package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2016/12/29
 */
public class FirmPO implements Serializable {
    /** 自增主键 */
    private Integer firmId;

    /** 厂商编码 */
    private String firmCode;

    /** 厂商名称 */
    private String firmName;

    /** 厂商地址 */
    private String firmAddress;

    /** 厂商电话 */
    private String firmTel;

    /** 创建人 */
    private Integer createUser;

    /** 创建时间 */
    private Date createTime;

    /** 更新时间 */
    private Date updateTime;

    private static final long serialVersionUID = 1L;

    public Integer getFirmId() {
        return firmId;
    }

    public void setFirmId(Integer firmId) {
        this.firmId = firmId;
    }

    public String getFirmCode() {
        return firmCode;
    }

    public void setFirmCode(String firmCode) {
        this.firmCode = firmCode;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public String getFirmAddress() {
        return firmAddress;
    }

    public void setFirmAddress(String firmAddress) {
        this.firmAddress = firmAddress;
    }

    public String getFirmTel() {
        return firmTel;
    }

    public void setFirmTel(String firmTel) {
        this.firmTel = firmTel;
    }

    public Integer getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Integer createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", firmId=").append(firmId);
        sb.append(", firmCode=").append(firmCode);
        sb.append(", firmName=").append(firmName);
        sb.append(", firmAddress=").append(firmAddress);
        sb.append(", firmTel=").append(firmTel);
        sb.append(", createUser=").append(createUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }
}