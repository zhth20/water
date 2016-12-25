package com.loyalove.water.biz.auth;

import com.loyalove.water.biz.BaseBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.dao.auth.RoleDAO;
import com.loyalove.water.dao.base.RoleMapper;
import com.loyalove.water.pojo.RoleExample;
import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.query.auth.RoleQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Title: RoleServiceImpl.java
 * Description: RoleServiceImpl
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 8:56
 */
@Service
public class RoleBizImpl extends BaseBiz implements RoleBiz {

    @Autowired
    RoleMapper roleMapper;

    @Autowired
    RoleDAO roleDAO;

    /**
     * 根据角色名查询角色
     *
     * @param roleName
     * @return
     */
    @Override
    public RolePO queryRoleByName(String roleName) {
        RoleExample example = new RoleExample();
        example.createCriteria().andRoleNameEqualTo(roleName);
        List<RolePO> rolePOS = roleMapper.selectByExample(example);
        return CollectionUtils.isEmpty(rolePOS) ? null : rolePOS.get(0);
    }

    /**
     * 查询角色列表
     *
     * @param pager
     * @return
     */
    @Override
    public List<RolePO> queryRoles(RoleQuery query, Pager pager) {
        return roleDAO.queryRoles(query, pager);
    }

    /**
     * 查询角色数量
     *
     * @param query
     * @return
     */
    @Override
    public Integer queryCount(RoleQuery query) {
        return roleDAO.queryCount(query);
    }

    /**
     * 查询角色数量
     *
     * @return
     */
    @Override
    public Integer queryCount() {
        RoleExample example = new RoleExample();
        return (int) roleMapper.countByExample(example);
    }

    /**
     * 新增角色
     *
     * @param rolePO
     */
    @Override
    public void addRole(RolePO rolePO) {
        roleMapper.insertSelective(rolePO);
    }

    /**
     * 修改角色
     *
     * @param rolePO
     */
    @Override
    public void update(RolePO rolePO) {
        roleMapper.updateByPrimaryKeySelective(rolePO);
    }

    /**
     * 删除角色
     *
     * @param rolePO
     */
    @Override
    public void deleteRole(RolePO rolePO) {
        roleMapper.deleteByPrimaryKey(rolePO.getRoleId());
    }

    /**
     * 查询角色
     *
     * @param rolePO
     */
    @Override
    public RolePO queryRole(RolePO rolePO) {
        return roleMapper.selectByPrimaryKey(rolePO.getRoleId());
    }
}
