/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 11:26 创建
 *
 */
package com.loyalove.water.biz.auth;

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.dao.auth.MenuDAO;
import com.loyalove.water.dao.base.MenuMapper;
import com.loyalove.water.pojo.MenuPO;
import com.loyalove.water.query.auth.MenuQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@Service
public class MenuBizImpl implements MenuBiz {
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private MenuDAO menuDAO;
    @Override
    public void addMenu(MenuPO menuPO) {
        menuMapper.insertSelective(menuPO);
    }

    @Override
    public void deleteMenu(MenuPO menuPO) {
        menuMapper.deleteByPrimaryKey(menuPO.getMenuId());
    }

    @Override
    public void updateMenu(MenuPO menuPO) {
        menuMapper.updateByPrimaryKeySelective(menuPO);
    }

    @Override
    public List<MenuPO> queryMenus(MenuQuery query, Pager pager) {
        return menuDAO.queryMenus(query,pager);
    }

    @Override
    public Integer queryCount(MenuQuery query) {
        return menuDAO.queryCount(query);
    }

}
