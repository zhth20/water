package com.loyalove.water.vo;

import java.io.Serializable;

/**
 * Created by Loyal on 2016/12/25.
 */
public class BaseVO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String createUsername;

    public String getCreateUsername() {
        return createUsername;
    }

    public void setCreateUsername(String createUsername) {
        this.createUsername = createUsername;
    }
}
