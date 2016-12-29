package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.query.BaseQuery;

import java.util.Date;

/**
 * Title: RoleQuery.java
 * Description: RoleQuery
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class RoleQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private RolePO rolePO;

    public RoleQuery() {
        this.rolePO = new RolePO();
    }

    public Integer getRoleId() {
        return rolePO.getRoleId();
    }

    public void setRoleId(Integer roleId) {
        rolePO.setRoleId(roleId);
    }

    public Date getCreateTime() {
        return rolePO.getCreateTime();
    }

    public void setRoleAlias(String roleAlias) {
        rolePO.setRoleAlias(roleAlias);
    }

    public void setCreateTime(Date createTime) {
        rolePO.setCreateTime(createTime);
    }

    public String getRoleName() {
        return rolePO.getRoleName();
    }

    public Integer getCreateUser() {
        return rolePO.getCreateUser();
    }

    public String getRoleAlias() {
        return rolePO.getRoleAlias();
    }

    public String getMark() {
        return rolePO.getMark();
    }

    public Date getUpdateTime() {
        return rolePO.getUpdateTime();
    }

    public void setRoleName(String roleName) {
        rolePO.setRoleName(roleName);
    }

    public void setMark(String mark) {
        rolePO.setMark(mark);
    }

    public void setUpdateTime(Date updateTime) {
        rolePO.setUpdateTime(updateTime);
    }

    public void setCreateUser(Integer createUser) {
        rolePO.setCreateUser(createUser);
    }
}
