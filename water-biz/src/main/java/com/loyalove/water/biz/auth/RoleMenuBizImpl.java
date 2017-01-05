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

import com.loyalove.water.common.model.Pager;
import com.loyalove.water.dao.auth.RoleMenuDAO;
import com.loyalove.water.dao.base.MenuMapper;
import com.loyalove.water.dao.base.RoleMenuMapper;
import com.loyalove.water.pojo.RoleMenuExample;
import com.loyalove.water.pojo.RoleMenuPO;
import com.loyalove.water.query.auth.RoleMenuQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author lingfeng@yiji.com
 */
@Service
public class RoleMenuBizImpl implements RoleMenuBiz {
    @Autowired
    private MenuMapper menuMapper;
    @Autowired
    private RoleMenuMapper roleMenuMapper;
    @Autowired
    private RoleMenuDAO roleMenuDAO;
    @Override
    public void addRoleMenu(RoleMenuPO roleMenuPO) {
        roleMenuMapper.insertSelective(roleMenuPO);
    }

    @Override
    public void deleteRoleMenu(RoleMenuPO roleMenuPO) {
        RoleMenuExample example = new RoleMenuExample();
        //查出需要删除的数据
        example.createCriteria().andRoleMenuIdEqualTo(roleMenuPO.getRoleMenuId());
        List<RoleMenuPO> list =  roleMenuMapper.selectByExample(example);
        roleMenuPO = list.get(0);
        //查询此条数据对应的菜单列表
        example = new RoleMenuExample();
        example.createCriteria().andMenuIdEqualTo(roleMenuPO.getMenuId());
        list =  roleMenuMapper.selectByExample(example);
        //当前菜单只有此角色持有，删除关系的同时删除此菜单
        if(list!=null&&list.size()==1){
            roleMenuMapper.deleteByPrimaryKey(roleMenuPO.getRoleMenuId());
            menuMapper.deleteByPrimaryKey(roleMenuPO.getMenuId());
        }
        //当前菜单不是只有此角色持有，保留菜单
        if(list!=null&&list.size()>1){
            roleMenuMapper.deleteByPrimaryKey(roleMenuPO.getRoleMenuId());
        }
    }

    @Override
    public List<RoleMenuPO> queryRoleMenus(RoleMenuQuery query, Pager pager) {
        return roleMenuDAO.queryRoleMenus(query,pager);
    }

    @Override
    public Integer queryCount(RoleMenuQuery query) {
        return roleMenuDAO.queryCount(query);
    }
}
