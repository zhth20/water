package com.loyalove.water.pojo;

import java.io.Serializable;
import java.util.Date;

/**
 * 该实体由系统生成，请勿修改
 *
 * 生成时间 2017/01/05
 */
public class MenuPO implements Serializable {
    /** 自增主键 */
    private Integer menuId;

    /** 父级菜单ID */
    private Integer pmenuId;

    /** 菜单名 */
    private Integer menuName;

    /** 菜单链接 */
    private Integer menuUrl;

    /** 菜单图标 */
    private Integer menuIcon;

    /** 创建人 */
    private Integer createUser;

    /** 创建时间 */
    private Date createTime;

    /** 更新时间 */
    private Date updateTime;

    private static final long serialVersionUID = 1L;

    public Integer getMenuId() {
        return menuId;
    }

    public void setMenuId(Integer menuId) {
        this.menuId = menuId;
    }

    public Integer getPmenuId() {
        return pmenuId;
    }

    public void setPmenuId(Integer pmenuId) {
        this.pmenuId = pmenuId;
    }

    public Integer getMenuName() {
        return menuName;
    }

    public void setMenuName(Integer menuName) {
        this.menuName = menuName;
    }

    public Integer getMenuUrl() {
        return menuUrl;
    }

    public void setMenuUrl(Integer menuUrl) {
        this.menuUrl = menuUrl;
    }

    public Integer getMenuIcon() {
        return menuIcon;
    }

    public void setMenuIcon(Integer menuIcon) {
        this.menuIcon = menuIcon;
    }

    public Integer getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Integer createUser) {
        this.createUser = createUser;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", menuId=").append(menuId);
        sb.append(", pmenuId=").append(pmenuId);
        sb.append(", menuName=").append(menuName);
        sb.append(", menuUrl=").append(menuUrl);
        sb.append(", menuIcon=").append(menuIcon);
        sb.append(", createUser=").append(createUser);
        sb.append(", createTime=").append(createTime);
        sb.append(", updateTime=").append(updateTime);
        sb.append("]");
        return sb.toString();
    }
}