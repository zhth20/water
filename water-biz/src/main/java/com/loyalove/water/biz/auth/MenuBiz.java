/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 11:25 创建
 *
 */
package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.pojo.MenuPO;
import com.loyalove.water.query.auth.MenuQuery;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
public interface MenuBiz {
    /**
     * 新增菜单
     * @param menuPO
     */
     void addMenu(MenuPO menuPO);

    /**
     * 删除菜单
     * @param menuPO
     */
    void  deleteMenu(MenuPO menuPO);

    /**
     * 更新菜单
     * @param menuPO
     */
    void  updateMenu(MenuPO menuPO);

    /**
     * 查询菜单列表
     * @return
     */
    public List<MenuPO> queryMenus(MenuQuery query, Pager pager);

    /**
     * 查询总数
     * @param query
     * @return
     */
    Integer queryCount(MenuQuery query);
}
