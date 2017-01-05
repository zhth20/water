package com.loyalove.water.web.controller.auth;

import com.loyalove.water.common.enums.BaseStatusEnum;
import com.loyalove.water.common.util.BaseUtil;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.pojo.RolePO;

import java.util.List;

/**
 * Created by Loyal on 2017/1/5.
 */
public class RoleUtil {
    private RoleUtil() {
    }

    public static void enumHandler(List<RolePO> rolePOs) {
        if (CollectionUtils.isEmpty(rolePOs)) return;
        for (RolePO rolePO : rolePOs) {
            enumHandler(rolePO);
        }
    }

    public static void enumHandler(RolePO rolePO) {
        if (BaseUtil.isNull(rolePO)) return;
        rolePO.setStatus(BaseStatusEnum.getMsgByCode(rolePO.getStatus()));
    }
}
