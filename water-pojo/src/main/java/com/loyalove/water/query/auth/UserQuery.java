package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.query.BaseQuery;

import java.util.Date;

/**
 * Title: UserQuery.java
 * Description: UserQuery
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class UserQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private UserPO userPO;

    public UserQuery() {
        this.userPO = new UserPO();
    }

    public Integer getUserId() {
        return userPO.getUserId();
    }

    public String getSalt() {
        return userPO.getSalt();
    }

    public void setCreateUser(Integer createUser) {
        userPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return userPO.getCreateTime();
    }

    public String getPhoneNum() {
        return userPO.getPhoneNum();
    }

    public String getNickname() {
        return userPO.getNickname();
    }

    public String getPassword() {
        return userPO.getPassword();
    }

    public void setNickname(String nickname) {
        userPO.setNickname(nickname);
    }

    public String getEmail() {
        return userPO.getEmail();
    }

    public void setPassword(String password) {
        userPO.setPassword(password);
    }

    public void setSalt(String salt) {
        userPO.setSalt(salt);
    }

    public void setType(String type) {
        userPO.setType(type);
    }

    public String getType() {
        return userPO.getType();
    }

    public void setStatus(String status) {
        userPO.setStatus(status);
    }

    public Integer getCreateUser() {
        return userPO.getCreateUser();
    }

    public void setPhoneNum(String phoneNum) {
        userPO.setPhoneNum(phoneNum);
    }

    public String getStatus() {
        return userPO.getStatus();
    }

    public void setUsername(String username) {
        userPO.setUsername(username);
    }

    public void setEmail(String email) {
        userPO.setEmail(email);
    }

    public void setUpdateTime(Date updateTime) {
        userPO.setUpdateTime(updateTime);
    }

    public void setCreateTime(Date createTime) {
        userPO.setCreateTime(createTime);
    }

    public Date getUpdateTime() {
        return userPO.getUpdateTime();
    }

    public void setUserId(Integer userId) {
        userPO.setUserId(userId);
    }

    public String getUsername() {
        return userPO.getUsername();
    }
}
