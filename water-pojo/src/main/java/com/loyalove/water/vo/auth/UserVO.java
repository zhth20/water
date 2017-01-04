package com.loyalove.water.vo.auth;

import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.vo.BaseVO;

import java.util.Set;

/**
 * Title: UserVO.java
 * Description: UserVO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class UserVO extends BaseVO {

    private static final long serialVersionUID = 1L;

    private UserPO userPO;

    private RolePO rolePO;

    private Set<String> roles;

    private Set<String> permissions;

    public UserPO getUserPO() {
        return userPO;
    }

    public void setUserPO(UserPO userPO) {
        this.userPO = userPO;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<String> permissions) {
        this.permissions = permissions;
    }

    public RolePO getRolePO() {
        return rolePO;
    }

    public void setRolePO(RolePO rolePO) {
        this.rolePO = rolePO;
    }
}
