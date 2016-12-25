package com.loyalove.water.vo.auth;

import com.loyalove.water.pojo.RolePO;
import com.loyalove.water.vo.BaseVO;

import java.util.Set;

/**
 * Title: RoleVO.java
 * Description: RoleVO
 * Company: ysh
 *
 * @author: sailuo@yiji.com
 * @date: 2016-11-30 9:46
 */
public class RoleVO extends BaseVO {

    private static final long serialVersionUID = 1L;

    private RolePO rolePO;

    public RolePO getRolePO() {
        return rolePO;
    }

    public void setRolePO(RolePO rolePO) {
        this.rolePO = rolePO;
    }

}
