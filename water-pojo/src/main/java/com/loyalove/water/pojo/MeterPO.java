package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2017/01/13
 */
public class MeterPO implements Serializable {
    /** 编号 */
    private Integer meterId;

    /** 表号 */
    private String meterNumber;

    /** 型号 */
    private String typeCode;

    /** 口径 */
    private String caliber;

    /** 软件版本号 */
    private String version;

    /** 通信模块号 */
    private String moduleNumber;

    /** 频率 */
    private String rate;

    /** 用途 */
    private String purpose;

    /** 安装地址 */
    private String address;

    /** 安装坐标 */
    private String coordinate;

    /** 出厂时间 */
    private Date releaseDate;

    /** 创建人 */
    private Integer creatUser;

    private Date createTime;

    private Date updateTime;

    private static final long serialVersionUID = 1L;

    public Integer getMeterId() {
        return meterId;
    }

    public void setMeterId(Integer meterId) {
        this.meterId = meterId;
    }

    public String getMeterNumber() {
        return meterNumber;
    }

    public void setMeterNumber(String meterNumber) {
        this.meterNumber = meterNumber;
    }

    public String getTypeCode() {
        return typeCode;
    }

    public void setTypeCode(String typeCode) {
        this.typeCode = typeCode;
    }

    public String getCaliber() {
        return caliber;
    }

    public void setCaliber(String caliber) {
        this.caliber = caliber;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getModuleNumber() {
        return moduleNumber;
    }

    public void setModuleNumber(String moduleNumber) {
        this.moduleNumber = moduleNumber;
    }

    public String getRate() {
        return rate;
    }

    public void setRate(String rate) {
        this.rate = rate;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public Integer getCreatUser() {
        return creatUser;
    }

    public void setCreatUser(Integer creatUser) {
        this.creatUser = creatUser;
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
        sb.append(", meterId=").append(meterId);
        sb.append(", meterNumber=").append(meterNumber);
        sb.append(", typeCode=").append(typeCode);
        sb.append(", caliber=").append(caliber);
        sb.append(", version=").append(version);
        sb.append(", moduleNumber=").append(moduleNumber);
        sb.append(", rate=").append(rate);
        sb.append(", purpose=").append(purpose);
        sb.append(", address=").append(address);
        sb.append(", coordinate=").append(coordinate);
        sb.append(", releaseDate=").append(releaseDate);
        sb.append(", creatUser=").append(creatUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }
}