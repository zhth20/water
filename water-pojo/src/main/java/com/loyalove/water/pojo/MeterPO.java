package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2017/01/14
 */
public class MeterPO implements Serializable {
    /** 编号 */
    private Integer meterId;

    /** 表号 */
    private String meterNo;

    private Integer firmId;

    /** 型号 */
    private String typeCode;

    /** 口径 */
    private String caliber;

    /** 软件版本号 */
    private String version;

    /** 通信模块号 */
    private String moduleNo;

    /** 频率 */
    private String rate;

    /** 用途 */
    private String purpose;

    /** 安装地址 */
    private String address;

    /** 经度 */
    private String lng;

    /** 纬度 */
    private String lat;

    /** 出厂时间 */
    private Date releaseDate;

    /** 创建人 */
    private Integer createUser;

    private Date createTime;

    private Date updateTime;

    private static final long serialVersionUID = 1L;

    public Integer getMeterId() {
        return meterId;
    }

    public void setMeterId(Integer meterId) {
        this.meterId = meterId;
    }

    public String getMeterNo() {
        return meterNo;
    }

    public void setMeterNo(String meterNo) {
        this.meterNo = meterNo;
    }

    public Integer getFirmId() {
        return firmId;
    }

    public void setFirmId(Integer firmId) {
        this.firmId = firmId;
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

    public String getModuleNo() {
        return moduleNo;
    }

    public void setModuleNo(String moduleNo) {
        this.moduleNo = moduleNo;
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

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
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
        sb.append(", meterId=").append(meterId);
        sb.append(", meterNo=").append(meterNo);
        sb.append(", firmId=").append(firmId);
        sb.append(", typeCode=").append(typeCode);
        sb.append(", caliber=").append(caliber);
        sb.append(", version=").append(version);
        sb.append(", moduleNo=").append(moduleNo);
        sb.append(", rate=").append(rate);
        sb.append(", purpose=").append(purpose);
        sb.append(", address=").append(address);
        sb.append(", lng=").append(lng);
        sb.append(", lat=").append(lat);
        sb.append(", releaseDate=").append(releaseDate);
        sb.append(", createUser=").append(createUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }
}