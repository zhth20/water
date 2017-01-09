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

    public String getName() {
        return menuPO.getName();
    }

    public void setName(String name) {
        menuPO.setName(name);
    }

    public String getUrl() {
        return menuPO.getUrl();
    }

    public void setUrl(String url) {
        menuPO.setUrl(url);
    }

    public String getIcon() {
        return menuPO.getIcon();
    }

    public void setIcon(String icon) {
        menuPO.setIcon(icon);
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

    public Date getUpdateTime() {
        return menuPO.getUpdateTime();
    }

    public void setUpdateTime(Date updateTime) {
        menuPO.setUpdateTime(updateTime);
    }
}
