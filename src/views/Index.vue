<template>
  <div class='el-index-page'>
    <el-container style="height：100%">
      <AsideMenu />
      <el-container>
         <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>
        <el-main>
          <div style="margin: 0 15px;">
            <router-view/>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideMenu from './aside/AsideMenu'

export default {
  name: "index",
  components: {
    AsideMenu
  },
};
</script>

<style>
.el-container, .el-index-page {
		padding: 0;
		margin: 0;
		height: 100%;
	}

	.header-avatar {
		float: right;
		width: 210px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.el-dropdown-link {
		cursor: pointer;
	}

	.el-header {
		background-color: #17B3A3;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		color: #333;
		padding: 0;
	}
</style>