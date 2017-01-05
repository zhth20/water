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

import java.util.Date;

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

    public Integer getMenuName() {
        return menuPO.getMenuName();
    }

    public void setMenuName(Integer menuName) {
        menuPO.setMenuName(menuPO.getMenuName());
    }

    public Integer getMenuUrl() {
        return menuPO.getMenuUrl();
    }

    public void setMenuUrl(Integer menuUrl) {
        menuPO.setMenuUrl(menuUrl);
    }

    public Integer getMenuIcon() {
        return menuPO.getMenuIcon();
    }

    public void setMenuIcon(Integer menuIcon) {
        menuPO.setMenuIcon(menuIcon);
    }

    public Integer getCreateUser() {
        return menuPO.getCreateUser();
    }

    public void setCreateUser(Integer createUser) {
        menuPO.setCreateUser(createUser);
    }

    public Date getCreateTime() {
        return menuPO.getCreateTime();
    }

    public void setCreateTime(Date createTime) {
        menuPO.setCreateTime(createTime);
    }
}
