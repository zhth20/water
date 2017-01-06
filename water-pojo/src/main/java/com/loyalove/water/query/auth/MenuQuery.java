/*
 * www.yiji.com Inc.
 * Copyright (c) 2014 All Rights Reserved
 */

/*
 * 修订记录:
 * lingfeng@yiji.com 2017-01-05 14:44 创建
 *
 */
package com.loyalove.water.query.auth;

import com.loyalove.water.pojo.MenuPO;
import com.loyalove.water.query.BaseQuery;

/**
 * @author lingfeng@yiji.com
 */
public class MenuQuery extends BaseQuery {

    private static final long serialVersionUID = 1L;

    private MenuPO menuPO;

    public MenuQuery(){
        this.menuPO = new MenuPO();
    }

    public Integer getMenuId() {
        return menuPO.getMenuId();
    }

    public void setMenuId(Integer menuId) {
        menuPO.setMenuId(menuId);
    }

    public Integer getPmenuId() {
        return menuPO.getPmenuId();
    }

    public void setPmenuId(Integer pmenuId) {
        menuPO.setPmenuId(pmenuId);
    }

    public String getMenuName() {
     return   menuPO.getMenuName();
    }

    public void setMenuName(String menuName) {
        menuPO.setMenuName(menuName);
    }
}
