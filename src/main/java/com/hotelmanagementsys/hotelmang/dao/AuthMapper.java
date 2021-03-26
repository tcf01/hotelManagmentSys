package com.hotelmanagementsys.hotelmang.dao;

import com.hotelmanagementsys.hotelmang.entity.SysUser;

public interface AuthMapper {
	SysUser register(SysUser userToAdd);

	String login(String username, String password);

	String refresh(String oldToken);
}
