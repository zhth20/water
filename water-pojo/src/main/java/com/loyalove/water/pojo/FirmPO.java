package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2017/01/22
 */
public class FirmPO implements Serializable {
    /** 自增主键 */
    private Integer firmId;

    /** 厂商编码 */
    private String firmCode;

    /** 厂商名称 */
    private String name;

    /** 厂商地址 */
    private String address;

    /** 厂商电话 */
    private String tel;

    /** LOGO */
    private String logo;

    /** 标题 */
    private String title;

    /** 省份 */
    private String province;

    /** 备注 */
    private String mark;

    /** 经度 */
    private String lng;

    /** 纬度 */
    private String lat;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getLogo() {
        return logo;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
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
        sb.append(", name=").append(name);
        sb.append(", address=").append(address);
        sb.append(", tel=").append(tel);
        sb.append(", logo=").append(logo);
        sb.append(", title=").append(title);
        sb.append(", province=").append(province);
        sb.append(", mark=").append(mark);
        sb.append(", lng=").append(lng);
        sb.append(", lat=").append(lat);
        sb.append(", createUser=").append(createUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }
}