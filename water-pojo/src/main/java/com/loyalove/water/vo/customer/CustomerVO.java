package com.loyalove.water.vo.customer;

import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.vo.BaseVO;

import java.util.Date;

/**
 * Created by Loyal on 2017/1/22.
 */
public class CustomerVO extends BaseVO {
    private CustomerPO customerPO;

    public CustomerVO() {
        this.customerPO = new CustomerPO();
    }

    public String getHas3d() {
        return customerPO.getHas3d();
    }

    public void setHas3d(String has3d) {
        customerPO.setHas3d(has3d);
    }

    public Integer getCustomerId() {
        return customerPO.getCustomerId();
    }

    public void setCustomerId(Integer customerId) {
        customerPO.setCustomerId(customerId);
    }

    public Integer getCreateUser() {
        return customerPO.getCreateUser();
    }

    public Date getUpdateTime() {
        return customerPO.getUpdateTime();
    }

    public void setAddress(String address) {
        customerPO.setAddress(address);
    }

    public void setCong(String cong) {
        customerPO.setCong(cong);
    }

    public void setLat(String lat) {
        customerPO.setLat(lat);
    }

    public void setUpdateTime(Date updateTime) {
        customerPO.setUpdateTime(updateTime);
    }

    public String getTel() {
        return customerPO.getTel();
    }

    public String getLat() {
        return customerPO.getLat();
    }

    public String getLogo() {
        return customerPO.getLogo();
    }

    public void setProvince(String province) {
        customerPO.setProvince(province);
    }

    public String getHeadName() {
        return customerPO.getHeadName();
    }

    public void setUserId(String userId) {
        customerPO.setUserId(userId);
    }

    public void setCreateUser(Integer createUser) {
        customerPO.setCreateUser(createUser);
    }

    public String getMark() {
        return customerPO.getMark();
    }

    public String getCustomerCode() {
        return customerPO.getCustomerCode();
    }

    public void setHeadPhone(String headPhone) {
        customerPO.setHeadPhone(headPhone);
    }

    public void setName(String name) {
        customerPO.setName(name);
    }

    public void setMark(String mark) {
        customerPO.setMark(mark);
    }

    public void setCreateTime(Date createTime) {
        customerPO.setCreateTime(createTime);
    }

    public String getCong() {
        return customerPO.getCong();
    }

    public String getEmail() {
        return customerPO.getEmail();
    }

    public void setLogo(String logo) {
        customerPO.setLogo(logo);
    }

    public void setTitle(String title) {
        customerPO.setTitle(title);
    }

    public void setHeadName(String headName) {
        customerPO.setHeadName(headName);
    }

    public String getAddress() {
        return customerPO.getAddress();
    }

    public void setTel(String tel) {
        customerPO.setTel(tel);
    }

    public String getLng() {
        return customerPO.getLng();
    }

    public Date getCreateTime() {
        return customerPO.getCreateTime();
    }

    public void setLng(String lng) {
        customerPO.setLng(lng);
    }

    public void setEmail(String email) {
        customerPO.setEmail(email);
    }

    public String getHeadPhone() {
        return customerPO.getHeadPhone();
    }

    public void setCustomerCode(String customerCode) {
        customerPO.setCustomerCode(customerCode);
    }

    public String getTitle() {
        return customerPO.getTitle();
    }

    public String getUserId() {
        return customerPO.getUserId();
    }

    public String getProvince() {
        return customerPO.getProvince();
    }

    public String getName() {
        return customerPO.getName();
    }
}
