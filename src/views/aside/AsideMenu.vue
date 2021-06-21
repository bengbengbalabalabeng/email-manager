<template>
  <el-aside width="200px">
    <el-menu 
      background-color="#545c64"
			text-color="#fff"
			active-text-color="#ffd04b"
      :router="true">
        <el-menu-item index="/index">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </template>
        </el-menu-item>
        <el-menu-item :index="menu.path" :key="menu.path" v-for="menu in menuList">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ menu.title }}</span>
        </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "AsideMenu",
  data() {
    const menuList = [
      {
        path: "/home",
        title: "Home",
      },
      {
        path: "/about",
        title: "About",
      },
    ];
    return {
      menuList,
    };
  },
};
</script>

<style>
	.el-aside {
		background-color: #545c64;
		color: #333;
	}

a {
		text-decoration: none;
}
</style>