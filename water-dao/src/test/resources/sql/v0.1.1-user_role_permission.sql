
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(50) NOT NULL COMMENT '密码',
  `salt` varchar(50) NOT NULL COMMENT '盐值',
  `nickname` varchar(20) DEFAULT NULL COMMENT '用户昵称',
  `email` varchar(50) DEFAULT NULL COMMENT '用户邮箱',
  `phone_num` varchar(11) DEFAULT NULL COMMENT '手机号码',
  `status` varchar(20) NOT NULL DEFAULT 'INIT' COMMENT '用户状态',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT '用户类型',
  `create_user` int(11) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_num` (`phone_num`),
  KEY `create_user` (`create_user`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COMMENT='用户表';

CREATE TABLE `role`(
  `role_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `role_name` VARCHAR(20) NOT NULL COMMENT '角色名',
  `role_alias` VARCHAR(50) NOT NULL COMMENT '角色别名',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `status` VARCHAR(20) NOT NULL DEFAULT 'INIT' COMMENT '角色状态',
  `mark` VARCHAR(50) NOT NULL COMMENT '备注',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`role_id`),
  INDEX (`role_name`),
  INDEX (`role_alias`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '角色表';

CREATE TABLE `permission`(
  `permission_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `permission_name` VARCHAR(20) NOT NULL COMMENT '权限名',
  `permission_alias` VARCHAR(50) NOT NULL COMMENT '权限别名',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `mark` VARCHAR(50) NOT NULL COMMENT '备注',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`permission_id`),
  INDEX (`permission_name`),
  INDEX (`permission_alias`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '权限表';

CREATE TABLE `user_role`(
  `user_role_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` INT(11) NOT NULL COMMENT '用户ID',
  `role_id` INT(11) NOT NULL COMMENT '角色ID',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`user_role_id`),
  INDEX (`user_id`),
  INDEX (`role_id`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户角色表';

CREATE TABLE `role_permission`(
  `role_permission_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `role_id` INT(11) NOT NULL COMMENT '角色ID',
  `permission_id` INT(11) NOT NULL COMMENT '权限ID',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`role_permission_id`),
  INDEX (`role_id`),
  INDEX (`permission_id`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '角色权限表';

CREATE TABLE `user_permission`(
  `user_permission_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `user_id` INT(11) NOT NULL COMMENT '用户ID',
  `permission_id` INT(11) NOT NULL COMMENT '权限ID',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`user_permission_id`),
  INDEX (`user_id`),
  INDEX (`permission_id`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '用户权限表';

CREATE TABLE `menu`(
  `menu_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '自增主键',
  `name` INT(11) NOT NULL COMMENT '菜单名',
  `url` INT(11) NOT NULL COMMENT '菜单链接',
  `icon` INT(11) NOT NULL COMMENT '菜单图标',
  `create_user` INT(11) NOT NULL COMMENT '创建人',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`menu_id`),
  INDEX (`name`),
  INDEX (`create_user`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8 COMMENT '菜单表';
