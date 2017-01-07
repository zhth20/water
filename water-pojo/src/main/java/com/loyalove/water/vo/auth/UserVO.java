package com.loyalove.water.vo.auth;

import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.vo.BaseVO;

import java.util.Date;
import java.util.Set;

/**
 * Title: UserVO.java
 * Description: UserVO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class UserVO extends BaseVO {

    private static final long serialVersionUID = 1L;

    private UserPO userPO;

    private RolePO rolePO;

    private String createUsername;

    private Set<String> roles;

    private Set<String> permissions;

    public UserVO() {
        this.userPO = new UserPO();
        this.rolePO = new RolePO();
    }

    public UserPO toUserPO() {
        return userPO;
    }

    public void setUserPO(UserPO userPO) {
        this.userPO = userPO;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<String> permissions) {
        this.permissions = permissions;
    }

    public RolePO getRolePO() {
        return rolePO;
    }

    public void setRolePO(RolePO rolePO) {
        this.rolePO = rolePO;
    }

    public Integer getRoleId() {
        return rolePO.getRoleId();
    }

    public String getMark() {
        return rolePO.getMark();
    }

    public String getRoleAlias() {
        return rolePO.getRoleAlias();
    }

    public void setRoleName(String roleName) {
        rolePO.setRoleName(roleName);
    }

    public String getRoleName() {
        return rolePO.getRoleName();
    }

    public void setRoleAlias(String roleAlias) {
        rolePO.setRoleAlias(roleAlias);
    }

    public void setMark(String mark) {
        rolePO.setMark(mark);
    }

    public void setRoleId(Integer roleId) {
        rolePO.setRoleId(roleId);
    }

    public String getCreateUsername() {
        return createUsername;
    }

    public void setCreateUsername(String createUsername) {
        this.createUsername = createUsername;
    }

    public Integer getUserId() {
        return userPO.getUserId();
    }

    public void setUsername(String username) {
        userPO.setUsername(username);
    }

    public Date getUpdateTime() {
        return userPO.getUpdateTime();
    }

    public String getType() {
        return userPO.getType();
    }

    public Integer getCreateUser() {
        return userPO.getCreateUser();
    }

    public Date getCreateTime() {
        return userPO.getCreateTime();
    }

    public void setType(String type) {
        userPO.setType(type);
    }

    public void setUpdateTime(Date updateTime) {
        userPO.setUpdateTime(updateTime);
    }

    public void setCreateTime(Date createTime) {
        userPO.setCreateTime(createTime);
    }

    public String getEmail() {
        return userPO.getEmail();
    }

    public String getStatus() {
        return userPO.getStatus();
    }

    public String getUsername() {
        return userPO.getUsername();
    }

    public String getSalt() {
        return userPO.getSalt();
    }

    public void setCreateUser(Integer createUser) {
        userPO.setCreateUser(createUser);
    }

    public String getPhoneNum() {
        return userPO.getPhoneNum();
    }

    public void setStatus(String status) {
        userPO.setStatus(status);
    }

    public String getPassword() {
        return userPO.getPassword();
    }

    public void setSalt(String salt) {
        userPO.setSalt(salt);
    }

    public void setEmail(String email) {
        userPO.setEmail(email);
    }

    public void setPassword(String password) {
        userPO.setPassword(password);
    }

    public String getNickname() {
        return userPO.getNickname();
    }

    public void setPhoneNum(String phoneNum) {
        userPO.setPhoneNum(phoneNum);
    }

    public void setUserId(Integer userId) {
        userPO.setUserId(userId);
    }

    public void setNickname(String nickname) {
        userPO.setNickname(nickname);
    }
}
