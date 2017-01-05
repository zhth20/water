/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 15:15 创建
 *
 */
package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.RoleMenuBiz;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.RoleMenuPO;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author lingfeng@yiji.com
 */
@RestController
@RequestMapping("/roleMenu")
public class RoleMenuController extends BaseController {
    @Autowired
    private RoleMenuBiz roleMenuBiz;

    @RequestMapping("/add")
    public Result addRole(RoleMenuPO roleMenuPO) {
        roleMenuPO.setCreateUser(currUser().getUserId());
        roleMenuBiz.addRoleMenu(roleMenuPO);
        return Result.getResultSuccess("新增角色菜单关系成功");
    }

    @RequestMapping("/delete")
    public Result addRole(Integer[] ids) {
        RoleMenuPO roleMenuPO = new RoleMenuPO();
        for (Integer id: ids) {
            roleMenuPO.setRoleMenuId(id);
            roleMenuBiz.deleteRoleMenu(roleMenuPO);
        }
        return Result.getResultSuccess("删除角色菜单关系成功");
    }
}
