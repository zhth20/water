package com.loyalove.water.web.controller.auth;

import com.loyalove.water.common.enums.UserStatusEnum;
import com.loyalove.water.common.enums.UserTypeEnum;
import com.loyalove.water.common.util.BaseUtil;
import com.loyalove.water.common.util.CollectionUtils;
import com.loyalove.water.pojo.UserPO;
import com.loyalove.water.vo.auth.UserVO;

import java.util.List;

/**
 * Created by Loyal on 2017/1/5.
 */
public class UserUtil {
    private UserUtil() {
    }

    public static void enumVOHandler(List<UserVO> userVOs) {
        if (CollectionUtils.isEmpty(userVOs)) return;
        for (UserVO userVO : userVOs) {
            enumHandler(userVO.toUserPO());
        }
    }

    public static void enumHandler(List<UserPO> userPOs) {
        if (CollectionUtils.isEmpty(userPOs)) return;
        for (UserPO userPO : userPOs) {
            enumHandler(userPO);
        }
    }

    public static void enumHandler(UserPO userPO) {
        if (BaseUtil.isNull(userPO)) return;
        userPO.setStatus(UserStatusEnum.getMsgByCode(userPO.getStatus()));
        userPO.setType(UserTypeEnum.getMsgByCode(userPO.getType()));
    }
}
