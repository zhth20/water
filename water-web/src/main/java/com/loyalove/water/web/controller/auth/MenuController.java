/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 15:01 创建
 *
 */
package com.loyalove.water.web.controller.auth;

import com.loyalove.water.biz.auth.MenuBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.model.Result;
import com.loyalove.water.pojo.MenuPO;
import com.loyalove.water.query.auth.MenuQuery;
import com.loyalove.water.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@RestController
@RequestMapping("/menu")
public class MenuController extends BaseController {
    @Autowired
    private MenuBiz menuBiz;

    @RequestMapping("")
    public Result queryMenus(MenuQuery query, Pager pager) {
        List<MenuPO> result = menuBiz.queryMenus(query,pager);
        pager.setRecordTotal(menuBiz.queryCount(query));
        return Result.getResultSuccess("查询成功", result, pager);
    }

    @RequestMapping("/add")
    public Result addRole(MenuPO menuPO) {
        menuPO.setCreateUser(currUser().getUserId());
        menuBiz.addMenu(menuPO);
        return Result.getResultSuccess("新增菜单成功");
    }

    @RequestMapping("/update")
    public Result updateRole(MenuPO menuPO) {
        menuBiz.updateMenu(menuPO);
        return Result.getResultSuccess("修改菜单成功");
    }

    @RequestMapping("/deleteBy")
    public Result deleteRole(Integer[] ids) {
        MenuPO menuPO = new MenuPO();
        for (Integer id: ids) {
            menuPO.setMenuId(id);
            menuBiz.deleteMenu(menuPO);
        }
        return Result.getResultSuccess("删除菜单成功");
    }

    @RequestMapping("/queryBy")
    public Result queryBy(MenuPO menuPO) {
        menuPO = menuBiz.queryMenu(menuPO);
        return Result.getResultSuccess("查询菜单成功", menuPO);
    }

    @RequestMapping("/queryAll")
    public Result queryAllMenus(MenuPO menuPO ) {
        List<MenuPO> result = menuBiz.queryAllMenus();
        return Result.getResultSuccess("查询成功", result);
    }

    /**
     * 查询父菜单下的子菜单
     * @param menuPO
     * @return
     */
    @RequestMapping("/querySubMenus")
    public Result querySubMenus(MenuPO menuPO ) {
        List<MenuPO> result = menuBiz.querySubMenus(menuPO);
        return Result.getResultSuccess("查询成功", result);
    }
}
