package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.CustomerPO;
import com.loyalove.water.query.BaseQuery;

import java.util.Date;

/**
 * Title: CustomerQuery.java
 * Description: CustomerQuery
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class CustomerQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private CustomerPO customerPO;

    public CustomerQuery() {
        this.customerPO = new CustomerPO();
    }


    public Integer getCustomerId() {
        return customerPO.getCustomerId();
    }

    public void setCustomerId(Integer customerId) {
        customerPO.setCustomerId(customerId);
    }

    public String getCustomerCode() {
        return customerPO.getCustomerCode();
    }

    public void setCustomerCode(String customerCode) {
        customerPO.setCustomerCode(customerCode);
    }

    public String getUserId() {
        return customerPO.getUserId();
    }

    public void setUserId(String userId) {
        customerPO.setUserId(userId);
    }

    public String getName() {
        return customerPO.getName();
    }

    public void setName(String name) {
        customerPO.setName(name);
    }

    public String getAddress() {
        return customerPO.getAddress();
    }

    public void setAddress(String address) {
        customerPO.setAddress(address);
    }

    public String getTel() {
        return customerPO.getTel();
    }

    public void setTel(String tel) {
        customerPO.setTel(tel);
    }

    public String getEmail() {
        return customerPO.getEmail();
    }

    public void setEmail(String email) {
        customerPO.setEmail(email);
    }

    public String getHeadName() {
        return customerPO.getHeadName();
    }

    public void setHeadName(String headName) {
        customerPO.setHeadName(headName);
    }

    public String getHeadPhone() {
        return customerPO.getHeadPhone();
    }

    public void setHeadPhone(String headPhone) {
        customerPO.setHeadPhone(headPhone);
    }

    public Integer getCreateUser() {
        return customerPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        customerPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return customerPO.getCreateTime();
    }

    public void setCreateTime(Date createTime) {
        customerPO.setCreateTime(createTime);
    }

    public Date getUpdateTime() {
        return customerPO.getUpdateTime();
    }

    public void setUpdateTime(Date updateTime) {
        customerPO.setUpdateTime(updateTime);
    }

    public String getCong() {
        return customerPO.getCong();
    }

    public void setCong(String cong) {
        customerPO.setCong(cong);
    }

    public String getLng() {
        return customerPO.getLng();
    }

    public void setLng(String lng) {
        customerPO.setLng(lng);
    }

    public String getLat() {
        return customerPO.getLat();
    }

    public void setLat(String lat) {
        customerPO.setLat(lat);
    }
}
