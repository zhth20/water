package com.loyalove.water.biz.auth;

import com.loyalove.water.biz.BaseBiz;
import com.loyalove.water.common.model.Pager;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.dao.auth.UserDAO;
import com.loyalove.water.dao.base.UserMapper;
import com.loyalove.water.pojo.UserExample;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.query.auth.UserQuery;
import com.loyalove.water.vo.auth.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Title: UserServiceImpl.java
 * Description: UserServiceImpl
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 8:56
 */
@Service
public class UserBizImpl extends BaseBiz implements UserBiz {

    @Autowired
    UserMapper userMapper;

    @Autowired
    UserDAO userDAO;

    /**
     * 根据用户名查询用户
     *
     * @param username
     * @return
     */
    @Override
    public UserPO queryUserByName(String username) {
        UserExample example = new UserExample();
        example.createCriteria().andUsernameEqualTo(username);
        List<UserPO> userPOS = userMapper.selectByExample(example);
        return CollectionUtils.isEmpty(userPOS) ? null : userPOS.get(0);
    }

    /**
     * 根据用户查询角色和权限
     *
     * @param userPO
     * @return
     */
    @Override
    public UserVO queryUserRolePermission(UserPO userPO) {
        UserVO userVO = new UserVO();
        userVO.setUserPO(userPO);
        userVO.setRoles(userDAO.queryRoleByUserId(userPO.getUserId()));
        userVO.setPermissions(userDAO.queryPermissionsByUserId(userPO.getUserId()));
        return userVO;
    }

    /**
     * 查询用户列表
     *
     * @param pager
     * @return
     */
    @Override
    public List<UserPO> queryUsers(UserQuery query, Pager pager) {
        return userDAO.queryUsers(query, pager);
    }

    /**
     * 查询用户数量
     *
     * @param query
     * @return
     */
    @Override
    public Integer queryCount(UserQuery query) {
        return userDAO.queryCount(query);
    }

    /**
     * 查询用户数量
     *
     * @return
     */
    @Override
    public Integer queryCount() {
        UserExample example = new UserExample();
        return (int) userMapper.countByExample(example);
    }

    /**
     * 新增用户
     *
     * @param userPO
     */
    @Override
    public void addUser(UserPO userPO) {
        userMapper.insertSelective(userPO);
    }

    /**
     * 修改用户
     *
     * @param userPO
     */
    @Override
    public void update(UserPO userPO) {
        userMapper.updateByPrimaryKeySelective(userPO);
    }

    /**
     * 删除用户
     *
     * @param userPO
     */
    @Override
    public void deleteUser(UserPO userPO) {
        userMapper.deleteByPrimaryKey(userPO.getUserId());
    }

    /**
     * 查询用户
     *
     * @param userPO
     */
    @Override
    public UserPO queryUser(UserPO userPO) {
        return userMapper.selectByPrimaryKey(userPO.getUserId());
    }
}
