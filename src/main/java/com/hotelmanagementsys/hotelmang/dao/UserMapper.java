package com.hotelmanagementsys.hotelmang.dao;

import com.hotelmanagementsys.hotelmang.controller.authController.RegisterInfoFromFN;
import com.hotelmanagementsys.hotelmang.entity.SysUser;
import com.hotelmanagementsys.hotelmang.entity.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface UserMapper {
	List<SysUser> getAll();

	SysUser getUserById(@Param("id") Integer id);

	SysUser findByUsername(@Param("username") String username);

	@Insert("INSERT INTO users(id, username, password, sex, chiName, engName,telephone,email) " +
			"VALUES(null, #{username}, #{password}, #{sex}, #{chiName}, #{engName}, #{telephone}, #{email})")
	@Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
	Integer insertUser(User user);

	//	===================testing are as below=============================
	int deleteByPrimaryKey(String id);

	int insert(SysUser record);

	int insertSelective(SysUser record);

	SysUser selectByPrimaryKey(String id);

	int updateByPrimaryKeySelective(SysUser record);

	int updateByPrimaryKey(SysUser record);
}
