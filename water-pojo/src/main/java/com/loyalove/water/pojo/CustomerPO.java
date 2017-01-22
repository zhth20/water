package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2017/01/22
 */
public class CustomerPO implements Serializable {
    /** 自增主键 */
    private Integer customerId;

    /** 客户编码 */
    private String customerCode;

    /** 登录用户ID */
    private String userId;

    /** 客户名称 */
    private String name;

    /** 客户地址 */
    private String address;

    /** 客户电话 */
    private String tel;

    /** 客户邮箱 */
    private String email;

    /** LOGO */
    private String logo;

    /** 标题 */
    private String title;

    /** 省份 */
    private String province;

    /** 是否有3D模型 */
    private String has3d;

    /** 备注 */
    private String mark;

    /** 负责人 */
    private String headName;

    /** 负责人联系方式 */
    private String headPhone;

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

    /** 客户配置文件 */
    private String cong;

    private static final long serialVersionUID = 1L;

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
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

    public String getHas3d() {
        return has3d;
    }

    public void setHas3d(String has3d) {
        this.has3d = has3d;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public String getHeadName() {
        return headName;
    }

    public void setHeadName(String headName) {
        this.headName = headName;
    }

    public String getHeadPhone() {
        return headPhone;
    }

    public void setHeadPhone(String headPhone) {
        this.headPhone = headPhone;
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

    public String getCong() {
        return cong;
    }

    public void setCong(String cong) {
        this.cong = cong;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", customerId=").append(customerId);
        sb.append(", customerCode=").append(customerCode);
        sb.append(", userId=").append(userId);
        sb.append(", name=").append(name);
        sb.append(", address=").append(address);
        sb.append(", tel=").append(tel);
        sb.append(", email=").append(email);
        sb.append(", logo=").append(logo);
        sb.append(", title=").append(title);
        sb.append(", province=").append(province);
        sb.append(", has3d=").append(has3d);
        sb.append(", mark=").append(mark);
        sb.append(", headName=").append(headName);
        sb.append(", headPhone=").append(headPhone);
        sb.append(", lng=").append(lng);
        sb.append(", lat=").append(lat);
        sb.append(", createUser=").append(createUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append(", cong=").append(cong);
        sb.append("]");
        return sb.toString();
    }
}