/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 14:00 创建
 *
 */
package com.loyalove.water.biz.auth;

import com.loyalove.water.pojo.RoleMenuPO;

/**
 * @author lingfeng@yiji.com
 */
public interface RoleMenuBiz {
    /**
     * 新增角色菜单关系
     * @param roleMenuPO
     */
    void addRoleMenu(RoleMenuPO roleMenuPO);

    /**
     * 删除角色菜单关系
     * @param roleMenuPO
     */
    void  deleteRoleMenu(RoleMenuPO roleMenuPO);


}
