/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 16:02 创建
 *
 */
package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.RoleMenuPO;
import com.loyalove.water.query.BaseQuery;

/**
 * @author lingfeng@yiji.com
 */
public class RoleMenuQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private RoleMenuPO roleMenuPO;

    public RoleMenuQuery() {
        this.roleMenuPO = new RoleMenuPO();
    }

    public Integer getRoleMenuId() {
        return roleMenuPO.getRoleMenuId();
    }

    public void setRoleMenuId(Integer roleMenuId) {
        roleMenuPO.setRoleMenuId(roleMenuId);
    }

    public Integer getRoleId() {
        return roleMenuPO.getRoleId();
    }

    public void setRoleId(Integer roleId) {
        roleMenuPO.setRoleId(roleId);
    }

    public Integer getMenuId() {
        return roleMenuPO.getMenuId();
    }

    public void setMenuId(Integer menuId) {
        roleMenuPO.setMenuId(menuId);
    }

    public Integer getCreateUser() {
        return roleMenuPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        roleMenuPO.setCreateUser(createUser);
    }
}
